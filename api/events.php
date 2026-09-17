<?php
/**
 * StudentHub - Event Management API (Practical 6 & 12)
 * Supports event listing, filtering, search, and Admin CRUD with poster validation.
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth_guard.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo    = getDBConnection();

if ($method === 'GET') {
    $search   = trim($_GET['search'] ?? '');
    $category = trim($_GET['category'] ?? '');
    $sort     = trim($_GET['sort'] ?? 'date_asc');

    $conditions = [];
    $params     = [];

    if ($search !== '') {
        $conditions[] = "(title LIKE ? OR description LIKE ? OR venue LIKE ?)";
        $searchTerm = "%$search%";
        $params[]   = $searchTerm;
        $params[]   = $searchTerm;
        $params[]   = $searchTerm;
    }

    if ($category !== '' && $category !== 'All') {
        $conditions[] = "category = ?";
        $params[]     = $category;
    }

    $whereClause = !empty($conditions) ? "WHERE " . implode(" AND ", $conditions) : "";

    $orderBy = "ORDER BY date ASC";
    if ($sort === 'date_desc') {
        $orderBy = "ORDER BY date DESC";
    } elseif ($sort === 'title') {
        $orderBy = "ORDER BY title ASC";
    } elseif ($sort === 'popular') {
        $orderBy = "ORDER BY seats_filled DESC";
    }

    $stmt = $pdo->prepare("SELECT * FROM events $whereClause $orderBy");
    $stmt->execute($params);
    $events = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $events]);
    exit;
}

if ($method === 'POST') {
    requireAuth('admin');

    $action = $_POST['action'] ?? 'create';

    if ($action === 'create') {
        $title       = trim($_POST['title'] ?? '');
        $category    = trim($_POST['category'] ?? 'Technical');
        $date        = trim($_POST['date'] ?? '');
        $time        = trim($_POST['time'] ?? '');
        $venue       = trim($_POST['venue'] ?? '');
        $description = trim($_POST['description'] ?? '');
        $seatsTotal  = intval($_POST['seats_total'] ?? 100);
        $organizer   = trim($_POST['organizer'] ?? 'Student Activity Cell');
        $coordinator = trim($_POST['coordinator'] ?? 'Faculty In-Charge');
        $posterUrl   = trim($_POST['poster'] ?? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80');

        if (!$title || !$date || !$venue || !$description) {
            echo json_encode(['success' => false, 'message' => 'Please provide event title, date, venue, and description.']);
            exit;
        }

        // Poster upload validation if file was uploaded
        if (isset($_FILES['poster_file']) && $_FILES['poster_file']['error'] === UPLOAD_ERR_OK) {
            $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            $fileType     = mime_content_type($_FILES['poster_file']['tmp_name']);
            $fileSize     = $_FILES['poster_file']['size'];

            if (!in_array($fileType, $allowedTypes)) {
                echo json_encode(['success' => false, 'message' => 'Invalid poster image type. Allowed: JPG, PNG, WEBP.']);
                exit;
            }

            if ($fileSize > 5 * 1024 * 1024) { // 5MB limit
                echo json_encode(['success' => false, 'message' => 'Poster image size must be under 5MB.']);
                exit;
            }

            $uploadDir = __DIR__ . '/../assets/uploads/posters/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            $ext = pathinfo($_FILES['poster_file']['name'], PATHINFO_EXTENSION);
            $newFileName = 'poster_' . time() . '_' . rand(1000, 9999) . '.' . $ext;
            if (move_uploaded_file($_FILES['poster_file']['tmp_name'], $uploadDir . $newFileName)) {
                $posterUrl = '/assets/uploads/posters/' . $newFileName;
            }
        }

        $stmt = $pdo->prepare("INSERT INTO events (title, category, date, time, venue, description, status, poster, seats_total, seats_filled, organizer, coordinator) VALUES (?, ?, ?, ?, ?, ?, 'Upcoming', ?, ?, 0, ?, ?)");
        $stmt->execute([$title, $category, $date, $time, $venue, $description, $posterUrl, $seatsTotal, $organizer, $coordinator]);

        echo json_encode(['success' => true, 'message' => 'Event created successfully and visible to all students!']);
        exit;
    }

    if ($action === 'delete') {
        $id = intval($_POST['id'] ?? 0);
        if (!$id) {
            echo json_encode(['success' => false, 'message' => 'Invalid event ID for deletion.']);
            exit;
        }

        $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode(['success' => true, 'message' => 'Event deleted successfully.']);
        exit;
    }
}
