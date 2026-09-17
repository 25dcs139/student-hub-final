<?php
/**
 * StudentHub - Auth API Endpoint (Practical 5, 9, 10)
 * Handles registration with password_hash() and login with password_verify() and sessions.
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth_guard.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';

if ($action === 'register') {
    $name     = trim($_POST['name'] ?? '');
    $email    = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $mobile   = trim($_POST['mobile'] ?? '');
    $password = $_POST['password'] ?? '';
    $course   = trim($_POST['course'] ?? '');
    $year     = trim($_POST['year'] ?? '');
    $gender   = trim($_POST['gender'] ?? 'Other');

    if (!$name || !$email || !$mobile || !$password || !$course || !$year) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all mandatory fields correctly.']);
        exit;
    }

    if (strlen($password) < 8) {
        echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters long.']);
        exit;
    }

    $pdo = getDBConnection();

    // Check duplicate email
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'An account with this email already exists.']);
        exit;
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    try {
        $pdo->beginTransaction();

        // 1. Insert user
        $stmtUser = $pdo->prepare("INSERT INTO users (email, password, role, status) VALUES (?, ?, 'student', 'active')");
        $stmtUser->execute([$email, $passwordHash]);
        $userId = $pdo->lastInsertId();

        // 2. Generate Student ID
        $studentId = 'STU-' . date('Y') . '-' . str_pad($userId, 3, '0', STR_PAD_LEFT);

        // 3. Insert student record
        $stmtStudent = $pdo->prepare("INSERT INTO students (user_id, student_id, name, email, mobile, course, year, gender, gpa, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 3.75, 'Active')");
        $stmtStudent->execute([$userId, $studentId, $name, $email, $mobile, $course, $year, $gender]);

        $pdo->commit();

        echo json_encode([
            'success' => true,
            'message' => 'Registration successful! You can now log into your student account.',
            'studentId' => $studentId
        ]);
    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(['success' => false, 'message' => 'Registration failed: ' . $e->getMessage()]);
    }
    exit;
}

if ($action === 'login') {
    $email    = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $password = $_POST['password'] ?? '';

    if (!$email || !$password) {
        echo json_encode(['success' => false, 'message' => 'Email and password are required.']);
        exit;
    }

    $pdo = getDBConnection();
    $stmt = $pdo->prepare("SELECT u.id, u.email, u.password, u.role, u.status, s.name, s.student_id, s.course FROM users u LEFT JOIN students s ON s.user_id = u.id WHERE u.email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        if ($user['status'] !== 'active') {
            echo json_encode(['success' => false, 'message' => 'Your account is deactivated. Contact administration.']);
            exit;
        }

        // Regenerate session ID to protect against session fixation attacks (Practical 10)
        session_regenerate_id(true);

        $_SESSION['user_id']    = $user['id'];
        $_SESSION['email']      = $user['email'];
        $_SESSION['role']       = $user['role'];
        $_SESSION['name']       = $user['name'] ?? ($user['role'] === 'admin' ? 'System Administrator' : 'Student');
        $_SESSION['student_id'] = $user['student_id'] ?? null;
        $_SESSION['course']     = $user['course'] ?? null;

        echo json_encode([
            'success'  => true,
            'message'  => 'Login successful!',
            'role'     => $user['role'],
            'redirect' => $user['role'] === 'admin' ? '/admin/dashboard.php' : '/dashboard.php',
            'user'     => [
                'id'        => $user['id'],
                'name'      => $_SESSION['name'],
                'email'     => $user['email'],
                'role'      => $user['role'],
                'studentId' => $user['student_id']
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
    }
    exit;
}

if ($action === 'logout') {
    session_unset();
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Successfully logged out.']);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Invalid action specified.']);
