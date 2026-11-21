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
    priority: "High",
    completed: true,
    tag: "Coding",
    notes: "Review eigensolver matrix convergence graphs before pushing."
  },
  {
    id: "tsk-2",
    title: "Implement LoRA Fine-Tuning Script on Llama-3",
    subject: "Neural Architectures",
    day: "Tuesday",
    time: "10:00 - 12:30",
    duration: "2.5h",
    priority: "High",
    completed: true,
    tag: "Experiment",
    notes: "Set rank=16, alpha=32, target modules [q_proj, v_proj]."
  },
  {
    id: "tsk-3",
    title: "Raymarching Shader Noise Displacement Lab",
    subject: "Hyperdimensional WebGL",
    day: "Wednesday",
    time: "15:00 - 18:00",
    duration: "3.0h",
    priority: "Medium",
    completed: false,
    tag: "Lab",
    notes: "Optimize distance estimator function to prevent GPU frame drops."
  },
  {
    id: "tsk-4",
    title: "Study Group: Shor's Factoring vs RSA Encryption",
    subject: "Quantum Computing",
    day: "Thursday",
    time: "16:00 - 17:30",
    duration: "1.5h",
    priority: "Low",
    completed: false,
    tag: "Group",
    notes: "Prepare 5-minute explanation of Quantum Fourier Transform step."
  },
  {
    id: "tsk-5",
    title: "Draft BCI Signal Filtering Report",
    subject: "Neural UX",
    day: "Friday",
    time: "11:00 - 13:00",
    duration: "2.0h",
    priority: "Medium",
    completed: false,
    tag: "Writing",
    notes: "Include Butterworth filter frequency response graphs."
  },
  {
    id: "tsk-6",
    title: "Weekend Autonomous Swarm Hackathon",
    subject: "Robotics",
    day: "Saturday",
    time: "09:00 - 17:00",
    duration: "8.0h",
    priority: "High",
    completed: false,
    tag: "Competition",
    notes: "Coordinate drone tele-op with team in virtual sim room #4."
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
