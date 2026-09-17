<?php
/**
 * StudentHub - Authentication Guard & Session Security (Practical 10)
 * Handles session fixation prevention, session timeout, and Role-Based Access Control (RBAC).
 */

if (session_status() === PHP_SESSION_NONE) {
    // Harden session cookie parameters
    session_set_cookie_params([
        'lifetime' => 86400,
        'path'     => '/',
        'secure'   => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on',
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    session_start();
}

// Session timeout: 30 minutes of inactivity
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    header('Location: /login.php?error=Session+timed+out.+Please+log+in+again.');
    exit;
}
$_SESSION['LAST_ACTIVITY'] = time();

/**
 * Require a logged-in session with an optional specific role ('student' or 'admin')
 */
function requireAuth($requiredRole = null) {
    if (!isset($_SESSION['user_id'])) {
        header('Location: /login.php?error=Authentication+required.');
        exit;
    }

    if ($requiredRole !== null && (!isset($_SESSION['role']) || $_SESSION['role'] !== $requiredRole)) {
        http_response_code(403);
        echo "<h1>403 Forbidden</h1><p>Access denied. You do not have permissions for this resource.</p>";
        exit;
    }
}
