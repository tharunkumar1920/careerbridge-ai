# Skill Link — Frontend & Landing Page

> **"Your Skills. Your Goals. Your Future."**  
> A futuristic, minimal, 3D web application for **Skill Link** — an AI-powered continuous career intelligence platform connecting college students with personalized skill benchmarking, roadmaps, internships, and recruiters.

---

## 🚀 How to Run the Project

### Option 1: One-Click Run (Windows)
Double-click [`run.bat`](./run.bat) in the project folder.  
It will automatically check dependencies and launch the dev server in your default browser.

### Option 2: Using NPM (Terminal or Command Prompt)
Run the following command in the project directory:

```bash
npm start
```
*or:*
```bash
npm run dev
```

Both commands will start the Vite development server and automatically open the application at:
👉 **[http://localhost:5173/](http://localhost:5173/)**

### Option 3: PowerShell Script
```powershell
.\run.ps1
```

---

## 🛠️ Available Scripts

| Command | Action |
| :--- | :--- |
| `npm start` | Starts the Vite dev server and opens your browser directly |
| `npm run dev` | Starts the Vite dev server with network host access |
| `npm run build` | Builds production TypeScript bundle in `dist/` |
| `npm run preview` | Locally previews the production build |
| `npm run lint` | Runs oxlint checks |

---

## ✨ Features & Architecture

1. **Fixed Modern Header**:
   - Pinned at the top with the `Skill Link` brand logo on the left.
   - Quick-access `Log In` and `Sign In` action buttons on the right.
   - Frosted glass blur background (`backdrop-filter: blur(24px)`).

2. **Continuous 3D Spline Journey (Three.js)**:
   - A single glowing spline travels through all 6 chapters as you scroll.
   - Smooth camera tracking, traveler silhouette, energy pulse, and ambient particles.

3. **6 Story Chapters**:
   - **01 Hero**: Target path switcher and continuous system pillars.
   - **02 Ecosystem**: 7 connected ecosystem nodes with interactive node inspector.
   - **03 Career Intelligence**: Unified soft cyan (`#38BDF8`) skill gap analytics, live benchmarking, and sprint simulation.
   - **04 Learning Roadmap**: Interactive milestone timeline and AI Interview Simulator modal.
   - **05 Opportunity Intelligence**: Semantic vector match reasoning pipeline and active job cards.
   - **06 Horizon & CTA**: Student onboarding email form with celebratory confetti.

4. **Design Aesthetics**:
   - Apple × Linear dark glassmorphic interface (`#05070D` background, `rgba(10, 15, 29, 0.60)` frosted glass panels).
   - Space Grotesk + Inter typography.
   - Fully responsive for mobile, tablet, and desktop viewports.

---

## 📦 Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** (Fast Hot Module Replacement)
- **Three.js** (3D spline and camera animations)
- **Lucide React** (Minimal modern vector icons)
- **Canvas Confetti** (Interactive micro-celebrations)
