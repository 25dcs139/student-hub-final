<?php
/**
 * StudentHub - Student Management API (Practical 6 & 11)
 * Supports full CRUD (Create, Read, Update, Delete) with search, filter, and pagination.
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth_guard.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo    = getDBConnection();

if ($method === 'GET') {
    $search = trim($_GET['search'] ?? '');
    $course = trim($_GET['course'] ?? '');
    $page   = max(1, intval($_GET['page'] ?? 1));
    $limit  = max(1, min(50, intval($_GET['limit'] ?? 10)));
    $offset = ($page - 1) * $limit;

    $conditions = [];
    $params     = [];

    if ($search !== '') {
        $conditions[] = "(s.name LIKE ? OR s.email LIKE ? OR s.student_id LIKE ?)";
        $searchTerm = "%$search%";
        $params[]   = $searchTerm;
        $params[]   = $searchTerm;
        $params[]   = $searchTerm;
    }

    if ($course !== '' && $course !== 'All') {
        $conditions[] = "s.course = ?";
        $params[]     = $course;
    }

    $whereClause = !empty($conditions) ? "WHERE " . implode(" AND ", $conditions) : "";

    // Count query
    $stmtCount = $pdo->prepare("SELECT COUNT(*) as total FROM students s $whereClause");
    $stmtCount->execute($params);
    $total = $stmtCount->fetch()['total'];

    // Data query
    $stmtData = $pdo->prepare("SELECT s.* FROM students s $whereClause ORDER BY s.id DESC LIMIT $limit OFFSET $offset");
    $stmtData->execute($params);
    $students = $stmtData->fetchAll();

    echo json_encode([
        'success'    => true,
        'data'       => $students,
        'pagination' => [
            'total'       => (int)$total,
            'page'        => $page,
            'limit'       => $limit,
            'totalPages'  => ceil($total / $limit)
        ]
    ]);
    exit;
}

if ($method === 'POST') {
    // Admin only check for mutations
    requireAuth('admin');

    $action = $_POST['action'] ?? 'create';

    if ($action === 'create') {
        $name    = trim($_POST['name'] ?? '');
        $email   = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
        $mobile  = trim($_POST['mobile'] ?? '');
        $course  = trim($_POST['course'] ?? '');
        $year    = trim($_POST['year'] ?? '');
        $gender  = trim($_POST['gender'] ?? 'Male');
        $skills  = trim($_POST['skills'] ?? '');

        if (!$name || !$email || !$course || !$year) {
            echo json_encode(['success' => false, 'message' => 'Name, valid email, course, and year are required.']);
            exit;
        }

        // Generate temporary password
        $defaultPassword = password_hash('StudentHub@2026', PASSWORD_DEFAULT);

        try {
            $pdo->beginTransaction();
            $stmtUser = $pdo->prepare("INSERT INTO users (email, password, role, status) VALUES (?, ?, 'student', 'active')");
            $stmtUser->execute([$email, $defaultPassword]);
            $userId = $pdo->lastInsertId();

            $studentId = 'STU-' . date('Y') . '-' . str_pad($userId, 3, '0', STR_PAD_LEFT);

            $stmtStudent = $pdo->prepare("INSERT INTO students (user_id, student_id, name, email, mobile, course, year, gender, skills, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active')");
            $stmtStudent->execute([$userId, $studentId, $name, $email, $mobile, $course, $year, $gender, $skills]);

            $pdo->commit();
            echo json_encode(['success' => true, 'message' => 'Student created successfully.', 'studentId' => $studentId]);
        } catch (Exception $e) {
            $pdo->rollBack();
            echo json_encode(['success' => false, 'message' => 'Failed to create student: ' . $e->getMessage()]);
        }
        exit;
    }

    if ($action === 'update') {
        $id     = intval($_POST['id'] ?? 0);
        $name   = trim($_POST['name'] ?? '');
        $email  = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
        $mobile = trim($_POST['mobile'] ?? '');
        $course = trim($_POST['course'] ?? '');
        $year   = trim($_POST['year'] ?? '');
        $status = trim($_POST['status'] ?? 'Active');
        $skills = trim($_POST['skills'] ?? '');

        if (!$id || !$name || !$email) {
            echo json_encode(['success' => false, 'message' => 'Invalid student ID or missing details.']);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE students SET name = ?, email = ?, mobile = ?, course = ?, year = ?, status = ?, skills = ? WHERE id = ?");
        $stmt->execute([$name, $email, $mobile, $course, $year, $status, $skills, $id]);

        echo json_encode(['success' => true, 'message' => 'Student record updated successfully.']);
        exit;
    }

    if ($action === 'delete') {
        $id = intval($_POST['id'] ?? 0);
        if (!$id) {
            echo json_encode(['success' => false, 'message' => 'Invalid student ID provided for deletion.']);
            exit;
        }

        // Get user_id to cascade
        $stmt = $pdo->prepare("SELECT user_id FROM students WHERE id = ?");
        $stmt->execute([$id]);
        $student = $stmt->fetch();

        if ($student) {
            $pdo->prepare("DELETE FROM users WHERE id = ?")->execute([$student['user_id']]);
        }
        $pdo->prepare("DELETE FROM students WHERE id = ?")->execute([$id]);

        echo json_encode(['success' => true, 'message' => 'Student record deleted successfully.']);
        exit;
    }
}
