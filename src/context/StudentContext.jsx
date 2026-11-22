import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_STUDENT,
  INITIAL_SKILLS,
  INITIAL_COURSES,
  INITIAL_TASKS,
  INITIAL_ASSIGNMENTS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_ACTIVITIES,
  WEEKLY_ANALYTICS,
  CATEGORY_RADAR,
  LEARNING_WORLD_BIOMES,
  KNOWLEDGE_GRAPH_DATA,
  REVERSE_AI_QUESTIONS,
  INITIAL_EXAMS,
  INITIAL_REVISIONS,
  INITIAL_PARTNERS,
  INITIAL_DISTRACTIONS,
  HOURLY_PRODUCTIVITY_PATTERN,
  WORKLOAD_HEATMAP_DATA
} from '../data/demoData';

const INITIAL_TEACHER = {
  name: "Prof. Marcus Vance",
  handle: "@marcus_vance",
  email: "marcus.vance@studentverse.edu",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  title: "Faculty Lead & Research Chair",
  department: "Quantum Computing & Neural Systems",
  university: "Neo-Kyoto Institute of Advanced Technology",
  level: 12,
  activeClassroomCode: "SV-ROOM-4029",
  totalStudents: 248,
  activeSessions: 3,
  pendingReviews: 14
};

const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  // Authentication Role State ('student' | 'teacher' | null)
  const [authRole, setAuthRole] = useState(() => {
    return localStorage.getItem('sv_auth_role') || null;
  });

  const [teacher, setTeacher] = useState(() => {
    const saved = localStorage.getItem('sv_teacher');
    return saved ? JSON.parse(saved) : INITIAL_TEACHER;
  });

  // Load initial data from localStorage if available
  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem('sv_student');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT;
  });

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('sv_skills');
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('sv_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('sv_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('sv_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('sv_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('sv_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [biomes, setBiomes] = useState(() => {
    const saved = localStorage.getItem('sv_biomes');
    return saved ? JSON.parse(saved) : LEARNING_WORLD_BIOMES;
  });

  const [knowledgeGraph, setKnowledgeGraph] = useState(() => {
    const saved = localStorage.getItem('sv_knowledge_graph');
    return saved ? JSON.parse(saved) : KNOWLEDGE_GRAPH_DATA;
  });

  const [reverseQuestions, setReverseQuestions] = useState(() => {
    const saved = localStorage.getItem('sv_reverse_questions');
    return saved ? JSON.parse(saved) : REVERSE_AI_QUESTIONS;
  });

  const [companionOpen, setCompanionOpen] = useState(false);

  // Advanced Student Task Manager & Productivity Suites
  const [exams, setExams] = useState(() => {
    const saved = localStorage.getItem('sv_exams');
    return saved ? JSON.parse(saved) : INITIAL_EXAMS;
  });

  const [revisions, setRevisions] = useState(() => {
    const saved = localStorage.getItem('sv_revisions');
    return saved ? JSON.parse(saved) : INITIAL_REVISIONS;
  });

  const [partners, setPartners] = useState(() => {
    const saved = localStorage.getItem('sv_partners');
    return saved ? JSON.parse(saved) : INITIAL_PARTNERS;
  });

  const [distractions, setDistractions] = useState(() => {
    const saved = localStorage.getItem('sv_distractions');
    return saved ? JSON.parse(saved) : INITIAL_DISTRACTIONS;
  });

  const [emergencyPlan, setEmergencyPlan] = useState(() => {
    const saved = localStorage.getItem('sv_emergency_plan');
    return saved ? JSON.parse(saved) : null;
  });

  const [toasts, setToasts] = useState([]);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('sv_exams', JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem('sv_revisions', JSON.stringify(revisions));
  }, [revisions]);

  useEffect(() => {
    localStorage.setItem('sv_partners', JSON.stringify(partners));
  }, [partners]);

  useEffect(() => {
    localStorage.setItem('sv_distractions', JSON.stringify(distractions));
  }, [distractions]);

  useEffect(() => {
    if (emergencyPlan) {
      localStorage.setItem('sv_emergency_plan', JSON.stringify(emergencyPlan));
    }
  }, [emergencyPlan]);

  useEffect(() => {
    localStorage.setItem('sv_biomes', JSON.stringify(biomes));
  }, [biomes]);

  useEffect(() => {
    localStorage.setItem('sv_knowledge_graph', JSON.stringify(knowledgeGraph));
  }, [knowledgeGraph]);

  useEffect(() => {
    localStorage.setItem('sv_reverse_questions', JSON.stringify(reverseQuestions));
  }, [reverseQuestions]);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('sv_student', JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem('sv_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('sv_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('sv_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('sv_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('sv_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('sv_activities', JSON.stringify(activities));
  }, [activities]);

  // Toast Notification System
  const addToast = (message, type = 'info', title = '') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add Activity Log
  const addActivity = (title, type, xp = '+25 XP', course = null) => {
    const newAct = {
      id: `act-${Date.now()}`,
      title,
      time: 'Just now',
      type,
      course,
      xp
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Student Actions
  const updateProfile = (updatedFields) => {
    setStudent((prev) => ({ ...prev, ...updatedFields }));
    addToast('Your student profile has been synced with the neural grid.', 'success', 'Profile Updated');
  };

  const addXP = (amount) => {
    setStudent((prev) => {
      const newXP = prev.xp + amount;
      let newLevel = prev.level;
      let newTarget = prev.xpToNextLevel;

      if (newXP >= newTarget) {
        newLevel += 1;
        newTarget = Math.round(newTarget * 1.3);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        addToast(`Congratulations! You reached Level ${newLevel}!`, 'trophy', 'Level Up!');
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newTarget
      };
    });
  };

  // Course Actions
  const enrollCourse = (courseId) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          addToast(`Enrolled in "${c.title}"! Course material unlocked.`, 'success', 'Enrollment Confirmed');
          addActivity(`Enrolled in new course: ${c.title}`, 'course', '+100 XP', c.title);
          addXP(100);
          return { ...c, enrolled: true, progress: 0 };
        }
        return c;
      })
    );
  };

  const updateCourseProgress = (courseId, newProgress) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const clamped = Math.min(100, Math.max(0, newProgress));
          if (clamped === 100 && c.progress < 100) {
            confetti({ particleCount: 70, spread: 60 });
            addToast(`Course Completed: ${c.title}! Certificate available in Profile.`, 'trophy', 'Course Mastery');
            addXP(250);
          }
          return { ...c, progress: clamped };
        }
        return c;
      })
    );
  };

  // Task Actions
  const addTask = (taskData) => {
    const newTask = {
      id: `tsk-${Date.now()}`,
      completed: false,
      ...taskData
    };
    setTasks((prev) => [newTask, ...prev]);
    addToast(`Task "${newTask.title}" added to your study schedule.`, 'info', 'Task Scheduled');
  };

  const editTask = (taskId, updatedData) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updatedData } : t))
    );
    addToast('Study task details updated.', 'info', 'Task Updated');
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    addToast('Task removed from planner.', 'info', 'Task Deleted');
  };

  const toggleTaskCompleted = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextState = !t.completed;
          if (nextState) {
            confetti({
              particleCount: 40,
              spread: 50,
              origin: { y: 0.7 }
            });
            addToast(`Great work! Completed "${t.title}".`, 'success', 'Task Done');
            addXP(30);
            addActivity(`Completed study session: ${t.title}`, 'study', '+30 XP');
          }
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId && t.subtasks) {
          const updatedSubtasks = t.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          const allDone = updatedSubtasks.every((st) => st.completed);
          if (allDone && !t.completed) {
            confetti({ particleCount: 30, spread: 45 });
            addToast(`All subtasks finished for "${t.title}"!`, 'success', 'Milestone Complete');
            addXP(20);
          }
          return { ...t, subtasks: updatedSubtasks, completed: allDone ? true : t.completed };
        }
        return t;
      })
    );
  };

  const breakdownTaskWithAI = async (taskId, taskTitle, subject, context = "") => {
    try {
      const resp = await fetch('http://localhost:8000/api/tasks/breakdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: taskTitle,
          subject: subject || 'General',
          description: context,
          target_hours: 6.0
        })
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.subtasks && data.subtasks.length > 0) {
          setTasks((prev) =>
            prev.map((t) =>
              t.id === taskId
                ? {
                    ...t,
                    subtasks: data.subtasks,
                    breakdownModel: data.model,
                    estimatedHours: data.total_estimated_hours
                  }
                : t
            )
          );
          addToast(`AI broken down "${taskTitle}" into ${data.subtasks.length} actionable subtasks (${data.model})`, 'success', 'Task Decomposed');
          return data.subtasks;
        }
      }
    } catch (e) {
      console.warn('Backend breakdown unavailable, applying local heuristic breakdown engine:', e);
    }

    // High quality local heuristic breakdown fallback
    const fallbackSubtasks = [
      { id: `sub-${Date.now()}-1`, title: "Conceptual Blueprint & Architecture Setup", completed: false, estimated_hours: 1.5, priority: "High" },
      { id: `sub-${Date.now()}-2`, title: "Core Implementation / Derivation Phase", completed: false, estimated_hours: 2.5, priority: "High" },
      { id: `sub-${Date.now()}-3`, title: "Rigorous Verification & Test Harness", completed: false, estimated_hours: 1.5, priority: "Medium" },
      { id: `sub-${Date.now()}-4`, title: "Documentation, LaTeX Proofs & Clean Package", completed: false, estimated_hours: 1.0, priority: "Low" }
    ];

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: fallbackSubtasks,
              breakdownModel: "Heuristic AI Engine (Offline Fallback)",
              estimatedHours: 6.5
            }
          : t
      )
    );
    addToast(`Generated 4 modular subtasks for "${taskTitle}".`, 'info', 'AI Breakdown Applied');
    return fallbackSubtasks;
  };

  const acceptRecoveryPlan = (planItems) => {
    if (!planItems || !planItems.length) return;
    setTasks((prev) =>
      prev.map((t) => {
        const match = planItems.find((p) => p.task_id === t.id);
        if (match) {
          return {
            ...t,
            day: match.suggested_day || t.day,
            time: match.suggested_time || t.time,
            risk: 'Low',
            notes: `${t.notes || ''} [Rescheduled via Missed Task Recovery System]`
          };
        }
        return t;
      })
    );
    confetti({ particleCount: 50, spread: 60 });
    addToast(`Successfully rescheduled ${planItems.length} overdue tasks with collision-free slots!`, 'success', 'Recovery Engaged');
    addActivity(`Applied automated Missed Task Recovery plan`, 'study', '+50 XP');
    addXP(50);
  };

  // Exam Readiness Actions
  const addExam = (examData) => {
    const newExm = {
      id: `exm-${Date.now()}`,
      readinessScore: 60,
      daysLeft: 7,
      topics: [],
      ...examData
    };
    setExams((prev) => [newExm, ...prev]);
    addToast(`Exam "${newExm.title}" registered with readiness tracking.`, 'info', 'Exam Added');
  };

  const toggleExamTopic = (examId, topicId) => {
    setExams((prev) =>
      prev.map((exm) => {
        if (exm.id === examId) {
          const updatedTopics = exm.topics.map((top) =>
            top.id === topicId ? { ...top, completed: !top.completed, mastery: !top.completed ? 95 : 45 } : top
          );
          const completedCount = updatedTopics.filter((t) => t.completed).length;
          const newReadiness = updatedTopics.length
            ? Math.round((completedCount / updatedTopics.length) * 100)
            : 0;
          if (completedCount === updatedTopics.length) {
            confetti({ particleCount: 60, spread: 70 });
            addToast(`100% Exam Readiness achieved for ${exm.subject}!`, 'trophy', 'Exam Ready');
            addXP(150);
          }
          return { ...exm, topics: updatedTopics, readinessScore: newReadiness };
        }
        return exm;
      })
    );
  };

  // Revision Memory Actions (Spaced Repetition)
  const reviewSpacedTopic = (topicId) => {
    setRevisions((prev) =>
      prev.map((rev) => {
        if (rev.id === topicId) {
          const stageNames = ["1 Day (Stage 1)", "3 Days (Stage 2)", "7 Days (Stage 3)", "14 Days (Stage 4)", "30 Days (Stage 5)"];
          const nextStage = Math.min(5, rev.intervalStage + 1);
          const nextDays = nextStage === 1 ? 1 : nextStage === 2 ? 3 : nextStage === 3 ? 7 : nextStage === 4 ? 14 : 30;
          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + nextDays);
          const dateStr = futureDate.toISOString().split('T')[0];

          confetti({ particleCount: 35, spread: 50 });
          addToast(`Spaced review completed for "${rev.topic}"! Next review in ${nextDays} days.`, 'success', 'Retention Synced');
          addXP(30);
          addActivity(`Completed spaced review: ${rev.topic}`, 'study', '+30 XP');

          return {
            ...rev,
            intervalStage: nextStage,
            intervalName: stageNames[nextStage - 1] || "30 Days (Permanent)",
            nextReviewDate: dateStr,
            lastReviewed: "Today",
            mastery: Math.min(100, rev.mastery + 10),
            dueToday: false,
            repetitions: rev.repetitions + 1
          };
        }
        return rev;
      })
    );
  };

  const addRevisionTopic = (topicData) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      intervalStage: 1,
      intervalName: "1 Day (Stage 1)",
      nextReviewDate: "Today",
      lastReviewed: "Just added",
      mastery: 50,
      dueToday: true,
      repetitions: 0,
      ...topicData
    };
    setRevisions((prev) => [newRev, ...prev]);
    addToast(`Added "${newRev.topic}" to Spaced Revision Memory System.`, 'info', 'Topic Queued');
  };

  // Accountability Partner Actions
  const nudgePartner = (partnerId) => {
    setPartners((prev) =>
      prev.map((p) => {
        if (p.id === partnerId) {
          addToast(`Motivational telemetry sent to ${p.name}! Keep each other accountable.`, 'success', 'Partner Nudged');
          return { ...p, nudgeSent: true };
        }
        return p;
      })
    );
  };

  const togglePartnerPrivacy = (partnerId, field) => {
    setPartners((prev) =>
      prev.map((p) => {
        if (p.id === partnerId) {
          const updated = { ...p, [field]: !p[field] };
          addToast(`Privacy preference updated for ${p.name}.`, 'info', 'Privacy Configured');
          return updated;
        }
        return p;
      })
    );
  };

  const toggleSharedGoal = (partnerId, goalId) => {
    setPartners((prev) =>
      prev.map((p) => {
        if (p.id === partnerId) {
          const updatedGoals = p.sharedGoals.map((g) => {
            if (g.id === goalId) {
              const nextState = !g.completed;
              if (nextState) {
                confetti({ particleCount: 50, spread: 60 });
                addToast(`Mutual milestone achieved with ${p.name}!`, 'trophy', 'Goal Completed');
                addXP(60);
              }
              return { ...g, completed: nextState };
            }
            return g;
          });
          return { ...p, sharedGoals: updatedGoals };
        }
        return p;
      })
    );
  };

  // Distraction Tracker Actions
  const logDistraction = (reason) => {
    setDistractions((prev) =>
      prev.map((d) => (d.reason === reason ? { ...d, occurrences: d.occurrences + 1 } : d))
    );
    addToast(`Distraction recorded: "${reason}". Focus recovery suggestions active.`, 'warning', 'Focus Interrupted');
  };

  // Emergency Study Mode Generator
  const generateEmergencyPlan = async (examTitle, subject, targetHours = 6.0, weakTopics = []) => {
    try {
      const resp = await fetch('http://localhost:8000/api/emergency/cram-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam_title: examTitle,
          subject: subject,
          exam_date: '2026-11-25T09:00:00',
          remaining_hours_per_day: targetHours,
          weak_topics: weakTopics
        })
      });
      if (resp.ok) {
        const data = await resp.json();
        setEmergencyPlan(data);
        addToast(`Emergency Study Plan generated for ${examTitle}! Focus mode engaged.`, 'success', 'Emergency Mode Active');
        return data;
      }
    } catch (e) {
      console.warn('Backend emergency plan failed, generating local high-yield emergency schedule:', e);
    }

    const localPlan = {
      exam_title: examTitle,
      subject: subject,
      target_hours: targetHours,
      exam_date: '2026-11-25T09:00:00',
      status: 'EMERGENCY_MODE_ENGAGED',
      guidance: 'High-impact active recall sprint. 80% practice derivation, 20% review.',
      schedule: [
        { block: 1, time: "08:30 - 09:30", activity: `High-Yield Core Equations: ${subject}`, type: "Active Recall", intensity: "High" },
        { block: 2, time: "09:40 - 10:40", activity: "Derivations & Past Exam Problem Sets", type: "Practice", intensity: "High" },
        { block: 3, time: "10:50 - 11:30", activity: "Targeted Flashcard Drills & Traps Audit", type: "Memory Drill", intensity: "Medium" },
        { block: 4, time: "13:00 - 14:15", activity: "High-Frequency Exam Question Archetypes", type: "Remediation", intensity: "High" },
        { block: 5, time: "14:30 - 15:45", activity: "45-Minute Timed Mock Exam Simulation", type: "Exam Simulation", intensity: "Extreme" },
        { block: 6, time: "16:15 - 17:00", activity: "Consolidation & Final Formula Cheat Sheet", type: "Consolidation", intensity: "Low" }
      ]
    };
    setEmergencyPlan(localPlan);
    addToast(`High-yield emergency study sprint configured for ${examTitle}!`, 'success', 'Emergency Mode Active');
    return localPlan;
  };

  // Assignment Actions
  const addAssignment = (assignmentData) => {
    const newAsg = {
      id: `asg-${Date.now()}`,
      status: 'Pending',
      grade: null,
      totalPoints: 100,
      daysLeft: 7,
      ...assignmentData
    };
    setAssignments((prev) => [newAsg, ...prev]);
    addToast(`New assignment "${newAsg.title}" added.`, 'info', 'Assignment Created');
  };

  const submitAssignment = (assignmentId, submissionNote = '') => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === assignmentId) {
          confetti({ particleCount: 50, spread: 60 });
          addToast(`Assignment "${a.title}" submitted successfully for automated neural grading!`, 'success', 'Submission Received');
          addXP(100);
          addActivity(`Submitted assignment: ${a.title}`, 'assignment', '+100 XP', a.course);
          return {
            ...a,
            status: 'Submitted',
            submissionNote,
            submittedAt: new Date().toLocaleDateString()
          };
        }
        return a;
      })
    );
  };

  // Achievement Actions
  const claimAchievement = (achievementId) => {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === achievementId && !ach.unlocked) {
          confetti({ particleCount: 100, spread: 80 });
          addToast(`Unlocked "${ach.title}"! +${ach.xpReward} XP awarded!`, 'trophy', 'Badge Claimed');
          addXP(ach.xpReward);
          addActivity(`Claimed badge: ${ach.title}`, 'achievement', `+${ach.xpReward} XP`);
          return {
            ...ach,
            unlocked: true,
            unlockedAt: 'Just now'
          };
        }
        return ach;
      })
    );
  };

  // Learning World Actions
  const completeMission = (biomeId, missionId) => {
    let missionXP = 150;
    let missionTitle = "Daily Mission";
    setBiomes((prev) =>
      prev.map((b) => {
        if (b.id === biomeId) {
          const updatedMissions = b.dailyMissions.map((m) => {
            if (m.id === missionId && !m.completed) {
              missionXP = m.xp;
              missionTitle = m.title;
              return { ...m, completed: true };
            }
            return m;
          });
          return { ...b, dailyMissions: updatedMissions };
        }
        return b;
      })
    );
    addXP(missionXP);
    addActivity(`Completed Mission: ${missionTitle}`, 'world', `+${missionXP} XP`);
    addToast(`Mission Completed: ${missionTitle} (+${missionXP} XP)`, 'trophy', 'World Progress');
  };

  // Reverse Classroom Actions
  const submitTeachingEvaluation = (questionId, score, evaluationText) => {
    const earnedXP = Math.round(score * 2.5);
    addXP(earnedXP);
    addActivity(`Taught AI Student (Score: ${score}/100)`, 'ai', `+${earnedXP} XP`);
    addToast(`AI Student Cortex-7 learned from your explanation! Mastery score: ${score}%`, 'success', 'Teaching Evaluated');
  };

  // Knowledge Graph & Retention Actions
  const resolveWeakConcept = (conceptId) => {
    setKnowledgeGraph((prev) => {
      const updatedNodes = prev.nodes.map((n) => {
        if (n.id === conceptId) {
          return { ...n, mastery: Math.min(100, n.mastery + 20), status: n.mastery + 20 >= 80 ? 'mastered' : 'in-progress' };
        }
        return n;
      });
      const updatedWeak = prev.weakConcepts.filter((wc) => wc.id !== conceptId);
      return { ...prev, nodes: updatedNodes, weakConcepts: updatedWeak };
    });
    addXP(120);
    addToast(`Concept practice completed! Mastery retention increased.`, 'success', 'Concept Mastered');
    addActivity('Strengthened weak concept through targeted practice', 'study', '+120 XP');
  };

  const toggleCompanion = (force) => {
    setCompanionOpen((prev) => (typeof force === 'boolean' ? force : !prev));
  };

  // Reset to initial demo data
  const resetDemoData = () => {
    setStudent(INITIAL_STUDENT);
    setSkills(INITIAL_SKILLS);
    setCourses(INITIAL_COURSES);
    setTasks(INITIAL_TASKS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setActivities(INITIAL_ACTIVITIES);
    setBiomes(LEARNING_WORLD_BIOMES);
    setKnowledgeGraph(KNOWLEDGE_GRAPH_DATA);
    setReverseQuestions(REVERSE_AI_QUESTIONS);
    setExams(INITIAL_EXAMS);
    setRevisions(INITIAL_REVISIONS);
    setPartners(INITIAL_PARTNERS);
    setDistractions(INITIAL_DISTRACTIONS);
    setEmergencyPlan(null);
    localStorage.clear();
    addToast('Default demo data has been restored.', 'info', 'Data Reset');
  };

  // Computed statistics
  const enrolledCourses = courses.filter((c) => c.enrolled);
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const pendingTasksCount = tasks.filter((t) => !t.completed).length;
  const overdueTasksCount = tasks.filter((t) => !t.completed && (t.dueDate < '2026-11-22' || t.risk === 'High')).length;
  const highRiskTasksCount = tasks.filter((t) => !t.completed && t.risk === 'High').length;
  const pendingAssignmentsCount = assignments.filter((a) => a.status === 'Pending').length;
  const completedAssignmentsCount = assignments.filter((a) => a.status === 'Graded' || a.status === 'Submitted').length;
  const averageProgress = enrolledCourses.length
    ? Math.round(enrolledCourses.reduce((acc, cur) => acc + cur.progress, 0) / enrolledCourses.length)
    : 0;
  const averageExamReadiness = exams.length
    ? Math.round(exams.reduce((acc, cur) => acc + (cur.readinessScore || 0), 0) / exams.length)
    : 0;
  const spacedTopicsDueCount = revisions.filter((r) => r.dueToday).length;

  const login = (role, password) => {
    if (role === 'student') {
      if (password === '1234') {
        setAuthRole('student');
        localStorage.setItem('sv_auth_role', 'student');
        addToast('Welcome back, Alex Mercer! Logged in as Student.', 'success');
        return { success: true, role: 'student', redirect: '/dashboard' };
      }
      return { success: false, error: 'Invalid password. Please try again.' };
    } else if (role === 'teacher') {
      if (password === '0987') {
        setAuthRole('teacher');
        localStorage.setItem('sv_auth_role', 'teacher');
        addToast('Welcome back, Prof. Marcus Vance! Logged in as Teacher.', 'success');
        return { success: true, role: 'teacher', redirect: '/teacher-dashboard' };
      }
      return { success: false, error: 'Invalid password. Please try again.' };
    }
    return { success: false, error: 'Please select a valid role.' };
  };

  const logout = () => {
    setAuthRole(null);
    localStorage.removeItem('sv_auth_role');
    addToast('Logged out successfully.', 'info');
    return true;
  };

  return (
    <StudentContext.Provider
      value={{
        authRole,
        teacher,
        login,
        logout,
        student,
        skills,
        courses,
        tasks,
        assignments,
        achievements,
        activities,
        biomes,
        knowledgeGraph,
        reverseQuestions,
        companionOpen,
        exams,
        revisions,
        partners,
        distractions,
        emergencyPlan,
        hourlyProductivity: HOURLY_PRODUCTIVITY_PATTERN,
        workloadHeatmap: WORKLOAD_HEATMAP_DATA,
        weeklyAnalytics: WEEKLY_ANALYTICS,
        categoryRadar: CATEGORY_RADAR,
        toasts,
        addToast,
        removeToast,
        updateProfile,
        addXP,
        enrollCourse,
        updateCourseProgress,
        addTask,
        editTask,
        deleteTask,
        toggleTaskCompleted,
        toggleSubtask,
        breakdownTaskWithAI,
        acceptRecoveryPlan,
        addExam,
        toggleExamTopic,
        reviewSpacedTopic,
        addRevisionTopic,
        nudgePartner,
        togglePartnerPrivacy,
        toggleSharedGoal,
        logDistraction,
        generateEmergencyPlan,
        addAssignment,
        submitAssignment,
        claimAchievement,
        completeMission,
        submitTeachingEvaluation,
        resolveWeakConcept,
        toggleCompanion,
        resetDemoData,
        stats: {
          enrolledCount: enrolledCourses.length,
          totalCourses: courses.length,
          completedTasksCount,
          totalTasksCount: tasks.length,
          pendingTasksCount,
          overdueTasksCount,
          highRiskTasksCount,
          upcomingExamsCount: exams.length,
          averageExamReadiness,
          spacedTopicsDueCount,
          pendingAssignmentsCount,
          completedAssignmentsCount,
          averageProgress,
          studyHours: student.studyHours,
          streak: student.streak,
          xp: student.xp,
          level: student.level,
          weakConceptsCount: knowledgeGraph.weakConcepts.length,
          unlockedBiomesCount: biomes.filter((b) => b.unlocked).length
        }
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
