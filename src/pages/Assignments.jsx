import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { Modal } from '../components/Modal';
import {
  CheckSquare,
  Clock,
  AlertCircle,
  FileText,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Award,
  Filter,
  Plus
} from 'lucide-react';

export const Assignments = () => {
  const { assignments, submitAssignment, addAssignment, addToast } = useStudent();
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Pending', 'Submitted', 'Graded'
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Submission Form State
  const [uploadFile, setUploadFile] = useState(null);
  const [repoUrl, setRepoUrl] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');

  // New Assignment Form State
  const [newAsgData, setNewAsgData] = useState({
    title: '',
    course: 'Quantum Computing & Qubit Algorithms',
    dueDate: '2026-12-01',
    priority: 'High',
    description: '',
    totalPoints: 100
  });

  const filteredAssignments = assignments.filter((asg) => {
    if (filterStatus === 'All') return true;
    return asg.status === filterStatus;
  });

  const handleOpenSubmit = (asg) => {
    setSelectedAssignment(asg);
    setUploadFile(null);
    setRepoUrl('');
    setSubmissionNotes('');
    setIsSubmitModalOpen(true);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
    }
  };

  const handleSubmitSolution = (e) => {
    e.preventDefault();
    if (!uploadFile && !repoUrl.trim()) {
      addToast('Please provide a solution file or repository link.', 'warning');
      return;
    }
    submitAssignment(selectedAssignment.id, submissionNotes);
    setIsSubmitModalOpen(false);
  };

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!newAsgData.title.trim()) {
      addToast('Please enter an assignment title.', 'warning');
      return;
    }
    addAssignment(newAsgData);
    setIsNewModalOpen(false);
    setNewAsgData({
      title: '',
      course: 'Quantum Computing & Qubit Algorithms',
      dueDate: '2026-12-01',
      priority: 'High',
      description: '',
      totalPoints: 100
    });
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      
      {/* HEADER SECTION */}
      <div className="relative glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold mb-1">
              <CheckSquare className="w-4 h-4" />
              <span>Academic Assessment Vault</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Course <span className="text-gradient-cyan">Assignments</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Track problem sets, algorithmic laboratory work, and upload code for automated neural grading.
            </p>
          </div>

          <button
            onClick={() => setIsNewModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Custom Lab</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1">
          {['All', 'Pending', 'Submitted', 'Graded'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 ${
                filterStatus === status
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-neon-cyan font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {status} Assignments
            </button>
          ))}
        </div>

      </div>

      {/* ASSIGNMENTS LIST */}
      <div className="flex flex-col gap-5">
        {filteredAssignments.map((asg) => {
          const isPending = asg.status === 'Pending';
          const isGraded = asg.status === 'Graded';
          const isSubmitted = asg.status === 'Submitted';

          return (
            <div
              key={asg.id}
              className={`glass-card rounded-2xl p-6 border transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group ${
                isGraded
                  ? 'border-emerald-500/30 hover:border-emerald-500/50'
                  : isPending
                  ? 'border-indigo-500/20 hover:border-cyan-500/40'
                  : 'border-purple-500/30'
              }`}
            >
              <div className="flex-1">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isGraded
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : isSubmitted
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {asg.status}
                  </span>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10">
                    {asg.priority} Priority
                  </span>

                  <span className="text-xs font-mono text-purple-300">
                    {asg.course}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                  {asg.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mt-2 max-w-2xl">
                  {asg.description}
                </p>

                {/* Requirements / Rubric list */}
                {asg.requirements && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {asg.requirements.map((req, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {req}
                      </span>
                    ))}
                  </div>
                )}

                {/* Graded Feedback note */}
                {asg.feedback && (
                  <div className="mt-4 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-slate-300">
                    <span className="font-mono text-emerald-400 font-bold block mb-1">
                      Neural Grader Feedback:
                    </span>
                    "{asg.feedback}"
                  </div>
                )}
              </div>

              {/* Status and Action Column */}
              <div className="shrink-0 flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800/80">
                <div className="text-left lg:text-right">
                  <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Due: {asg.dueDate}</span>
                  </div>

                  {isGraded && (
                    <div className="mt-1">
                      <span className="text-xs font-mono text-slate-400">Grade: </span>
                      <span className="text-base font-bold font-display text-emerald-300">
                        {asg.grade}
                      </span>
                    </div>
                  )}
                </div>

                {isPending && (
                  <button
                    onClick={() => handleOpenSubmit(asg)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all transform active:scale-95"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Submit Work</span>
                  </button>
                )}

                {isSubmitted && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-purple-300 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>In Neural Review</span>
                  </div>
                )}

                {isGraded && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-300 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>Graded (+100 XP)</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: SUBMIT ASSIGNMENT */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title={selectedAssignment ? `Submit: ${selectedAssignment.title}` : 'Submit Assignment'}
        subtitle="Upload your code, lab artifacts, or repository URL for automated grading"
      >
        <form onSubmit={handleSubmitSolution} className="flex flex-col gap-5">
          {/* File Upload Dropzone */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2 uppercase">
              Upload Solution File (.py, .ipynb, .zip, .glsl, .pdf)
            </label>
            <label className="border-2 border-dashed border-slate-700 hover:border-cyan-400/60 bg-slate-900/60 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors group">
              <UploadCloud className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform mb-2" />
              <span className="text-xs font-semibold text-white">
                {uploadFile ? uploadFile.name : 'Click to select or drag and drop file'}
              </span>
              <span className="text-[10px] font-mono text-slate-400 mt-1">
                {uploadFile ? `${(uploadFile.size / 1024).toFixed(1)} KB • Ready for upload` : 'Maximum file size: 25MB'}
              </span>
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                accept=".py,.ipynb,.zip,.glsl,.pdf,.circom,.rs"
              />
            </label>
          </div>

          {/* Repository / Demo Link */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Or Solution Repository / Link
            </label>
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/alex-mercer/quantum-grover-search"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Submission Notes */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Student Execution Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={submissionNotes}
              onChange={(e) => setSubmissionNotes(e.target.value)}
              placeholder="Outline edge-case test results, execution speed, or special considerations..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit for Neural Grading</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL: CREATE CUSTOM ASSIGNMENT */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Create Custom Academic Lab"
        subtitle="Schedule an assessment or personal project deliverable"
      >
        <form onSubmit={handleCreateAssignment} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Assignment Title *
            </label>
            <input
              type="text"
              required
              value={newAsgData.title}
              onChange={(e) => setNewAsgData({ ...newAsgData, title: e.target.value })}
              placeholder="e.g. Implement Raymarching Fractal Sphere"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Course Module
              </label>
              <select
                value={newAsgData.course}
                onChange={(e) => setNewAsgData({ ...newAsgData, course: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
              >
                <option value="Quantum Computing & Qubit Algorithms">Quantum Computing</option>
                <option value="Neural Architectures & Deep Transformers">Neural Architectures</option>
                <option value="Hyperdimensional WebGL & 3D Shaders">Hyperdimensional WebGL</option>
                <option value="Zero-Knowledge Cryptography & Web3">Zero-Knowledge Cryptography</option>
                <option value="Autonomous Drone Swarms & Robotics">Robotics Drone Swarms</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Due Date
              </label>
              <input
                type="date"
                value={newAsgData.dueDate}
                onChange={(e) => setNewAsgData({ ...newAsgData, dueDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Description & Requirements
            </label>
            <textarea
              rows={3}
              value={newAsgData.description}
              onChange={(e) => setNewAsgData({ ...newAsgData, description: e.target.value })}
              placeholder="Describe what must be implemented and verified in this assignment..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsNewModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan"
            >
              Create Assignment
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
