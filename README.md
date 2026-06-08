# 🗂️ Kanban Task Board

A responsive, drag-and-drop Kanban Board built with React 19, Tailwind CSS, and Bootstrap. Organize tasks visually across four workflow columns with real-time progress tracking, priority badges, and team member avatars.

---

## 🚀 Features

- **Drag & Drop** — Move tasks across columns using `@hello-pangea/dnd`; progress auto-updates on drop
- **4 Workflow Columns** — To-Do (25%) → In Progress (50%) → In Review (75%) → Completed (100%)
- **Add / Edit / Delete Tasks** — Modal form with full task details; three-dot dropdown for actions
- **Priority Badges** — Color-coded Low / Medium / High labels per task
- **Technology Tags** — Frontend / Backend / UI Design / QA / DevOps category chips
- **Progress Bar** — Animated gradient progress bar per card, synced with column status
- **Team Member Avatars** — Overlapping avatar stack showing assigned members per task
- **File & Message Count** — Displays attachment and comment counts on each card
- **Lottie Animation** — Live progress animation on in-progress cards; checkmark on completed
- **Toast Notifications** — Dark-themed react-toastify alerts for task actions
- **Tooltip on Description** — Hover to see full description text via Bootstrap Overlay
- **localStorage Persistence** — All task data retained across page refreshes
- **Responsive Design** — Single column on mobile, 2-column on tablet, 4-column on desktop

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React 19 | UI & Component Logic |
| Tailwind CSS 4 | Utility-first Styling |
| Bootstrap 5 + React Bootstrap | Cards, Dropdowns, Tooltips, ProgressBar |
| @hello-pangea/dnd | Drag and Drop |
| @lottiefiles/dotlottie-react | Lottie Animations |
| React Icons | Iconography |
| React Toastify | Toast Notifications |
| SweetAlert2 | Form Confirmation Dialogs |
| Vite | Build Tool |
| localStorage API | Client-side Data Persistence |

---

## 📁 Project Structure

```
kanban_board/
├── src/
│   ├── components/
│   │   ├── Home.jsx         # Main board layout, drag-drop context, 4 columns
│   │   ├── Home.css
│   │   ├── Cards.jsx        # Individual task card component
│   │   ├── Cards.css
│   │   ├── TaskForm.jsx     # Add / Edit task modal form
│   │   ├── TaskForm.css
│   │   └── Toaster.jsx      # Toast notification component
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── index.html
```

---

## ⚙️ How It Works

1. Click **Add Task** in any column to open the modal form
2. Fill in project name, description, priority, technology, team members, and files
3. Task appears in the selected column with auto-set progress (25% for To-Do)
4. **Drag a card** to another column — progress updates automatically:
   - To-Do → 25% | In Progress → 50% | In Review → 75% | Completed → 100%
5. Use the **three-dot menu** on any card to Edit or Delete
6. All changes persist in `localStorage`

---

## 📱 Responsive Behavior

| Screen | Layout |
|---|---|
| Desktop (>1024px) | 4-column grid |
| Tablet (768–780px) | 2-column grid |
| Mobile (<480px) | Single column, scrollable modal |

---

## 🔧 Setup & Run

```bash
git clone https://github.com/your-username/kanban-board.git
cd kanban-board
npm install
npm run dev
```

**Build & Deploy to GitHub Pages:**
```bash
npm run deploy
```

---

## 🎨 Color Palette

| Role | Color |
|---|---|
| Primary Accent | `#4F46E5` (Indigo) |
| Column Background | `#F2F2F2` |
| Progress Bar | `#17C6C1 → #3f27f2` |
| High Priority | `#F41919` |
| Medium Priority | `Orange` |
| Low Priority | `#0202DF` |

---

## 🙋‍♂️ Author

**Arun Prasath**  
Software Developer

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
