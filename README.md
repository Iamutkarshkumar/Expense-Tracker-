# 💰 Expense Tracker — Frontend

A full-featured, responsive expense management application built with **React 19** and **Redux Toolkit**. Users can securely sign up, log in, and manage their daily expenses with a clean, animated UI deployed on Vercel.

🔗 **Live Demo:** [expense-tracker-plum-three-83.vercel.app](https://expense-tracker-plum-three-83.vercel.app)  
🔗 **Backend Repo:** [github.com/Iamutkarshkumar/Expense-Tracker-Backend](https://github.com/Iamutkarshkumar/Expense-Tracker-Backend)

---

## ✨ Features

- 🔐 **Authentication** — JWT-based login and signup with protected routes
- ➕ **Expense CRUD** — Add, edit, delete, and mark expenses as done/undone
- 🗂️ **Category Filtering** — Filter expenses by category in real time
- 🗃️ **Persistent State** — Redux Persist keeps user session alive across page reloads
- 🔔 **Toast Notifications** — Real-time feedback via Sonner
- 🎨 **Animated Background** — Custom canvas-based ambient animation on auth pages
- 📱 **Fully Responsive** — Works seamlessly across desktop and mobile
- 🌙 **Theme Support** — Dark/light mode via `next-themes`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Styling | Tailwind CSS v4, shadcn/ui components |
| State Management | Redux Toolkit + Redux Persist |
| Routing | React Router DOM v7 |
| HTTP Client | Axios |
| Notifications | Sonner |
| Icons | Lucide React |
| Build Tool | Vite 7 |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── shared/
│   │   ├── AnimatedBackground.jsx   # Canvas particle animation
│   │   └── Logo.jsx
│   └── ui/
│       ├── Home.jsx                 # Main dashboard
│       ├── Navbar.jsx               # Responsive top nav
│       ├── CreateExpense.jsx        # Add expense modal/form
│       ├── UpdateExpense.jsx        # Edit expense modal/form
│       ├── ExpenseTable.jsx         # Expense list with filters
│       ├── Login.jsx
│       └── Signup.jsx
├── hooks/
│   └── useGetExpenses.jsx           # Custom hook for fetching expenses
├── redux/
│   ├── store.js                     # Redux store with persist config
│   ├── authSlice.js                 # Auth state (user, token)
│   └── expenseSlice.js              # Expense state
└── App.jsx                          # Routes and layout
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- Backend server running (see [backend repo]([https://github.com/your-username/Expense-Tracker-Backend](https://github.com/Iamutkarshkumar/Expense-Tracker-Backend)))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/Expense-Tracker.git
cd Expense-Tracker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your backend URL

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000
```

For production, set this to your deployed backend URL.

---

## 🚀 Deployment

The app is deployed on **Vercel** with a `vercel.json` configuration that redirects all routes to `index.html` for client-side routing support.

```bash
npm run build   # Build for production
npm run preview # Preview production build locally
```

---

## 🔗 API Integration

All API calls go through Axios with credentials (`withCredentials: true`) for cookie-based JWT authentication. The base URL is configured via `VITE_API_URL`.

Key endpoints consumed:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/user/register` | Sign up |
| POST | `/api/v1/user/login` | Log in |
| GET | `/api/v1/expense/getall` | Fetch all expenses |
| POST | `/api/v1/expense/add` | Add expense |
| PUT | `/api/v1/expense/update/:id` | Update expense |
| DELETE | `/api/v1/expense/remove/:id` | Delete expense |
| PUT | `/api/v1/expense/:id/done` | Toggle done status |

---

## 👨‍💻 Author

**Utkarsh Kumar** — B.Tech CSAI, NSUT  

⭐ If you found this useful, please star the repo!
