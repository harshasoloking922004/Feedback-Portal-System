# 🏥 Hospital Patient Queue Management System

A full-stack web application designed to efficiently manage patient queues in a hospital setting. The system leverages a **Priority Queue Algorithm (Max-Heap)** to prioritize patients based on the severity of their condition. In scenarios where multiple patients have the same priority level, a **First-In-First-Out (FIFO)** approach is used to ensure fairness based on arrival time.

---

## 🌟 Features

- **Dynamic Patient Registration:** Easily register new patients with details like Name, Age, Problem, and Priority Level.
- **Automated Prioritization:** Automatically sorts patients based on a 4-tier urgency system (Low, Medium, High, Emergency).
- **Smart Queue Algorithm:** Built-in Max-Heap logic ensures critical patients are served first without manual intervention.
- **Real-Time Queue Display:** View the active waiting queue in a clean, modern, and responsive UI.
- **Emergency Highlights:** Critical (Level 4) patients are highlighted and animated to ensure they are immediately noticeable.
- **"Call Next" Functionality:** One-click mechanism to dequeue the highest-priority patient and update their status to "served".

---

## 💻 Technologies Used

**Frontend:**
- HTML5
- CSS3 (Custom CSS variables, Animations, Flexbox/Grid)
- Vanilla JavaScript (ES6, Fetch API)

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose (Database & ODM)

**Algorithm:**
- Custom Data Structures (Max-Heap Priority Queue)

---

## ⚙️ Algorithm Explanation (Priority Queue)

This project implements a **Max-Heap Data Structure** to manage the queue efficiently. 

1. **Heap Properties:** A binary tree structure where the parent node always has a higher (or equal) priority than its child nodes.
2. **Insertion (`enqueue`):** When a new patient arrives, they are inserted at the end of the heap. The tree then performs a `heapifyUp` operation, swapping the new patient with its parent until the heap property is restored.
3. **Extraction (`dequeue`):** When the "Call Next Patient" button is pressed, the root node (highest priority patient) is extracted. The last element in the heap is moved to the root, and a `heapifyDown` operation ensures the tree is re-balanced.
4. **Tie-Breaking:** If two patients have the **exact same priority level**, the algorithm falls back to comparing their `createdAt` timestamps, meaning the patient who arrived earlier gets served first (**FIFO**).

---

## 📂 Project Structure

```text
hospital-queue-system/
├── backend/
│   ├── controllers/
│   │   └── patientController.js
│   ├── models/
│   │   └── Patient.js
│   ├── routes/
│   │   └── patientRoutes.js
│   └── utils/
│       └── PriorityQueue.js
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── .env
├── package.json
└── server.js
```

---

## 🛠️ Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/hospital-queue-system.git
   cd hospital-queue-system
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Ensure MongoDB is installed and running** on your local machine (default port `27017`).

4. **Environment Variables:**
   A `.env` file is already included, but you can configure it if necessary:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/hospital-queue
   ```

---

## 🚀 How to Run the Project

1. Start the Express server:
   ```bash
   npm start
   ```
2. Open your web browser and navigate to the local server:
   👉 **http://localhost:5000**
3. Start registering patients and experience the Priority Queue in action!

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/patients/add` | Register a new patient and add to the queue |
| `GET`  | `/api/patients/queue` | Fetch all waiting patients, sorted by the Priority Queue |
| `POST` | `/api/patients/serve` | Dequeue the highest-priority patient and mark as served |
| `GET`  | `/api/patients/served`| Get a list of all previously served patients |

---

## 📸 Screenshots

*(Add your screenshots here)*

**1. Dashboard & Registration Form:**
`[Screenshot Placeholder]`

**2. Active Queue Display (with Emergency Highlights):**
`[Screenshot Placeholder]`

**3. "Currently Serving" Alert:**
`[Screenshot Placeholder]`

---

## 🔮 Future Enhancements

- [ ] **Doctor Dashboards:** Create separate logins for doctors to view their individual assigned patients.
- [ ] **Authentication:** Implement JWT-based login for hospital staff.
- [ ] **SMS Notifications:** Send automated SMS to patients when it is their turn using Twilio API.
- [ ] **Data Analytics:** Add a dashboard showing statistics (e.g., average waiting time, patients served per day).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
