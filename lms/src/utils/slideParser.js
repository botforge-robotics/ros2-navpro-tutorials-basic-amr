/**
 * slideParser.js
 * 
 * Refined Pedagogical Slide Engine for Instructor Presentation Mode ("PPT").
 * Parses original lesson source directly from lessonsData.json into purposeful,
 * substantive concept slides without empty headings, redundant intro slides,
 * or arbitrary breaks.
 */

export function parseLessonIntoSlides(lesson) {
  if (!lesson) return [];

  const slides = [];

  if (typeof window === 'undefined') return slides;

  const parser = new DOMParser();
  const doc = parser.parseFromString(lesson.html_content || '', 'text/html');

  // Extract Learning Objectives from lesson HTML
  const objectiveItems = Array.from(doc.querySelectorAll('.learning-objective-item'));
  const outcomes = objectiveItems.map(item => {
    const num = item.querySelector('.objective-num-badge')?.textContent?.trim() || '•';
    const text = item.querySelector('.objective-text')?.innerHTML?.trim() || item.textContent?.trim();
    return { num, text };
  });

  // 1. Unified Lesson Launchpad Slide (Combines Title, Meta, Focus, Outcomes & Snapshot)
  slides.push({
    id: `${lesson.id}_launchpad`,
    type: 'title',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    title: lesson.title,
    module: lesson.module,
    duration: lesson.duration,
    focus: lesson.focus,
    outcomes: outcomes.length > 0 ? outcomes : null,
    snapshot: lesson.snapshot || []
  });

  // Interactive Component Portal Definitions
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

  // Helper to check if an HTML fragment contains substantive educational payload
  const isSubstantive = (element) => {
    if (!element) return false;
    const hasCode = !!element.querySelector('pre, code, .code-container');
    const hasImage = !!element.querySelector('img, .lesson-image, svg');
    const hasTable = !!element.querySelector('table');
    const hasCallout = !!element.querySelector('.alert-callout, .callout-card');
    const hasList = !!element.querySelector('ul, ol');
    const textLen = element.textContent.trim().length;

    // Substantive if it contains technical media/code, or at least 160 characters of technical explanation
    return hasCode || hasImage || hasTable || hasCallout || hasList || textLen >= 160;
  };

  // Find all sections or group by <h2>
  let sections = Array.from(doc.querySelectorAll('section'));
  if (sections.length < 2) {
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
    const h2Lower = h2Title.toLowerCase();

    // Skip Section 1 if it is just "Overview & Learning Objectives" (already in Launchpad)
    if (h2Lower.includes('learning objectives') || (h2Lower.includes('overview') && secIdx === 0)) {
      return;
    }

    // Skip duplicate Summary sections (handled by dedicated summary slide at end)
    if (h2Lower.includes('summary') || h2Lower.includes('next steps')) {
      return;
    }

    // Check for Interactive Component Portals in this section
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
      // Direct command slides (no redundant pre-card overview slides)
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
    if (h2Lower.includes('challenge') || h2Lower.includes('student lab') || h2Lower.includes('mission')) {
      // Clean up challenge content
      const challengeClone = section.cloneNode(true);
      const cloneH2 = challengeClone.querySelector('h2');
      if (cloneH2) cloneH2.remove();

      slides.push({
        id: `${lesson.id}_challenge`,
        type: 'challenge',
        lessonNum: lesson.num_str,
        lessonId: lesson.id,
        module: lesson.module,
        sectionTitle: h2Title,
        title: h2Title,
        htmlContent: challengeClone.innerHTML
      });
      return;
    }

    // Check for Subsections / Subtopics (h3)
    const h3Elements = Array.from(section.querySelectorAll('h3'));
    if (h3Elements.length > 0) {
      h3Elements.forEach((h3, h3Idx) => {
        const subtopicTitle = h3.textContent.trim();
        const subElements = [];
        let curr = h3.nextElementSibling;
        
        while (curr && curr.tagName.toLowerCase() !== 'h3' && curr.tagName.toLowerCase() !== 'h2') {
          // Exclude portal root containers since they have dedicated interactive slides
          if (!portalIds.some(p => curr.id === p.id || curr.querySelector(`#${p.id}`))) {
            subElements.push(curr.cloneNode(true));
          }
          curr = curr.nextElementSibling;
        }

        // Test if subtopic has substantive teaching content
        const tempContainer = doc.createElement('div');
        subElements.forEach(el => tempContainer.appendChild(el));

        if (isSubstantive(tempContainer)) {
          slides.push({
            id: `${lesson.id}_sub_${secIdx}_${h3Idx}`,
            type: 'subtopic',
            lessonNum: lesson.num_str,
            lessonId: lesson.id,
            module: lesson.module,
            sectionTitle: h2Title,
            title: subtopicTitle,
            htmlContent: tempContainer.innerHTML
          });
        }
      });
      return;
    }

    // Fallback: Entire section as a concept slide, ONLY if substantive
    const cleanSection = section.cloneNode(true);
    const cleanH2 = cleanSection.querySelector('h2');
    if (cleanH2) cleanH2.remove();
    portalIds.forEach(p => {
      const pNode = cleanSection.querySelector(`#${p.id}`);
      if (pNode) pNode.remove();
    });

    if (isSubstantive(cleanSection)) {
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

  // 2. Interactive Quiz Slides (1 slide per question)
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

  // 3. Lesson Wrap-up & Summary Slide
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
