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
  CATEGORY_RADAR
} from '../data/demoData';

const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
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

  const [toasts, setToasts] = useState([]);

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

  // Reset to initial demo data
  const resetDemoData = () => {
    setStudent(INITIAL_STUDENT);
    setSkills(INITIAL_SKILLS);
    setCourses(INITIAL_COURSES);
    setTasks(INITIAL_TASKS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setActivities(INITIAL_ACTIVITIES);
    localStorage.clear();
    addToast('Default demo data has been restored.', 'info', 'Data Reset');
  };

  // Computed statistics
  const enrolledCourses = courses.filter((c) => c.enrolled);
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const pendingAssignmentsCount = assignments.filter((a) => a.status === 'Pending').length;
  const completedAssignmentsCount = assignments.filter((a) => a.status === 'Graded' || a.status === 'Submitted').length;
  const averageProgress = enrolledCourses.length
    ? Math.round(enrolledCourses.reduce((acc, cur) => acc + cur.progress, 0) / enrolledCourses.length)
    : 0;

  return (
    <StudentContext.Provider
      value={{
        student,
        skills,
        courses,
        tasks,
        assignments,
        achievements,
        activities,
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
        addAssignment,
        submitAssignment,
        claimAchievement,
        resetDemoData,
        stats: {
          enrolledCount: enrolledCourses.length,
          totalCourses: courses.length,
          completedTasksCount,
          totalTasksCount: tasks.length,
          pendingAssignmentsCount,
          completedAssignmentsCount,
          averageProgress,
          studyHours: student.studyHours,
          streak: student.streak,
          xp: student.xp,
          level: student.level
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
