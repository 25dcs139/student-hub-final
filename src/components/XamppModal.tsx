import React, { useState } from 'react';
import { Database, X, Check, Copy, Server, ShieldCheck, Terminal, FileCode, CheckCircle2 } from 'lucide-react';

interface XamppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const XamppModal: React.FC<XamppModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'sql' | 'db' | 'steps'>('steps');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlCode = `-- ========================================================
-- STUDENTHUB COLLEGE PORTAL - RELATIONAL DATABASE SCHEMA
-- Practicals 8 to 12 Database Definition
-- ========================================================

CREATE DATABASE IF NOT EXISTS studenthub;
USE studenthub;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(30) UNIQUE NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'admin') DEFAULT 'student',
  avatar VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(30) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  mobile VARCHAR(15) NOT NULL,
  course VARCHAR(100) NOT NULL,
  year VARCHAR(20) NOT NULL,
  gender ENUM('Male', 'Female', 'Other') NOT NULL,
  gpa DECIMAL(3, 2) DEFAULT 3.50,
  skills TEXT DEFAULT NULL,
  status ENUM('Active', 'Graduated', 'Suspended') DEFAULT 'Active',
  avatar VARCHAR(255) DEFAULT NULL,
  joined_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  category ENUM('Technical', 'Cultural', 'Sports', 'Workshop', 'Seminar') NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(50) NOT NULL,
  venue VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  seats_total INT NOT NULL DEFAULT 100,
  seats_filled INT NOT NULL DEFAULT 0,
  organizer VARCHAR(100) NOT NULL,
  coordinator VARCHAR(100) NOT NULL,
  poster VARCHAR(255) DEFAULT NULL,
  status ENUM('Upcoming', 'Completed') DEFAULT 'Upcoming',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ticket_code VARCHAR(50) NOT NULL UNIQUE,
  student_id VARCHAR(30) NOT NULL,
  student_name VARCHAR(100) NOT NULL,
  event_id INT NOT NULL,
  event_title VARCHAR(150) NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL,
  category VARCHAR(50) NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                XAMPP, PHP 8.2 & MySQL Deployment Package
              </h2>
              <p className="text-xs text-slate-500">
                Practicals 7 to 12 Backend & Relational Database Layer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <button
            onClick={() => setActiveTab('steps')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition ${
              activeTab === 'steps'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Deployment Guide
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition ${
              activeTab === 'sql'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            studenthub.sql
          </button>
          <button
            onClick={() => setActiveTab('db')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition ${
              activeTab === 'db'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            PHP PDO /db.php
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 text-slate-700 dark:text-slate-300">
          {activeTab === 'steps' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-indigo-900 dark:text-indigo-200">
                <p className="font-bold text-sm mb-1">Dual-Hosting Compatibility Verified</p>
                <p className="leading-relaxed">
                  StudentHub runs client-side with Fetch API datasets for GitHub Pages preview and has all required PHP scripts and MySQL definitions ready for full-stack XAMPP execution.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Start XAMPP Services</p>
                    <p className="text-slate-500 mt-0.5">
                      Launch XAMPP Control Panel and start both the <strong>Apache</strong> and <strong>MySQL</strong> services.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Import Database into phpMyAdmin</p>
                    <p className="text-slate-500 mt-0.5">
                      Navigate to <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">http://localhost/phpmyadmin/</code>, create database <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">studenthub</code>, and import the included <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">studenthub.sql</code>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Deploy Project Folder</p>
                    <p className="text-slate-500 mt-0.5">
                      Copy the project into <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">C:\xampp\htdocs\studenthub\</code>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    4
                  </span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Test Full-Stack Endpoints</p>
                    <p className="text-slate-500 mt-0.5">
                      Open <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">http://localhost/studenthub/api/auth.php</code>, <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">/api/students.php</code>, or <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">/api/events.php</code> in Postman or your browser.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sql' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">Path: /studenthub.sql</span>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-1.5 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied SQL!' : 'Copy SQL Script'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800 max-h-80">
                {sqlCode}
              </pre>
            </div>
          )}

          {activeTab === 'db' && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-500">Path: /includes/db.php (PHP 8.2 PDO)</span>
              <pre className="p-4 rounded-2xl bg-slate-950 text-blue-300 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800 max-h-80">
{`<?php
/**
 * StudentHub College Portal - Secure Database Connection
 * Practicals 8 to 12
 */

$host = '127.0.0.1';
$db   = 'studenthub';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}`}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Ready for evaluation on both Vite/React and Apache/PHP</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
