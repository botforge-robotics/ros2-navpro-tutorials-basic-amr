import React from 'react';

/**
 * Registry of fully native React Lesson Components.
 * Any lesson registered here is rendered as a first-class React component with
 * dynamic code-splitting via React.lazy().
 * Unregistered lessons fall back to lesson.html_content from lessonsData.json.
 */
export const lessonRegistry = {
  // Lesson 02: ROS 2 Architecture Interactive (Already a full React component)
  'lesson_02': React.lazy(() => 
    import('../components/Ros2ArchitectureInteractive').then(m => ({ default: m.Ros2ArchitectureInteractive }))
  ),

  // Lesson 03: Turtlesim Simulation & Essential ROS 2 CLI Tools
  'lesson_03': React.lazy(() => import('./Lesson03'))
};

export default lessonRegistry;
