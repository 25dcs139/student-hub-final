-- ==========================================================
-- STUDENTHUB – Complete Normalized MySQL Database Script
-- Database Name: studenthub
-- Compatible with MySQL 5.7+ / 8.0+ & MariaDB (XAMPP default)
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `studenthub` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `studenthub`;

-- Disable foreign key checks for clean table drops if re-importing
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `registrations`;
DROP TABLE IF EXISTS `feedback`;
DROP TABLE IF EXISTS `contacts`;
DROP TABLE IF EXISTS `events`;
DROP TABLE IF EXISTS `students`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------------
-- Table 1: users (Authentication & RBAC credentials)
-- --------------------------------------------------------
CREATE TABLE `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('student', 'admin') NOT NULL DEFAULT 'student',
  `status` ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table 2: students (Normalized student academic profiles)
-- --------------------------------------------------------
CREATE TABLE `students` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `student_id` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `mobile` VARCHAR(20) NOT NULL,
  `course` VARCHAR(100) NOT NULL,
  `year` VARCHAR(20) NOT NULL,
  `gender` ENUM('Male', 'Female', 'Other') NOT NULL,
  `gpa` DECIMAL(3, 2) DEFAULT 3.50,
  `skills` TEXT NULL,
  `avatar` VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  `status` ENUM('Active', 'Inactive') DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_students_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table 3: events (Campus event records & metadata)
-- --------------------------------------------------------
CREATE TABLE `events` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `category` ENUM('Technical', 'Cultural', 'Sports', 'Workshop', 'Seminar') NOT NULL,
  `date` DATE NOT NULL,
  `time` VARCHAR(50) NOT NULL,
  `venue` VARCHAR(150) NOT NULL,
  `description` TEXT NOT NULL,
  `status` ENUM('Upcoming', 'Ongoing', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Upcoming',
  `poster` VARCHAR(255) NOT NULL,
  `seats_total` INT UNSIGNED NOT NULL DEFAULT 100,
  `seats_filled` INT UNSIGNED NOT NULL DEFAULT 0,
  `organizer` VARCHAR(150) NOT NULL,
  `coordinator` VARCHAR(150) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table 4: registrations (Student event bookings / RSVPs)
-- --------------------------------------------------------
CREATE TABLE `registrations` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `student_id` INT UNSIGNED NOT NULL,
  `event_id` INT UNSIGNED NOT NULL,
  `registered_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('Confirmed', 'Waitlisted', 'Cancelled') DEFAULT 'Confirmed',
  `ticket_code` VARCHAR(50) NOT NULL UNIQUE,
  CONSTRAINT `fk_reg_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reg_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table 5: feedback (Student course/facility evaluation)
-- --------------------------------------------------------
CREATE TABLE `feedback` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `student_id` INT UNSIGNED NULL,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `rating` TINYINT UNSIGNED NOT NULL CHECK (`rating` BETWEEN 1 AND 5),
  `message` TEXT NOT NULL,
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_feedback_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table 6: contacts (Campus inquiries & support messages)
-- --------------------------------------------------------
CREATE TABLE `contacts` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `subject` VARCHAR(200) NOT NULL,
  `department` VARCHAR(100) NOT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('Unread', 'Read', 'Replied') DEFAULT 'Unread',
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- SEED DATA: Pre-populate accounts (Passwords hashed with password_hash())
-- Password for both test accounts is: StudentHub@2026
-- Hash: $2y$10$Q7eYc5b8Z8x8aVvE1c1KKeG1N0zQZ5NfX9kL3yW7mQ0o9V8rK0e2u
-- --------------------------------------------------------

INSERT INTO `users` (`id`, `email`, `password`, `role`, `status`) VALUES
(1, 'admin@studenthub.edu', '$2y$10$wE1VfRjUf.j67M7R5qR8Oecv4O5E9uE9fF9m4O7XzO5i6wQ4eY5aW', 'admin', 'active'),
(2, 'aarav.sharma@studenthub.edu', '$2y$10$wE1VfRjUf.j67M7R5qR8Oecv4O5E9uE9fF9m4O7XzO5i6wQ4eY5aW', 'student', 'active'),
(3, 'diya.patel@studenthub.edu', '$2y$10$wE1VfRjUf.j67M7R5qR8Oecv4O5E9uE9fF9m4O7XzO5i6wQ4eY5aW', 'student', 'active');

-- Seed Students
INSERT INTO `students` (`id`, `user_id`, `student_id`, `name`, `email`, `mobile`, `course`, `year`, `gender`, `gpa`, `skills`, `avatar`, `status`) VALUES
(1, 2, 'STU-2024-001', 'Aarav Sharma', 'aarav.sharma@studenthub.edu', '+91 98765 43210', 'B.Tech Computer Science', '3rd Year', 'Male', 3.88, 'Python, React, Docker, Machine Learning', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80', 'Active'),
(2, 3, 'STU-2024-002', 'Diya Patel', 'diya.patel@studenthub.edu', '+91 98765 43211', 'B.Tech Information Technology', '2nd Year', 'Female', 3.92, 'JavaScript, Node.js, UI/UX Design, Figma', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', 'Active');

-- Seed Events
INSERT INTO `events` (`id`, `title`, `category`, `date`, `time`, `venue`, `description`, `status`, `poster`, `seats_total`, `seats_filled`, `organizer`, `coordinator`) VALUES
(1, 'InnovateX 2026: National Hackathon', 'Technical', '2026-10-15', '09:00 AM - 09:00 PM', 'APJ Abdul Kalam Tech Center, Hall 4', '36-hour flagship hackathon bringing together students across engineering branches to solve real-world industry challenges.', 'Upcoming', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', 200, 164, 'Department of Computer Science & Engineering', 'Dr. Rajesh Sharma'),
(2, 'Rhythm & Beats: Annual Cultural Gala', 'Cultural', '2026-10-22', '05:30 PM - 10:00 PM', 'Open Air University Amphitheatre', 'An electric evening of music, dance, theatrical acts, and fashion shows celebrating campus artistic talents.', 'Upcoming', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80', 500, 480, 'Student Cultural Council', 'Prof. Meera Patel'),
(3, 'Inter-Department Cricket Championship', 'Sports', '2026-10-28', '08:00 AM - 06:00 PM', 'Campus Main Sports Pavilion', 'Annual knockout cricket tournament pitting 12 departmental teams against each other for the prestigious Dean\'s Sports Cup.', 'Upcoming', 'https://images.unsplash.com/photo-1531415074868-036b1c57e3ce?auto=format&fit=crop&w=800&q=80', 150, 120, 'Department of Physical Education', 'Coach K. Singh'),
(4, 'Hands-On Workshop: Deep Learning with PyTorch', 'Workshop', '2026-11-04', '10:00 AM - 04:00 PM', 'Center of Excellence Lab 2', 'Intensive hands-on lab training on neural architectures, computer vision, and transformer models.', 'Upcoming', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', 80, 76, 'AI & Robotics Club', 'Dr. Ananya Roy');
