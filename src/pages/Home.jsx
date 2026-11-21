import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { HeroScene } from '../three/HeroScene';
import { CourseCard } from '../components/CourseCard';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Flame,
  ShieldCheck,
  Compass,
  Cpu,
  Layers,
  GraduationCap,
  Star,
  Users,
  Award,
  ChevronRight,
  CheckCircle,
  Play
} from 'lucide-react';

export const Home = () => {
  const { courses, stats } = useStudent();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Quantum', 'AI & Data', 'Creative Dev', 'Neural UX', 'Robotics'];

  const filteredCourses = selectedCategory === 'All'
    ? courses.slice(0, 3)
    : courses.filter((c) => c.category === selectedCategory).slice(0, 3);

  const testimonials = [
    {
      name: "Dr. Kaelen Voss",
      role: "Quantum Research Fellow @ CERN",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      content: "StudentVerse completely shattered the standard online learning model. The 3D interactive quantum simulation models made abstract superposition math click instantaneously.",
      rating: 5,
      badge: "Verified Scholar"
    },
    {
      name: "Aaliyah Chen",
      role: "Neural Systems Engineer @ NeuralX",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      content: "The weekly study telemetry and automated neural grading eliminated all friction. I earned 3 micro-credentials while juggling full-time research.",
      rating: 5,
      badge: "Top 1% Contributor"
    },
    {
      name: "Dante Alverez",
      role: "Creative Coder & Shader Artist",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
      content: "The WebGL and shader laboratories are world-class. It doesn't feel like coursework—it feels like stepping into a cyberpunk sandbox where curiosity rules.",
      rating: 5,
      badge: "Shader Master"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-28">
        {/* Glow backdrop gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline & CTA */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium tracking-wide w-fit">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                <span>NEXT-GEN 3D LEARNING COSMOS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl text-white tracking-tight leading-[1.08]">
                Your Learning <br />
                <span className="text-gradient-cyan">Journey.</span>{' '}
                <span className="text-gradient-purple">Reimagined.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Step into an immersive, hyperdimensional universe designed for future architects, quantum engineers, and creative technologists. Real-time 3D modules, neural study schedules, and verifiable credentials.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-neon-cyan transition-all transform active:scale-95 group"
                >
                  <Zap className="w-4 h-4 text-cyan-200 fill-cyan-200/40" />
                  <span>Launch Student Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/courses"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 backdrop-blur-md transition-all"
                >
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Explore Courses</span>
                </Link>
              </div>

              {/* Live telemetry row */}
              <div className="pt-6 border-t border-indigo-900/30 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-display">
                    54,200<span className="text-cyan-400">+</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Active Scholars
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-display">
                    99.4<span className="text-purple-400">%</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Completion Rate
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-display">
                    4.98<span className="text-amber-400">★</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Global Rating
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: 3D Interactive Hero Experience */}
            <div className="lg:col-span-6 relative w-full h-[450px] sm:h-[540px] lg:h-[620px]">
              <HeroScene />
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section className="py-16 border-y border-indigo-900/30 bg-[#04081b]/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              The Architecture of Insight
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display mt-2">
              Engineered Beyond Standard Classrooms
            </h2>
            <p className="text-sm text-slate-400 mt-3">
              Every feature of StudentVerse has been built with spatial pedagogy and algorithmic intelligence at its core.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="glass-card glass-card-hover rounded-2xl p-6 border-cyan-500/20 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  Spatial 3D Simulations
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interact with real-time 3D quantum models, shader raymarching labs, and neural topologies rendered with GPU acceleration.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                <span>R3F v8 Powered</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="glass-card glass-card-purple-hover rounded-2xl p-6 border-purple-500/20 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-purple-300 transition-colors">
                  Autonomous Study Planner
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dynamic weekly scheduling with priority weights, countdown clocks, and automated habit reminders to keep your streak blazing.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-purple-400 flex items-center gap-1">
                <span>Real-Time Sync</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-6 border-emerald-500/20 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  Verifiable 3D Badges
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every achievement awards cryptographic XP and renders an inspectable 3D orbital trophy inside your student vault.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <span>Gamified Mastery</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="glass-card glass-card-hover rounded-2xl p-6 border-amber-500/20 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-amber-300 transition-colors">
                  Neural Automated Grading
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Instant feedback on algorithmic circuit designs, PyTorch code scripts, and mathematical proofs within seconds of submission.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-400 flex items-center gap-1">
                <span>Zero Latency</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED COURSES SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Curated Disciplines</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Featured Learning Modules
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Master the technological frontiers shaping the next fifty years.
            </p>
          </div>

          <Link
            to="/courses"
            className="flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors w-fit"
          >
            <span>View All {courses.length} Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-neon-cyan'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 border-t border-indigo-900/30 bg-[#040717]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">
              Voice of the Scholars
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display mt-2">
              Trusted by 50,000+ Innovators
            </h2>
            <p className="text-sm text-slate-400 mt-3">
              Hear from researchers, university students, and senior developers exploring the StudentVerse cosmos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border-indigo-500/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      {t.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500/30"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden glass-card border-cyan-500/30 shadow-2xl">
          {/* Neon background waves */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold mb-4 inline-block">
              BEGIN YOUR ACADEMIC ASCENT
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              Ready to Step Into the Future of Education?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
              Join thousands of pioneering students worldwide. Track your focus hours, master spatial algorithms, and build verifiable credentials in the decentralized learning matrix.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link
                to="/dashboard"
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-neon-cyan transition-all transform active:scale-95 flex items-center gap-2"
              >
                <span>Enter Student Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/planner"
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                Open Weekly Planner
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
