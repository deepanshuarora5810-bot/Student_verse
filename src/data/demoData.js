export const INITIAL_STUDENT = {
  name: "Alex Mercer",
  handle: "@alexmercer",
  email: "alex.mercer@studentverse.io",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  major: "Quantum Computing & Neural Systems",
  university: "Neo-Kyoto Institute of Advanced Technology",
  level: 7,
  title: "Senior Cyber-Scholar",
  xp: 4850,
  xpToNextLevel: 6000,
  streak: 14,
  studyHours: 187.5,
  overallProgress: 78,
  bio: "Engineering real-time neural interfaces and distributed quantum algorithms. Avid WebGL explorer, procedural graphics developer, and open-source contributor.",
  location: "Sector 07 // Neo-Kyoto",
  joinedDate: "September 2025",
  socials: {
    github: "github.com/alex-mercer-ai",
    twitter: "@alex_quantum",
    linkedin: "linkedin.com/in/alex-mercer-tech"
  }
};

export const INITIAL_SKILLS = [
  { name: "Quantum Circuit Design", level: 88, category: "Quantum" },
  { name: "Neural Networks & LLMs", level: 94, category: "AI & Data" },
  { name: "Three.js & WebGL Shaders", level: 91, category: "Creative Dev" },
  { name: "Rust & Distributed Systems", level: 82, category: "Systems" },
  { name: "Zero-Knowledge Cryptography", level: 78, category: "Web3" },
  { name: "Brain-Computer Interfacing (BCI)", level: 85, category: "Neural UX" }
];

export const INITIAL_COURSES = [
  {
    id: "crs-101",
    title: "Quantum Computing & Qubit Algorithms",
    category: "Quantum",
    instructor: {
      name: "Dr. Elena Rostova",
      role: "Lead Quantum Researcher",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    rating: 4.95,
    studentsCount: 2480,
    duration: "12 Weeks • 48 Hours",
    level: "Advanced",
    enrolled: true,
    progress: 82,
    description: "Master superposition, quantum entanglement, Shor's algorithm, and quantum circuit simulations using modern SDKs.",
    color: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.4)",
    badge: "Bestseller",
    modulesCount: 8,
    completedModules: 6,
    syllabus: [
      { id: 1, title: "Linear Algebra & Quantum Mechanics Foundations", duration: "4h 20m", completed: true },
      { id: 2, title: "Single and Multi-Qubit Logic Gates", duration: "5h 10m", completed: true },
      { id: 3, title: "Bell States and Quantum Teleportation Protocol", duration: "6h 00m", completed: true },
      { id: 4, title: "Deutsch-Jozsa and Grover Search Algorithms", duration: "6h 30m", completed: true },
      { id: 5, title: "Quantum Error Mitigation and Noise Resilience", duration: "5h 45m", completed: true },
      { id: 6, title: "Variational Quantum Eigensolvers (VQE)", duration: "7h 15m", completed: true },
      { id: 7, title: "Quantum Supremacy & Hardware Architectures", duration: "6h 40m", completed: false },
      { id: 8, title: "Capstone: Simulating Quantum Molecular Bonds", duration: "7h 00m", completed: false }
    ]
  },
  {
    id: "crs-102",
    title: "Neural Architectures & Deep Transformers",
    category: "AI & Data",
    instructor: {
      name: "Marcus Vance, PhD",
      role: "AI Scientist @ SynthX",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    rating: 4.98,
    studentsCount: 4120,
    duration: "10 Weeks • 40 Hours",
    level: "Intermediate",
    enrolled: true,
    progress: 65,
    description: "Deep dive into attention mechanisms, multi-head transformer models, diffusion architectures, and model quantization.",
    color: "from-purple-500 to-indigo-600",
    glowColor: "rgba(168, 85, 247, 0.4)",
    badge: "Trending",
    modulesCount: 7,
    completedModules: 4,
    syllabus: [
      { id: 1, title: "Self-Attention Mathematics and Scaled Dot-Product", duration: "4h 15m", completed: true },
      { id: 2, title: "Encoder-Decoder vs Decoder-Only Paradigms", duration: "5h 00m", completed: true },
      { id: 3, title: "Positional Encodings: RoPE and ALiBi Deep Dive", duration: "4h 45m", completed: true },
      { id: 4, title: "Fine-Tuning with LoRA, QLoRA, and FlashAttention", duration: "6h 20m", completed: true },
      { id: 5, title: "Latent Diffusion & Multimodal Cross-Attention", duration: "6h 50m", completed: false },
      { id: 6, title: "Distributed Training with DeepSpeed & FSDP", duration: "7h 10m", completed: false },
      { id: 7, title: "Building an Autonomous Agent Pipeline", duration: "5h 40m", completed: false }
    ]
  },
  {
    id: "crs-103",
    title: "Hyperdimensional WebGL & 3D Shaders",
    category: "Creative Dev",
    instructor: {
      name: "Kaito Tanaka",
      role: "Creative Technologist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    rating: 4.92,
    studentsCount: 1890,
    duration: "8 Weeks • 32 Hours",
    level: "Advanced",
    enrolled: true,
    progress: 90,
    description: "Create breathtaking interactive 3D web experiences using Three.js, GLSL fragment shaders, raymarching, and post-processing.",
    color: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16, 185, 129, 0.4)",
    badge: "Staff Pick",
    modulesCount: 6,
    completedModules: 5,
    syllabus: [
      { id: 1, title: "WebGL Graphics Pipeline & GPU Architecture", duration: "3h 40m", completed: true },
      { id: 2, title: "GLSL Basics: Vectors, Matrices & Sine waves", duration: "4h 10m", completed: true },
      { id: 3, title: "Perlin, Simplex Noise and Voronoi Tessellations", duration: "5h 30m", completed: true },
      { id: 4, title: "Signed Distance Functions (SDF) and Raymarching", duration: "6h 00m", completed: true },
      { id: 5, title: "Custom Post-Processing Bloom, Chromatic Aberration", duration: "5h 15m", completed: true },
      { id: 6, title: "Final Project: Interactive Procedural Black Hole", duration: "7h 25m", completed: false }
    ]
  },
  {
    id: "crs-104",
    title: "Cybernetic Systems & BCI Engineering",
    category: "Neural UX",
    instructor: {
      name: "Dr. Sarah Lin",
      role: "Neurotech Director",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    },
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    rating: 4.88,
    studentsCount: 1450,
    duration: "10 Weeks • 38 Hours",
    level: "Intermediate",
    enrolled: false,
    progress: 0,
    description: "Analyze electroencephalogram (EEG) signals, real-time Fourier filtering, brain-computer interfaces, and neural telemetry.",
    color: "from-pink-500 to-rose-600",
    glowColor: "rgba(244, 63, 94, 0.4)",
    badge: "New",
    modulesCount: 7,
    completedModules: 0,
    syllabus: [
      { id: 1, title: "Neurophysiology of Action Potentials & Synapses", duration: "4h 00m", completed: false },
      { id: 2, title: "EEG Electrode Placement and Impedance Tuning", duration: "5h 15m", completed: false },
      { id: 3, title: "Digital Signal Processing: Bandpass & Wavelet Filters", duration: "6h 20m", completed: false },
      { id: 4, title: "Motor Imagery Classification via Spatial Filtering", duration: "5h 50m", completed: false },
      { id: 5, title: "P300 Speller and Real-Time Event Detection", duration: "6h 10m", completed: false },
      { id: 6, title: "Hardware Interfacing with OpenBCI and Arduino", duration: "5h 30m", completed: false },
      { id: 7, title: "Ethics & Security of Neural Data Streaming", duration: "4h 55m", completed: false }
    ]
  },
  {
    id: "crs-105",
    title: "Zero-Knowledge Cryptography & Web3",
    category: "Web3",
    instructor: {
      name: "Dmitri Volkov",
      role: "ZK Cryptographer",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80"
    },
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    rating: 4.91,
    studentsCount: 2210,
    duration: "10 Weeks • 42 Hours",
    level: "Advanced",
    enrolled: false,
    progress: 0,
    description: "Understand zk-SNARKs, zk-STARKs, PLONK, polynomial commitments, and building provable privacy algorithms on Ethereum & Starknet.",
    color: "from-amber-500 to-orange-600",
    glowColor: "rgba(245, 158, 11, 0.4)",
    badge: "Popular",
    modulesCount: 8,
    completedModules: 0,
    syllabus: [
      { id: 1, title: "Modular Arithmetic & Elliptic Curve Pairings", duration: "5h 00m", completed: false },
      { id: 2, title: "Arithmetic Circuits and R1CS Constraint Systems", duration: "5h 30m", completed: false },
      { id: 3, title: "Quadratic Arithmetic Programs (QAP) Decoded", duration: "6h 15m", completed: false },
      { id: 4, title: "Groth16 and the Trusted Setup Ceremony", duration: "4h 45m", completed: false },
      { id: 5, title: "PLONKish Arithmetization & KZG Commitments", duration: "6h 40m", completed: false },
      { id: 6, title: "Writing Circuits in Circom & SnarkJS", duration: "6h 00m", completed: false },
      { id: 7, title: "ZK-Rollups: Layer-2 Scalability Architecture", duration: "5h 20m", completed: false },
      { id: 8, title: "Privacy-Preserving Identity Verification dApp", duration: "6h 30m", completed: false }
    ]
  },
  {
    id: "crs-106",
    title: "Autonomous Drone Swarms & Robotics",
    category: "Robotics",
    instructor: {
      name: "Aria Thorne",
      role: "Robotics Systems Engineer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    thumbnail: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
    rating: 4.87,
    studentsCount: 1670,
    duration: "9 Weeks • 36 Hours",
    level: "Intermediate",
    enrolled: false,
    progress: 0,
    description: "Program decentralized aerial drone swarms using ROS 2, SLAM algorithms, collision avoidance, and flocking dynamics.",
    color: "from-blue-600 to-violet-700",
    glowColor: "rgba(59, 130, 246, 0.4)",
    badge: "Trending",
    modulesCount: 6,
    completedModules: 0,
    syllabus: [
      { id: 1, title: "Kinematics of Quadrotors & State Space Control", duration: "4h 30m", completed: false },
      { id: 2, title: "ROS 2 Architecture, Nodes, and Pub/Sub Pipelines", duration: "5h 00m", completed: false },
      { id: 3, title: "Visual SLAM & LiDAR Point Cloud Processing", duration: "6h 20m", completed: false },
      { id: 4, title: "Reynolds Boids Model & Swarm Coordination", duration: "5h 40m", completed: false },
      { id: 5, title: "Decentralized Path Planning & Collision Fields", duration: "6h 15m", completed: false },
      { id: 6, title: "Gazebo Simulation: Urban Search and Rescue Mission", duration: "8h 15m", completed: false }
    ]
  }
];

export const INITIAL_TASKS = [
  {
    id: "tsk-1",
    title: "Complete VQE Algorithm Simulation code",
    subject: "Quantum Computing",
    day: "Monday",
    time: "14:00 - 16:30",
    duration: "2.5h",
    estimatedHours: 2.5,
    dueDate: "2026-11-23",
    priority: "High",
    risk: "Low",
    completed: true,
    tag: "Coding",
    notes: "Review eigensolver matrix convergence graphs before pushing.",
    subtasks: [
      { id: "sub-1-1", title: "Formulate Hamiltonian Pauli matrices", completed: true },
      { id: "sub-1-2", title: "Configure Qiskit Statevector simulator", completed: true },
      { id: "sub-1-3", title: "Benchmark ground state eigenvalue convergence", completed: true }
    ]
  },
  {
    id: "tsk-2",
    title: "Implement LoRA Fine-Tuning Script on Llama-3",
    subject: "Neural Architectures",
    day: "Tuesday",
    time: "10:00 - 12:30",
    duration: "2.5h",
    estimatedHours: 2.5,
    dueDate: "2026-11-24",
    priority: "High",
    risk: "Medium",
    completed: true,
    tag: "Experiment",
    notes: "Set rank=16, alpha=32, target modules [q_proj, v_proj].",
    subtasks: [
      { id: "sub-2-1", title: "Prepare tokenized instruction dataset", completed: true },
      { id: "sub-2-2", title: "Attach low-rank adapter matrices to attention weights", completed: true },
      { id: "sub-2-3", title: "Verify gradient checkpointing memory reduction", completed: true }
    ]
  },
  {
    id: "tsk-3",
    title: "Raymarching Shader Noise Displacement Lab",
    subject: "Hyperdimensional WebGL",
    day: "Wednesday",
    time: "15:00 - 18:00",
    duration: "3.0h",
    estimatedHours: 3.0,
    dueDate: "2026-11-21", // Past date -> Overdue
    priority: "High",
    risk: "High",
    completed: false,
    tag: "Lab",
    notes: "Optimize distance estimator function to prevent GPU frame drops.",
    subtasks: [
      { id: "sub-3-1", title: "Construct signed distance function (SDF) sphere union", completed: true },
      { id: "sub-3-2", title: "Integrate 3D Simplex noise volumetric perturbation", completed: false },
      { id: "sub-3-3", title: "Compute analytical normal vector gradient step", completed: false }
    ]
  },
  {
    id: "tsk-4",
    title: "Study Group: Shor's Factoring vs RSA Encryption",
    subject: "Quantum Computing",
    day: "Thursday",
    time: "16:00 - 17:30",
    duration: "1.5h",
    estimatedHours: 1.5,
    dueDate: "2026-11-26",
    priority: "Low",
    risk: "Low",
    completed: false,
    tag: "Group",
    notes: "Prepare 5-minute explanation of Quantum Fourier Transform step.",
    subtasks: [
      { id: "sub-4-1", title: "Review modular exponentiation period finding", completed: true },
      { id: "sub-4-2", title: "Summarize discrete logarithm speedups", completed: false }
    ]
  },
  {
    id: "tsk-5",
    title: "Draft BCI Signal Filtering Report",
    subject: "Neural UX",
    day: "Friday",
    time: "11:00 - 13:00",
    duration: "2.0h",
    estimatedHours: 2.0,
    dueDate: "2026-11-20", // Past date -> Overdue
    priority: "Medium",
    risk: "High",
    completed: false,
    tag: "Writing",
    notes: "Include Butterworth filter frequency response graphs.",
    subtasks: [
      { id: "sub-5-1", title: "Plot FFT power spectrum before/after notch filtering", completed: true },
      { id: "sub-5-2", title: "Calculate Signal-to-Noise Ratio (SNR) improvements", completed: false },
      { id: "sub-5-3", title: "Write methodology and discussion sections", completed: false }
    ]
  },
  {
    id: "tsk-6",
    title: "Weekend Autonomous Swarm Hackathon",
    subject: "Robotics",
    day: "Saturday",
    time: "09:00 - 17:00",
    duration: "8.0h",
    estimatedHours: 8.0,
    dueDate: "2026-11-28",
    priority: "High",
    risk: "Medium",
    completed: false,
    tag: "Competition",
    notes: "Coordinate drone tele-op with team in virtual sim room #4.",
    subtasks: [
      { id: "sub-6-1", title: "Calibrate ROS2 simulation coordinate frames", completed: false },
      { id: "sub-6-2", title: "Tune collision avoidance repulsive potential fields", completed: false },
      { id: "sub-6-3", title: "Execute multi-agent autonomous perimeter patrol", completed: false }
    ]
  }
];

export const INITIAL_ASSIGNMENTS = [
  {
    id: "asg-201",
    title: "Quantum Grover Search Circuit Implementation",
    course: "Quantum Computing & Qubit Algorithms",
    dueDate: "2026-11-26",
    daysLeft: 5,
    priority: "High",
    status: "Pending",
    grade: null,
    totalPoints: 100,
    description: "Design a 4-qubit Grover search circuit that successfully isolates marked state |1011> with probability > 96% after 3 oracle evaluations.",
    requirements: [
      "Jupyter notebook with Qiskit/Cirq implementation",
      "Histogram plots showing state amplification",
      "Short 2-page PDF explaining the diffusion operator"
    ]
  },
  {
    id: "asg-202",
    title: "RoPE Rotary Positional Embedding from Scratch",
    course: "Neural Architectures & Deep Transformers",
    dueDate: "2026-11-29",
    daysLeft: 8,
    priority: "Medium",
    status: "Pending",
    grade: null,
    totalPoints: 100,
    description: "Implement 2D complex matrix rotations for token embeddings without using PyTorch's native RotaryEmbedding modules.",
    requirements: [
      "Custom autograd-compatible PyTorch module",
      "Unit tests verifying orthogonality and length invariance",
      "Benchmark throughput against baseline sine-cosine encodings"
    ]
  },
  {
    id: "asg-203",
    title: "Procedural Volumetric Clouds GLSL Shader",
    course: "Hyperdimensional WebGL & 3D Shaders",
    dueDate: "2026-11-18",
    daysLeft: 0,
    priority: "High",
    status: "Graded",
    grade: "98 / 100",
    totalPoints: 100,
    description: "Write an interactive Three.js fragment shader utilizing 3D Perlin noise and Beer-Lambert absorption law for atmospheric cloud rendering.",
    feedback: "Exceptional mathematical precision in the light-marching step. Performance stayed steady at 60fps on mobile."
  },
  {
    id: "asg-204",
    title: "Circom Circuit for Private Balance Proof",
    course: "Zero-Knowledge Cryptography & Web3",
    dueDate: "2026-11-12",
    daysLeft: 0,
    priority: "Medium",
    status: "Graded",
    grade: "95 / 100",
    totalPoints: 100,
    description: "Implement a zero-knowledge circuit verifying balance >= threshold without disclosing exact account value.",
    feedback: "Clean constraint counts. Excellent documentation of the comparator component."
  }
];

export const INITIAL_ACHIEVEMENTS = [
  {
    id: "ach-1",
    title: "Quantum Pioneer",
    category: "Mastery",
    rarity: "Legendary",
    description: "Successfully simulate your first 10-qubit entangled circuit without state decoherence.",
    xpReward: 500,
    icon: "Atom",
    unlocked: true,
    unlockedAt: "Nov 14, 2026",
    progress: "10/10"
  },
  {
    id: "ach-2",
    title: "Matrix Synchronizer",
    category: "Consistency",
    rarity: "Epic",
    description: "Maintain a study streak of 14 continuous days in the StudentVerse neural portal.",
    xpReward: 350,
    icon: "Zap",
    unlocked: true,
    unlockedAt: "Today",
    progress: "14/14"
  },
  {
    id: "ach-3",
    title: "Shader Sorcerer",
    category: "Creative",
    rarity: "Epic",
    description: "Render an interactive 3D raymarched fractal at a constant 60 frames per second.",
    xpReward: 400,
    icon: "Boxes",
    unlocked: true,
    unlockedAt: "Nov 08, 2026",
    progress: "60/60 FPS"
  },
  {
    id: "ach-4",
    title: "Transformer Architect",
    category: "AI & Data",
    rarity: "Rare",
    description: "Train a 100M parameter model on consumer hardware with zero gradient explosions.",
    xpReward: 300,
    icon: "Cpu",
    unlocked: true,
    unlockedAt: "Nov 02, 2026",
    progress: "100M/100M"
  },
  {
    id: "ach-5",
    title: "Centurion Scholar",
    category: "Effort",
    rarity: "Legendary",
    description: "Accumulate more than 200 total verified deep focus study hours.",
    xpReward: 750,
    icon: "Award",
    unlocked: false,
    unlockedAt: null,
    progress: "187.5 / 200 hrs"
  },
  {
    id: "ach-6",
    title: "Zero-Knowledge Sentinel",
    category: "Security",
    rarity: "Rare",
    description: "Deploy a verifier contract with under 250,000 gas execution cost.",
    xpReward: 350,
    icon: "ShieldCheck",
    unlocked: false,
    unlockedAt: null,
    progress: "3/5 Proofs"
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: "act-1",
    title: "Completed Lesson: Variational Quantum Eigensolvers",
    time: "25 minutes ago",
    type: "course",
    course: "Quantum Computing & Qubit Algorithms",
    xp: "+50 XP"
  },
  {
    id: "act-2",
    title: "Unlocked Achievement: Matrix Synchronizer (14-Day Streak)",
    time: "2 hours ago",
    type: "achievement",
    xp: "+350 XP"
  },
  {
    id: "act-3",
    title: "Submitted Lab: LoRA Fine-Tuning PyTorch Script",
    time: "Yesterday, 19:40",
    type: "assignment",
    course: "Neural Architectures & Deep Transformers",
    xp: "+120 XP"
  },
  {
    id: "act-4",
    title: "Recorded 3.5 Hours Deep Work in WebGL Shader Studio",
    time: "2 days ago",
    type: "study",
    xp: "+80 XP"
  }
];

export const WEEKLY_ANALYTICS = [
  { day: "Mon", hours: 4.5, target: 4.0, xp: 420 },
  { day: "Tue", hours: 5.8, target: 4.0, xp: 580 },
  { day: "Wed", hours: 3.5, target: 4.0, xp: 350 },
  { day: "Thu", hours: 6.2, target: 4.0, xp: 620 },
  { day: "Fri", hours: 4.0, target: 4.0, xp: 410 },
  { day: "Sat", hours: 7.5, target: 5.0, xp: 750 },
  { day: "Sun", hours: 5.2, target: 4.0, xp: 520 },
];

export const CATEGORY_RADAR = [
  { category: "Quantum", score: 92, fullMark: 100 },
  { category: "AI & ML", score: 95, fullMark: 100 },
  { category: "3D & WebGL", score: 88, fullMark: 100 },
  { category: "Systems", score: 82, fullMark: 100 },
  { category: "Web3", score: 79, fullMark: 100 },
  { category: "Robotics", score: 84, fullMark: 100 },
];


// ==========================================
// 1. 3D LEARNING UNIVERSE DATA
// ==========================================
export const UNIVERSE_PLANETS = [
  {
    id: "planet-math",
    name: "Axiom Prime",
    subject: "Mathematics & Quantum Logic",
    category: "Quantum",
    tagline: "Realm of Abstract Topology, Calculus & High-Dimensional Geometry",
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.6)",
    textureType: "fractal",
    position: [-6, 0.5, -2],
    radius: 1.25,
    speed: 0.28,
    stats: { courses: 14, students: 5120, difficulty: "Extreme", mastery: "84%" },
    modules: ["Multivariable Calculus", "Lie Algebras & Group Theory", "Quantum Hilbert Spaces", "Topology of Manifolds"],
    description: "Crystalline mathematical planet orbiting around universal truth. Explore continuous transformations and geometric invariants."
  },
  {
    id: "planet-prog",
    name: "Kernel-IX",
    subject: "Computer Systems & Architecture",
    category: "Systems",
    tagline: "The Silicon Core of Low-Level Concurrency & Compiler Design",
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.6)",
    textureType: "grid",
    position: [-2.5, -0.8, 3],
    radius: 1.45,
    speed: 0.45,
    stats: { courses: 22, students: 8940, difficulty: "Advanced", mastery: "91%" },
    modules: ["Operating Systems & Scheduling", "Rust Memory Safety & Pointers", "RISC-V Microarchitecture", "Distributed Consensus Protocols"],
    description: "Cybernetic planetary citadel constructed from glowing silicon wafers and optical bus highways. Master low-overhead execution."
  },
  {
    id: "planet-science",
    name: "Helix Major",
    subject: "Applied Sciences & Biophysics",
    category: "Science",
    tagline: "Molecular Dynamics, Genetic Engineering & Thermodynamic Systems",
    color: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.6)",
    textureType: "organic",
    position: [2.8, 1.2, 1.5],
    radius: 1.35,
    speed: 0.32,
    stats: { courses: 18, students: 4320, difficulty: "Intermediate", mastery: "76%" },
    modules: ["CRISPR & Synthetic Genomics", "Statistical Mechanics", "Bioinformatics Pipelines", "Nanoscale Material Synthesis"],
    description: "Bioluminescent emerald oceanic biosphere. Study molecular machinery and living organic computational substrates."
  },
  {
    id: "planet-ai",
    name: "Synapsis",
    subject: "Artificial Intelligence & Neuro-Simulations",
    category: "AI & Data",
    tagline: "Deep Transformer Transformers, Reinforcement Agents & BCI Synthesis",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.65)",
    textureType: "neural",
    position: [6.2, -0.4, -2.5],
    radius: 1.6,
    speed: 0.38,
    stats: { courses: 26, students: 12450, difficulty: "Master", mastery: "95%" },
    modules: ["Attention Mechanisms & LoRA", "Diffusion & Generative Latents", "Reinforcement Learning via RLHF", "Graph Neural Networks"],
    description: "Pulsating purple neural super-structure with millions of firing synaptic tendrils simulating artificial consciousness."
  },
  {
    id: "planet-db",
    name: "ChronoStore",
    subject: "Decentralized Databases & Big Data",
    category: "Data",
    tagline: "Vector Databases, Sharded Raft Logs & High-Throughput Pipelines",
    color: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.6)",
    textureType: "strata",
    position: [0.5, -2.2, -5],
    radius: 1.15,
    speed: 0.22,
    stats: { courses: 12, students: 3890, difficulty: "Intermediate", mastery: "80%" },
    modules: ["LSM Trees & SSTable Indexing", "Vector Embeddings & HNSW", "Zero-Knowledge Rollup Storage", "Kafka Event-Stream Architectures"],
    description: "Layered amber and rose planetary crystal containing petabytes of immutably preserved human collective research."
  }
];

// ==========================================
// 2. 3D CODE EXECUTION LAB PRESETS
// ==========================================
export const CODE_LAB_PRESETS = [
  {
    id: "recursion-factorial",
    name: "Recursion & Call Stack: Factorial",
    language: "python",
    description: "Observe how recursive calls allocate stack frames with isolated local variables until base condition triggers unwind.",
    code: `def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nresult = factorial(3)\nprint("Result:", result)`,
    steps: [
      {
        line: 6,
        action: "Main script initializes execution context.",
        stack: [
          { name: "global_frame", vars: { result: "uninitialized" } }
        ],
        heap: [],
        memoryUsage: "48 KB",
        explanation: "Interpreter allocates global frame and invokes factorial(3)."
      },
      {
        line: 1,
        action: "Push stack frame factorial(n=3)",
        stack: [
          { name: "global_frame", vars: { result: "uninitialized" } },
          { name: "factorial(3)", vars: { n: 3 }, active: true }
        ],
        heap: [],
        memoryUsage: "96 KB",
        explanation: "Frame allocated on stack with parameter n=3. Evaluation begins."
      },
      {
        line: 2,
        action: "Evaluate base condition: 3 <= 1 -> False",
        stack: [
          { name: "global_frame", vars: { result: "uninitialized" } },
          { name: "factorial(3)", vars: { n: 3, "n <= 1": false }, active: true }
        ],
        heap: [],
        memoryUsage: "96 KB",
        explanation: "Base case false; proceeds to calculate 3 * factorial(2)."
      },
      {
        line: 4,
        action: "Push recursive frame factorial(n=2)",
        stack: [
          { name: "global_frame", vars: { result: "uninitialized" } },
          { name: "factorial(3)", vars: { n: 3 } },
          { name: "factorial(2)", vars: { n: 2 }, active: true }
        ],
        heap: [],
        memoryUsage: "144 KB",
        explanation: "New stack frame created. Suspends factorial(3) awaiting sub-call."
      },
      {
        line: 4,
        action: "Push recursive frame factorial(n=1) [BASE CASE]",
        stack: [
          { name: "global_frame", vars: { result: "uninitialized" } },
          { name: "factorial(3)", vars: { n: 3 } },
          { name: "factorial(2)", vars: { n: 2 } },
          { name: "factorial(1)", vars: { n: 1, "n <= 1": true }, active: true }
        ],
        heap: [],
        memoryUsage: "192 KB",
        explanation: "Base case reached! factorial(1) returns 1. Stack unwinding starts."
      },
      {
        line: 3,
        action: "Pop factorial(1) -> return 1 to factorial(2)",
        stack: [
          { name: "global_frame", vars: { result: "uninitialized" } },
          { name: "factorial(3)", vars: { n: 3 } },
          { name: "factorial(2)", vars: { n: 2, sub_result: 1, returns: "2 * 1 = 2" }, active: true }
        ],
        heap: [],
        memoryUsage: "144 KB",
        explanation: "Frame popped. Factorial(2) receives 1 and computes 2 * 1 = 2."
      },
      {
        line: 4,
        action: "Pop factorial(2) -> return 2 to factorial(3)",
        stack: [
          { name: "global_frame", vars: { result: "uninitialized" } },
          { name: "factorial(3)", vars: { n: 3, sub_result: 2, returns: "3 * 2 = 6" }, active: true }
        ],
        heap: [],
        memoryUsage: "96 KB",
        explanation: "Factorial(3) multiplies 3 * 2 = 6 and prepares to return."
      },
      {
        line: 7,
        action: "Execution complete. result = 6",
        stack: [
          { name: "global_frame", vars: { result: 6 }, active: true }
        ],
        heap: [],
        memoryUsage: "48 KB",
        explanation: "All child frames deallocated. Result variable successfully populated."
      }
    ]
  },
  {
    id: "heap-linked-list",
    name: "Singly Linked List & Pointer References",
    language: "java",
    description: "Track how object nodes are instantiated in dynamic heap memory while reference pointers link them together.",
    code: `class Node {\n    int val;\n    Node next;\n    Node(int v) { this.val = v; }\n}\nNode head = new Node(10);\nhead.next = new Node(20);\nhead.next.next = new Node(30);`,
    steps: [
      {
        line: 6,
        action: "Allocate Node(10) on Heap & assign reference to 'head'",
        stack: [
          { name: "main()", vars: { head: "ref:0x1A40" }, active: true }
        ],
        heap: [
          { addr: "0x1A40", type: "Node", val: 10, next: "null", label: "head Node" }
        ],
        memoryUsage: "64 KB",
        explanation: "Heap block 0x1A40 allocated with value 10. Stack pointer 'head' stores this address."
      },
      {
        line: 7,
        action: "Allocate Node(20) on Heap & link head.next -> 0x2B80",
        stack: [
          { name: "main()", vars: { head: "ref:0x1A40" }, active: true }
        ],
        heap: [
          { addr: "0x1A40", type: "Node", val: 10, next: "0x2B80", label: "head Node" },
          { addr: "0x2B80", type: "Node", val: 20, next: "null", label: "second Node" }
        ],
        memoryUsage: "96 KB",
        explanation: "Second node instantiated. Memory pointer 'next' inside 0x1A40 updated from null to 0x2B80."
      },
      {
        line: 8,
        action: "Allocate Node(30) on Heap & link head.next.next -> 0x3F10",
        stack: [
          { name: "main()", vars: { head: "ref:0x1A40" }, active: true }
        ],
        heap: [
          { addr: "0x1A40", type: "Node", val: 10, next: "0x2B80", label: "head Node" },
          { addr: "0x2B80", type: "Node", val: 20, next: "0x3F10", label: "second Node" },
          { addr: "0x3F10", type: "Node", val: 30, next: "null", label: "tail Node" }
        ],
        memoryUsage: "128 KB",
        explanation: "Three distinct heap blocks linked by forward pointers. Linear traversal complexity: O(N)."
      }
    ]
  },
  {
    id: "dynamic-array",
    name: "Dynamic Array Doubling & In-Place Swap",
    language: "python",
    description: "Visualize how arrays double in memory capacity upon overflow and elements are swapped in O(1) space.",
    code: `arr = [10, 20]\narr.append(30) # triggers capacity resize\narr[0], arr[2] = arr[2], arr[0]`,
    steps: [
      {
        line: 1,
        action: "Initialize array: capacity = 2, length = 2",
        stack: [{ name: "main()", vars: { arr: "ref:0x4100" }, active: true }],
        heap: [{ addr: "0x4100", type: "List", capacity: 2, elements: [10, 20] }],
        memoryUsage: "32 KB",
        explanation: "Array created with 2 contiguous slots filled: [10, 20]."
      },
      {
        line: 2,
        action: "Capacity doubled from 2 -> 4 to append 30",
        stack: [{ name: "main()", vars: { arr: "ref:0x5200" }, active: true }],
        heap: [{ addr: "0x5200", type: "List", capacity: 4, elements: [10, 20, 30, "empty"] }],
        memoryUsage: "64 KB",
        explanation: "New buffer 0x5200 allocated with capacity 4. Elements copied and 30 appended. Old buffer collected."
      },
      {
        line: 3,
        action: "Tuple swap: swap arr[0] (10) and arr[2] (30)",
        stack: [{ name: "main()", vars: { arr: "ref:0x5200" }, active: true }],
        heap: [{ addr: "0x5200", type: "List", capacity: 4, elements: [30, 20, 10, "empty"] }],
        memoryUsage: "64 KB",
        explanation: "In-place memory swap completed. Array is now [30, 20, 10]."
      }
    ]
  }
];

// ==========================================
// 3. REVERSE CLASSROOM AI DATA
// ==========================================
export const REVERSE_AI_QUESTIONS = [
  {
    id: "q-float",
    title: "Floating-Point Imprecision",
    subject: "Computer Science Foundations",
    difficulty: "Intermediate",
    prompt: "I wrote this Python code: `print(0.1 + 0.2 == 0.3)` and it printed `False`! Isn't a computer supposed to be 100% mathematically exact? Why is my computer making such a dumb arithmetic mistake?",
    studentMisconception: "Believes computers compute base-10 decimals natively and suspects a compiler bug or hardware malfunction.",
    keyPointsRequired: [
      "Binary (base-2) vs decimal (base-10) fractional representation",
      "0.1 and 0.2 become infinitely repeating fractions in binary (like 1/3 in decimal)",
      "IEEE 754 64-bit standard rounding truncation",
      "Use of math.isclose() or epsilon comparisons"
    ],
    sampleGoodAnswer: "Computers use binary (base-2) to represent numbers. In base-10, numbers like 1/10 (0.1) are finite, but in base-2, 0.1 is an infinitely repeating fraction: 0.0001100110011... Because computer registers have fixed 64 bits (IEEE 754), it must cut off and round the fraction. When you add 0.1 + 0.2, the rounded sum is 0.30000000000000004, which does not strictly equal 0.3. To fix this, use math.isclose(0.1 + 0.2, 0.3)."
  },
  {
    id: "q-mutability",
    title: "List Mutability & References",
    subject: "Python Data Model",
    difficulty: "Beginner",
    prompt: "Teacher, look at my code:\n`list_a = [1, 2, 3]`\n`list_b = list_a`\n`list_b.append(4)`\nWhy did `list_a` change to `[1, 2, 3, 4]` as well?! I never touched `list_a`! Did Python get confused?",
    studentMisconception: "Assumes assignment operator '=' creates a separate clone or copy of the list.",
    keyPointsRequired: [
      "Variables in Python store object references (memory pointers), not full values",
      "'list_b = list_a' points both variables to the exact same heap memory object",
      "Lists are mutable objects in Python",
      "To create an independent duplicate, use .copy() or slice [:]"
    ],
    sampleGoodAnswer: "In Python, assigning `list_b = list_a` does not copy the contents. Instead, it copies the memory address reference. Both `list_a` and `list_b` are labels pointing to the exact same list in heap memory. Because lists are mutable, modifying it via `list_b.append(4)` affects the single shared object. If you want an independent copy, use `list_b = list_a.copy()` or `list_b = list_a[:]`."
  },
  {
    id: "q-sorting",
    title: "Quicksort vs Mergesort in Practice",
    subject: "Algorithm Analysis",
    difficulty: "Advanced",
    prompt: "Both Quicksort and Mergesort have average time complexity O(N log N). In fact, Mergesort is guaranteed O(N log N) even in the worst case, while Quicksort can degrade to O(N^2). So why on earth does standard C++ (std::sort) and many engines use Quicksort instead of Mergesort?",
    studentMisconception: "Thinks big-O notation tells the whole story and ignores cache locality, memory overhead, and constant factors.",
    keyPointsRequired: [
      "CPU cache locality: Quicksort's partitioning accesses contiguous memory with high cache hits",
      "Space complexity: In-place Quicksort is O(log N) auxiliary stack space, whereas Mergesort requires O(N) auxiliary buffer",
      "Memory allocation overhead: Copying into temporary arrays in Mergesort slows down runtime by large constant factor",
      "Hybrid approaches like Introsort prevent the O(N^2) worst case"
    ],
    sampleGoodAnswer: "While both are O(N log N) asymptotically, Big-O hides constant factors and hardware realities. Quicksort partitions arrays in-place with sequential memory access, achieving phenomenal L1/L2 CPU cache hit rates. Mergesort requires allocating an auxiliary O(N) buffer and copying elements back and forth, which creates substantial memory bandwidth overhead. Modern implementations like C++ std::sort use 'Introsort' (Quicksort that falls back to Heapsort if recursion exceeds 2 log N), eliminating the O(N^2) risk entirely."
  }
];

// ==========================================
// 4. LIVING 3D TEXTBOOK TOPICS
// ==========================================
export const LIVING_TEXTBOOK_TOPICS = [
  {
    id: "anatomy-brain",
    title: "Neuroanatomy: Cerebral Cortex & Synaptic Lobe",
    category: "Biology & Neuroscience",
    icon: "Brain",
    description: "Explore the 3D human brain, identify the frontal, temporal, parietal, and occipital lobes, and trace neural pulse propagation.",
    interactiveParams: [
      { id: "signalRate", label: "Synaptic Firing Frequency (Hz)", min: 10, max: 120, default: 45, unit: "Hz" },
      { id: "myelinGlow", label: "Myelin Sheath Conductivity", min: 0.1, max: 2.0, default: 1.0, unit: "x" }
    ],
    features: [
      { name: "Frontal Cortex", function: "Executive decision making, working memory, procedural planning." },
      { name: "Temporal Lobe", function: "Auditory processing, language comprehension (Wernicke area)." },
      { name: "Hippocampus", function: "Consolidation of short-term neural traces into long-term memory." },
      { name: "Occipital Lobe", function: "Primary visual cortex processing retinotopic light stimuli." }
    ]
  },
  {
    id: "solar-system",
    title: "Keplerian Orbital Mechanics & N-Body Gravity",
    category: "Astrophysics",
    icon: "Globe",
    description: "Interactive celestial gravitational laboratory. Adjust planetary mass, orbital velocity, and witness gravitational slingshot maneuvers.",
    interactiveParams: [
      { id: "gravityConstant", label: "Gravitational Constant (G)", min: 0.2, max: 3.0, default: 1.0, unit: "G" },
      { id: "orbitalSpeed", label: "Orbital Velocity Multiplier", min: 0.5, max: 2.5, default: 1.2, unit: "x" }
    ],
    features: [
      { name: "Sun (Star)", function: "Primary gravitational well: 99.86% of total system mass." },
      { name: "Inner Terrestrial Planets", function: "High orbital velocity, rocky silicate crusts." },
      { name: "Gas Giants (Jupiter/Saturn)", function: "Atmospheric hydrogen/helium reservoirs, orbital stabilization." },
      { name: "Lagrange Points (L1-L5)", function: "Gravitational equilibrium positions for orbital probes." }
    ]
  },
  {
    id: "molecular-chemistry",
    title: "Molecular Dynamics & Covalent Bonds: Caffeine",
    category: "Quantum Chemistry",
    icon: "Atom",
    description: "Interactive 3D ball-and-stick model of the caffeine molecule (C8H10N4O2). Observe dipole moments, bond vibrations, and receptor binding.",
    interactiveParams: [
      { id: "thermalEnergy", label: "Thermal Vibration Energy (K)", min: 50, max: 600, default: 298, unit: "K" },
      { id: "bondStiffness", label: "Covalent Spring Constant", min: 0.5, max: 2.0, default: 1.0, unit: "k" }
    ],
    features: [
      { name: "Carbon Ring", function: "Purine-like double-ring core (xanthine derivative)." },
      { name: "Oxygen Carbonyls (=O)", function: "High electronegativity, forms hydrogen bonds with adenosine receptors." },
      { name: "Nitrogen Atoms (N)", function: "Provides basicity and sp2 planar hybridization." },
      { name: "Methyl Groups (-CH3)", function: "Lipophilic anchors that penetrate blood-brain barrier." }
    ]
  },
  {
    id: "data-structures",
    title: "Self-Balancing 3D Red-Black Tree & Graph",
    category: "Data Structures",
    icon: "GitBranch",
    description: "Visualize binary tree rotations (Left-Rotate, Right-Rotate) and color adjustments enforcing black-height balance.",
    interactiveParams: [
      { id: "nodeCount", label: "Tree Depth / Element Count", min: 3, max: 15, default: 7, unit: "nodes" },
      { id: "rotationSpeed", label: "Animation Interpolation Speed", min: 0.5, max: 3.0, default: 1.5, unit: "x" }
    ],
    features: [
      { name: "Root Node", function: "Always black. Enforces O(log N) height invariant." },
      { name: "Red Node Invariant", function: "No two consecutive red nodes on any path." },
      { name: "Black Height", function: "Every path from node to leaves has equal black nodes." },
      { name: "Tree Rotations", function: "Restores balance in O(1) time without rebuilding tree." }
    ]
  }
];

// ==========================================
// 5. PERSONAL LEARNING WORLD BIOMES
// ==========================================
export const LEARNING_WORLD_BIOMES = [
  {
    id: "isle-logic",
    name: "Archipelago of Pure Logic",
    unlocked: true,
    requiredLevel: 1,
    subject: "Mathematics & Reasoning",
    color: "#f59e0b",
    biomeType: "crystal",
    floatingHeight: 1.2,
    buildingsCount: 3,
    lore: "Suspended amidst golden clouds, where crystalline geometric pyramids resonate with fundamental mathematical proofs.",
    dailyMissions: [
      { id: "m1", title: "Complete 1 Multivariable Proof in Living Textbook", xp: 150, completed: true },
      { id: "m2", title: "Teach Reverse AI student about IEEE-754 precision", xp: 200, completed: false }
    ]
  },
  {
    id: "cyber-citadel",
    name: "Cyber Citadel & Memory Matrix",
    unlocked: true,
    requiredLevel: 3,
    subject: "Systems & Memory Architecture",
    color: "#06b6d4",
    biomeType: "cyber",
    floatingHeight: 2.0,
    buildingsCount: 5,
    lore: "Floating server obelisks connected by glowing fiber-optic suspension bridges. Harnesses stack and heap execution.",
    dailyMissions: [
      { id: "m3", title: "Step through Linked List Pointer Traversal in Code Lab", xp: 180, completed: true },
      { id: "m4", title: "Debug Dynamic Array Capacity Doubling", xp: 220, completed: false }
    ]
  },
  {
    id: "synapse-sanctuary",
    name: "Synaptic Sanctuary of AI",
    unlocked: true,
    requiredLevel: 5,
    subject: "Deep Learning & Cognitive Models",
    color: "#a855f7",
    biomeType: "neural",
    floatingHeight: 2.8,
    buildingsCount: 4,
    lore: "Bio-synthetic floating temple bathed in purple auroras, continuously synthesizing neural tensor weights.",
    dailyMissions: [
      { id: "m5", title: "Explain Transformer Attention to Cortex-7", xp: 250, completed: false },
      { id: "m6", title: "Consult AI Learning Companion on LoRA fine-tuning", xp: 120, completed: true }
    ]
  },
  {
    id: "quantum-spire",
    name: "Quantum Superposition Spire",
    unlocked: false,
    requiredLevel: 8,
    subject: "Quantum Computing & Teleportation",
    color: "#ec4899",
    biomeType: "quantum",
    floatingHeight: 3.5,
    buildingsCount: 2,
    lore: "Oscillates between parallel realities. Unlocks at Level 8 to study multi-qubit entanglement and Shor's algorithm.",
    dailyMissions: [
      { id: "m7", title: "Reach Level 8 (4850 / 6000 XP current)", xp: 500, completed: false }
    ]
  }
];

// ==========================================
// 6. LEARNING INTELLIGENCE ENGINE DATA
// ==========================================
export const KNOWLEDGE_GRAPH_DATA = {
  nodes: [
    { id: "math-calc", name: "Multivariable Calculus", category: "Math", mastery: 92, status: "mastered", reviewDays: 14 },
    { id: "math-linear", name: "Linear Algebra & Tensors", category: "Math", mastery: 88, status: "mastered", reviewDays: 10 },
    { id: "prog-pointers", name: "Pointers & Memory Layout", category: "Systems", mastery: 85, status: "mastered", reviewDays: 8 },
    { id: "prog-recursion", name: "Recursion & Call Stacks", category: "Systems", mastery: 94, status: "mastered", reviewDays: 18 },
    { id: "prog-trees", name: "Red-Black Trees & Balances", category: "Systems", mastery: 64, status: "weak", reviewDays: 1 },
    { id: "ai-trans", name: "Self-Attention Transformers", category: "AI", mastery: 96, status: "mastered", reviewDays: 21 },
    { id: "ai-lora", name: "LoRA & Parameter-Efficient Tuning", category: "AI", mastery: 72, status: "in-progress", reviewDays: 3 },
    { id: "quant-gates", name: "Hadamard & CNOT Quantum Gates", category: "Quantum", mastery: 81, status: "in-progress", reviewDays: 5 },
    { id: "quant-shor", name: "Shor's Quantum Factorization", category: "Quantum", mastery: 48, status: "weak", reviewDays: 0 },
    { id: "bio-dna", name: "CRISPR & DNA Codons", category: "Science", mastery: 78, status: "in-progress", reviewDays: 6 }
  ],
  links: [
    { source: "math-linear", target: "ai-trans", strength: 0.9 },
    { source: "math-linear", target: "quant-gates", strength: 0.8 },
    { source: "prog-pointers", target: "prog-trees", strength: 0.85 },
    { source: "prog-recursion", target: "prog-trees", strength: 0.75 },
    { source: "ai-trans", target: "ai-lora", strength: 0.9 },
    { source: "quant-gates", target: "quant-shor", strength: 0.95 },
    { source: "math-calc", target: "ai-trans", strength: 0.7 }
  ],
  weakConcepts: [
    {
      id: "wc-1",
      name: "Shor's Quantum Factorization",
      mastery: 48,
      repeatedMistakes: 3,
      lastMistake: "Period finding via Quantum Fourier Transform phase estimation.",
      recommendedAction: "Review Module 7 in Quantum Computing course + Practice in Living Textbook",
      urgency: "High"
    },
    {
      id: "wc-2",
      name: "Red-Black Trees Double-Red Violations",
      mastery: 64,
      repeatedMistakes: 2,
      lastMistake: "Left-rotation node relinking during root recoloring.",
      recommendedAction: "Step through 3D Red-Black Tree simulator in Living Textbook",
      urgency: "Medium"
    }
  ],
  retentionCurve: [
    { day: "Day 1 (Immediate)", retention: 100, target: 100 },
    { day: "Day 2", retention: 82, target: 90 },
    { day: "Day 3 (Review 1)", retention: 95, target: 90 },
    { day: "Day 5", retention: 87, target: 85 },
    { day: "Day 7 (Review 2)", retention: 98, target: 85 },
    { day: "Day 14", retention: 92, target: 80 },
    { day: "Day 30 (Permanent)", retention: 94, target: 80 }
  ]
};

// ==========================================
// 7. VIRTUAL CLASSROOM SLIDES & ROSTER
// ==========================================
export const CLASSROOM_LECTURE = {
  title: "Advanced Quantum Entanglement & Neural Synthesis // CS-804",
  professor: {
    name: "Prof. Elena Rostova",
    status: "Presenting Live",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  currentSlideIndex: 0,
  slides: [
    {
      id: "slide-1",
      title: "Bell States and the EPR Paradox",
      bullets: [
        "Quantum entanglement creates maximally entangled two-qubit states.",
        "Bell state: |Φ⁺⟩ = (|00⟩ + |11⟩) / √2",
        "Measurement on Qubit A instantly collapses Qubit B, regardless of spatial distance.",
        "Einstein-Podolsky-Rosen paradox proved local hidden variable theories false via Bell's Theorem."
      ],
      diagram: "Entanglement Matrix // Tr[ρ] = 1"
    },
    {
      id: "slide-2",
      title: "Quantum Teleportation Circuit Architecture",
      bullets: [
        "Transfers unknown qubit |ψ⟩ using 1 shared Bell pair and 2 classical bits.",
        "Step 1: Alice performs CNOT with state |ψ⟩ and her entangled qubit.",
        "Step 2: Alice measures in computational basis and sends 2 classical bits.",
        "Step 3: Bob applies Pauli X and Z corrections to reconstruct |ψ⟩ perfectly."
      ],
      diagram: "Circuit: |ψ⟩ ──•──[H]──[Measure] ══ 2 bits ══> [X/Z Corrections] ──> |ψ⟩"
    },
    {
      id: "slide-3",
      title: "Decoherence Mitigation in Physical Qubits",
      bullets: [
        "Environmental thermal fluctuations introduce phase flips and bit flips.",
        "Surface codes provide topological fault tolerance by encoding 1 logical qubit across an N x N physical grid.",
        "Syndrome measurements detect errors without reading or destroying stored superposition."
      ],
      diagram: "T1 Relaxation Time: 120 µs // T2 Dephasing Time: 85 µs"
    }
  ],
  studentsRoster: [
    { id: "st-1", name: "Alex Mercer (You)", seat: "Front Row, Center", handRaised: false, active: true },
    { id: "st-2", name: "Maya Lin", seat: "Front Row, Left", handRaised: true, active: true },
    { id: "st-3", name: "Devon Chen", seat: "Second Row, Center", handRaised: false, active: true },
    { id: "st-4", name: "Zara Thorne", seat: "Second Row, Right", handRaised: false, active: true },
    { id: "st-5", name: "Kenji Sato", seat: "Third Row, Left", handRaised: false, active: true }
  ]
};

// ==========================================
// 8. ADVANCED TASK MANAGER & PRODUCTIVITY SUITE DATA
// ==========================================

export const INITIAL_EXAMS = [
  {
    id: "exm-1",
    title: "Quantum Computation & Logic Final Exam",
    subject: "Quantum Computing",
    date: "2026-11-25",
    time: "09:00 - 12:00",
    venue: "Hall B // Online Neural Proctored",
    readinessScore: 82,
    urgency: "High",
    daysLeft: 3,
    topics: [
      { id: "top-1", name: "Shor's Factoring & QFT", weight: "25%", completed: true, mastery: 85 },
      { id: "top-2", name: "Grover Search Oracle & Amplification", weight: "25%", completed: true, mastery: 90 },
      { id: "top-3", name: "Variational Quantum Eigensolver (VQE)", weight: "20%", completed: true, mastery: 80 },
      { id: "top-4", name: "Quantum Error Correction (Shor 9-qubit code)", weight: "15%", completed: false, mastery: 45 },
      { id: "top-5", name: "Hardware Noise & Decoherence Mitigation", weight: "15%", completed: false, mastery: 50 }
    ]
  },
  {
    id: "exm-2",
    title: "Neural Transformers & Attention Mechanics Midterm",
    subject: "Neural Architectures",
    date: "2026-11-28",
    time: "14:00 - 17:00",
    venue: "Sim Lab 4",
    readinessScore: 68,
    urgency: "Medium",
    daysLeft: 6,
    topics: [
      { id: "top-6", name: "Scaled Dot-Product & Multi-Head Attention", weight: "30%", completed: true, mastery: 92 },
      { id: "top-7", name: "Rotary Embeddings (RoPE) & Positional Math", weight: "25%", completed: true, mastery: 78 },
      { id: "top-8", name: "LoRA / QLoRA Parameter Efficient Tuning", weight: "25%", completed: false, mastery: 40 },
      { id: "top-9", name: "FlashAttention GPU Memory Optimization", weight: "20%", completed: false, mastery: 35 }
    ]
  },
  {
    id: "exm-3",
    title: "WebGL 3D Shaders & Raymarching Evaluation",
    subject: "Hyperdimensional WebGL",
    date: "2026-12-05",
    time: "11:00 - 13:00",
    venue: "Graphics Lab Alpha",
    readinessScore: 91,
    urgency: "Low",
    daysLeft: 13,
    topics: [
      { id: "top-10", name: "GLSL Pipeline & Fragment Math", weight: "30%", completed: true, mastery: 95 },
      { id: "top-11", name: "Signed Distance Functions (SDFs)", weight: "35%", completed: true, mastery: 90 },
      { id: "top-12", name: "Volumetric Lighting & Post-Processing", weight: "35%", completed: true, mastery: 88 }
    ]
  }
];

export const INITIAL_REVISIONS = [
  {
    id: "rev-1",
    topic: "Quantum Superposition & Bell State Equations",
    subject: "Quantum Computing",
    intervalStage: 3, // 1d, 3d, 7d, 14d, 30d
    intervalName: "7 Days (Stage 3)",
    nextReviewDate: "2026-11-22", // Today
    lastReviewed: "2026-11-15",
    mastery: 85,
    dueToday: true,
    repetitions: 3,
    keySummary: "|Φ⁺⟩ = (|00⟩ + |11⟩) / √2; Maximally entangled Bell basis states."
  },
  {
    id: "rev-2",
    topic: "Multi-Head Attention Query-Key-Value Scaling Math",
    subject: "Neural Architectures",
    intervalStage: 2,
    intervalName: "3 Days (Stage 2)",
    nextReviewDate: "2026-11-22", // Today
    lastReviewed: "2026-11-19",
    mastery: 72,
    dueToday: true,
    repetitions: 2,
    keySummary: "Softmax((Q * K^T) / sqrt(d_k)) * V; prevents gradient vanishing in deep layers."
  },
  {
    id: "rev-3",
    topic: "Raymarching Sphere Tracing & Normal Vector Computation",
    subject: "Hyperdimensional WebGL",
    intervalStage: 4,
    intervalName: "14 Days (Stage 4)",
    nextReviewDate: "2026-11-26",
    lastReviewed: "2026-11-12",
    mastery: 92,
    dueToday: false,
    repetitions: 4,
    keySummary: "vec3 n = normalize(vec3(map(p+e.xyy)-map(p-e.xyy), ...)); central differences."
  },
  {
    id: "rev-4",
    topic: "Elliptic Curve Discrete Logarithm Problem (ECDLP)",
    subject: "Zero-Knowledge Cryptography",
    intervalStage: 1,
    intervalName: "1 Day (Stage 1)",
    nextReviewDate: "2026-11-22", // Today
    lastReviewed: "2026-11-21",
    mastery: 60,
    dueToday: true,
    repetitions: 1,
    keySummary: "Finding k such that Q = k * P on y^2 = x^3 + ax + b is computationally infeasible."
  },
  {
    id: "rev-5",
    topic: "P300 Brain Wave Detection & Event-Related Potentials",
    subject: "Neural UX",
    intervalStage: 3,
    intervalName: "7 Days (Stage 3)",
    nextReviewDate: "2026-11-24",
    lastReviewed: "2026-11-17",
    mastery: 78,
    dueToday: false,
    repetitions: 3,
    keySummary: "Positive deflection at ~300ms post-infrequent sensory stimulus in parietal cortex."
  }
];

export const INITIAL_PARTNERS = [
  {
    id: "ptn-1",
    name: "Maya Lin",
    handle: "@mayalin_neuro",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    major: "Computational Neuroscience",
    streak: 18,
    studyHoursThisWeek: 26.4,
    status: "Deep Focus Mode",
    activeNow: true,
    nudgeSent: false,
    privacyShareHours: true,
    privacyShareStreak: true,
    sharedGoals: [
      { id: "sg-1", title: "Complete 15 Focus Hours by Friday", target: 15, currentAlex: 14.5, currentPartner: 15.0, completed: false },
      { id: "sg-2", title: "Review 10 Spaced Topics", target: 10, currentAlex: 8, currentPartner: 10, completed: false }
    ]
  },
  {
    id: "ptn-2",
    name: "Kenji Sato",
    handle: "@kenji_quantum",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    major: "Quantum Information Theory",
    streak: 12,
    studyHoursThisWeek: 21.0,
    status: "Idle",
    activeNow: false,
    nudgeSent: false,
    privacyShareHours: true,
    privacyShareStreak: true,
    sharedGoals: [
      { id: "sg-3", title: "Solve Grover Algorithm Exercises", target: 5, currentAlex: 4, currentPartner: 5, completed: false }
    ]
  }
];

export const INITIAL_DISTRACTIONS = [
  { id: "dis-1", reason: "Smartphone Notifications & Messages", occurrences: 14, impact: "High", avgMinutesLost: 18, tip: "Enable iOS / Android Work Focus filter during study sprints." },
  { id: "dis-2", reason: "Social Media & Algorithmic Feeds", occurrences: 9, impact: "High", avgMinutesLost: 24, tip: "Use website blocker extensions on desktop browser." },
  { id: "dis-3", reason: "Cognitive Fatigue & Mind Wandering", occurrences: 8, impact: "Medium", avgMinutesLost: 12, tip: "Take brisk 5-minute hydration walk every 50 minutes." },
  { id: "dis-4", reason: "Irrelevant Wikipedia / YouTube Rabbit Holes", occurrences: 5, impact: "Medium", avgMinutesLost: 15, tip: "Keep a quick 'Parked Questions' notepad instead of browsing instantly." },
  { id: "dis-5", reason: "Ambient Room Noise", occurrences: 3, impact: "Low", avgMinutesLost: 7, tip: "Activate binaural beats or brown noise audio filter." }
];

export const HOURLY_PRODUCTIVITY_PATTERN = [
  { hour: "06:00", productivity: 35, focusMinutes: 20, period: "Early Morning" },
  { hour: "08:00", productivity: 75, focusMinutes: 45, period: "Morning" },
  { hour: "10:00", productivity: 95, focusMinutes: 58, period: "Peak Focus (Morning)" },
  { hour: "12:00", productivity: 60, focusMinutes: 30, period: "Midday" },
  { hour: "14:00", productivity: 80, focusMinutes: 48, period: "Afternoon" },
  { hour: "16:00", productivity: 92, focusMinutes: 55, period: "Peak Focus (Afternoon)" },
  { hour: "18:00", productivity: 65, focusMinutes: 35, period: "Early Evening" },
  { hour: "20:00", productivity: 85, focusMinutes: 50, period: "Evening" },
  { hour: "22:00", productivity: 45, focusMinutes: 25, period: "Late Night" }
];

export const WORKLOAD_HEATMAP_DATA = [
  // 4 Weeks matrix: 28 days
  { date: "2026-10-26", dayName: "Mon", tasks: 2, completed: 2, overdue: 0, hours: 3.5, intensity: 2 },
  { date: "2026-10-27", dayName: "Tue", tasks: 3, completed: 3, overdue: 0, hours: 4.5, intensity: 3 },
  { date: "2026-10-28", dayName: "Wed", tasks: 4, completed: 4, overdue: 0, hours: 5.5, intensity: 4 },
  { date: "2026-10-29", dayName: "Thu", tasks: 2, completed: 2, overdue: 0, hours: 3.0, intensity: 2 },
  { date: "2026-10-30", dayName: "Fri", tasks: 3, completed: 3, overdue: 0, hours: 4.0, intensity: 3 },
  { date: "2026-10-31", dayName: "Sat", tasks: 5, completed: 5, overdue: 0, hours: 7.0, intensity: 4 },
  { date: "2026-11-01", dayName: "Sun", tasks: 2, completed: 2, overdue: 0, hours: 3.0, intensity: 2 },

  { date: "2026-11-02", dayName: "Mon", tasks: 3, completed: 3, overdue: 0, hours: 4.2, intensity: 3 },
  { date: "2026-11-03", dayName: "Tue", tasks: 4, completed: 4, overdue: 0, hours: 5.8, intensity: 4 },
  { date: "2026-11-04", dayName: "Wed", tasks: 2, completed: 2, overdue: 0, hours: 3.2, intensity: 2 },
  { date: "2026-11-05", dayName: "Thu", tasks: 3, completed: 3, overdue: 0, hours: 4.0, intensity: 3 },
  { date: "2026-11-06", dayName: "Fri", tasks: 3, completed: 3, overdue: 0, hours: 4.5, intensity: 3 },
  { date: "2026-11-07", dayName: "Sat", tasks: 6, completed: 6, overdue: 0, hours: 8.0, intensity: 4 },
  { date: "2026-11-08", dayName: "Sun", tasks: 1, completed: 1, overdue: 0, hours: 2.0, intensity: 1 },

  { date: "2026-11-09", dayName: "Mon", tasks: 3, completed: 3, overdue: 0, hours: 4.5, intensity: 3 },
  { date: "2026-11-10", dayName: "Tue", tasks: 4, completed: 4, overdue: 0, hours: 5.2, intensity: 4 },
  { date: "2026-11-11", dayName: "Wed", tasks: 3, completed: 3, overdue: 0, hours: 4.0, intensity: 3 },
  { date: "2026-11-12", dayName: "Thu", tasks: 2, completed: 2, overdue: 0, hours: 3.0, intensity: 2 },
  { date: "2026-11-13", dayName: "Fri", tasks: 4, completed: 4, overdue: 0, hours: 5.0, intensity: 4 },
  { date: "2026-11-14", dayName: "Sat", tasks: 5, completed: 5, overdue: 0, hours: 7.2, intensity: 4 },
  { date: "2026-11-15", dayName: "Sun", tasks: 2, completed: 2, overdue: 0, hours: 2.5, intensity: 2 },

  { date: "2026-11-16", dayName: "Mon", tasks: 3, completed: 3, overdue: 0, hours: 4.0, intensity: 3 },
  { date: "2026-11-17", dayName: "Tue", tasks: 4, completed: 4, overdue: 0, hours: 5.5, intensity: 4 },
  { date: "2026-11-18", dayName: "Wed", tasks: 2, completed: 2, overdue: 0, hours: 3.0, intensity: 2 },
  { date: "2026-11-19", dayName: "Thu", tasks: 3, completed: 3, overdue: 0, hours: 4.2, intensity: 3 },
  { date: "2026-11-20", dayName: "Fri", tasks: 4, completed: 2, overdue: 1, hours: 4.8, intensity: 4 }, // Has overdue
  { date: "2026-11-21", dayName: "Sat", tasks: 5, completed: 2, overdue: 1, hours: 6.5, intensity: 4 }, // Has overdue
  { date: "2026-11-22", dayName: "Sun (Today)", tasks: 3, completed: 1, overdue: 0, hours: 3.5, intensity: 2 }
];
