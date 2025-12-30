# Smart Issue Board

A simple and efficient issue tracking web application built as part of an internship assignment.  
The application allows users to create, track, and manage issues with defined status rules and basic duplicate detection.

---

## 🔗 Live Demo
👉 (Add your Vercel deployment link here)

---

## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **Backend & Database:** Firebase Firestore
- **Authentication:** Firebase Authentication (Email & Password)
- **Hosting:** Vercel
- **Version Control:** Git & GitHub

### Why this stack?
React was chosen for its component-based architecture and fast development experience.  
Firebase provides a quick and reliable backend solution with built-in authentication and real-time database support, making it ideal for rapid prototyping and small-to-medium applications.

---

## 🔐 Authentication

- Users can **sign up** and **log in** using email and password.
- Authentication is handled securely using **Firebase Auth**.
- The logged-in user’s email is displayed on the dashboard.

---

## 🧩 Core Features

### 1. Create Issues
Each issue contains:
- Title
- Description
- Priority (Low / Medium / High)
- Status (Open / In Progress / Done)
- Assigned To (user email)
- Created By (user email)
- Created At (timestamp)

---

### 2. Issue Listing
- All issues are displayed on the dashboard.
- Issues update in real-time using Firestore listeners.
- Users can filter issues by:
  - Status
  - Priority
- Default order shows the most recent issues first.

---

### 3. Similar Issue Handling
When creating a new issue:
- Existing issue titles are checked for similarity.
- If a similar issue exists, the user is shown a warning and asked for confirmation.
- This helps reduce duplicate issue creation.

---

### 4. Status Rules
- An issue **cannot move directly from Open to Done**.
- The correct flow is:
