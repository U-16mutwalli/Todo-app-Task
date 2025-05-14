📝 Todo App - Task Manager

A fully-featured, responsive Task Management web application that allows users to create, edit, delete, and organize their tasks using drag-and-drop. All task data is persisted using "localStorage", and users receive toast notifications for feedback on their actions.


✅ Task Creation:
  Create tasks by entering a title, description, and due date. Each task is stored in the browser’s localStorage and rendered in the Incomplete Tasks section.

📋 Task Listing:
  All tasks are listed under either the **Incomplete Tasks** or **Completed Tasks** sections based on their current status. Tasks persist after page reloads.

✏️ Edit Task:
  Easily edit existing tasks. When editing, the title, description, and due date fields are pre-filled. Tasks are updated cleanly without duplication.

🗑️ Delete Task:
  Instantly remove tasks. Deletion updates both the UI and localStorage.

🔁 Drag and Drop:
  Seamlessly drag tasks between the Incomplete and Completed lists. Task status is updated accordingly, and the order is saved.

💾 Persistent Storage:
  All tasks and their statuses are saved using `localStorage`, so nothing is lost on reload.

🔔 Toast Notifications:
  Get immediate feedback for actions such as task creation, update, deletion, and drag-drop reordering with toast messages.

📂 File Structure

├── index.html
├── styles.css
├── script.js
└── README.md


📦 Getting Started
To run the app locally in Visual Studio Code:

1] Install the Live Server extension in VS Code (if not already installed)

2] Right-click on index.html and select "Open with Live Server"


🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript
* localStorage

📌 Future Improvements

* Add task category/tags
* Search and filter functionality
* User authentication for multi-user support
* Task prioritization levels


