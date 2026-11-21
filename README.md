# STUDENTVERSE 🌌 — Next-Generation 3D Student Learning Platform & Digital Whiteboard

> A futuristic, immersive, fully responsive 3D educational universe and digital classroom whiteboard engineered with React 18, React Three Fiber v8, Three.js, Tailwind CSS, Recharts, and FastAPI.

---

## 🚀 Live Overview & Core Features

### 1. 🎨 Interactive Digital Classroom Whiteboard (`/whiteboard`)
- **Interactive Multi-Tool Canvas**: Full HTML5 Canvas engine with Retina High-DPI anti-aliasing and coordinate transformation matrix.
  - **Drawing Tools**: Smooth freehand Pen, translucent glowing Highlighter, precision Eraser, Straight Line, Vector Arrow, Rectangle, Circle/Ellipse, Text notes, and Teacher Laser Pointer.
  - **Color & Size Palettes**: Preset cyber palettes (Cyan, Purple, Blue, Emerald, Amber, Rose, White, Dark) + custom Hex color picker. Variable brush thickness (2px, 4px, 8px, 14px, 24px).
  - **Dynamic Backgrounds**: Engineering Grid, Math Dots Matrix, Notebook Ruled lines (with margin guide), Clean Whiteboard, and Cyber Blueprint.
  - **Camera Controls**: Zoom in/out (35% to 350%), Pan offset (Space + Drag, Middle Mouse Click), Reset to 100%.
  - **Multi-Page Lecturing**: Page indicator, Previous / Next page, Add new page, Delete page.
  - **Presentation & Laser Pointer**: Glowing cyber red laser pointer with decaying light trail that automatically vanishes after 700ms.
  - **Mathematical Toolkit Modal**:
    - **Formula Vault**: One-click stamps for Quantum state superposition ($|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$), Hadamard gate matrix ($H = \frac{1}{\sqrt{2}}[[1,1],[1,-1]]$), Euler's identity ($e^{i\pi}+1=0$), Schrödinger wave equation, Softmax probabilities, and integrals.
    - **Scientific Calculator**: Built-in interactive calculator to evaluate trigonometry, square roots, and basic math with "Stamp on Whiteboard" action.
    - **Cartesian Coordinate Grid Generator**: Stamped calibrated X and Y axes with origin $(0, 0)$ and directional arrowheads.
    - **Geometry Templates**: Right triangle, equilateral triangle, 3D cylinder, and wireframe cube.
  - **Classroom Collaboration Mode**:
    - Generates 6-digit session code (e.g. `SV-9412`).
    - Copy student invitation link (`http://localhost:3000/whiteboard?room=SV-9412&role=student`).
    - Teacher Presentation Mode vs Student Viewing Mode.
    - Teacher permission toggle: "Allow Student Drawing Collaboration" (Read-only vs Collaborative).
    - Multi-client WebSocket synchronization via FastAPI backend (`ws://localhost:8000/ws/classroom/{room_id}`).
  - **Vault & Storage**:
    - Save boards locally with custom titles.
    - Reopen previous boards, rename, delete, or create fresh blank boards.
    - Export as High-Resolution PNG, Export as JSON archive, or Print / PDF.

---

### 2. 🤖 AI Neural Tutor Studio (`/ai-tutor`)
- **Manual Question Input**: Ask any question in natural language, math, or code and receive instantaneous explanations.
- **FastAPI Neural Backend**: Real-time communication with the FastAPI `POST /api/ai/tutor` endpoint with support for Google Gemini API key linking (`AIzaSy...`) or simulated pedagogy core.
- **Discipline Selector**: Quantum Computing, Neural Architectures, 3D WebGL Shaders, Systems & Rust, Zero-Knowledge Web3, and Robotics.

---

### 3. 🪐 3D Hero Experience (`/`)
- **Interactive 3D Neural Sphere**: Central procedural core with holographic icosahedron wireframe, atmospheric glow, and orbiting quantum satellites.
- **Orbital Gimbal Rings**: Dual counter-rotating inclination rings with emissive beacons and orbital tracking.
- **Starfield Particle Matrix**: Over 750 additive-blended quantum particles drifting across 3D space.

---

### 4. 📊 Student Dashboard (`/dashboard`)
- **AreaChart (Recharts)**: Plots weekly study hours against targets with custom cyan and purple glow gradients.
- **BarChart (Recharts)**: Visualizes daily XP velocity and weekly totals.
- **Upcoming Deadlines & Audit Stream**: Chronological feed recording course enrollments, lab submissions, and achievements.

---

### 5. 📚 Course Catalog (`/courses`), 📅 Planner (`/planner`), 📝 Assignments (`/assignments`), 🏆 Achievements (`/achievements`), 👤 Profile (`/profile`).

---

## 🛠️ Technology Stack & Versions

- **Frontend Framework**: React 18 (`react@^18.3.1`, `react-dom@^18.3.1`)
- **Bundler & Tooling**: Vite 5 (`vite@^5.4.10`)
- **3D Graphics Engine**: Three.js (`three@^0.160.0`)
- **React 3D Integrations**:
  - `@react-three/fiber@^8.17.10` (R3F v8 strictly compliant with React 18)
  - `@react-three/drei@^9.102.6` (Drei v9 compatible with R3F v8)
- **Styling**: Tailwind CSS v3 with custom futuristic theme and glassmorphism.
- **Whiteboard Engine**: HTML5 Canvas 2D API with Retina High-DPI scaling, Bezier stroke rendering, matrix transforms, and laser pointer loop.
- **Backend**: FastAPI 0.165 with Python 3.12, Uvicorn, and native WebSockets.

---

## ⚡ Running the Services

```bash
# 1. Frontend Development Server (Port 3000)
npm run dev

# 2. FastAPI Backend Server (Port 8000)
cd backend && .venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
```
