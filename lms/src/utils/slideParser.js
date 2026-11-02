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

  // Helper to trim verbose output dumps in multi-usage command cards (keeps all usages on 1 slide without scroll)
  const formatCommandCodeForSlide = (rawCode) => {
    if (!rawCode) return '';
    const lines = rawCode.trim().split('\n');
    if (lines.length <= 14) return rawCode.trim();

    const cleaned = [];
    let skipOutput = false;
    let skipHeredoc = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const s = line.trim();

      // Collapse huge EOF heredocs in bash commands (like in chmod script creation)
      if (s.includes('cat <<') && s.includes('EOF')) {
        skipHeredoc = true;
        cleaned.push('# [Populate script with diagnostic logic]');
        cleaned.push('cat << \'EOF\' > sensor_diagnostics.sh ... EOF');
        continue;
      }
      if (skipHeredoc) {
        if (s === 'EOF') skipHeredoc = false;
        continue;
      }

      // Detect mock output blocks and skip multi-line terminal dumps
      if (/^#\s*(?:Expected\s+)?Output/i.test(s) || /^#\s*Notice/i.test(s) || /^#\s*Displays complete/i.test(s)) {
        skipOutput = true;
        continue;
      }
      if (skipOutput) {
        if (s.startsWith('#') && !/^#\s*(?:\d+\.|\bStep|\bPhase)/i.test(s)) {
          continue;
        } else if (s.startsWith('#')) {
          skipOutput = false;
        } else if (!s) {
          skipOutput = false;
          continue;
        } else {
          skipOutput = false;
        }
      }

      // Skip non-essential commentary lines or temporary verification checks that push code past limits
      if (s.startsWith('# (Notice:') || s.startsWith('# Without -p') || s.startsWith('# With -p') || s.startsWith('# Notice your prompt')) {
        continue;
      }
      if (s.startsWith('# Clean up temporary practice folders:') || (s.startsWith('rm -rf') && s.includes('practice'))) {
        continue;
      }
      if (s.startsWith('# Verify it was created:') || s.startsWith('# Verify all directories now exist:') || s.startsWith('# Verify the structured')) {
        continue;
      }
      // Remove standalone intermediate ls or rm in multi-step tutorials
      if ((s === 'ls' || s.startsWith('ls ~/robotics_lab') || s.startsWith('rm -rf my_robot_test')) && lines.length > 15) {
        continue;
      }

      cleaned.push(line);
    }

    let result = cleaned.join('\n').trim();
    result = result.replace(/\n{3,}/g, '\n\n');
    return result;
  };

  // Helper to trim code blocks for slide presentations (no vertical scrolling)
  const trimCodeForPresentation = (rawCode) => {
    if (!rawCode) return '';
    const lines = rawCode.split('\n');
    if (lines.length <= 16) return rawCode;

    // Keep the top 14 lines and append concise note
    const trimmed = lines.slice(0, 14);
    trimmed.push('# ... [Full complete implementation available in Web LMS] ...');
    return trimmed.join('\n');
  };

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

  // Special Pedagogical Architecture for Lesson 02: ROS 2 Overview & Environment Setup
  if (lesson.id === '02' || lesson.num_str === '02') {
    buildLesson02Slides(doc, lesson, slides);
  } else {
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

    // Check for Command Cards (Keep all usages on 1 single slide without vertical scrolling)
    const cmdCards = Array.from(section.querySelectorAll('.cmd-card'));
    if (cmdCards.length > 0) {
      cmdCards.forEach((card, cardIdx) => {
        const badge = card.querySelector('.cmd-badge')?.textContent?.trim() || '';
        const title = card.querySelector('.cmd-title')?.textContent?.trim() || `Command ${cardIdx + 1}`;
        const syntax = card.querySelector('.cmd-syntax')?.textContent?.replace(/^Syntax:\s*/i, '').trim() || '';
        const desc = card.querySelector('.cmd-desc')?.innerHTML?.trim() || '';
        const codeElem = card.querySelector('pre code');
        const rawCode = codeElem ? codeElem.textContent.trim() : '';
        const lang = card.querySelector('.code-lang-tag')?.textContent?.trim() || 'bash';

        slides.push({
          id: `${lesson.id}_cmd_${cardIdx}_${badge.replace(/[^a-zA-Z0-9]/g, '_')}`,
          type: 'command',
          lessonNum: lesson.num_str,
          lessonId: lesson.id,
          module: lesson.module,
          sectionTitle: h2Title,
          badge,
          baseBadge: badge,
          title,
          baseTitle: title,
          syntax,
          desc,
          code: formatCommandCodeForSlide(rawCode),
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
        const cleanTitle = title.replace(stepNum, '').trim() || title;
        const desc = step.querySelector('.step-description')?.innerHTML?.trim() || '';
        const codeElem = step.querySelector('pre code');
        const code = codeElem ? codeElem.textContent : '';
        const lang = step.querySelector('.code-lang-tag')?.textContent?.trim() || 'python';
        const breakdownCard = step.querySelector('.code-breakdown-card');

        // Slide A: Code Implementation (Trimmed for explanation, zero scrolling)
        slides.push({
          id: `${lesson.id}_step_${stepIdx}_code`,
          type: 'code_step',
          lessonNum: lesson.num_str,
          lessonId: lesson.id,
          module: lesson.module,
          sectionTitle: h2Title,
          badge: stepNum,
          title: `${cleanTitle} (Code Implementation)`,
          desc,
          code: trimCodeForPresentation(code),
          lang,
          breakdown: null, // Separated to next slide to eliminate vertical scrolling
          htmlContent: step.outerHTML
        });

        // Slide B: Code Architecture & Line Breakdown (if present)
        if (breakdownCard && breakdownCard.textContent.trim().length > 30) {
          const cleanBreakdown = breakdownCard.cloneNode(true);
          slides.push({
            id: `${lesson.id}_step_${stepIdx}_breakdown`,
            type: 'step_breakdown',
            lessonNum: lesson.num_str,
            lessonId: lesson.id,
            module: lesson.module,
            sectionTitle: h2Title,
            badge: `${stepNum} Breakdown`,
            title: `${cleanTitle} — Core Mechanics Breakdown`,
            htmlContent: cleanBreakdown.outerHTML
          });
        }
      });
      return;
    }

    // Check for Hands-on Student Challenge Section
    if (h2Lower.includes('challenge') || h2Lower.includes('student lab') || h2Lower.includes('mission')) {
      const challengeBriefing = doc.createElement('div');
      challengeBriefing.className = 'ppt-challenge-briefing';

      // 1. Mission Intro Briefing Paragraph (trimmed for presentation clarity)
      const introP = section.querySelector('p');
      if (introP) {
        const pClone = introP.cloneNode(true);
        const text = pClone.textContent.trim();
        if (text.length > 220) {
          const sentences = text.split(/(?<=[.!?])\s+/);
          pClone.textContent = sentences.slice(0, 2).join(' ');
        }
        challengeBriefing.appendChild(pClone);
      }

      // 2. Mission Requirements / Targets Checklist (capped to 4 core targets)
      const targetsCard = section.querySelector('.challenge-targets, .mission-requirements, .alert ol, .alert ul, ul.checklist, ol.checklist, .callout-card ul, .callout-card ol') || section.querySelector('ol, ul');
      if (targetsCard) {
        const cleanCard = targetsCard.cloneNode(true);
        cleanCard.querySelectorAll('pre, .code-container').forEach(el => el.remove());
        const listItems = Array.from(cleanCard.querySelectorAll('li'));
        if (listItems.length > 4) {
          const trimmedList = doc.createElement(cleanCard.tagName.toLowerCase() === 'ol' ? 'ol' : 'ul');
          trimmedList.className = 'challenge-targets-list';
          listItems.slice(0, 4).forEach(li => trimmedList.appendChild(li.cloneNode(true)));
          const moreLi = doc.createElement('li');
          moreLi.className = 'challenge-targets-more';
          moreLi.innerHTML = `<em>+ ${listItems.length - 4} additional verification steps detailed in Web LMS</em>`;
          trimmedList.appendChild(moreLi);
          challengeBriefing.appendChild(trimmedList);
        } else if (listItems.length > 0) {
          challengeBriefing.appendChild(cleanCard);
        }
      }

      // 3. Artifact / Target Script Hint
      const scriptMatch = section.textContent.match(/[\w_]+\.(?:sh|py|launch\.py|yaml)/);
      if (scriptMatch) {
        const artifactDiv = doc.createElement('div');
        artifactDiv.className = 'challenge-artifact-hint';
        artifactDiv.innerHTML = `<div class="mission-brief-footer"><span class="mission-file-pill">🎯 Target Artifact: <code>${scriptMatch[0]}</code></span><span class="mission-lms-tag">⚡ Follow step-by-step guidance & validation scripts in Web LMS</span></div>`;
        challengeBriefing.appendChild(artifactDiv);
      }

      slides.push({
        id: `${lesson.id}_challenge`,
        type: 'challenge',
        lessonNum: lesson.num_str,
        lessonId: lesson.id,
        module: lesson.module,
        sectionTitle: h2Title,
        title: h2Title,
        htmlContent: challengeBriefing.innerHTML
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

        if (!isSubstantive(tempContainer)) return;

        // Check if subtopic has a large list with long items (> 450 chars)
        const majorList = tempContainer.querySelector('ol, ul');
        const listItems = majorList ? Array.from(majorList.querySelectorAll(':scope > li')) : [];

        if (listItems.length >= 2 && majorList.textContent.trim().length > 450) {
          // Emit Overview with pre-list content
          const introContainer = doc.createElement('div');
          let child = tempContainer.firstElementChild;
          while (child && child !== majorList) {
            introContainer.appendChild(child.cloneNode(true));
            child = child.nextElementSibling;
          }

          if (introContainer.textContent.trim().length > 30) {
            slides.push({
              id: `${lesson.id}_sub_${secIdx}_${h3Idx}_intro`,
              type: 'subtopic',
              lessonNum: lesson.num_str,
              lessonId: lesson.id,
              module: lesson.module,
              sectionTitle: h2Title,
              title: `${subtopicTitle}: Overview`,
              htmlContent: introContainer.innerHTML
            });
          }

          // Split each list item into its own slide to eliminate vertical scrolling
          listItems.forEach((li, liIdx) => {
            const liContainer = doc.createElement('div');
            liContainer.className = 'split-list-item-slide';
            const strong = li.querySelector('strong, h4, h5');
            const itemHeading = strong ? strong.textContent.trim() : `Part ${liIdx + 1}`;
            liContainer.appendChild(li.cloneNode(true));

            slides.push({
              id: `${lesson.id}_sub_${secIdx}_${h3Idx}_li${liIdx}`,
              type: 'subtopic',
              lessonNum: lesson.num_str,
              lessonId: lesson.id,
              module: lesson.module,
              sectionTitle: h2Title,
              title: `${subtopicTitle}: ${itemHeading}`,
              htmlContent: liContainer.innerHTML
            });
          });
        } else {
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
      const hasImage = !!cleanSection.querySelector('img, svg, .lesson-image');
      const hasTable = !!cleanSection.querySelector('table, .table-responsive');

      if (hasImage && hasTable) {
        // Merge into a single 2-column slide: Left = Large Diagram, Right = Shortcuts Table
        const partA = doc.createElement('div');
        const partB = doc.createElement('div');
        
        let foundTable = false;
        Array.from(cleanSection.children).forEach(child => {
          if (child.querySelector('table') || child.tagName.toLowerCase() === 'table' || child.classList.contains('table-responsive')) {
            foundTable = true;
          }
          if (!foundTable) {
            partA.appendChild(child.cloneNode(true));
          } else {
            partB.appendChild(child.cloneNode(true));
          }
        });

        slides.push({
          id: `${lesson.id}_sec_${secIdx}`,
          type: 'concept',
          lessonNum: lesson.num_str,
          lessonId: lesson.id,
          module: lesson.module,
          sectionTitle: h2Title,
          badge: '📟 Multi-Terminal Grid',
          title: h2Title,
          htmlContent: `
            <div class="terminator-merged-slide-layout">
              <div class="term-left-col">
                ${partA.innerHTML}
              </div>
              <div class="term-right-col">
                <div class="term-shortcuts-header">
                  <span class="shortcuts-badge">⌨️ Essential Shortcuts</span>
                </div>
                ${partB.innerHTML}
              </div>
            </div>
          `
        });
      } else {
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
    }
  });
  }

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

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 02:
 * ROS 2 Overview & Environment Setup.
 * Replaces fragmented 47-slide micro-splits with executive-quality,
 * substantive overviews, larger visuals, and narrative story slides.
 */
function buildLesson02Slides(doc, lesson, slides) {
  // 1. Prerequisites Overview
  slides.push({
    id: `${lesson.id}_prerequisites`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Hardware and Software Prerequisites',
    badge: '📋 Prerequisites',
    title: '2. Hardware & Software Prerequisites',
    htmlContent: `
      <div class="deck-prereq-container">
        <p>Before launching our robotics software stack, verify that your host system meets the required baseline for containerized simulation and real-time middleware:</p>
        <div class="prereq-grid-cards">
          <div class="prereq-card">
            <div class="prereq-card-header"><span class="prereq-icon">🐧</span><strong>Operating System</strong></div>
            <p><strong>Ubuntu 24.04 LTS (Noble Numbat)</strong>. Clean environment running natively or within containerized Docker / Podman runtime.</p>
          </div>
          <div class="prereq-card">
            <div class="prereq-card-header"><span class="prereq-icon">🤖</span><strong>Robotics Stack</strong></div>
            <p><strong>ROS 2 Jazzy Jalisco</strong> (Long-Term Support through 2029) with complete Desktop suite and build tooling (<code>colcon</code>).</p>
          </div>
          <div class="prereq-card">
            <div class="prereq-card-header"><span class="prereq-icon">⚡</span><strong>Compute & Memory</strong></div>
            <p><strong>Minimum 8 GB RAM</strong> (16 GB recommended for Gazebo physics simulation) and 4+ CPU cores with hardware virtualization.</p>
          </div>
          <div class="prereq-card">
            <div class="prereq-card-header"><span class="prereq-icon">🌐</span><strong>Networking & Ports</strong></div>
            <p>Dedicated port exposure for interactive services: <strong>Port 6080</strong> (noVNC Desktop GUI) and <strong>Port 8443</strong> (In-Browser VS Code IDE).</p>
          </div>
        </div>
      </div>
    `
  });

  // 2. Section 3.1: All in ONE slide with larger anatomy image and 3 core ingredients
  slides.push({
    id: `${lesson.id}_sec3_1_robot_ingredients`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Robotics Fundamentals & ROS 2 Architecture',
    badge: '🤖 Core Concept',
    title: '3.1 What is a Robot? & The Three Core Ingredients',
    htmlContent: `
      <div class="robot-ingredients-slide-layout">
        <div class="ingredients-visual-col">
          <div class="anatomy-image-wrap">
            <img src="assets/images/robot_anatomy_ingredients.png" alt="AMR Anatomy Cutaway" class="ingredients-hero-img" />
          </div>
          <div class="ingredients-def-badge">
            <strong>Robot Definition:</strong> A programmable machine capable of sensing its physical environment, making cognitive decisions, and executing autonomous actions.
          </div>
        </div>
        <div class="ingredients-cards-col">
          <div class="ingredient-card ingredient-perception">
            <div class="ingredient-header">
              <span class="ingredient-icon">👁️</span>
              <div class="ingredient-title-group">
                <span class="ingredient-name">1. Perception</span>
                <span class="ingredient-role">The Robot's Eyes & Ears</span>
              </div>
            </div>
            <p class="ingredient-desc">Senses physical reality. Captures environmental telemetry via 2D/3D LiDAR, stereo cameras, depth sensors, IMU, and wheel odometry.</p>
          </div>
          <div class="ingredient-card ingredient-decision">
            <div class="ingredient-header">
              <span class="ingredient-icon">🧠</span>
              <div class="ingredient-title-group">
                <span class="ingredient-name">2. Decision Making</span>
                <span class="ingredient-role">The Robot's Brain</span>
              </div>
            </div>
            <p class="ingredient-desc">Computes state & trajectory. Fuses sensor telemetry (SLAM), constructs obstacle costmaps, computes collision-free paths (Nav2), and coordinates behaviors.</p>
          </div>
          <div class="ingredient-card ingredient-action">
            <div class="ingredient-header">
              <span class="ingredient-icon">⚡</span>
              <div class="ingredient-title-group">
                <span class="ingredient-name">3. Action</span>
                <span class="ingredient-role">The Robot's Muscles</span>
              </div>
            </div>
            <p class="ingredient-desc">Executes physical movement. Converts computed velocity commands (<code>/cmd_vel</code>) into motor torques, differential steering, and physical actuators.</p>
          </div>
        </div>
      </div>
    `
  });

  // 3. Section 3.2: Story of a Robotics Developer (4 steps each on dedicated slide + core solution)
  // Step 1: The Dream
  slides.push({
    id: `${lesson.id}_sec3_2_step1`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Robotics Fundamentals & ROS 2 Architecture',
    badge: '🎬 Story Step 1',
    title: '3.2 Story: Step 1 — The Dream: Autonomous Medicine Delivery Robot',
    htmlContent: `
      <div class="story-step-slide-layout">
        <div class="story-visual-col">
          <img src="assets/images/story_step1_dream.jpg" alt="Step 1: The Dream" class="story-step-hero-img" />
          <span class="story-step-caption">The Goal: Autonomous Hospital Medicine Delivery</span>
        </div>
        <div class="story-narrative-col">
          <div class="story-quote-card">
            <div class="story-quote-tag">✨ The Ambition</div>
            <p class="story-quote-lead">"Someday, a student/engineer starts an ambitious robotics project: She wants to build an Autonomous Medicine Delivery Robot to safely transport hospital supplies directly to patient beds."</p>
          </div>
          <div class="story-insight-box">
            <h4 class="story-insight-title">The Initial Discovery</h4>
            <p>Soon, she discovers that robotics is immensely multifaceted. Building robust autonomy requires mastering hardware electronics, real-time control, sensor fusion, and inter-process communication.</p>
            <div class="story-pill-row">
              <span class="story-pill">🏥 Medicine Delivery</span>
              <span class="story-pill">⚡ Autonomous Nav</span>
              <span class="story-pill">⏳ Multi-Year Journey</span>
            </div>
          </div>
        </div>
      </div>
    `
  });

  // Step 2: The Plumbing Trap
  slides.push({
    id: `${lesson.id}_sec3_2_step2`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Robotics Fundamentals & ROS 2 Architecture',
    badge: '🎬 Story Step 2',
    title: '3.2 Story: Step 2 — The Plumbing Trap: LiDAR, Cameras, Motors & Sockets',
    htmlContent: `
      <div class="story-step-slide-layout">
        <div class="story-visual-col">
          <img src="assets/images/story_step2_plumbing.jpg" alt="Step 2: The Plumbing Trap" class="story-step-hero-img" />
          <span class="story-step-caption">The Reality: Drowning in Low-Level Drivers & Sockets</span>
        </div>
        <div class="story-narrative-col">
          <div class="story-quote-card">
            <div class="story-quote-tag warning-tag">⚠️ The Plumbing Trap</div>
            <p class="story-quote-lead">"All her engineering time is consumed by low-level plumbing instead of autonomous navigation logic."</p>
          </div>
          <div class="story-insight-box">
            <h4 class="story-insight-title">Four Vicious Technical Bottlenecks</h4>
            <ul class="story-trap-list">
              <li><strong>Sensor Drivers:</strong> Writing custom C parsers to extract distances from LiDAR.</li>
              <li><strong>Vision Buffers:</strong> Decoding raw USB/MIPI video frames into memory.</li>
              <li><strong>Motor PWM:</strong> Hacking microcontroller serial protocols to spin wheels.</li>
              <li><strong>IPC Glue:</strong> Writing raw POSIX sockets to sync independent processes.</li>
            </ul>
            <p class="story-footer-note"><em>Result: Months pass without writing a single line of hospital delivery navigation code.</em></p>
          </div>
        </div>
      </div>
    `
  });

  // Step 3: Goal Abandoned
  slides.push({
    id: `${lesson.id}_sec3_2_step3`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Robotics Fundamentals & ROS 2 Architecture',
    badge: '🎬 Story Step 3',
    title: '3.2 Story: Step 3 — Goal Abandoned: Just an RC Car',
    htmlContent: `
      <div class="story-step-slide-layout">
        <div class="story-visual-col">
          <img src="assets/images/story_step3_burnout.jpg" alt="Step 3: Goal Abandoned" class="story-step-hero-img" />
          <span class="story-step-caption">Project Deadline: Glorified RC Car & Abandoned Prototype</span>
        </div>
        <div class="story-narrative-col">
          <div class="story-quote-card">
            <div class="story-quote-tag danger-tag">🛑 The Outcome</div>
            <p class="story-quote-lead">"The project deadline arrives (a 2–3 year PhD timeframe). No real progress was ever made on autonomous navigation."</p>
          </div>
          <div class="story-insight-box">
            <h4 class="story-insight-title">The Engineering Burnout</h4>
            <p>So much energy was exhausted building communication plumbing from scratch that the core project ambition—an autonomous medicine delivery AMR—was abandoned.</p>
            <div class="story-burnout-result">
              <strong>Final Deliverable:</strong> All she managed to build was getting motors to spin using a hacked handheld remote control—a glorified RC car. The robot sits dormant in the lab.
            </div>
          </div>
        </div>
      </div>
    `
  });

  // Step 4: The Cycle Repeats
  slides.push({
    id: `${lesson.id}_sec3_2_step4`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Robotics Fundamentals & ROS 2 Architecture',
    badge: '🎬 Story Step 4',
    title: '3.2 Story: Step 4 — The Vicious Cycle: Starting From Scratch Again',
    htmlContent: `
      <div class="story-step-slide-layout">
        <div class="story-visual-col">
          <img src="assets/images/story_step4_cycle.jpg" alt="Step 4: Another Guy Starts" class="story-step-hero-img" />
          <span class="story-step-caption">The Cycle Repeats: Incompatible Code & Wasted Years</span>
        </div>
        <div class="story-narrative-col">
          <div class="story-quote-card">
            <div class="story-quote-tag cycle-tag">🔄 The Vicious Cycle</div>
            <p class="story-quote-lead">"Weeks later, another developer wants to build a Food Delivery Robot. He finds her old code online, hoping to reuse it."</p>
          </div>
          <div class="story-insight-box">
            <h4 class="story-insight-title">The Non-Standardization Wall</h4>
            <p>Because her software was built without any standard middleware architecture, it is completely hardcoded, undocumented, and incompatible with his sensors.</p>
            <div class="story-cycle-footer">
              <strong>The Tragic Consequence:</strong> He cannot reuse anything. He has to start writing low-level drivers and custom IPC from absolute zero all over again!
            </div>
          </div>
        </div>
      </div>
    `
  });

  // Step 5: Core Solution
  slides.push({
    id: `${lesson.id}_sec3_2_core_solution`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Robotics Fundamentals & ROS 2 Architecture',
    badge: '💡 Core Solution',
    title: '3.2 Why We Need a Standard: The Core Problem in Robotics Development',
    htmlContent: `
      <div class="story-core-solution-layout">
        <div class="core-problem-box">
          <div class="problem-box-header">
            <span class="problem-badge">⚠️ The Fundamental Industry Bottleneck</span>
          </div>
          <p class="problem-lead-text">"Many people who work in robot software development don't actually develop robotics applications (such as medicine or food delivery). They spend years building custom motor drivers and low-level frameworks that end up non-reusable, unsupported, and quickly forgotten."</p>
        </div>
        <div class="core-solution-grid">
          <div class="solution-card">
            <div class="sol-icon">🔌</div>
            <div class="sol-title">1. Standardized Middleware</div>
            <p class="sol-desc">Pre-built, rock-solid communication channels (topics, services, actions) connect every node instantly.</p>
          </div>
          <div class="solution-card">
            <div class="sol-icon">📦</div>
            <div class="sol-title">2. Battle-Tested Ecosystem</div>
            <p class="sol-desc">Out-of-the-box sensor drivers for Velodyne, RPLiDAR, Intel RealSense, and standard motor controllers.</p>
          </div>
          <div class="solution-card">
            <div class="sol-icon">🚀</div>
            <div class="sol-title">3. Focus on Applications</div>
            <p class="sol-desc">Never write socket plumbing again. Start on Day 1 by writing autonomous navigation & delivery behaviors!</p>
          </div>
        </div>
      </div>
    `
  });

  // 4. Section 3.3: Why ROS (Reinventing Wheel with image + 3 Imperatives)
  slides.push({
    id: `${lesson.id}_sec3_3_why_ros`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Robotics Fundamentals & ROS 2 Architecture',
    badge: '⚡ The ROS Value Proposition',
    title: '3.3 Why We Need ROS: Stop Reinventing the Wheel & Standardize',
    htmlContent: `
      <div class="deck-imperatives-layout">
        <div class="imperatives-visual-col">
          <div class="wheel-img-wrap">
            <img src="assets/images/reinvent_the_wheel.jpg" alt="Stop Reinventing the Wheel" class="wheel-hero-img" />
          </div>
          <div class="wheel-quote-box">
            <p class="wheel-quote-text"><em>“If you are busy making everything from scratch and rebuilding parts that someone has already worked on, you cannot make every part of your robot perfect.”</em></p>
            <div class="wheel-shift-tag">🔄 Paradigm Shift: From Square Wheels to Universal ROS 2 Bus</div>
          </div>
        </div>
        <div class="imperatives-cards-col">
          <div class="imperative-card">
            <div class="imperative-header"><span class="imperative-icon">🛑</span><h4 class="imperative-title">1. Stop Reinventing the Wheel</h4></div>
            <p>Why write custom motor drivers, coordinate transform math (TF2), or laser scan filters? ROS provides battle-tested packages conforming to standard coordinate conventions (REP-103 &amp; REP-105).</p>
          </div>
          <div class="imperative-card">
            <div class="imperative-header"><span class="imperative-icon">🔌</span><h4 class="imperative-title">2. Standardize Communication</h4></div>
            <p>Define strongly-typed message interfaces (<code>.msg</code>, <code>.srv</code>, <code>.action</code>). C++ drivers seamlessly exchange data with Python AI controllers over a distributed peer-to-peer data bus.</p>
          </div>
          <div class="imperative-card">
            <div class="imperative-header"><span class="imperative-icon">🌍</span><h4 class="imperative-title">3. Global Community Sharing</h4></div>
            <p>Gain instant access to state-of-the-art navigation (Nav2), mapping (SLAM Toolbox), manipulation (MoveIt 2), and physics simulation (Gazebo Harmonic)—supported by thousands of roboticists globally.</p>
          </div>
        </div>
      </div>
    `
  });

  // 5. Section 3.4: Windows OS Metaphor
  slides.push({
    id: `${lesson.id}_sec3_4_os_metaphor`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Robotics Fundamentals & ROS 2 Architecture',
    badge: '💻 Architectural Metaphor',
    title: '3.4 What is ROS? The Windows / PC OS Metaphor',
    htmlContent: `
      <div class="deck-metaphor-layout">
        <div class="metaphor-visual-wrap">
          <img src="assets/images/ros_metaphor_pc_vs_robot.jpg" alt="PC OS vs Robot OS Metaphor" class="metaphor-hero-img" />
        </div>
        <div class="metaphor-cards-wrap">
          <div class="metaphor-card pc-card">
            <div class="card-tag">🖥️ Personal Computers (Windows / macOS)</div>
            <p>Provides device drivers (graphics cards, USB printers, Wi-Fi) and standardized graphics APIs (DirectX, OpenGL). Game developers focus on gameplay, not writing GPU microcode.</p>
          </div>
          <div class="metaphor-card robot-card">
            <div class="card-tag">🤖 Autonomous Mobile Robots (ROS 2)</div>
            <p>Provides hardware abstraction (LiDAR, cameras, IMUs, motor drives) and publish-subscribe IPC. Autonomous navigation engineers focus on path planning, not low-level byte parsing.</p>
          </div>
        </div>
      </div>
    `
  });

  // 6. Section 3.4.1: Framework, Not Bare-Metal OS
  slides.push({
    id: `${lesson.id}_sec3_4_1_framework`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Robotics Fundamentals & ROS 2 Architecture',
    badge: '⚙️ Software Stack Reality',
    title: '3.4.1 The Core Reality: A Middleware Framework, Not a Bare-Metal OS',
    htmlContent: `
      <div class="deck-framework-layout">
        <div class="framework-img-wrap">
          <img src="assets/images/ros_framework_os_layers.jpg" alt="ROS Framework OS Layers" class="framework-hero-img" />
        </div>
        <div class="framework-content-wrap">
          <div class="framework-alert-box">
            <strong>Key Distinction:</strong> ROS is <em>not</em> an operating system kernel like Linux or Windows. It does not manage CPU scheduling, interrupt vectors, or bare-metal memory.
          </div>
          <p>ROS is a <strong>meta-operating system (middleware framework)</strong>. It installs in user space on top of a host OS (primarily Ubuntu Linux), providing a standardized communication bus, build system (<code>colcon</code>), and visualization tools.</p>
          <div class="layer-hierarchy-pill-box">
            <span class="hierarchy-pill user">1. User Application (Nav2, Vision, Control)</span>
            <span class="hierarchy-pill ros">2. ROS 2 Middleware &amp; Client Libraries (RCL, DDS)</span>
            <span class="hierarchy-pill os">3. Host Operating System (Ubuntu 24.04 LTS Kernel)</span>
            <span class="hierarchy-pill hw">4. Physical Robot Hardware (Motors, Sensors, AMR)</span>
          </div>
        </div>
      </div>
    `
  });

  // 7. Section 3.5: The 4 Foundational Pillars
  slides.push({
    id: `${lesson.id}_sec3_5_pillars`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Robotics Fundamentals & ROS 2 Architecture',
    badge: '🏛️ Architectural Pillars',
    title: '3.5 The 4 Foundational Pillars of ROS',
    htmlContent: `
      <div class="deck-pillars-grid">
        <div class="pillar-card">
          <div class="pillar-header"><span class="pillar-icon">🔌</span><span class="pillar-title">1. Plumbing</span></div>
          <p class="pillar-sub">Data Distribution &amp; IPC</p>
          <p class="pillar-desc">Peer-to-peer publish-subscribe messaging, request-reply services, and preemptible goal actions connecting nodes across processes and networks.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-header"><span class="pillar-icon">🛠️</span><span class="pillar-title">2. Tools</span></div>
          <p class="pillar-sub">Inspection &amp; Diagnostics</p>
          <p class="pillar-desc">Universal tooling: <code>ros2 cli</code> for command introspection, <strong>RViz2</strong> for 3D sensor rendering, and <strong>rqt_graph</strong> for live node topology.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-header"><span class="pillar-icon">🧠</span><span class="pillar-title">3. Capabilities</span></div>
          <p class="pillar-sub">Advanced Autonomy Stacks</p>
          <p class="pillar-desc">State-of-the-art out-of-the-box navigation (Nav2), simultaneous localization and mapping (SLAM Toolbox), and 3D kinematics calculation (TF2).</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-header"><span class="pillar-icon">🌍</span><span class="pillar-title">4. Ecosystem</span></div>
          <p class="pillar-sub">Global Open Community</p>
          <p class="pillar-desc">Maintained by Open Robotics and the ROS 2 Technical Steering Committee (TSC). Over 3,000+ open-source robotics packages available on ROS Index.</p>
        </div>
      </div>
    `
  });

  // 8. Section 3.6: The Motion Flow Explanation: Robot as a Living Organism
  slides.push({
    id: `${lesson.id}_sec3_6_motion_flow`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Robotics Fundamentals & ROS 2 Architecture',
    badge: '🧬 Full Motion Pipeline',
    title: '3.6 The Robot as a Living Organism: End-to-End Motion Flow',
    htmlContent: `
      <div class="motion-flow-slide-layout">
        <div class="motion-flow-image-wrap">
          <img src="assets/images/ros2_motion_architecture.svg" alt="ROS 2 Motion Architecture & Data Flow" class="motion-flow-hero-img" />
        </div>
        <div class="motion-stages-row">
          <div class="motion-stage-card stage-senses">
            <span class="stage-num-badge">Stage 1</span>
            <span class="stage-title">👁️ Senses</span>
            <p class="stage-desc">LiDAR, cameras, and IMU generate raw point clouds, images, and accelerations at 10–50 Hz.</p>
          </div>
          <div class="motion-stage-card stage-nerves">
            <span class="stage-num-badge">Stage 2</span>
            <span class="stage-title">⚡ Nerves</span>
            <p class="stage-desc">The high-speed DDS middleware bus serializes and routes telemetry packets with microsecond latency.</p>
          </div>
          <div class="motion-stage-card stage-brain">
            <span class="stage-num-badge">Stage 3</span>
            <span class="stage-title">🧠 Brain</span>
            <p class="stage-desc">SLAM updates map poses; Nav2 costmaps evaluate collision risks and calculate optimal path trajectory.</p>
          </div>
          <div class="motion-stage-card stage-muscles">
            <span class="stage-num-badge">Stage 4</span>
            <span class="stage-title">💪 Muscles</span>
            <p class="stage-desc">Motor controllers receive <code>/cmd_vel</code> velocities and drive wheels forward to execute the mission.</p>
          </div>
        </div>
      </div>
    `
  });

  // 9. Section 3.7: ROS 1 vs. ROS 2 Architectural Paradigm Shift
  slides.push({
    id: `${lesson.id}_sec3_7_ros1_vs_ros2`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Robotics Fundamentals & ROS 2 Architecture',
    badge: '⚖️ Architecture Comparison',
    title: '3.7 ROS 1 vs. ROS 2: The Architectural Paradigm Shift',
    htmlContent: `
      <div class="deck-comparison-layout">
        <table class="ros1-vs-ros2-matrix">
          <thead>
            <tr>
              <th>Architectural Feature</th>
              <th>Legacy ROS 1 (EOL 2025)</th>
              <th>Modern ROS 2 Jazzy (LTS 2029)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="feat-name">Network Coordinator</td>
              <td class="ros1-col">Centralized <code>roscore</code> master (Single Point of Failure)</td>
              <td class="ros2-col">Decentralized Peer-to-Peer Discovery (Zero single point of failure)</td>
            </tr>
            <tr>
              <td class="feat-name">Underlying Transport</td>
              <td class="ros1-col">Custom protocols (TCPROS / UDPROS)</td>
              <td class="ros2-col">Industry-standard OMG DDS (Data Distribution Service)</td>
            </tr>
            <tr>
              <td class="feat-name">Quality of Service (QoS)</td>
              <td class="ros1-col">TCP best-effort or blocking; no loss resilience</td>
              <td class="ros2-col">Tunable QoS (Reliable vs. Best Effort, Volatile vs. Transient Local)</td>
            </tr>
            <tr>
              <td class="feat-name">Language Core</td>
              <td class="ros1-col">Fragmented C++ (<code>roscpp</code>) and Python (<code>rospy</code>)</td>
              <td class="ros2-col">Unified C Core (<code>rcl</code>) with high-level Python (<code>rclpy</code>) and C++ (<code>rclcpp</code>)</td>
            </tr>
            <tr>
              <td class="feat-name">Multi-Robot Fleets</td>
              <td class="ros1-col">Complex multimaster networking bridges required</td>
              <td class="ros2-col">Native multi-robot isolation via <code>ROS_DOMAIN_ID</code> (0–101)</td>
            </tr>
            <tr>
              <td class="feat-name">Supported Host OS</td>
              <td class="ros1-col">Linux Ubuntu only (strictly tied)</td>
              <td class="ros2-col">Cross-platform: Ubuntu Linux, Windows 10/11, macOS, RTOS</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  });

  // 10. Section 4: ROS 2 Release Timeline
  slides.push({
    id: `${lesson.id}_sec4_timeline`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. ROS 2 Release Timeline',
    badge: '📅 Release Cadence',
    title: '4. ROS 2 Release Timeline: Jazzy Jalisco (LTS)',
    htmlContent: `
      <div class="deck-timeline-layout">
        <p>ROS 2 distributions follow a predictable release cadence synchronized with Ubuntu LTS releases:</p>
        <div class="timeline-cards-row">
          <div class="timeline-distro-card past">
            <span class="distro-year">May 2022</span>
            <strong class="distro-name">Humble Hawksbill</strong>
            <span class="distro-os">Ubuntu 22.04 LTS</span>
            <span class="distro-status eol-soon">LTS • Supported to May 2027</span>
          </div>
          <div class="timeline-distro-card active">
            <span class="distro-badge-current">ACTIVE COURSE TARGET</span>
            <span class="distro-year">May 2024</span>
            <strong class="distro-name">Jazzy Jalisco</strong>
            <span class="distro-os">Ubuntu 24.04 LTS (Noble)</span>
            <span class="distro-status active-lts">LTS • Supported to May 2029</span>
          </div>
          <div class="timeline-distro-card future">
            <span class="distro-year">May 2026</span>
            <strong class="distro-name">K-Turtle Distribution</strong>
            <span class="distro-os">Ubuntu 26.04 LTS</span>
            <span class="distro-status planned">Next LTS Generation</span>
          </div>
        </div>
        <div class="timeline-note-card">
          <strong>Why Jazzy Jalisco?</strong> Jazzy provides Linux 6.8 kernel compatibility, Python 3.12 support, updated DDS vendors (FastDDS 2.14, CycloneDDS 0.10), and enhanced Nav2 dynamic obstacle avoidance.
        </div>
      </div>
    `
  });

  // 11. Section 5: Installation Steps 5.1-5.3 (Repositories, Locale, GPG)
  slides.push({
    id: `${lesson.id}_sec5_repo_setup`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Step-by-Step Installation on Ubuntu 24.04 LTS',
    badge: '📦 Setup Steps 5.1–5.3',
    title: '5. Installation: Repositories, Locale & GPG Security Keys',
    htmlContent: `
      <div class="deck-install-step-layout">
        <p>Prepare Ubuntu 24.04 by ensuring UTF-8 locale support, enabling the Universe repository, and importing the authorized ROS 2 GPG signing key:</p>
        <div class="code-container" data-language="bash">
          <div class="code-header"><span class="code-lang-tag">bash</span></div>
          <pre><code class="language-bash"># 1. Verify and enforce UTF-8 locale encoding
locale  # Must output UTF-8

# 2. Enable the Ubuntu Universe repository
sudo apt install software-properties-common
sudo add-apt-repository universe

# 3. Add the official ROS 2 GPG signing key
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

# 4. Add the repository to your APT sources list
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null</code></pre>
        </div>
      </div>
    `
  });

  // 12. Section 5: Installation Steps 5.4-5.5 (Desktop Jazzy & Rosdep)
  slides.push({
    id: `${lesson.id}_sec5_desktop_install`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Step-by-Step Installation on Ubuntu 24.04 LTS',
    badge: '📦 Setup Steps 5.4–5.5',
    title: '5. Installation: ROS 2 Jazzy Desktop & Rosdep Initialization',
    htmlContent: `
      <div class="deck-install-step-layout">
        <p>Install the complete desktop package suite (including RViz2, demo nodes, and simulation tutorials) and initialize the package dependency resolver:</p>
        <div class="code-container" data-language="bash">
          <div class="code-header"><span class="code-lang-tag">bash</span></div>
          <pre><code class="language-bash"># 1. Update package indexes with the newly added ROS 2 repository
sudo apt update

# 2. Install ROS 2 Jazzy Desktop and colcon build tools
sudo apt install -y ros-jazzy-desktop python3-colcon-common-extensions

# 3. Initialize and update rosdep (system dependency manager)
sudo apt install -y python3-rosdep
sudo rosdep init
rosdep update</code></pre>
        </div>
        <div class="install-tip-footer">
          <span class="tip-badge">💡 Note</span>
          <span>In your lab container environment, ROS 2 Jazzy Desktop and rosdep are already fully initialized and pre-cached!</span>
        </div>
      </div>
    `
  });

  // 13. Section 6: Desktop GUI (noVNC • Port 6080)
  slides.push({
    id: `${lesson.id}_sec6_desktop_gui`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. How to Open & Use the Desktop GUI (noVNC • Port 6080)',
    badge: '🖥️ noVNC Desktop',
    title: '6. Accessing the Desktop GUI & Pre-Configured Robotics Launchers',
    htmlContent: `
      <div class="deck-gui-access-layout">
        <p>Access the full graphical Linux desktop directly inside any web browser without installing local VNC clients:</p>
        <div class="gui-access-card">
          <div class="access-url-badge">🌐 Browser Access URL: <code>http://localhost:6080/vnc.html</code></div>
          <p class="access-sub">Connects instantly to an accelerated XFCE desktop running inside your Docker container.</p>
        </div>
        <div class="launchers-grid">
          <div class="launcher-item">
            <span class="launcher-icon">📟</span>
            <strong>Terminator Terminal</strong>
            <p>Multi-pane shell grid with hotkeys.</p>
          </div>
          <div class="launcher-item">
            <span class="launcher-icon">💻</span>
            <strong>VS Code IDE</strong>
            <p>Full editor with ROS 2 plugins.</p>
          </div>
          <div class="launcher-item">
            <span class="launcher-icon">👁️</span>
            <strong>RViz2 3D Visualizer</strong>
            <p>Renders LiDAR point clouds & TF trees.</p>
          </div>
          <div class="launcher-item">
            <span class="launcher-icon">🌐</span>
            <strong>Gazebo Simulation</strong>
            <p>Dynamic AMR physics simulation.</p>
          </div>
        </div>
      </div>
    `
  });

  slides.push({
    id: `${lesson.id}_sec6_novnc_tips`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. How to Open & Use the Desktop GUI (noVNC • Port 6080)',
    badge: '⚡ noVNC Workflow',
    title: '6.3 noVNC Productivity Controls & Best Practices',
    htmlContent: `
      <div class="deck-novnc-tips-grid">
        <div class="novnc-tip-card">
          <div class="tip-header"><span class="tip-icon">📐</span><strong>Remote Auto-Resize</strong></div>
          <p>Click the gear icon in the left slide-out tab and set <strong>Scaling Mode</strong> to <em>Remote Resizing</em>. The container desktop will automatically match your browser window size in real-time.</p>
        </div>
        <div class="novnc-tip-card">
          <div class="tip-header"><span class="tip-icon">📋</span><strong>Seamless Clipboard Sync</strong></div>
          <p>Use the Clipboard button on the noVNC sidebar to paste commands from your host machine into the remote terminal, or select text in Terminator and use <code>Ctrl + Shift + C</code>.</p>
        </div>
        <div class="novnc-tip-card">
          <div class="tip-header"><span class="tip-icon">⛶</span><strong>Fullscreen Mode</strong></div>
          <p>Toggle noVNC fullscreen to eliminate browser chrome and work with dual-monitor precision, making the virtual desktop feel completely native.</p>
        </div>
      </div>
    `
  });

  // 14. Section 7: VS Code IDE (Port 8443)
  slides.push({
    id: `${lesson.id}_sec7_vscode_ide`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '7. How to Open & Use In-Browser VS Code IDE (Port 8443)',
    badge: '💻 Web IDE',
    title: '7. Accessing & Configuring the In-Browser VS Code Editor',
    htmlContent: `
      <div class="deck-vscode-layout">
        <div class="vscode-access-header">
          <span class="vscode-url-pill">🌐 Browser URL: <code>http://localhost:8443</code></span>
          <span class="vscode-ws-pill">📁 Workspace: <code>/home/student/nexus_ws</code></span>
        </div>
        <p>A full VS Code IDE running directly on the container filesystem with persistent state, syntax coloring, and integrated terminals:</p>
        <div class="vscode-features-grid">
          <div class="vscode-feat-card">
            <strong>🐍 Python Language Server</strong>
            <p>IntelliSense autocomplete for <code>rclpy</code> nodes, msg types, and QoS profiles.</p>
          </div>
          <div class="vscode-feat-card">
            <strong>🤖 ROS 2 & XML Support</strong>
            <p>Syntax highlighting and linting for URDF, Xacro, and launch files.</p>
          </div>
          <div class="vscode-feat-card">
            <strong>⌨️ Integrated Terminal</strong>
            <p>Press <code>Ctrl + \`</code> to open an environment-sourced shell directly beside your code.</p>
          </div>
          <div class="vscode-feat-card">
            <strong>💾 Auto-Save & Sync</strong>
            <p>File modifications immediately reflect across simulator and terminal processes.</p>
          </div>
        </div>
      </div>
    `
  });

  // 15. Section 8: Terminal Methods & Sourcing
  slides.push({
    id: `${lesson.id}_sec8_terminal_methods`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '8. How to Open & Use the Terminal',
    badge: '⌨️ Terminal Workflows',
    title: '8. Four Methods of Terminal Access in the AMR Lab',
    htmlContent: `
      <div class="deck-terminal-methods-grid">
        <div class="term-method-card">
          <span class="method-tag">Method 1</span>
          <h4>🖥️ Desktop Terminal & Hotkey</h4>
          <p>Inside noVNC, double-click the Terminal icon or press universal hotkey <code>Ctrl + Alt + T</code>.</p>
        </div>
        <div class="term-method-card">
          <span class="method-tag">Method 2</span>
          <h4>📟 Terminator (Multi-Pane)</h4>
          <p>Split a single window into 4 panes (<code>Ctrl + Shift + O/E</code>) to orchestrate nodes side-by-side.</p>
        </div>
        <div class="term-method-card">
          <span class="method-tag">Method 3</span>
          <h4>💻 VS Code Terminal</h4>
          <p>Press <code>Ctrl + \`</code> in browser VS Code to test and build directly alongside your script.</p>
        </div>
        <div class="term-method-card">
          <span class="method-tag">Method 4</span>
          <h4>⚡ Direct Host Shell Access</h4>
          <p>Run <code>docker exec -it navpro_amr_lab bash</code> from your host terminal for native shell speed.</p>
        </div>
      </div>
    `
  });

  slides.push({
    id: `${lesson.id}_sec8_sourcing`,
    type: 'command',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '8. How to Open & Use the Terminal',
    badge: 'source /opt/ros/...',
    title: 'Source ROS 2 Jazzy Underlay & Automate with ~/.bashrc',
    syntax: 'source /opt/ros/jazzy/setup.bash',
    desc: 'Load all standard ROS 2 CLI commands, libraries, and environment variables into your active shell session:',
    code: `# 1. Source the base ROS 2 Jazzy underlay manually in current terminal:
source /opt/ros/jazzy/setup.bash

# 2. Automate sourcing permanently for every newly opened terminal:
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc

# 3. Reload configuration in the active terminal:
source ~/.bashrc

# 4. Verify ROS 2 environment is loaded:
echo $ROS_DISTRO
# Expected Output: jazzy`,
    lang: 'bash'
  });

  // 16. Section 9: Verification & Smoke Test
  slides.push({
    id: `${lesson.id}_sec9_talker_listener`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '9. Verification & "Hello World" Smoke Test',
    badge: '🧪 Verification Smoke Test',
    title: '9. Verification: Launching Talker & Listener Smoke Test',
    htmlContent: `
      <div class="deck-smoke-test-layout">
        <p>Confirm that the ROS 2 DDS transport is functioning by running two separate C++ and Python demo nodes communicating over the <code>/chatter</code> topic:</p>
        <div class="smoke-steps-columns">
          <div class="smoke-col">
            <span class="smoke-badge talker">Terminal 1: Publisher</span>
            <div class="code-container" data-language="bash">
              <pre><code class="language-bash"># Launch the C++ talker node
ros2 run demo_nodes_cpp talker

# Output:
# [INFO] [talker]: Publishing: 'Hello World: 1'
# [INFO] [talker]: Publishing: 'Hello World: 2'</code></pre>
            </div>
          </div>
          <div class="smoke-col">
            <span class="smoke-badge listener">Terminal 2: Subscriber</span>
            <div class="code-container" data-language="bash">
              <pre><code class="language-bash"># Launch the Python listener node
ros2 run demo_nodes_py listener

# Output:
# [INFO] [listener]: I heard: [Hello World: 1]
# [INFO] [listener]: I heard: [Hello World: 2]</code></pre>
            </div>
          </div>
        </div>
      </div>
    `
  });

  slides.push({
    id: `${lesson.id}_sec9_telemetry`,
    type: 'command',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '9. Verification & "Hello World" Smoke Test',
    badge: 'ros2 node & topic',
    title: '9.3 Active Node Inspection & Topic Echo Verification',
    syntax: 'ros2 node list && ros2 topic echo <topic_name>',
    desc: 'Verify live node registration and stream incoming topic message payloads in real-time:',
    code: `# 1. List all active nodes on the DDS bus:
ros2 node list
# Output:
# /talker
# /listener

# 2. Inspect active topics:
ros2 topic list
# Output:
# /chatter
# /parameter_events
# /rosout

# 3. Echo live messages from the /chatter topic:
ros2 topic echo /chatter
# Output:
# data: 'Hello World: 14'`,
    lang: 'bash'
  });

  // 17. Section 10: Hands-on Student Challenge
  slides.push({
    id: `${lesson.id}_sec10_challenge`,
    type: 'challenge',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '10. Hands-on Student Challenge',
    title: '10. Hands-on Challenge: Multi-Robot Domain Isolation & RMW Environment Configuration',
    htmlContent: `
      <div class="ppt-challenge-briefing">
        <p>Configure multiple AMR robots operating on the same local subnet to isolate DDS topic traffic and switch between FastDDS and CycloneDDS middleware.</p>
        <ul class="challenge-targets-list">
          <li><strong>Domain Isolation:</strong> Export <code>ROS_DOMAIN_ID=42</code> to prevent cross-talk between student robot fleets.</li>
          <li><strong>RMW Implementation:</strong> Verify active middleware implementation using <code>RMW_IMPLEMENTATION=rmw_cyclonedds_cpp</code>.</li>
          <li><strong>Verification:</strong> Execute talker/listener tests across isolated domains to confirm cross-talk suppression.</li>
        </ul>
        <div class="challenge-artifact-hint">
          <div class="mission-brief-footer">
            <span class="mission-file-pill">🎯 Target Artifact: <code>m01_l02_task_domain_isolation.sh</code></span>
            <span class="mission-lms-tag">⚡ Follow step-by-step guidance & validation scripts in Web LMS</span>
          </div>
        </div>
      </div>
    `
  });
}
