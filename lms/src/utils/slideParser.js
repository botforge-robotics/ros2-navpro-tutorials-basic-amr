/**
 * slideParser.js
 * 
 * Dynamically parses the original lesson source (lesson object from lessonsData.json)
 * into atomic, presentation-ready concept slides for the Instructor PPT mode.
 * 
 * Slices content so each concept (e.g. mkdir, cd, publisher node, service RPC, URDF viewer)
 * is rendered as an individual fullscreen card with zero desynchronization from the web UI.
 */

export function parseLessonIntoSlides(lesson) {
  if (!lesson) return [];

  const slides = [];

  // 1. Cover / Title Slide
  slides.push({
    id: `${lesson.id}_title`,
    type: 'title',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    title: lesson.title,
    module: lesson.module,
    duration: lesson.duration,
    focus: lesson.focus,
    snapshot: lesson.snapshot || []
  });

  if (typeof window === 'undefined') return slides;

  const parser = new DOMParser();
  const doc = parser.parseFromString(lesson.html_content || '', 'text/html');

  // 2. Learning Objectives & Outcomes Slide
  const objectiveItems = Array.from(doc.querySelectorAll('.learning-objective-item'));
  if (objectiveItems.length > 0) {
    const outcomes = objectiveItems.map(item => {
      const num = item.querySelector('.objective-num-badge')?.textContent?.trim() || '•';
      const text = item.querySelector('.objective-text')?.innerHTML?.trim() || item.textContent?.trim();
      return { num, text };
    });

    slides.push({
      id: `${lesson.id}_outcomes`,
      type: 'outcomes',
      lessonNum: lesson.num_str,
      lessonId: lesson.id,
      module: lesson.module,
      sectionTitle: 'Learning Objectives & Core Outcomes',
      title: 'Lesson Objectives & Expected Outcomes',
      outcomes
    });
  }

  // 3. Section Walkthrough & Concept Slicing
  // Find all top-level sections or group by h2
  let sections = Array.from(doc.querySelectorAll('section'));
  if (sections.length < 2) {
    // If no <section> containers, segment body by <h2>
    const h2Elements = Array.from(doc.querySelectorAll('h2'));
    sections = h2Elements.map((h2) => {
      const container = doc.createElement('section');
      container.id = h2.id || '';
      container.appendChild(h2.cloneNode(true));
      
      let curr = h2.nextElementSibling;
      while (curr && curr.tagName.toLowerCase() !== 'h2') {
        const next = curr.nextElementSibling;
        container.appendChild(curr.cloneNode(true));
        curr = next;
      }
      return container;
    });
  }

  sections.forEach((section, secIdx) => {
    const h2 = section.querySelector('h2');
    const h2Title = h2 ? h2.textContent.trim() : `Section ${secIdx + 1}`;
    
    // Skip Section 1 if it only duplicated the learning outcomes
    if (secIdx === 0 && h2Title.toLowerCase().includes('learning objectives') && objectiveItems.length > 0) {
      // Check if there is introductory text before or after objectives
      const nonObjP = Array.from(section.querySelectorAll('p')).filter(p => !p.closest('.learning-objective-item'));
      if (nonObjP.length > 0 && nonObjP.some(p => p.textContent.trim().length > 30)) {
        slides.push({
          id: `${lesson.id}_sec_${secIdx}_intro`,
          type: 'concept',
          lessonNum: lesson.num_str,
          lessonId: lesson.id,
          module: lesson.module,
          sectionTitle: h2Title,
          title: 'Curriculum Briefing & Overview',
          htmlContent: nonObjP.map(p => p.outerHTML).join('\n')
        });
      }
      return;
    }

    // Check for Interactive Component Portal roots
    const portalIds = [
      { id: 'interactive-permission-calculator-root', key: 'permission', title: 'Interactive Permission Calculator' },
      { id: 'turtlesim-teleop-flow-root', key: 'turtlesim', title: 'Turtlesim Teleop & Graph Flow' },
      { id: 'package-structure-flow-root', key: 'package', title: 'ROS 2 Package Structure & Filesystem' },
      { id: 'pubsub-flow-root', key: 'pubsub', title: 'Publisher / Subscriber Message Flow' },
      { id: 'service-flow-root', key: 'service', title: 'Service Server & Client Synchronous RPC' },
      { id: 'action-flow-root', key: 'action', title: 'Action 3-Tier Execution Flow' },
      { id: 'interactive-urdf-viewer-root', key: 'urdf', title: '3D URDF & Kinematics Visualizer' },
      { id: 'interactive-inertia-calculator-root', key: 'inertia', title: 'URDF Inertia Tensor Calculator' },
      { id: 'log-levels-circle-root', key: 'loglevels', title: 'ROS 2 Logging Severity Hierarchy' }
    ];

    portalIds.forEach(portal => {
      if (section.querySelector(`#${portal.id}`)) {
        slides.push({
          id: `${lesson.id}_interactive_${portal.key}`,
          type: 'interactive',
          interactiveKey: portal.key,
          lessonNum: lesson.num_str,
          lessonId: lesson.id,
          module: lesson.module,
          sectionTitle: h2Title,
          title: portal.title
        });
      }
    });

    // Check for Command Cards (Atomic Concepts like pwd, ls, cd, mkdir, chmod, ps)
    const cmdCards = Array.from(section.querySelectorAll('.cmd-card'));
    if (cmdCards.length > 0) {
      // Intro slide for the command group if explanation exists before first card
      const preCardPs = [];
      let sibling = section.firstElementChild;
      while (sibling && !sibling.classList.contains('cmd-card')) {
        if (sibling.tagName.toLowerCase() !== 'h2' && sibling.textContent.trim().length > 20) {
          preCardPs.push(sibling.outerHTML);
        }
        sibling = sibling.nextElementSibling;
      }

      if (preCardPs.length > 0) {
        slides.push({
          id: `${lesson.id}_sec_${secIdx}_cmd_intro`,
          type: 'concept',
          lessonNum: lesson.num_str,
          lessonId: lesson.id,
          module: lesson.module,
          sectionTitle: h2Title,
          title: `${h2Title} - Overview`,
          htmlContent: preCardPs.join('\n')
        });
      }

      // Each cmd-card gets its OWN atomic concept slide
      cmdCards.forEach((card, cardIdx) => {
        const badge = card.querySelector('.cmd-badge')?.textContent?.trim() || '';
        const title = card.querySelector('.cmd-title')?.textContent?.trim() || `Command ${cardIdx + 1}`;
        const syntax = card.querySelector('.cmd-syntax')?.textContent?.replace(/^Syntax:\s*/i, '').trim() || '';
        const desc = card.querySelector('.cmd-desc')?.innerHTML?.trim() || '';
        const codeElem = card.querySelector('pre code');
        const code = codeElem ? codeElem.textContent : '';
        const lang = card.querySelector('.code-lang-tag')?.textContent?.trim() || 'bash';

        slides.push({
          id: `${lesson.id}_cmd_${cardIdx}_${badge.replace(/[^a-zA-Z0-9]/g, '_')}`,
          type: 'command',
          lessonNum: lesson.num_str,
          lessonId: lesson.id,
          module: lesson.module,
          sectionTitle: h2Title,
          badge,
          title,
          syntax,
          desc,
          code,
          lang,
          htmlContent: card.outerHTML
        });
      });
      return;
    }

    // Check for File Edit Steps (Step-by-step code files: Lesson 5, 6, 7, 8, etc.)
    const fileSteps = Array.from(section.querySelectorAll('.file-edit-step'));
    if (fileSteps.length > 0) {
      // Intro slide before steps
      const preStepPs = [];
      let sibling = section.firstElementChild;
      while (sibling && !sibling.classList.contains('file-edit-step')) {
        if (sibling.tagName.toLowerCase() !== 'h2' && sibling.textContent.trim().length > 20) {
          preStepPs.push(sibling.outerHTML);
        }
        sibling = sibling.nextElementSibling;
      }

      if (preStepPs.length > 0) {
        slides.push({
          id: `${lesson.id}_sec_${secIdx}_step_intro`,
          type: 'concept',
          lessonNum: lesson.num_str,
          lessonId: lesson.id,
          module: lesson.module,
          sectionTitle: h2Title,
          title: `${h2Title} - Implementation Overview`,
          htmlContent: preStepPs.join('\n')
        });
      }

      // Each step gets its OWN dedicated code walkthrough slide
      fileSteps.forEach((step, stepIdx) => {
        const stepNum = step.querySelector('.step-num-pill')?.textContent?.trim() || `Step ${stepIdx + 1}`;
        const title = step.querySelector('.file-edit-step-title')?.textContent?.trim() || `Step ${stepIdx + 1}`;
        const desc = step.querySelector('.step-description')?.innerHTML?.trim() || '';
        const codeElem = step.querySelector('pre code');
        const code = codeElem ? codeElem.textContent : '';
        const lang = step.querySelector('.code-lang-tag')?.textContent?.trim() || 'python';
        const breakdown = step.querySelector('.code-breakdown-card')?.outerHTML || '';

        slides.push({
          id: `${lesson.id}_step_${stepIdx}`,
          type: 'code_step',
          lessonNum: lesson.num_str,
          lessonId: lesson.id,
          module: lesson.module,
          sectionTitle: h2Title,
          badge: stepNum,
          title: title.replace(stepNum, '').trim() || title,
          desc,
          code,
          lang,
          breakdown,
          htmlContent: step.outerHTML
        });
      });
      return;
    }

    // Check for Hands-on Student Challenge Section
    if (h2Title.toLowerCase().includes('challenge') || h2Title.toLowerCase().includes('student lab') || h2Title.toLowerCase().includes('mission')) {
      slides.push({
        id: `${lesson.id}_challenge`,
        type: 'challenge',
        lessonNum: lesson.num_str,
        lessonId: lesson.id,
        module: lesson.module,
        sectionTitle: h2Title,
        title: h2Title,
        htmlContent: section.innerHTML
      });
      return;
    }

    // Check for Subsections / Subtopics (h3)
    const h3Elements = Array.from(section.querySelectorAll('h3'));
    if (h3Elements.length > 0) {
      // Collect introductory content before first h3
      const preH3Ps = [];
      let sibling = section.firstElementChild;
      while (sibling && sibling.tagName.toLowerCase() !== 'h3') {
        if (sibling.tagName.toLowerCase() !== 'h2' && sibling.textContent.trim().length > 15) {
          preH3Ps.push(sibling.outerHTML);
        }
        sibling = sibling.nextElementSibling;
      }

      if (preH3Ps.length > 0) {
        slides.push({
          id: `${lesson.id}_sec_${secIdx}_intro`,
          type: 'concept',
          lessonNum: lesson.num_str,
          lessonId: lesson.id,
          module: lesson.module,
          sectionTitle: h2Title,
          title: `${h2Title} - Overview`,
          htmlContent: preH3Ps.join('\n')
        });
      }

      // Split by each h3 into atomic subtopic slides
      h3Elements.forEach((h3, h3Idx) => {
        const subtopicTitle = h3.textContent.trim();
        const subElements = [];
        let curr = h3.nextElementSibling;
        while (curr && curr.tagName.toLowerCase() !== 'h3' && curr.tagName.toLowerCase() !== 'h2') {
          // Ignore portal placeholders since they have dedicated slides
          if (!portalIds.some(p => curr.id === p.id || curr.querySelector(`#${p.id}`))) {
            subElements.push(curr.outerHTML);
          }
          curr = curr.nextElementSibling;
        }

        if (subElements.length > 0) {
          slides.push({
            id: `${lesson.id}_sub_${secIdx}_${h3Idx}`,
            type: 'subtopic',
            lessonNum: lesson.num_str,
            lessonId: lesson.id,
            module: lesson.module,
            sectionTitle: h2Title,
            title: subtopicTitle,
            htmlContent: subElements.join('\n')
          });
        }
      });
      return;
    }

    // Default: Section as a concept slide
    // Filter out portal roots to avoid duplicating interactive slides
    const cleanSection = section.cloneNode(true);
    const cleanH2 = cleanSection.querySelector('h2');
    if (cleanH2) cleanH2.remove();
    portalIds.forEach(p => {
      const pNode = cleanSection.querySelector(`#${p.id}`);
      if (pNode) pNode.remove();
    });

    if (cleanSection.textContent.trim().length > 10) {
      slides.push({
        id: `${lesson.id}_sec_${secIdx}`,
        type: 'concept',
        lessonNum: lesson.num_str,
        lessonId: lesson.id,
        module: lesson.module,
        sectionTitle: h2Title,
        title: h2Title,
        htmlContent: cleanSection.innerHTML
      });
    }
  });

  // 4. Interactive Quiz Slides (1 slide per question)
  if (Array.isArray(lesson.quizzes) && lesson.quizzes.length > 0) {
    lesson.quizzes.forEach((quiz, qIdx) => {
      const correctIdx = quiz.correct !== undefined 
        ? quiz.correct 
        : (quiz.answer !== undefined ? quiz.answer : (quiz.correct_index !== undefined ? quiz.correct_index : 0));
      
      const questionPrompt = quiz.prompt || quiz.question || `Assessment Question ${qIdx + 1}`;

      slides.push({
        id: `${lesson.id}_quiz_${qIdx}`,
        type: 'quiz',
        lessonNum: lesson.num_str,
        lessonId: lesson.id,
        module: lesson.module,
        sectionTitle: 'Knowledge Check & Interactive Assessment',
        title: `Question ${qIdx + 1} of ${lesson.quizzes.length}`,
        quizIndex: qIdx + 1,
        totalQuizzes: lesson.quizzes.length,
        question: questionPrompt,
        options: quiz.options || [],
        answer: correctIdx,
        explanation: quiz.explanation || ''
      });
    });
  }

  // 5. Lesson Wrap-up & Summary Slide
  slides.push({
    id: `${lesson.id}_summary`,
    type: 'summary',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Summary & Next Steps',
    title: `Lesson ${lesson.num_str} Summary & Key Takeaways`,
    nextId: lesson.next_id,
    focus: lesson.focus
  });

  return slides;
}
