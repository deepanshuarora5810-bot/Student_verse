import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { Modal } from '../components/Modal';
import { NeuralSkillsPieChart } from '../components/NeuralSkillsPieChart';
import {
  User,
  Mail,
  GraduationCap,
  MapPin,
  Calendar,
  Edit3,
  Award,
  Zap,
  Flame,
  Clock,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Plus,
  QrCode,
  Download,
  Share2,
  Check
} from 'lucide-react';

export const Profile = () => {
  const { student, skills, stats, updateProfile, addXP, addToast } = useStudent();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);

  // Edit Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: student.name,
    handle: student.handle,
    email: student.email,
    major: student.major,
    university: student.university,
    bio: student.bio,
    location: student.location
  });

  // New Skill Form State
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 75,
    category: 'Quantum'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditModalOpen(false);
  };

  const handleBoostSkill = (skillName) => {
    addXP(50);
    addToast(`Practiced ${skillName}! Proficiency boosted +5% (+50 XP).`, 'success', 'Skill Level Boost');
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      
      {/* PROFILE HEADER HERO CARD */}
      <div className="relative glass-card rounded-3xl overflow-hidden border-indigo-500/30">
        {/* Banner Cover Image */}
        <div className="h-44 sm:h-56 w-full relative overflow-hidden bg-slate-900">
          <img
            src={student.banner}
            alt="Student Cover Banner"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f24] via-transparent to-transparent" />
        </div>

        {/* Profile Content */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative z-10 -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            
            {/* Avatar & Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              <div className="relative">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-[#0a0f24] shadow-2xl"
                />
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 ring-4 ring-[#0a0f24]" />
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    {student.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    LVL {student.level}
                  </span>
                </div>
                <p className="text-xs font-mono text-purple-400">{student.handle}</p>
                <p className="text-xs text-slate-300 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{student.major}</span>
                  <span className="text-slate-600">•</span>
                  <span>{student.university}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <Edit3 className="w-4 h-4 text-cyan-400" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={() => setIsIdModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all transform active:scale-95"
              >
                <QrCode className="w-4 h-4" />
                <span>Cyber ID Card</span>
              </button>
            </div>

          </div>

          {/* Bio text */}
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {student.bio}
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {student.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                {student.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                Joined {student.joinedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK STATS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card rounded-2xl p-5 border-cyan-500/20 text-center">
          <Clock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
          <h4 className="text-2xl font-bold text-white font-display">{student.studyHours}h</h4>
          <p className="text-[11px] font-mono text-slate-400 uppercase mt-1">Study Hours</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border-purple-500/20 text-center">
          <BookOpen className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <h4 className="text-2xl font-bold text-white font-display">{stats.enrolledCount}</h4>
          <p className="text-[11px] font-mono text-slate-400 uppercase mt-1">Active Modules</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border-amber-500/20 text-center">
          <Flame className="w-6 h-6 text-amber-400 mx-auto mb-2" />
          <h4 className="text-2xl font-bold text-white font-display">{stats.streak} Days</h4>
          <p className="text-[11px] font-mono text-slate-400 uppercase mt-1">Daily Streak</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border-emerald-500/20 text-center">
          <Zap className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <h4 className="text-2xl font-bold text-white font-display">{stats.xp.toLocaleString()}</h4>
          <p className="text-[11px] font-mono text-slate-400 uppercase mt-1">Neural XP</p>
        </div>
      </div>

      {/* NEURAL SKILLS PIE CHART MATRIX (2D PIE CHART) */}
      <NeuralSkillsPieChart
        skills={skills}
        onBoostSkill={handleBoostSkill}
        onCalibrate={() => {
          addXP(100);
          addToast('All skills refreshed and calibrated to standard grid.', 'info', 'Calibration Complete');
        }}
      />

      {/* MODAL: EDIT PROFILE */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Student Profile"
        subtitle="Update your student credentials and bio on the decentralized registry"
      >
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Handle *
              </label>
              <input
                type="text"
                required
                value={profileForm.handle}
                onChange={(e) => setProfileForm({ ...profileForm, handle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                University
              </label>
              <input
                type="text"
                value={profileForm.university}
                onChange={(e) => setProfileForm({ ...profileForm, university: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Major / Discipline
              </label>
              <input
                type="text"
                value={profileForm.major}
                onChange={(e) => setProfileForm({ ...profileForm, major: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Bio & Research Focus
            </label>
            <textarea
              rows={3}
              value={profileForm.bio}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan"
            >
              Save Credentials
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL: CYBER ID CARD */}
      <Modal
        isOpen={isIdModalOpen}
        onClose={() => setIsIdModalOpen(false)}
        title="StudentVerse Holographic ID"
        subtitle="Verifiable cryptographic credential card"
      >
        <div className="flex flex-col items-center">
          {/* Cyber Card Preview */}
          <div className="relative w-full max-w-sm rounded-3xl p-6 bg-gradient-to-br from-[#0c1638] via-[#090d22] to-[#120f30] border-2 border-cyan-400/50 shadow-neon-cyan overflow-hidden my-4 group">
            {/* Holographic shimmer line */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/10 to-transparent pointer-events-none" />

            <div className="flex items-start justify-between border-b border-cyan-500/30 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span className="font-display font-extrabold text-sm tracking-widest text-white">
                  STUDENT<span className="text-cyan-400">VERSE</span>
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                CLASS OF 2026
              </span>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-cyan-400"
              />
              <div>
                <h4 className="text-base font-bold text-white font-display">{student.name}</h4>
                <p className="text-[11px] font-mono text-cyan-300">{student.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{student.university}</p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div>
                <span className="text-[9px] text-slate-500 block uppercase">Level</span>
                <span className="text-white font-bold">{student.level}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block uppercase">Focus Hours</span>
                <span className="text-cyan-400 font-bold">{student.studyHours}h</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block uppercase">Streak</span>
                <span className="text-amber-400 font-bold">{stats.streak}d</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-cyan-500/20 flex items-center justify-between text-[9px] font-mono text-slate-400">
              <span>ID: SV-2026-X8891-NEO</span>
              <span className="text-emerald-400">VERIFIED ON CHAIN</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => {
                addToast('Holographic credential badge downloaded to your local device.', 'success', 'Certificate Exported');
                setIsIdModalOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-500 hover:bg-cyan-400 text-black transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Digital ID</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://studentverse.io/verify/${student.handle}`);
                addToast('Credential verification link copied to clipboard.', 'info');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 border border-white/10"
            >
              <Share2 className="w-4 h-4" />
              <span>Copy Link</span>
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
