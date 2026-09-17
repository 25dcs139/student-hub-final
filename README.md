# STUDENTHUB – Modern College Student Portal

> **A Comprehensive, Semester-Long College Web Development Project**  
> Built progressively across all 12 college practicals into **ONE single, professional, fully functional StudentHub portal**.

---

## 🏛️ Project Foundation & Overview (Practical 1)

StudentHub is a unified academic and student life management portal designed for college campuses. It unifies public university exploration, secure role-based student services, and comprehensive administrative oversight into a cohesive web application.

### Key Highlights
- **Single Cohesive Portal:** No separated or fragmented practical sites. Every practical adds functionality to the exact same StudentHub platform.
- **Dual-Mode Compatibility:** 
  1. **Production-Ready Live Application:** Fully interactive in modern environments with dynamic state persistence, real-time client-side search/filter/sort, live CRUD management, responsive UI, dark/light mode, and mock/API fetch layers.
  2. **XAMPP / PHP / MySQL Ready:** Pre-configured with normalized `studenthub.sql` database schema, PDO-based `db.php`, secure password hashing (`password_hash()`), sessions (`session_regenerate_id()`), and prepared statements for deployment in `xampp/htdocs/studenthub/`.

---

## 👥 User Roles & Permissions Matrix

| Role | Access Scope | Capabilities |
| :--- | :--- | :--- |
| **Public Visitor (Guest)** | Home, About, Events, FAQ, Contact, Login, Register | Browse campus highlights, view upcoming events, inspect FAQ knowledge base, submit contact inquiries, register for an account. |
| **Student** | Student Dashboard, My Profile, Events (RSVP/Register), Feedback, Notifications | View personalized academic statistics, manage profile and technical skills, RSVP to events, view notification alerts, submit feedback. |
| **Administrator** | Admin Dashboard, Student CRUD, Event CRUD, System Stats, XAMPP / PHP Package | Full CRUD on students (search, filter, pagination, add, edit, delete), full CRUD on events with poster upload validation, oversee system metrics. |

---

## 🗺️ Complete Application Sitemap

```text
STUDENTHUB
│
├── 🌐 Public Pages
│   ├── Home (Hero, features, upcoming events, portal statistics, footer)
│   ├── About (Mission, vision, semester practical breakdown, sitemap)
│   ├── Events (Live search, multi-category filter, sort, modal details, RSVP)
│   ├── FAQ (Interactive accordion, category tabs, instant search)
│   └── Contact (Campus office directory, contact form with validation)
│
├── 🔐 Authentication (Practicals 5, 9, 10)
│   ├── Register (Comprehensive client/server validation, password meter)
│   ├── Login (Role-based authentication: Student vs. Admin)
│   └── Logout (Session destruction, safe redirection)
│
├── 🎓 Student Portal (Authenticated)
│   ├── Student Dashboard (Welcome banner, academic stats, quick actions, RSVP tickets)
│   ├── My Profile (Academic details, GPA, skills tags, profile editing)
│   └── Submit Feedback (Course ratings, categories, message validation)
│
└── 🛡️ Admin Portal (Authenticated Administrator)
    ├── Admin Dashboard (Live metrics: Total students, events, feedback count)
    ├── Student Management CRUD (Search, course filter, pagination, Add/Edit/Delete)
    ├── Event Management CRUD (Add/Edit/Delete, poster upload, sync with Student Events)
    └── PHP & MySQL Package (studenthub.sql, db.php, schema export for XAMPP)
```

---

## 📚 12 Practicals Progressive Syllabus Alignment

1. **Practical 1 – Project Foundation:** Sitemap, user roles, system architecture, Git repository structure, README documentation.
2. **Practical 2 – Semantic HTML5:** Semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), accessible form controls, labels, and skip-to-content links.
3. **Practical 3 – Responsive UI:** Fluid layouts using CSS Grid, Flexbox, media queries for mobile, tablet, and desktop breakpoints, and unified design tokens.
4. **Practical 4 – JavaScript Interactivity:** Mobile hamburger navigation, dark/light theme toggle with `localStorage` persistence, accordion interactions, event detail modals, and toast notifications.
5. **Practical 5 – Registration Validation:** Regex validation for institutional email and 10-digit mobile, dynamic password strength meter, confirm password match, and accessible error states.
6. **Practical 6 – Fetch API + JSON:** Fetching structured JSON collections (`data/events.json`, `data/students.json`, `data/faqs.json`) with loading indicators, empty states, search, filtering, and pagination.
7. **Practical 7 – PHP Form Processing:** Server-side POST data sanitization (`htmlspecialchars`, `filter_var`), input trimming, error handling, and file uploads.
8. **Practical 8 – MySQL Database:** Normalized relational schema (`studenthub.sql`) with tables: `users`, `students`, `events`, `registrations`, `feedback`, `contacts`, and secure PDO connection (`db.php`).
9. **Practical 9 – Secure Registration:** Inserting student accounts with `password_hash(..., PASSWORD_DEFAULT)`, unique email constraint checks, and prepared queries.
10. **Practical 10 – Authentication & RBAC:** Session management, `session_regenerate_id()`, timeout protection, and role-based route gating (`student` vs `admin`).
11. **Practical 11 – Student Management CRUD:** Admin portal with Create, Read, Update, Delete for students, plus search, filter, and pagination.
12. **Practical 12 – Event Management CRUD:** Admin portal with Create, Read, Update, Delete for events, poster upload validation, and instant live sync to the Student Events page.

---

## 💻 Local Setup in XAMPP

1. Download or copy the project files to your local XAMPP web root:
   ```text
   C:/xampp/htdocs/studenthub/
   ```
2. Start **Apache** and **MySQL** in the XAMPP Control Panel.
3. Open `http://localhost/phpmyadmin` in your browser.
4. Create a new database named `studenthub`.
5. Import `studenthub.sql` into the `studenthub` database.
6. Verify your credentials in `includes/db.php` (Default: Host `localhost`, User `root`, Password ``).
7. Access the application in your browser at:
   ```text
   http://localhost/studenthub/
   ```
