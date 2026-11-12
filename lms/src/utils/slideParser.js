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

  // Helper to emit extracted breakdown cards as dedicated slides
  const emitBreakdowns = (breakdownCards, baseId, title, h2Title) => {
    breakdownCards.forEach((bCard, bIdx) => {
      if (bCard.textContent.trim().length > 30) {
        slides.push({
          id: `${baseId}_breakdown_${bIdx}`,
          type: 'step_breakdown',
          lessonNum: lesson.num_str,
          lessonId: lesson.id,
          module: lesson.module,
          sectionTitle: h2Title,
          badge: 'Architecture Breakdown',
          title: `${title} — Core Mechanics Breakdown`,
          htmlContent: bCard.outerHTML
        });
      }
    });
  };

  // Helper to emit substantive concept or subtopic slides with strict overflow prevention
  const emitSubstantiveSlides = (container, baseId, title, h2Title, depth = 0) => {
    if (!container || !isSubstantive(container)) return;

    // 1. Remove all trailing and intermediate dividers (eliminates ~33 false bottom overflows)
    container.querySelectorAll('hr, .divider').forEach(el => el.remove());

    // 2. Extract any .code-breakdown-card elements so they become dedicated subsequent slides
    const breakdownCards = Array.from(container.querySelectorAll('.code-breakdown-card'));
    breakdownCards.forEach(card => card.remove());

    // 3. Trim all <pre> code blocks to <= 14 lines to eliminate 1600-2000px code dumps on slides
    container.querySelectorAll('pre').forEach(pre => {
      const codeElem = pre.querySelector('code') || pre;
      const raw = codeElem.textContent;
      const lines = raw.split('\n');
      if (lines.length > 14) {
        codeElem.textContent = lines.slice(0, 12).join('\n') + '\n\n# ... [Full implementation available in Web LMS] ...';
      }
    });

    // Hard recursion limit: if depth >= 2, never recurse further
    if (depth >= 2) {
      slides.push({
        id: baseId,
        type: 'subtopic',
        lessonNum: lesson.num_str,
        lessonId: lesson.id,
        module: lesson.module,
        sectionTitle: h2Title,
        title: title,
        htmlContent: container.innerHTML
      });
      emitBreakdowns(breakdownCards, baseId, title, h2Title);
      return;
    }

    // 4. Special Case: Lesson 01 Terminator Shortcuts
    if ((lesson.id === '01' || lesson.id === 'lesson_01' || lesson.num_str === '01') && (container.querySelector('.terminator-image, img[src*="terminator"]') || title.toLowerCase().includes('terminator')) && container.querySelector('table')) {
      let introHtml = '';
      let imgHtml = '';
      let tableHtml = '';

      Array.from(container.children).forEach(child => {
        if (child.querySelector('table') || child.tagName.toLowerCase() === 'table' || child.classList.contains('table-responsive')) {
          tableHtml += child.outerHTML;
        } else if (child.querySelector('img, svg') || ['img', 'svg'].includes(child.tagName.toLowerCase()) || child.classList.contains('lesson-image-wrapper')) {
          imgHtml += child.outerHTML;
        } else {
          introHtml += child.outerHTML;
        }
      });

      slides.push({
        id: baseId,
        type: 'concept',
        lessonNum: lesson.num_str,
        lessonId: lesson.id,
        module: lesson.module,
        sectionTitle: h2Title,
        badge: '📟 Multi-Terminal Grid',
        title: title,
        htmlContent: `
          <div class="terminator-slide-wrapper">
            ${introHtml ? `<div class="terminator-intro-briefing">${introHtml}</div>` : ''}
            <div class="terminator-cols-container">
              <div class="term-left-col">
                <div class="term-graphic-frame">
                  ${imgHtml}
                </div>
                <div class="term-pro-tip-banner">
                  <span class="tip-badge">💡 PRO-TIP</span>
                  <span class="tip-text">Tiling 4 panes allows concurrent monitoring of Gazebo, teleop, RViz2, and topic echo on one screen.</span>
                </div>
              </div>
              <div class="term-right-col">
                <div class="term-shortcuts-header">
                  <span class="shortcuts-badge">⌨️ Essential Shortcuts</span>
                  <span class="shortcuts-sub">Default Keybindings</span>
                </div>
                ${tableHtml}
              </div>
            </div>
          </div>
        `
      });
      emitBreakdowns(breakdownCards, baseId, title, h2Title);
      return;
    }

    // 5. Check images in this container
    const rawImgs = Array.from(container.querySelectorAll('img, svg:not(.lucide)'));

    // Case A: Multiple images in one section (e.g., Lesson 03 Turtlesim+Teleop, Lesson 11, 13, 14, 22)
    if (rawImgs.length > 1) {
      const children = Array.from(container.children);
      const parts = [];
      let currentPart = [];

      children.forEach(child => {
        const hasImg = !!child.querySelector('img, svg:not(.lucide)') || ['img', 'svg'].includes(child.tagName.toLowerCase()) || child.classList.contains('lesson-image-wrapper');
        if (hasImg && currentPart.some(c => !!c.querySelector('img, svg:not(.lucide)') || ['img', 'svg'].includes(c.tagName.toLowerCase()) || c.classList.contains('lesson-image-wrapper'))) {
          parts.push(currentPart);
          currentPart = [child];
        } else {
          currentPart.push(child);
        }
      });
      if (currentPart.length > 0) parts.push(currentPart);

      if (parts.length > 1) {
        parts.forEach((partEls, pIdx) => {
          const partDiv = doc.createElement('div');
          partEls.forEach(el => partDiv.appendChild(el.cloneNode(true)));
          if (!isSubstantive(partDiv)) return;

          const strong = partDiv.querySelector('strong, h4, h5');
          const subLabel = strong ? strong.textContent.trim() : (pIdx === 0 ? 'Simulation View' : 'Architecture Diagram');
          const partTitle = `${title} (Part ${pIdx + 1}: ${subLabel})`;

          emitSubstantiveSlides(partDiv, `${baseId}_part${pIdx + 1}`, partTitle, h2Title, depth + 1);
        });
        emitBreakdowns(breakdownCards, baseId, title, h2Title);
        return;
      }
    }

    // Case B: Single image + substantial text or table
    if (rawImgs.length === 1 && (container.textContent.trim().length > 180 || container.querySelector('table, pre, .code-container, .alert'))) {
      const table = container.querySelector('table, .table-responsive');
      const tableRows = table ? table.querySelectorAll('tr').length : 0;
      const hasCode = !!container.querySelector('pre, .code-container');
      const textLen = container.textContent.trim().length;

      // If large table (> 4 rows like Lesson 17) OR heavy content with code (> 550 chars like Lesson 05 7.3), split into Visual slide + Implementation slide
      if ((table && tableRows > 4) || (hasCode && textLen > 550)) {
        const visualSlideDiv = doc.createElement('div');
        const contentSlideDiv = doc.createElement('div');

        Array.from(container.children).forEach(child => {
          const childHasImg = !!child.querySelector('img, svg:not(.lucide)') || ['img', 'svg'].includes(child.tagName.toLowerCase()) || child.classList.contains('lesson-image-wrapper');
          const childHasCodeOrTable = !!child.querySelector('pre, .code-container, table') || ['pre', 'table'].includes(child.tagName.toLowerCase()) || child.classList.contains('code-container') || child.classList.contains('table-responsive');

          if (childHasImg) {
            visualSlideDiv.appendChild(child.cloneNode(true));
          } else if (childHasCodeOrTable) {
            contentSlideDiv.appendChild(child.cloneNode(true));
          } else {
            if (visualSlideDiv.children.length === 0) {
              visualSlideDiv.appendChild(child.cloneNode(true));
            } else {
              contentSlideDiv.appendChild(child.cloneNode(true));
            }
          }
        });

        if (isSubstantive(visualSlideDiv) && isSubstantive(contentSlideDiv) && visualSlideDiv.children.length < container.children.length && contentSlideDiv.children.length < container.children.length) {
          emitSubstantiveSlides(visualSlideDiv, `${baseId}_visual`, `${title}: Architectural Model`, h2Title, depth + 1);
          emitSubstantiveSlides(contentSlideDiv, `${baseId}_code`, `${title}: Implementation`, h2Title, depth + 1);
          emitBreakdowns(breakdownCards, baseId, title, h2Title);
          return;
        }
      } else {
        // Side-by-side 2-column layout
        const visualDiv = doc.createElement('div');
        visualDiv.className = 'col-visual';
        const contentDiv = doc.createElement('div');
        contentDiv.className = 'col-content';

        Array.from(container.children).forEach(child => {
          const hasImg = !!child.querySelector('img, svg:not(.lucide)') || ['img', 'svg'].includes(child.tagName.toLowerCase()) || child.classList.contains('lesson-image-wrapper');
          if (hasImg) visualDiv.appendChild(child.cloneNode(true));
          else contentDiv.appendChild(child.cloneNode(true));
        });

        slides.push({
          id: baseId,
          type: 'subtopic',
          lessonNum: lesson.num_str,
          lessonId: lesson.id,
          module: lesson.module,
          sectionTitle: h2Title,
          title: title,
          htmlContent: `
            <div class="deck-two-col-layout">
              ${visualDiv.outerHTML}
              ${contentDiv.outerHTML}
            </div>
          `
        });
      }
      emitBreakdowns(breakdownCards, baseId, title, h2Title);
      return;
    }

    // Case C: Standard content (no images, or single image with compact text)
    // If container is large (> 500 chars) and has multiple child elements, chunk into digestible slides
    const childNodes = Array.from(container.children);
    if (depth < 1 && rawImgs.length === 0 && childNodes.length > 1 && container.textContent.trim().length > 500) {
      const chunks = [];
      let currentChunk = [];
      let currentLen = 0;

      childNodes.forEach(child => {
        const textLen = child.textContent.trim().length;
        const isBig = textLen > 280 || child.querySelector('pre, table') || child.classList.contains('code-breakdown-card') || child.classList.contains('alert') || child.classList.contains('code-container');
        
        if (currentChunk.length > 0 && (isBig || currentLen + textLen > 500)) {
          chunks.push(currentChunk);
          currentChunk = [child];
          currentLen = textLen;
        } else {
          currentChunk.push(child);
          currentLen += textLen;
        }
      });
      if (currentChunk.length > 0) chunks.push(currentChunk);

      if (chunks.length > 1) {
        chunks.forEach((ch, chIdx) => {
          const chDiv = doc.createElement('div');
          ch.forEach(el => chDiv.appendChild(el.cloneNode(true)));
          if (!isSubstantive(chDiv)) return;

          const strong = chDiv.querySelector('strong, h3, h4, h5');
          const codeTag = chDiv.querySelector('pre, .code-container');
          let subLabel = strong ? strong.textContent.trim() : (codeTag ? 'Implementation' : `Part ${chIdx + 1}`);
          if (subLabel.length > 35) subLabel = `Part ${chIdx + 1}`;

          emitSubstantiveSlides(chDiv, `${baseId}_chk${chIdx + 1}`, `${title} (${subLabel})`, h2Title, depth + 1);
        });
        emitBreakdowns(breakdownCards, baseId, title, h2Title);
        return;
      }
    }

    // Single compact slide
    slides.push({
      id: baseId,
      type: 'subtopic',
      lessonNum: lesson.num_str,
      lessonId: lesson.id,
      module: lesson.module,
      sectionTitle: h2Title,
      title: title,
      htmlContent: container.innerHTML
    });

    // 6. Emit any extracted breakdown cards as dedicated step_breakdown slides
    emitBreakdowns(breakdownCards, baseId, title, h2Title);
  };

  // Find all sections or group by <h2>
  let sections = Array.from(doc.querySelectorAll('section'));
  if (sections.length < 2 || sections.length < doc.querySelectorAll('h2').length) {
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
  if (lesson.id === '02' || lesson.num_str === '02' || lesson.id === 'lesson_02') {
    buildLesson02Slides(doc, lesson, slides);
  } else if (lesson.id === '03' || lesson.num_str === '03' || lesson.id === 'lesson_03') {
    buildLesson03Slides(doc, lesson, slides);
  } else if (lesson.id === '04' || lesson.num_str === '04' || lesson.id === 'lesson_04') {
    buildLesson04Slides(doc, lesson, slides);
  } else if (lesson.id === '05' || lesson.num_str === '05' || lesson.id === 'lesson_05') {
    buildLesson05Slides(doc, lesson, slides);
  } else {
    sections.forEach((section, secIdx) => {
    const h2 = section.querySelector('h2');
    const h2Title = h2 ? h2.textContent.trim() : `Section ${secIdx + 1}`;
    const h2Lower = h2Title.toLowerCase();

    // Skip Section 1 if it is just "Overview & Learning Objectives" (already in Launchpad)
    if (h2Lower.includes('learning objectives') || (h2Lower.includes('overview') && secIdx <= 1)) {
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
      // Check for content before the first h3
      const preH3Container = doc.createElement('div');
      let preCurr = section.firstElementChild;
      while (preCurr && preCurr.tagName.toLowerCase() !== 'h3' && preCurr.tagName.toLowerCase() !== 'h2') {
        if (!portalIds.some(p => preCurr.id === p.id || preCurr.querySelector(`#${p.id}`))) {
          preH3Container.appendChild(preCurr.cloneNode(true));
        }
        preCurr = preCurr.nextElementSibling;
      }
      if (isSubstantive(preH3Container)) {
        emitSubstantiveSlides(preH3Container, `${lesson.id}_sec_${secIdx}_intro`, `${h2Title}: Overview`, h2Title);
      }

      // Process each h3 subtopic
      h3Elements.forEach((h3, h3Idx) => {
        const subtopicTitle = h3.textContent.trim();
        const subElements = [];
        let curr = h3.nextElementSibling;
        
        while (curr && curr.tagName.toLowerCase() !== 'h3' && curr.tagName.toLowerCase() !== 'h2') {
          if (!portalIds.some(p => curr.id === p.id || curr.querySelector(`#${p.id}`))) {
            subElements.push(curr.cloneNode(true));
          }
          curr = curr.nextElementSibling;
        }

        const tempContainer = doc.createElement('div');
        subElements.forEach(el => tempContainer.appendChild(el));
        emitSubstantiveSlides(tempContainer, `${lesson.id}_sub_${secIdx}_${h3Idx}`, subtopicTitle, h2Title);
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

    emitSubstantiveSlides(cleanSection, `${lesson.id}_sec_${secIdx}`, h2Title, h2Title);
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

  // 4. Section 3.2 & 3.3: Why We Need a Standard & Why ROS (Merged: Stop Reinventing the Wheel)
  slides.push({
    id: `${lesson.id}_sec3_3_why_ros`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Robotics Fundamentals & ROS 2 Architecture',
    badge: '⚡ Core Solution: Why ROS',
    title: '3.3 Why We Need ROS: Stop Reinventing the Wheel & Standardize',
    htmlContent: `
      <div class="deck-imperatives-layout">
        <div class="imperatives-visual-col">
          <div class="wheel-img-wrap">
            <img src="assets/images/reinvent_the_wheel.jpg" alt="Stop Reinventing the Wheel" class="wheel-hero-img" />
          </div>
          <div class="wheel-quote-box">
            <p class="wheel-quote-text"><em>“If you are busy making everything from scratch and rebuilding parts that someone has already worked on, you cannot make every part of your robot perfect.”</em></p>
            <div class="wheel-shift-tag">⚠️ The Core Trap: Rebuilding Low-Level Plumbing That Gets Forgotten</div>
          </div>
        </div>
        <div class="imperatives-cards-col">
          <div class="imperative-card">
            <div class="imperative-header"><span class="imperative-icon">🛑</span><h4 class="imperative-title">1. Stop Reinventing the Wheel</h4></div>
            <p>Never write custom motor drivers, coordinate transform math (TF2), or laser scan filters. ROS provides battle-tested packages conforming to universal coordinate conventions (REP-103 &amp; REP-105).</p>
          </div>
          <div class="imperative-card">
            <div class="imperative-header"><span class="imperative-icon">🔌</span><h4 class="imperative-title">2. Standardized Middleware</h4></div>
            <p>Pre-built, rock-solid communication channels (topics, services, actions) connect C++ drivers and Python AI controllers seamlessly over a high-speed DDS data bus.</p>
          </div>
          <div class="imperative-card">
            <div class="imperative-header"><span class="imperative-icon">🚀</span><h4 class="imperative-title">3. Focus on Applications</h4></div>
            <p>Never write socket plumbing again. Start on Day 1 by writing autonomous navigation (Nav2), mapping (SLAM Toolbox), and hospital delivery behaviors!</p>
          </div>
        </div>
      </div>
    `
  });

  // 5. Section 3.4: Windows / PC OS Metaphor & The 4-Tier Software Stack (Combined)
  slides.push({
    id: `${lesson.id}_sec3_4_metaphor_and_stack`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Robotics Fundamentals & ROS 2 Architecture',
    badge: '💻 Architectural Metaphor & Stack',
    title: '3.4 What is ROS? The PC OS Metaphor & The 4-Tier Software Stack',
    htmlContent: `
      <div class="l02-metaphor-stack-layout">
        <!-- Col 1: Metaphor -->
        <div class="metaphor-col">
          <div class="metaphor-visual-card">
            <img src="assets/images/ros_metaphor_pc_vs_robot.jpg" alt="PC OS vs Robot OS Metaphor" />
          </div>
          <div class="metaphor-comparisons">
            <div class="metaphor-compare-card">
              <div class="card-tag"><span>🖥️</span><strong>Personal Computers (Windows / macOS)</strong></div>
              <p>Standardizes hardware abstraction (GPUs, audio, USB, Wi-Fi) and graphics APIs (DirectX). Devs focus on gameplay, not writing graphics card microcode.</p>
            </div>
            <div class="metaphor-compare-card">
              <div class="card-tag"><span>🤖</span><strong>Autonomous Mobile Robots (ROS 2)</strong></div>
              <p>Standardizes hardware abstraction (LiDAR, cameras, IMUs, motor drives) and DDS IPC. Autonomy engineers focus on navigation, not low-level byte parsing.</p>
            </div>
          </div>
        </div>

        <!-- Col 2: Stack Reality -->
        <div class="stack-col">
          <div class="stack-alert-box">
            <strong>Core Reality: Middleware Framework, Not a Bare-Metal Kernel</strong><br/>
            ROS 2 does <em>not</em> manage CPU scheduling, interrupt vectors, or raw memory. It is a <strong>meta-operating system</strong> installing in user space on top of Ubuntu Linux.
          </div>
          <div class="stack-pills">
            <div class="stack-pill user"><span>1. User Applications</span><span>Nav2, SLAM Toolbox, Vision, AI Behaviors</span></div>
            <div class="stack-pill ros"><span>2. ROS 2 Middleware &amp; RCL</span><span>rclcpp, rclpy, FastDDS Inter-Process Bus</span></div>
            <div class="stack-pill os"><span>3. Host Operating System</span><span>Ubuntu 24.04 LTS Kernel &amp; POSIX APIs</span></div>
            <div class="stack-pill hw"><span>4. Physical Robot Hardware</span><span>Motors, LiDAR, IMU, Chassis &amp; Microcontrollers</span></div>
          </div>
          <div class="stack-takeaway">
            <strong>💡 Unified Engineering Takeaway:</strong> The PC OS metaphor explains <em>why</em> we standardize (hardware independence); the 4-tier stack explains <em>how</em> it runs (modular user-space processes over DDS).
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

  // 8. Section 3.6: The Motion Flow Explanation: Robot as a Living Organism (Bigger Hero Visual)
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
            <div class="stage-card-head"><span class="stage-num-badge">Stage 1</span><span class="stage-title">👁️ Senses</span></div>
            <p class="stage-desc">LiDAR, IMU & Cameras (10–50 Hz)</p>
          </div>
          <div class="motion-stage-card stage-nerves">
            <div class="stage-card-head"><span class="stage-num-badge">Stage 2</span><span class="stage-title">⚡ Nerves</span></div>
            <p class="stage-desc">DDS Bus Serialization (µs Latency)</p>
          </div>
          <div class="motion-stage-card stage-brain">
            <div class="stage-card-head"><span class="stage-num-badge">Stage 3</span><span class="stage-title">🧠 Brain</span></div>
            <p class="stage-desc">SLAM & Nav2 Path Planning</p>
          </div>
          <div class="motion-stage-card stage-muscles">
            <div class="stage-card-head"><span class="stage-num-badge">Stage 4</span><span class="stage-title">💪 Muscles</span></div>
            <p class="stage-desc">Motor Actuators (<code>/cmd_vel</code>)</p>
          </div>
        </div>
      </div>
    `
  });

  // 9. Section 3.7: ROS 1 vs. ROS 2 Architectural Paradigm Shift (With Restored Architecture Diagram)
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
      <div class="deck-ros-arch-slide-layout">
        <div class="arch-visual-wrap">
          <img src="assets/images/ros1_vs_ros2_dds.svg" alt="ROS 1 Master vs ROS 2 DDS Architecture" class="ros-arch-hero-img" />
        </div>
        <div class="arch-key-points-grid">
          <div class="arch-point-card ros1-point">
            <div class="point-badge-wrap"><span class="point-badge ros1">ROS 1 Legacy</span><strong>Centralized Master (roscore)</strong></div>
            <p><strong>Single Point of Failure:</strong> If <code>roscore</code> master crashes, the entire robot network fails. Custom TCPROS transports with fragmented C++ (<code>roscpp</code>) and Python (<code>rospy</code>) codebases.</p>
          </div>
          <div class="arch-point-card ros2-point">
            <div class="point-badge-wrap"><span class="point-badge ros2">ROS 2 Modern</span><strong>Decentralized Peer-to-Peer (DDS)</strong></div>
            <p><strong>Industrial Grade & Fault-Tolerant:</strong> Zero single points of failure. Tunable Quality of Service (QoS). Unified C core (<code>rcl</code>) guarantees 100% feature parity across Python and C++.</p>
          </div>
        </div>
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

  // 11. Section 5: Complete Installation Pipeline (Repositories & Desktop Suite Merged)
  slides.push({
    id: `${lesson.id}_sec5_install_pipeline`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Step-by-Step Installation on Ubuntu 24.04 LTS',
    badge: '📦 Installation Pipeline',
    title: '5. Complete Installation Pipeline: APT Repositories to ROS 2 Desktop Suite',
    htmlContent: `
      <div class="l02-install-pipeline-layout">
        <!-- Col 1: Repositories & Security GPG -->
        <div class="l02-install-col">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">5.1–5.3 Repositories &amp; GPG Keys</span>
            <span class="l03-subcol-sub">APT Sources Configuration</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Configure Repositories &amp; Keys</strong></div>
            <pre><code class="language-bash"># 1. Enable Universe & Import GPG Key
sudo add-apt-repository universe -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

# 2. Add Official APT Repository
echo "deb [signed-by=.../ros.gpg] http://packages.ros.org/ros2/ubuntu noble main" | sudo tee /etc/apt/sources.list.d/ros2.list</code></pre>
          </div>
        </div>

        <!-- Col 2: Desktop Suite & Rosdep Init -->
        <div class="l02-install-col">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">5.4–5.5 Desktop Suite &amp; Rosdep</span>
            <span class="l03-subcol-sub">Package Installation</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Install Desktop &amp; Initialize Rosdep</strong></div>
            <pre><code class="language-bash"># 1. Update Indexes & Install Desktop Suite
sudo apt update && sudo apt install -y ros-jazzy-desktop python3-colcon-common-extensions

# 2. Initialize Dependency Resolver (rosdep)
sudo apt install -y python3-rosdep && sudo rosdep init && rosdep update</code></pre>
          </div>
        </div>

        <!-- Row 2: Verification & Lab Outcome -->
        <div class="l02-install-bottom-bar">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔐</span><strong>Cryptographic Verification</strong></div>
            <p>GPG keyring guarantees package authenticity from <code>packages.ros.org</code>, preventing untrusted package tampering.</p>
          </div>
          <div class="l03-concept-card" style="background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.25);">
            <div class="l03-concept-header"><span class="l03-card-icon">📦</span><strong>Installed Outcome (Lab Pre-Configured)</strong></div>
            <p>Deploys RViz2, DDS libraries, and <code>colcon</code> to <code>/opt/ros/jazzy</code>. Pre-installed &amp; cached in your lab container!</p>
          </div>
        </div>
      </div>
    `
  });

  // 13. Section 6: Unified Developer Environment: Desktop GUI, In-Browser VS Code & Terminals
  slides.push({
    id: `${lesson.id}_sec6_desktop_gui`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. Developer Environment & Lab Access',
    badge: '🖥️ Lab Tooling Suite',
    title: '6. Developer Environment: Desktop GUI, In-Browser VS Code & Terminals',
    htmlContent: `
      <div class="deck-unified-env-layout">
        <p class="env-intro-bar">The AMR Learning Hub provides three synchronized access methods into the containerized ROS 2 Jazzy environment:</p>
        <div class="env-cards-grid">
          <div class="env-tool-card">
            <div class="env-tool-header">
              <span class="env-tool-icon">🖥️</span>
              <strong class="env-tool-title">noVNC Desktop GUI</strong>
            </div>
            <span class="env-tool-port-badge">Port 6080 • /vnc.html</span>
            <p class="env-tool-desc">Full XFCE graphical desktop running inside your browser without installing local VNC clients.</p>
            <ul class="env-tool-highlights">
              <li>Launch <strong>RViz2</strong> for 3D LiDAR & TF trees</li>
              <li>Open <strong>Gazebo</strong> for physical AMR simulation</li>
              <li>Set <em>Remote Resizing</em> mode for crisp display</li>
            </ul>
          </div>
          <div class="env-tool-card">
            <div class="env-tool-header">
              <span class="env-tool-icon">💻</span>
              <strong class="env-tool-title">In-Browser VS Code IDE</strong>
            </div>
            <span class="env-tool-port-badge">Port 8443 • Web IDE</span>
            <p class="env-tool-desc">Professional code editor mounted directly to the student robotics workspace.</p>
            <ul class="env-tool-highlights">
              <li>Python IntelliSense for <code>rclpy</code> & nodes</li>
              <li>URDF, Xacro & launch XML syntax coloring</li>
              <li>Integrated shell with <code>Ctrl + \`</code></li>
            </ul>
          </div>
          <div class="env-tool-card">
            <div class="env-tool-header">
              <span class="env-tool-icon">⌨️</span>
              <strong class="env-tool-title">Interactive Terminals</strong>
            </div>
            <span class="env-tool-port-badge">Terminator & CLI</span>
            <p class="env-tool-desc">High-efficiency shell access to build and orchestrate distributed ROS 2 nodes.</p>
            <ul class="env-tool-highlights">
              <li><strong>Terminator:</strong> 4-pane grid (<code>Ctrl+Shift+O/E</code>)</li>
              <li><strong>Desktop Hotkey:</strong> <code>Ctrl + Alt + T</code> in noVNC</li>
              <li><strong>Host Shell:</strong> <code>docker exec -it ...</code></li>
            </ul>
          </div>
        </div>
      </div>
    `
  });

  // 13. Section 8 & 9: Environment Activation & Verification Smoke Test (Combined)
  slides.push({
    id: `${lesson.id}_sec8_9_sourcing_verification`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '8 & 9. Sourcing Environment & Multi-Terminal Verification',
    badge: '🧪 Activation & Smoke Test',
    title: '8 & 9. Environment Activation & Multi-Terminal Smoke Test Verification',
    htmlContent: `
      <div class="l02-sourcing-smoke-layout">
        <!-- Col 1: Sourcing & Automation -->
        <div class="l02-install-col">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">8. Shell Activation</span>
            <span class="l03-subcol-sub">Underlay Sourcing</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Source &amp; Automate with ~/.bashrc</strong></div>
            <pre><code class="language-bash"># 1. Source ROS 2 underlay
source /opt/ros/jazzy/setup.bash

# 2. Automate in ~/.bashrc
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc

# 3. Confirm active distribution variable
echo $ROS_DISTRO  # Expected Output: jazzy</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚙️</span><strong>Underlay Mechanics &amp; Automation</strong></div>
            <p>Injects <code>ros2</code> CLI into <code>$PATH</code> and sets <code>$AMENT_PREFIX_PATH</code>. Appending to <code>~/.bashrc</code> ensures all new terminal panes auto-load the environment.</p>
          </div>
        </div>

        <!-- Col 2: Verification Smoke Test -->
        <div class="l02-install-col">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">9. Distributed Smoke Test</span>
            <span class="l03-subcol-sub">Multi-Terminal Verification</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge" style="background:#3b82f6;color:#fff;">Terminal 1: C++ Talker</span><strong>Publisher Node</strong></div>
            <pre><code class="language-bash">ros2 run demo_nodes_cpp talker
# Telemetry: [INFO] [talker]: Publishing: 'Hello World: 1'</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge" style="background:#10b981;color:#fff;">Terminal 2: Python Listener</span><strong>Subscriber Node</strong></div>
            <pre><code class="language-bash">ros2 run demo_nodes_py listener
# Telemetry: [INFO] [listener]: I heard: [Hello World: 1]</code></pre>
          </div>
          <div class="l03-concept-card" style="background: rgba(59, 130, 246, 0.08); border-color: rgba(59, 130, 246, 0.25);">
            <div class="l03-concept-header"><span class="l03-card-icon">🚀</span><strong>Specific Outcome: DDS Bus Integrity Verified</strong></div>
            <p>Demonstrates cross-language peer-to-peer DDS telemetry exchange between independent C++ and Python OS processes with zero central master failure points.</p>
          </div>
        </div>
      </div>
    `
  });
}
function buildLesson03Slides(doc, lesson, slides) {
  // 1. Interactive Telesim & Graph Flow Simulation Stage
  slides.push({
    id: `${lesson.id}_interactive_turtlesim`,
    type: 'interactive',
    interactiveKey: 'turtlesim',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Interactive Simulation & Computational Graph Flow',
    title: 'Turtlesim Teleop & Computational Graph Architecture'
  });

  // 2. Section 2.1: Launching Turtlesim Canvas
  slides.push({
    id: `${lesson.id}_sec2_1_canvas`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Launching Turtlesim: The Simulation Playground',
    badge: '🐢 Simulation Canvas',
    title: '2.1 Launching Turtlesim Simulation Canvas Node',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-visual-col">
          <div class="l03-visual-frame">
            <img src="assets/images/turtlesim_simulation_canvas.png" alt="Turtlesim Simulation Canvas" class="l03-hero-img" />
            <span class="l03-visual-caption">Turtlesim 2D Canvas (Origin at center: x = 5.54, y = 5.54, &theta; = 0.0 rad)</span>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal 1</span><strong>Launch Canvas Node</strong></div>
            <pre><code class="language-bash">ros2 run turtlesim turtlesim_node</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🗺️</span><strong>2D Coordinate Arena</strong></div>
            <p>Spawns an 11.08 &times; 11.08 unit coordinate grid following ROS <strong>REP-103</strong> conventions (+X forward, +Y left, +&theta; counter-clockwise).</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🤖</span><strong>Kinematic Representation</strong></div>
            <p>Emulates an autonomous differential-drive robot (<code>/turtle1</code>) ready to receive velocity inputs and stream live pose odometry.</p>
          </div>
        </div>
      </div>
    `
  });

  // 3. Section 2.2: Keyboard Teleoperation Node
  slides.push({
    id: `${lesson.id}_sec2_2_teleop`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Launching Turtlesim: The Simulation Playground',
    badge: '⌨️ Teleoperation Control',
    title: '2.2 Keyboard Teleoperation Control (turtle_teleop_key)',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-visual-col">
          <div class="l03-visual-frame">
            <img src="assets/images/turtle_teleop_key_running.png" alt="Keyboard Teleop Running" class="l03-hero-img" />
            <span class="l03-visual-caption">turtle_teleop_key: Real-Time Arrow Key Capture &amp; Velocity Publishing</span>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal 2</span><strong>Launch Teleoperation Node</strong></div>
            <pre><code class="language-bash">ros2 run turtlesim turtle_teleop_key</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🎮</span><strong>Arrow Key Teleop Mapping</strong></div>
            <p><strong>Up / Down:</strong> Linear velocity (&plusmn;2.0 m/s).<br/><strong>Left / Right:</strong> Angular yaw velocity (&plusmn;2.0 rad/s).</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚠️</span><strong>OS Window Focus Requirement</strong></div>
            <p>The terminal executing <code>turtle_teleop_key</code> must retain active desktop window focus to capture keystrokes and broadcast commands.</p>
          </div>
        </div>
      </div>
    `
  });

  // 4. Section 3: rqt_graph Visualizer
  slides.push({
    id: `${lesson.id}_sec3_rqt_graph`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Visualizing the Computational Graph (rqt_graph)',
    badge: '🌐 Computational Graph',
    title: '3. Visualizing the Computational Graph (rqt_graph)',
    htmlContent: `
      <div class="l03-two-col-layout l03-graph-layout">
        <div class="l03-visual-col">
          <div class="l03-visual-frame">
            <img src="assets/images/turtlesim_rqt_graph.png" alt="Turtlesim rqt_graph Computational Graph" class="l03-hero-img" />
            <span class="l03-visual-caption">rqt_graph: Active Nodes &amp; Inter-Process Topic Wiring</span>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal 3</span><strong>Launch Graph Visualizer</strong></div>
            <pre><code class="language-bash">rqt_graph  # Or: ros2 run rqt_graph rqt_graph</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🟢</span><strong>Nodes (Ovals)</strong></div>
            <p>Distinct executable processes (<code>/teleop_turtle</code> publisher and <code>/turtlesim</code> subscriber) running independently in OS user space.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🟦</span><strong>Topics (Rectangles / Arrows)</strong></div>
            <p>Uni-directional message channel (<code>/turtle1/cmd_vel</code>) routing velocity data packets over the peer-to-peer DDS bus without a central master.</p>
          </div>
        </div>
      </div>
    `
  });

  // 5. Section 4: Node Introspection (Combined 4.1 ros2 node list & 4.2 ros2 node info)
  slides.push({
    id: `${lesson.id}_sec4_node_introspection`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Core Concept 1: Node Introspection (ros2 node)',
    badge: '🔍 Node Introspection',
    title: '4. Node Introspection: Discovery (ros2 node list) & Deep Interface Audit (ros2 node info)',
    htmlContent: `
      <div class="l03-two-col-layout l03-combined-node-layout">
        <div class="l03-subcol">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">4.1 Active Node Discovery</span>
            <span class="l03-subcol-sub">Heartbeat Audit</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>List Active Processes</strong></div>
            <pre><code class="language-bash">ros2 node list</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">output</span><strong>Discovered Nodes</strong></div>
            <pre><code class="language-text">/teleop_turtle
/turtlesim</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚙️</span><strong>Process Modularization</strong></div>
            <p>Every distinct robotics capability runs as an isolated OS process. If an AMR stops responding, run <code>ros2 node list</code> first to confirm all nodes are alive.</p>
          </div>
        </div>
        <div class="l03-subcol">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">4.2 Deep Node Interface Audit</span>
            <span class="l03-subcol-sub">Endpoint Topology</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Inspect Node Endpoints</strong></div>
            <pre><code class="language-bash">ros2 node info /turtlesim</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">yaml</span><strong>Interface Topology</strong></div>
            <pre><code class="language-yaml">/turtlesim
  Subscribers: /turtle1/cmd_vel [geometry_msgs/msg/Twist]
  Publishers:  /turtle1/pose, /turtle1/color_sensor
  Services:    /clear, /reset, /spawn, /turtle1/set_pen</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔌</span><strong>4 Endpoint Families</strong></div>
            <p>Audits <strong>Subscribers</strong> (inputs), <strong>Publishers</strong> (telemetry), <strong>Services</strong> (synchronous RPC), and <strong>Actions</strong> (goals).</p>
          </div>
        </div>
      </div>
    `
  });

  // 6. Section 5: Topic Introspection (Combined 5.1 list -t, 5.2 echo & 5.3 hz)
  slides.push({
    id: `${lesson.id}_sec5_topic_introspection`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Core Concept 2: Topic Introspection (ros2 topic)',
    badge: '🚌 Topic Introspection',
    title: '5. Topic Introspection: Discovery (list -t), Telemetry (echo) & Frequency (hz)',
    htmlContent: `
      <div class="l03-three-col-layout">
        <!-- Col 1: 5.1 Discovery -->
        <div class="l03-topic-col">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">5.1 Discovery</span>
            <span class="l03-subcol-sub">Contracts (-t)</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>List Topics &amp; Types</strong></div>
            <pre><code class="language-bash">ros2 topic list -t</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">output</span><strong>Active Buses</strong></div>
            <pre><code class="language-text">/turtle1/cmd_vel [Twist]
/turtle1/color_sensor [Color]
/turtle1/pose [Pose]</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🏷️</span><strong>Interface Contract</strong></div>
            <p>The <code>-t</code> flag exposes the exact IDL message type. Mismatched types trigger serialization failure.</p>
          </div>
        </div>

        <!-- Col 2: 5.2 Echo -->
        <div class="l03-topic-col">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">5.2 Live Echo</span>
            <span class="l03-subcol-sub">Pose Telemetry</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Stream Topic Data</strong></div>
            <pre><code class="language-bash">ros2 topic echo /turtle1/pose</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">yaml</span><strong>Live Stream</strong></div>
            <pre><code class="language-yaml">x: 5.820  y: 5.544  theta: 0.0 rad
linear_velocity: 0.0 m/s
angular_velocity: 0.0 rad/s</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📍</span><strong>Live Telemetry</strong></div>
            <p>Drive with teleop keys to view coordinates stream in real time. Validates encoders, IMU, and odometry.</p>
          </div>
        </div>

        <!-- Col 3: 5.3 Frequency -->
        <div class="l03-topic-col">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">5.3 Frequency Audit</span>
            <span class="l03-subcol-sub">Deterministic Rate</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Measure Publish Rate</strong></div>
            <pre><code class="language-bash">ros2 topic hz /turtle1/pose</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">output</span><strong>Frequency Metrics</strong></div>
            <pre><code class="language-text">average rate: 62.503 Hz
min: 0.015s  max: 0.017s
std dev: 0.00049s  window: 64</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⏱️</span><strong>Sensor Benchmarks</strong></div>
            <p>Turtlesim emits at <strong>62.5 Hz</strong>. In production: LiDAR (10–20 Hz), Cameras (30 Hz), IMU (100+ Hz).</p>
          </div>
        </div>
      </div>
    `
  });

  // 7. Section 6: Interface Types & Twist Kinematics (ros2 interface)
  slides.push({
    id: `${lesson.id}_sec6_interface_twist`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. Core Concept 3: Topic Interface Types (ros2 interface)',
    badge: '📐 Message IDL',
    title: '6. Topic Interface Types & Ground Kinematics (ros2 interface)',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Inspect Interface Definition</strong></div>
            <pre><code class="language-bash">ros2 interface show geometry_msgs/msg/Twist</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">idl</span><strong>Twist Message Structure</strong></div>
            <pre><code class="language-text">Vector3  linear
    float64 x
    float64 y
    float64 z
Vector3  angular
    float64 x
    float64 y
    float64 z</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🏎️</span><strong>Planar Ground Kinematics</strong></div>
            <p>For differential-drive AMRs and Turtlesim, only <strong>2 degrees of freedom</strong> are controllable:</p>
            <ul class="l03-kinematics-list">
              <li><code>linear.x</code>: Forward (+) and Reverse (&minus;) velocity in m/s</li>
              <li><code>angular.z</code>: Yaw rotation steering speed in rad/s</li>
            </ul>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔒</span><strong>Constrained Degrees of Freedom</strong></div>
            <p><code>linear.y</code>, <code>linear.z</code>, <code>angular.x</code>, and <code>angular.y</code> are strictly zero because ground robots cannot strafe laterally or fly.</p>
          </div>
        </div>
      </div>
    `
  });

  // 8. Section 7: Moving the Robot Hands-On via CLI (Combined 7.1 pub --once & 7.2 pub -r 10)
  slides.push({
    id: `${lesson.id}_sec7_topic_pub`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '7. Moving the Robot Hands-On via CLI (ros2 topic pub)',
    badge: '⚡ Actuator Injection',
    title: '7. Moving the Robot via CLI: Single Step (--once) & Continuous Circle (-r 10)',
    htmlContent: `
      <div class="l03-two-col-layout l03-combined-pub-layout">
        <!-- Col 1: 7.1 pub --once -->
        <div class="l03-subcol">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">7.1 Single Timestep Injection</span>
            <span class="l03-subcol-sub">--once</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Surge Forward at 2.0 m/s Once</strong></div>
            <pre><code class="language-bash">ros2 topic pub --once /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.0}}"</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚡</span><strong>Single Message Injection (--once)</strong></div>
            <p>Injects exactly one velocity message packet across DDS and immediately exits the publisher process.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🛑</span><strong>Kinematic Deceleration</strong></div>
            <p>The robot surges forward at 2.0 m/s for one velocity timestep, then safely coasts to a complete halt.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🛠️</span><strong>Hardware Commissioning</strong></div>
            <p>Used by engineers to test wheel polarity and emergency stop watchdogs on bare hardware.</p>
          </div>
        </div>

        <!-- Col 2: 7.2 pub -r 10 -->
        <div class="l03-subcol">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">7.2 Continuous Motion in a Circle</span>
            <span class="l03-subcol-sub">-r 10 (10 Hz)</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Publish Periodic Stream at 10 Hz</strong></div>
            <pre><code class="language-bash">ros2 topic pub -r 10 /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 1.8}}"</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔄</span><strong>Continuous Rate Streaming (-r 10)</strong></div>
            <p>Publishes a message every 100 ms (10 Hz). The turtle drives continuously, drawing an ink circle.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📐</span><strong>Arc Curvature Formula</strong></div>
            <p>Differential-drive radius: <code>R = v / &omega; = 2.0 / 1.8 &approx; 1.11 m</code>.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🛑</span><strong>Interrupt Execution</strong></div>
            <p>Press <code>Ctrl + C</code> in the terminal to stop publishing; the robot smoothly coasts to a stop.</p>
          </div>
        </div>
      </div>
    `
  });

  // 13. Section 8: Summary Comparison Table of Essential CLI Tools
  slides.push({
    id: `${lesson.id}_sec8_cli_table`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '8. Summary Comparison Table of Essential CLI Tools',
    badge: '📊 Master Reference',
    title: '8. Essential ROS 2 CLI Tools & Production Use Cases',
    htmlContent: `
      <div class="l03-cli-table-layout">
        <div class="l03-cli-table-wrap">
          <table class="l03-summary-table">
            <thead>
              <tr>
                <th style="width: 28%;">Command</th>
                <th style="width: 36%;">Purpose</th>
                <th style="width: 36%;">Production Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>rqt_graph</code></td>
                <td>Visualizes computational graph nodes &amp; topic wiring</td>
                <td>Auditing communication topology &amp; detecting disconnected nodes</td>
              </tr>
              <tr>
                <td><code>ros2 run &lt;pkg&gt; &lt;exec&gt;</code></td>
                <td>Launches a specific executable node from a package</td>
                <td>Starting drivers, simulators, or single test scripts</td>
              </tr>
              <tr>
                <td><code>ros2 node list</code></td>
                <td>Lists all active nodes across the network</td>
                <td>Auditing if all expected subsystem nodes are alive</td>
              </tr>
              <tr>
                <td><code>ros2 node info &lt;node&gt;</code></td>
                <td>Details subscribers, publishers, services, actions</td>
                <td>Verifying interface names and endpoint wiring</td>
              </tr>
              <tr>
                <td><code>ros2 topic list -t</code></td>
                <td>Lists all active topics with their message types</td>
                <td>Discovering sensor and telemetry buses</td>
              </tr>
              <tr>
                <td><code>ros2 topic echo &lt;topic&gt;</code></td>
                <td>Prints incoming message payloads to the console</td>
                <td>Live debugging of sensor values or trajectory points</td>
              </tr>
              <tr>
                <td><code>ros2 topic hz &lt;topic&gt;</code></td>
                <td>Measures publish rate in Hertz</td>
                <td>Verifying camera / LiDAR sensor update rates</td>
              </tr>
              <tr>
                <td><code>ros2 interface show &lt;type&gt;</code></td>
                <td>Shows message fields and structural types</td>
                <td>Inspecting data format before writing Python code</td>
              </tr>
              <tr>
                <td><code>ros2 topic pub &lt;topic&gt; &lt;type&gt; &lt;yaml&gt;</code></td>
                <td>Injects messages onto a topic from the CLI</td>
                <td>Testing actuators or emergency stop commands</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  });

  // 14. Section 9: Hands-On Student Lab: Flight Operations Mission
  slides.push({
    id: `${lesson.id}_sec9_student_lab`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '9. Hands-On Student Lab: The Turtlesim Operations Mission',
    badge: '🎯 Flight Mission',
    title: '9. Student Lab: Flight Operations & Dynamic Reconfiguration',
    htmlContent: `
      <div class="l03-student-lab-layout">
        <div class="l03-lab-header-banner">
          <span class="l03-mission-badge">🎯 Flight Operations Briefing</span>
          <span>Reconfigure simulation parameters &amp; pen telemetry dynamically over the ROS 2 bus:</span>
        </div>
        <div class="l03-lab-steps-grid">
          <div class="l03-lab-step-card">
            <div class="l03-step-badge">Step 1: Audit Parameters</div>
            <p>Query parameters exposed by the simulation:</p>
            <pre><code class="language-bash">ros2 param list /turtlesim</code></pre>
          </div>
          <div class="l03-lab-step-card">
            <div class="l03-step-badge">Step 2: Night-Ops Navy Theme</div>
            <p>Set background color to dark navy (#0f172a):</p>
            <pre><code class="language-bash">ros2 param set /turtlesim background_r 15
ros2 param set /turtlesim background_g 23
ros2 param set /turtlesim background_b 42</code></pre>
          </div>
          <div class="l03-lab-step-card">
            <div class="l03-step-badge">Step 3: Refresh Canvas</div>
            <p>Call the /clear service to re-render background:</p>
            <pre><code class="language-bash">ros2 service call /clear std_srvs/srv/Empty</code></pre>
          </div>
          <div class="l03-lab-step-card">
            <div class="l03-step-badge">Step 4: Neon Cyan Pen</div>
            <p>Set pen to 4px electric cyan ink:</p>
            <pre><code class="language-bash">ros2 service call /turtle1/set_pen turtlesim/srv/SetPen "{r: 56, g: 189, b: 248, width: 4, 'off': 0}"</code></pre>
          </div>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated Pedagogical Deck Builder for Lesson 04:
 * ROS 2 Workspace & Package Architecture Deep Dive.
 * Consolidates fragmented single-command micro-splits into unified,
 * high-yield architectural overviews with commands and outcomes side-by-side.
 */
function buildLesson04Slides(doc, lesson, slides) {
  // 1. ROS 2 Workspace & Package Architecture Road Map
  slides.push({
    id: `${lesson.id}_sec1_objectives`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '1. Workspace Architecture Road Map',
    badge: '📁 Architecture Pillars',
    title: '1. ROS 2 Workspace & Package Architecture Road Map',
    htmlContent: `
      <div class="l04-banner-intro">
        <strong>Autonomous Robotics Core Requirement:</strong> In ROS 2, code cannot exist as loose Python scripts. All production robot nodes, launch files, parameter configurations, and URDF models must live within structured <strong>Packages</strong> compiled inside a <strong>Workspace</strong>.
      </div>
      <div class="l04-card-grid-2x2">
        <div class="l04-pillar-card">
          <div class="l04-pillar-header"><span class="l03-card-icon">📁</span><span>The Workspace Quartet</span></div>
          <p>Master the 4-tier lifecycle separation: <code>src/</code> (human code), <code>build/</code> (intermediate cache), <code>install/</code> (runtime scripts), and <code>log/</code> (diagnostics).</p>
        </div>
        <div class="l04-pillar-card">
          <div class="l04-pillar-header"><span class="l03-card-icon">⛓️</span><span>Environment Chaining</span></div>
          <p>Layer development Overlays (<code>~/ros2_ws</code>) seamlessly atop base Underlays (<code>/opt/ros/jazzy</code>) via <code>AMENT_PREFIX_PATH</code> priority shadowing.</p>
        </div>
        <div class="l04-pillar-card">
          <div class="l04-pillar-header"><span class="l03-card-icon">📦</span><span>Package Manifest &amp; Anatomy</span></div>
          <p>Structure an <code>ament_python</code> package with <code>package.xml</code> (Format 3 schema), entry point console scripts in <code>setup.py</code>, and ament resource markers.</p>
        </div>
        <div class="l04-pillar-card">
          <div class="l04-pillar-header"><span class="l03-card-icon">🛠️</span><span>Build &amp; Introspection Pipeline</span></div>
          <p>Execute selective parallel compilation with <code>colcon build</code>, resolve missing system dependencies via <code>rosdep</code>, and query installed packages with <code>ros2 pkg</code>.</p>
        </div>
      </div>
    `
  });

  // 2. Section 2: The ROS 2 Workspace Architecture (~/ros2_ws)
  slides.push({
    id: `${lesson.id}_sec2_workspace_hierarchy`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. The ROS 2 Workspace Architecture',
    badge: '📁 Workspace Quartet',
    title: '2. The ROS 2 Workspace Architecture (~/ros2_ws)',
    htmlContent: `
      <div class="l04-two-col-layout">
        <div class="l04-visual-col">
          <div class="l04-visual-frame">
            <img src="assets/images/ros2_workspace_tree.svg" alt="ROS 2 Workspace Hierarchy" class="l04-hero-svg" />
            <span class="l04-visual-caption">Standard 4-directory hierarchy managed by the colcon meta-build tool.</span>
          </div>
          <div class="l04-golden-card warning" style="margin-top: 0.35rem;">
            <div class="l04-golden-header"><span>⚠️</span><strong>Workspace Golden Rule</strong></div>
            <p>Never commit <code>build/</code>, <code>install/</code>, or <code>log/</code> to Git! Add them to <code>.gitignore</code>. Only <code>src/</code> is version-controlled.</p>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📂</span><strong>src/ (Source Code)</strong></div>
            <p>The <strong>only directory you write code in</strong>. Houses cloned Git repositories, scaffolded packages, Python modules, and C++ source files.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚙️</span><strong>build/ (Build Artifacts)</strong></div>
            <p>Created by <code>colcon</code>. Stores intermediate build caches, CMake files, and object binaries. Never edit files in this folder manually.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🚀</span><strong>install/ (Installed Runtime)</strong></div>
            <p>Where <code>colcon</code> stages executable scripts, shared libraries, and <code>setup.bash</code> files. Sourced into your active terminal.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📋</span><strong>log/ (Diagnostic Records)</strong></div>
            <p>Sequential execution logs per package. Contains detailed stdout/stderr dumps to pinpoint compilation or test failures.</p>
          </div>
        </div>
      </div>
    `
  });

  // 3. Section 3: Underlays vs. Overlays: Environment Chaining Model
  slides.push({
    id: `${lesson.id}_sec3_overlay_underlay`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Underlays vs. Overlays: The Environment Chaining Model',
    badge: '⛓️ Environment Chaining',
    title: '3. Underlays vs. Overlays: Environment Chaining',
    htmlContent: `
      <div class="l04-two-col-layout">
        <div class="l04-visual-col">
          <div class="l04-visual-frame">
            <img src="assets/images/ros2_overlay_underlay.svg" alt="Overlay vs Underlay Chaining" class="l04-hero-svg" />
            <span class="l04-visual-caption">Environment Chaining: Sourced overlays shadow base underlays via AMENT_PREFIX_PATH.</span>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🏛️</span><strong>The Underlay (/opt/ros/jazzy)</strong></div>
            <p>The system-wide immutable ROS 2 distribution installed via Ubuntu <code>apt</code>. Houses core middleware (DDS), standard CLI tools, and official hardware drivers.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📦</span><strong>The Overlay (~/ros2_ws)</strong></div>
            <p>Your local user development workspace. When you source <code>~/ros2_ws/install/setup.bash</code>, your packages layer on top of the underlay.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔄</span><strong>Priority Shadowing &amp; Safety</strong></div>
            <p>If an overlay package shares the exact same name as an underlay package, ROS 2 selects the overlay version first. You can patch upstream packages without root permissions!</p>
          </div>
        </div>
      </div>
    `
  });

  // 4. Section 4: Initializing, Building & Sourcing Workspace (Unified Workflow)
  slides.push({
    id: `${lesson.id}_sec4_init_and_build`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Initializing & Building a Workspace',
    badge: '⚙️ Workspace Setup',
    title: '4. Initializing, Building & Sourcing Workspace',
    htmlContent: `
      <div class="l04-two-col-layout">
        <div class="l04-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Step 1</span><strong>Create Source Tree</strong></div>
            <pre><code class="language-bash">mkdir -p ~/ros2_ws/src</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Step 2</span><strong>Meta-Build from Root</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws && colcon build</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Step 3</span><strong>Source Local Overlay</strong></div>
            <pre><code class="language-bash">source ~/ros2_ws/install/setup.bash</code></pre>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">🖥️</span><strong>Specific Observable Outcome</strong></div>
            <pre><code class="language-text">Summary: 0 packages finished [0.25s]

$ ls ~/ros2_ws
build  install  log  src</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚙️</span><strong>colcon 5-Phase Lifecycle</strong></div>
            <p><strong>1. Discovery:</strong> Scans <code>src/</code> for <code>package.xml</code>.<br/>
            <strong>2. Dependency Graph:</strong> Resolves topological ordering.<br/>
            <strong>3. Parallel Execution:</strong> Invokes build tool (setuptools/CMake).<br/>
            <strong>4. Isolation:</strong> Stages binaries cleanly into <code>install/</code>.</p>
          </div>
        </div>
      </div>
    `
  });

  // 5. Section 5: What Makes a Folder a ROS 2 Package?
  slides.push({
    id: `${lesson.id}_sec5_package_definition`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. What Makes a Folder a ROS 2 Package?',
    badge: '📦 Package Concepts',
    title: '5.1 Package Definition & Build Types',
    htmlContent: `
      <div class="l04-two-col-layout">
        <div class="l04-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📦</span><strong>What is a ROS 2 Package?</strong></div>
            <p>The atomic unit of software distribution, compilation, and dependency tracking in ROS 2. Nodes cannot exist as loose files—they must belong to a package.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🐍</span><strong>ament_python Build Type</strong></div>
            <p>Designed for pure Python nodes, launch scripts, and CLI utilities. Uses Python standard <code>setup.py</code> and setuptools. Provides instant hot-reloading with <code>--symlink-install</code>.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚡</span><strong>ament_cmake Build Type</strong></div>
            <p>Designed for C++ performance nodes, real-time motor controllers, and <strong>custom message/service definitions</strong> (<code>.msg</code>, <code>.srv</code>, <code>.action</code>). Uses <code>CMakeLists.txt</code>.</p>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l04-golden-card">
            <div class="l04-golden-header"><span>📋</span><strong>3 Inviolable Package Requirements</strong></div>
            <p>To be recognized as a valid ROS 2 package by <code>colcon</code>, a folder must fulfill:</p>
            <ul style="margin: 0.4rem 0 0 1rem; padding: 0; font-size: 0.76rem; line-height: 1.4; color: var(--text-secondary);">
              <li><strong>1. package.xml Manifest:</strong> Must declare schema Format 3 (<code>&lt;package format="3"&gt;</code>) and package dependencies.</li>
              <li><strong>2. Build Configuration:</strong> Must contain either <code>setup.py</code> (Python) or <code>CMakeLists.txt</code> (C++).</li>
              <li><strong>3. Filesystem Location:</strong> Must reside inside the workspace's <code>src/</code> directory tree.</li>
            </ul>
          </div>
          <div class="l03-concept-card" style="margin-top: 0.35rem;">
            <div class="l03-concept-header"><span class="l03-card-icon">💡</span><strong>AMR Architecture Pattern</strong></div>
            <p>Autonomous robots typically pair high-level Python packages (behavior trees, mission dispatch) with low-level C++ packages (kinematics, LiDAR drivers).</p>
          </div>
        </div>
      </div>
    `
  });

  // 6. Section 5: Python Package Anatomy & Essential Files
  slides.push({
    id: `${lesson.id}_sec5_package_anatomy`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. What Makes a Folder a ROS 2 Package?',
    badge: '🔍 Package Anatomy',
    title: '5.2 Python Package Anatomy & Essential Files',
    htmlContent: `
      <div class="l04-two-col-layout">
        <div class="l04-visual-col">
          <div class="l04-visual-frame">
            <img src="assets/images/ros2_package_tree.svg" alt="ROS 2 Python Package Anatomy" class="l04-hero-svg" />
            <span class="l04-visual-caption">Essential anatomy of an ament_python package: Manifest, entry points, and marker files.</span>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📋</span><strong>package.xml (The Manifest)</strong></div>
            <p>Declares package name, version, license, and build/runtime dependencies (<code>&lt;depend&gt;</code>) parsed by <code>colcon</code> and <code>rosdep</code>.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚙️</span><strong>setup.py &amp; setup.cfg (Build Rules)</strong></div>
            <p>Configures setuptools and maps executable CLI names to Python functions via <code>entry_points={'console_scripts': ['node = pkg.mod:main']}</code>.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🏷️</span><strong>resource/&lt;pkg&gt; (Ament Index Marker)</strong></div>
            <p>An empty marker file placed inside <code>resource/</code> that registers the package with the Ament Index so <code>ros2 pkg</code> can locate it.</p>
          </div>
        </div>
      </div>
    `
  });

  // 7. Section 6 & 7: Package Introspection CLI & rosdep
  slides.push({
    id: `${lesson.id}_sec6_7_introspection_rosdep`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6 & 7. Package Introspection & rosdep',
    badge: '🛠️ CLI & Dependencies',
    title: '6 & 7. Package Introspection CLI & rosdep',
    htmlContent: `
      <div class="l04-two-col-layout">
        <div class="l04-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">CLI</span><strong>Package Query Commands</strong></div>
            <pre><code class="language-bash"># 1. List all discovered packages in environment
ros2 pkg list

# 2. Query exact install prefix directory
ros2 pkg prefix turtlesim
# Output: /opt/ros/jazzy

# 3. Query declared package.xml metadata
ros2 pkg xml turtlesim</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔎</span><strong>Runtime Package Discovery</strong></div>
            <p><code>ros2 pkg</code> inspects the directories listed in <code>$AMENT_PREFIX_PATH</code> to immediately report installed packages and their paths.</p>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">rosdep</span><strong>Automated Dependency Resolution</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws
rosdep update
rosdep install --from-paths src --ignore-src -y</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📌</span><strong>Flag-by-Flag Breakdown</strong></div>
            <p><strong>--from-paths src:</strong> Recursively parses <code>&lt;depend&gt;</code> in all packages inside <code>src/</code>.<br/>
            <strong>--ignore-src:</strong> Skips packages already present in local source.<br/>
            <strong>-y:</strong> Automatically confirms all Ubuntu <code>apt</code> installations.</p>
          </div>
        </div>
      </div>
    `
  });

  // 8. Section 8: Scaffolding the nexus_amr_basics Package
  slides.push({
    id: `${lesson.id}_sec8_scaffold_package`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '8. Create ROS 2 Package (Python)',
    badge: '🔨 Package Creation',
    title: '8.1 Scaffolding the nexus_amr_basics Package',
    htmlContent: `
      <div class="l04-two-col-layout">
        <div class="l04-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal</span><strong>Scaffold Python Package</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python nexus_amr_basics \\
  --dependencies rclpy geometry_msgs std_msgs \\
  --description "Nexus AMR Robotics Core Basics Package"</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚡</span><strong>Command Anatomy</strong></div>
            <p><strong>--build-type ament_python:</strong> Generates Python skeleton.<br/>
            <strong>--dependencies:</strong> Auto-populates <code>&lt;depend&gt;</code> in <code>package.xml</code> with <code>rclpy</code>, <code>geometry_msgs</code>, and <code>std_msgs</code>.</p>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">🖥️</span><strong>Scaffold Verification Outcome</strong></div>
            <pre><code class="language-text">going to create a new package
package name: nexus_amr_basics
destination directory: /home/student/ros2_ws/src

$ ls nexus_amr_basics/
nexus_amr_basics  package.xml  resource  setup.cfg  setup.py  test</code></pre>
          </div>
          <div class="l04-golden-card success">
            <div class="l04-golden-header"><span>✅</span><strong>Scaffold Ready</strong></div>
            <p>The package manifest and setuptools build files are initialized. You are ready to build the package into the workspace overlay.</p>
          </div>
        </div>
      </div>
    `
  });

  // 9. Section 8: Compiling with colcon & Build Telemetry
  slides.push({
    id: `${lesson.id}_sec8_colcon_build`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '8. Create ROS 2 Package (Python)',
    badge: '⚡ Meta-Build Execution',
    title: '8.2 Compiling with colcon & Build Telemetry',
    htmlContent: `
      <div class="l04-two-col-layout">
        <div class="l04-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Workspace Root</span><strong>Selective Meta-Build</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔗</span><strong>--symlink-install (Developer Superpower)</strong></div>
            <p>Symlinks Python files from <code>src/</code> into <code>install/</code>. Changes you make to Python code take effect immediately without re-running colcon build!</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🎯</span><strong>--packages-select (Targeted Build)</strong></div>
            <p>Builds only <code>nexus_amr_basics</code>. In large robot workspaces with 50+ packages, this reduces build time from minutes to 1.2 seconds.</p>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">📊</span><strong>Specific Build Telemetry</strong></div>
            <pre><code class="language-text">Starting >>> nexus_amr_basics
Finished <<< nexus_amr_basics [1.15s]
Summary: 1 package finished [1.32s]</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🚀</span><strong>Lifecycle Output Stages</strong></div>
            <p><strong>Starting &gt;&gt;&gt;:</strong> Worker thread initialized, package verified.<br/>
            <strong>Finished &lt;&lt;&lt; [time]:</strong> Bytecode compiled, entry points registered.<br/>
            <strong>Summary:</strong> Total elapsed time and error status (code 0).</p>
          </div>
        </div>
      </div>
    `
  });

  // 10. Section 8 & 9: Sourcing Contrast Drill & Health Audit
  slides.push({
    id: `${lesson.id}_sec8_9_sourcing_verification`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '8 & 9. Sourcing & Verification',
    badge: '🔍 Sourcing & Verification',
    title: '8.3 Sourcing Contrast Drill & Health Audit',
    htmlContent: `
      <div class="l04-two-col-layout">
        <div class="l04-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Drill</span><strong>The Overlay Sourcing Contrast Test</strong></div>
            <pre><code class="language-bash"># Test 1: BEFORE sourcing install/setup.bash:
ros2 pkg prefix nexus_amr_basics
# -> Package 'nexus_amr_basics' not found

# Test 2: Source local workspace overlay:
source ~/ros2_ws/install/setup.bash

# Test 3: Re-query package prefix:
ros2 pkg prefix nexus_amr_basics
# -> /home/student/ros2_ws/install/nexus_amr_basics</code></pre>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Audit</span><strong>Query Declared Dependencies</strong></div>
            <pre><code class="language-bash">ros2 pkg xml nexus_amr_basics --tag depend</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">🖥️</span><strong>Expected Verification Output</strong></div>
            <pre><code class="language-xml">&lt;depend&gt;rclpy&lt;/depend&gt;
&lt;depend&gt;geometry_msgs&lt;/depend&gt;
&lt;depend&gt;std_msgs&lt;/depend&gt;</code></pre>
          </div>
          <div class="l04-golden-card success">
            <div class="l04-golden-header"><span>✅</span><strong>Overlay Active</strong></div>
            <p><code>nexus_amr_basics</code> is now indexed in the ROS 2 computational graph and ready for Python node development in Lesson 05!</p>
          </div>
        </div>
      </div>
    `
  });

  // 11. Interactive Architecture Explorer: ROS 2 Package Filesystem
  slides.push({
    id: `${lesson.id}_interactive_package`,
    type: 'interactive',
    interactiveKey: 'package',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Interactive Architecture: ROS 2 Package Filesystem',
    title: 'Interactive Package Structure & Execution Trace'
  });

  // 12. Section 10: Production Best Practices & Golden Rules
  slides.push({
    id: `${lesson.id}_sec10_golden_rules`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Production Best Practices',
    badge: '🛡️ Production Rules',
    title: 'ROS 2 Workspace & Build Golden Rules',
    htmlContent: `
      <div class="l04-card-grid-2x2">
        <div class="l04-golden-card">
          <div class="l04-golden-header"><span>📍</span><strong>1. Always Build from Root</strong></div>
          <p>Always execute <code>colcon build</code> from <code>~/ros2_ws</code>, never inside <code>src/</code>. Running build inside <code>src/</code> creates nested orphan build folders.</p>
        </div>
        <div class="l04-golden-card">
          <div class="l04-golden-header"><span>🔄</span><strong>2. Always Source the Overlay</strong></div>
          <p>Every newly opened terminal session must source <code>~/ros2_ws/install/setup.bash</code> to discover newly built packages and executables.</p>
        </div>
        <div class="l04-golden-card">
          <div class="l04-golden-header"><span>🔗</span><strong>3. Use --symlink-install</strong></div>
          <p>Always pass <code>--symlink-install</code> during Python development so edits to Python scripts run immediately without rebuilding.</p>
        </div>
        <div class="l04-golden-card">
          <div class="l04-golden-header"><span>🚫</span><strong>4. Never Commit Build Folders</strong></div>
          <p>Always include <code>build/</code>, <code>install/</code>, and <code>log/</code> in your <code>.gitignore</code>. Only human-written source files in <code>src/</code> belong in version control.</p>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 05:
 * Communication Mechanism I: Publishers, Subscribers & Quality of Service (QoS).
 * Consolidates fragmented single-command micro-splits into unified,
 * high-yield architectural overviews with paired commands, code, and live telemetry.
 */
function buildLesson05Slides(doc, lesson, slides) {
  // 1. Pub/Sub Architecture & Decoupling Road Map
  slides.push({
    id: `${lesson.id}_sec1_architecture_roadmap`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '1. Pub/Sub Architecture Road Map',
    badge: '🧭 Architecture Pillars',
    title: '1. Pub/Sub Architecture & Decoupling Road Map',
    htmlContent: `
      <div class="l05-banner-intro">
        <strong>Autonomous Robotics Core Requirement:</strong> Modern AMRs require asynchronous, decoupled communication between real-time sensors (ultrasonic rangers, LiDAR, cameras) and supervisory safety systems. In ROS 2, this is achieved via the <strong>Publish-Subscribe</strong> model over a decentralized <strong>DDS</strong> message bus.
      </div>
      <div class="l05-card-grid-2x2">
        <div class="l05-pillar-card">
          <div class="l05-pillar-header"><span class="l03-card-icon">📡</span><span>DDS Pub/Sub Decoupling</span></div>
          <p>Master temporal, spatial, and synchronization decoupling over DDS. Messages stream peer-to-peer with zero central master bottleneck.</p>
        </div>
        <div class="l05-pillar-card">
          <div class="l05-pillar-header"><span class="l03-card-icon">🧭</span><span>Ultrasonic Rangefinder Publisher</span></div>
          <p>Author an OOP Python publisher node (<code>ultrasonic_sensor_node.py</code>) streaming <code>sensor_msgs/msg/Range</code> at 10 Hz via non-blocking timers.</p>
        </div>
        <div class="l05-pillar-card">
          <div class="l05-pillar-header"><span class="l03-card-icon">🛡️</span><span>Collision Safety Monitor Subscriber</span></div>
          <p>Author an event-driven subscriber (<code>collision_monitor_node.py</code>) evaluating a 0.50m safety threshold and triggering real-time emergency braking.</p>
        </div>
        <div class="l05-pillar-card">
          <div class="l05-pillar-header"><span class="l03-card-icon">⚡</span><span>QoS Policies &amp; AMR Square Mission</span></div>
          <p>Configure Reliability (<code>RELIABLE</code> vs <code>BEST_EFFORT</code>) and Durability policies, and program Turtlesim to execute an autonomous square patrol.</p>
        </div>
      </div>
    `
  });

  // 2. Interactive Architecture Explorer: Pub/Sub & DDS Message Flow (Replacing Static Diagram)
  slides.push({
    id: `${lesson.id}_interactive_pubsub`,
    type: 'interactive',
    interactiveKey: 'pubsub',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Pub/Sub Message Flow & Topic Buffering',
    badge: '🔄 Interactive Simulator',
    title: 'Interactive Pub/Sub & DDS Message Flow Simulator'
  });

  // 4. Section 3.1: Discovering & Inspecting Message Interfaces (sensor_msgs/msg/Range)
  slides.push({
    id: `${lesson.id}_sec3_interface_inspection`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Message Interface Discovery',
    badge: '🔍 Interface Inspection',
    title: '3.1 Interface Discovery: sensor_msgs/msg/Range',
    htmlContent: `
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">💡</span><strong>Robotics Best Practice: Inspect Before Coding</strong></div>
            <p>Never guess message schemas. Always inspect standard ROS 2 message fields and data types using CLI introspection before writing publisher or subscriber logic.</p>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">CLI Discovery</span><strong>Query Interface Schema</strong></div>
            <pre><code class="language-bash"># Search across interfaces for range types:
ros2 interface list | grep -i range

# Inspect sensor_msgs/msg/Range schema:
ros2 interface show sensor_msgs/msg/Range</code></pre>
          </div>
          <div class="l05-golden-card success" style="margin-top: 0.15rem;">
            <div class="l05-golden-header"><span>🎯</span><strong>Key Insight: msg.range</strong></div>
            <p>The obstacle distance in meters is stored in <code>msg.range</code> (float32). Do not confuse it with generic <code>msg.data</code>!</p>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-output-header"><span class="l03-card-icon">📋</span><strong>Field Definitions &amp; Robotics Semantics</strong></div>
          <div class="l05-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                  <th>Robotics Semantic Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>header.frame_id</code></td>
                  <td>string</td>
                  <td>Mounting coordinate frame (e.g. <code>'ultrasound_front_link'</code>)</td>
                </tr>
                <tr>
                  <td><code>radiation_type</code></td>
                  <td>uint8</td>
                  <td>Transducer type: <code>0 = ULTRASOUND</code>, <code>1 = INFRARED</code></td>
                </tr>
                <tr>
                  <td><code>field_of_view</code></td>
                  <td>float32</td>
                  <td>Detection cone spread in radians (<code>0.5236 rad ≈ 30°</code>)</td>
                </tr>
                <tr>
                  <td><code>min_range / max_range</code></td>
                  <td>float32</td>
                  <td>Operating envelope limits (<code>0.02m</code> to <code>3.0m</code>)</td>
                </tr>
                <tr>
                  <td><code>range</code></td>
                  <td>float32</td>
                  <td><strong>Current measured obstacle distance in meters</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `
  });

  // 5. Section 3.2: Authoring the Ultrasonic Sensor Publisher Node
  slides.push({
    id: `${lesson.id}_sec3_publisher_node`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Writing the Publisher Node',
    badge: '📡 Publisher Node',
    title: '3.2 Authoring the Ultrasonic Sensor Publisher Node',
    htmlContent: `
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Python Node</span><strong>ultrasonic_sensor_node.py</strong></div>
            <pre><code class="language-python">import math, rclpy
from rclpy.node import Node
from sensor_msgs.msg import Range

class UltrasonicSensorPublisher(Node):
    def __init__(self):
        super().__init__('ultrasonic_sensor_node')
        self.pub = self.create_publisher(Range, '/sensor/ultrasonic_front', 10)
        self.timer = self.create_timer(0.1, self.timer_cb)
        self.step = 0

    def timer_cb(self):
        dist = 1.5 + 1.2 * math.sin(0.5 * self.step * 0.1)
        msg = Range()
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.header.frame_id = 'ultrasound_front_link'
        msg.radiation_type = Range.ULTRASOUND
        msg.range = round(dist, 2)
        self.pub.publish(msg)
        self.step += 1</code></pre>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🏷️</span><strong>1. Node Heritage &amp; Registration</strong></div>
            <p>Subclasses <code>rclpy.node.Node</code>. <code>super().__init__('ultrasonic_sensor_node')</code> registers node ID into the ROS 2 graph.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⏱️</span><strong>2. Non-Blocking 10 Hz Timer</strong></div>
            <p><code>create_timer(0.1, self.timer_cb)</code> fires every 100ms. Never blocks the executor thread with <code>time.sleep()</code>.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📡</span><strong>3. DDS Publisher &amp; Default QoS</strong></div>
            <p>Depth <code>10</code> applies default QoS: <code>RELIABLE</code> delivery, <code>VOLATILE</code> durability, and <code>KEEP_LAST(10)</code> ring buffer.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🌊</span><strong>4. Synthetic AMR Telemetry</strong></div>
            <p>Sinusoidal distance oscillates 0.3m–2.7m. Proximity under 0.50m triggers vehicle safety alerts.</p>
          </div>
        </div>
      </div>
    `
  });

  // 6. Section 4: Configuring setup.py, Building & Testing the Publisher
  slides.push({
    id: `${lesson.id}_sec4_setup_build_test`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Build & CLI Introspection',
    badge: '🛠️ Build & Test',
    title: '4. setup.py Entry Point, Build & Topic Introspection',
    htmlContent: `
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">setup.py</span><strong>Step 1: Register Console Script</strong></div>
            <pre><code class="language-python">entry_points={
    'console_scripts': [
        'ultrasonic_publisher = nexus_amr_basics.ultrasonic_sensor_node:main',
    ],
},</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal 1</span><strong>Step 2: Build &amp; Launch (--symlink-install)</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash
ros2 run nexus_amr_basics ultrasonic_publisher</code></pre>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">🔍</span><strong>CLI Steps 1 &amp; 2: Discover &amp; Echo Topic</strong></div>
            <pre><code class="language-bash">$ ros2 topic list
/sensor/ultrasonic_front

$ ros2 topic echo /sensor/ultrasonic_front
range: 1.50 -> [PATH CLEAR]
range: 1.62 -> [PATH CLEAR]</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">⚡</span><strong>CLI Step 3: Stream Rate Introspection</strong></div>
            <pre><code class="language-bash">$ ros2 topic hz /sensor/ultrasonic_front
average rate: 10.012 Hz (period: 0.100s, window: 10)</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 7. Section 5: Authoring the Collision Safety Monitor Subscriber Node
  slides.push({
    id: `${lesson.id}_sec5_subscriber_node`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Writing the Subscriber Node',
    badge: '🛡️ Subscriber Node',
    title: '5. Authoring the Collision Safety Monitor Subscriber',
    htmlContent: `
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Python Node</span><strong>collision_monitor_node.py</strong></div>
            <pre><code class="language-python">import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Range

class CollisionSafetySubscriber(Node):
    def __init__(self):
        super().__init__('collision_monitor_node')
        self.safety_threshold_m = 0.50
        self.sub = self.create_subscription(
            Range, '/sensor/ultrasonic_front',
            self.distance_callback, 10
        )

    def distance_callback(self, msg: Range):
        dist = msg.range
        if dist < self.safety_threshold_m:
            self.get_logger().error(f'ALERT: {dist:.2f}m! EMERGENCY BRAKE!')
        else:
            self.get_logger().info(f'Distance: {dist:.2f}m -> Nominal clear')</code></pre>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚡</span><strong>1. Event-Driven Push Callback</strong></div>
            <p><code>distance_callback</code> runs immediately when a DDS packet arrives. 0% CPU wasted on busy-waiting.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🛡️</span><strong>2. Physical Safety Invariant</strong></div>
            <p>Distance &lt; 0.50m triggers emergency brake alert, overriding motor controllers in complete AMR stacks.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔗</span><strong>3. QoS Compatibility Match</strong></div>
            <p>Depth <code>10</code> matches publisher default QoS (<code>RELIABLE</code> + <code>VOLATILE</code>), guaranteeing packet delivery.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🛑</span><strong>4. Clean Lifecycle Teardown</strong></div>
            <p><code>destroy_node()</code> and <code>rclpy.shutdown()</code> cleanly deregister subscriber from DDS on <code>Ctrl+C</code>.</p>
          </div>
        </div>
      </div>
    `
  });

  // 8. Section 6: Dual-Node End-to-End Verification Drill
  slides.push({
    id: `${lesson.id}_sec6_dual_node_drill`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. Dual-Node Verification Drill',
    badge: '🚀 End-to-End Test',
    title: '6. Dual-Node Telemetry & Verification Drill',
    htmlContent: `
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">setup.py</span><strong>Step 1: Register Entry Point</strong></div>
            <pre><code class="language-python">'collision_monitor = nexus_amr_basics.collision_monitor_node:main',</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Execution</span><strong>Step 2: Launch Dual Nodes</strong></div>
            <pre><code class="language-bash"># Terminal 1: Sensor Publisher
ros2 run nexus_amr_basics ultrasonic_publisher

# Terminal 2: Safety Supervisor
ros2 run nexus_amr_basics collision_monitor</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal 3</span><strong>Step 3: Graph Topic Topology Check</strong></div>
            <pre><code class="language-bash">ros2 topic info /sensor/ultrasonic_front</code></pre>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">🖥️</span><strong>Terminal 2 Live Telemetry: Safety Monitor</strong></div>
            <pre><code class="language-text">[INFO] [collision_monitor]: Initialized (Threshold: 0.50 m)
[INFO] [collision_monitor]: Distance: 1.52 m -> PATH CLEAR
[WARN] [collision_monitor]: ⚠️ EMERGENCY BRAKE! Distance: 0.38 m &lt; 0.50 m!</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">📊</span><strong>Terminal 3 Output: Active DDS Endpoints</strong></div>
            <pre><code class="language-text">Type: sensor_msgs/msg/Range
Publisher count: 1    (/ultrasonic_sensor_node)
Subscription count: 1 (/collision_monitor_node)</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 9. Section 7.1: Quality of Service (QoS) Deep Dive: Policies & Profiles
  slides.push({
    id: `${lesson.id}_sec7_qos_deep_dive`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '7. Quality of Service (QoS)',
    badge: '⚖️ QoS Policies',
    title: '7.1 Quality of Service (QoS): Policies & AMR Profiles',
    htmlContent: `
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🎯</span><strong>1. Reliability Policy</strong></div>
            <p><strong>RELIABLE:</strong> Guarantees delivery via packet ACKs and retransmissions. Used for state machines, e-stops, and goals.<br/>
            <strong>BEST_EFFORT:</strong> Drops delayed packets, minimum latency. Essential for 20-30 Hz sensor streams (LiDAR, camera).</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">💾</span><strong>2. Durability Policy</strong></div>
            <p><strong>VOLATILE:</strong> No samples saved for late joiners.<br/>
            <strong>TRANSIENT_LOCAL:</strong> "Latched" topic; publisher keeps last N samples in memory for late joiners (e.g. <code>/map</code>).</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🗄️</span><strong>3. History &amp; Depth Policy</strong></div>
            <p><strong>KEEP_LAST (N):</strong> Ring buffer of depth N.<br/>
            <strong>KEEP_ALL:</strong> Unbounded buffer (RAM hazard if subscriber lags).</p>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-output-header"><span class="l03-card-icon">🤖</span><strong>Production AMR QoS Selection Matrix</strong></div>
          <div class="l05-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Topic &amp; Stream</th>
                  <th>Reliability</th>
                  <th>Durability</th>
                  <th>Rationale</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>/scan</code> (LiDAR)</td>
                  <td>BEST_EFFORT</td>
                  <td>VOLATILE</td>
                  <td>Latest scan is crucial; never stall for dropped packet.</td>
                </tr>
                <tr>
                  <td><code>/map</code> (Occupancy)</td>
                  <td>RELIABLE</td>
                  <td>TRANSIENT_LOCAL</td>
                  <td>Latched: Late-joining AMRs need map immediately.</td>
                </tr>
                <tr>
                  <td><code>/cmd_vel</code> (Motors)</td>
                  <td>RELIABLE</td>
                  <td>VOLATILE</td>
                  <td>Velocity setpoints must be delivered deterministically.</td>
                </tr>
                <tr>
                  <td><code>/emergency_stop</code></td>
                  <td>RELIABLE</td>
                  <td>VOLATILE</td>
                  <td>Safety invariant; zero packet drop tolerated.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `
  });

  // 10. Section 7.2: The QoS Compatibility Rule (Requested <= Offered)
  slides.push({
    id: `${lesson.id}_sec7_qos_compatibility`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '7. QoS Compatibility & Python Setup',
    badge: '⚠️ Compatibility Rule',
    title: '7.2 The QoS Compatibility Rule (Rx <= Tx) & The Silence Trap',
    htmlContent: `
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l05-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Publisher (Tx)</th>
                  <th>Subscriber (Rx)</th>
                  <th>Compatible?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span class="badge badge-success">RELIABLE</span></td>
                  <td><span class="badge badge-success">RELIABLE</span></td>
                  <td><strong>Compatible ✅</strong> (Guaranteed delivery)</td>
                </tr>
                <tr>
                  <td><span class="badge badge-success">RELIABLE</span></td>
                  <td><span class="badge badge-warning">BEST_EFFORT</span></td>
                  <td><strong>Compatible ✅</strong> (Accepts best effort)</td>
                </tr>
                <tr>
                  <td><span class="badge badge-warning">BEST_EFFORT</span></td>
                  <td><span class="badge badge-warning">BEST_EFFORT</span></td>
                  <td><strong>Compatible ✅</strong> (Low-latency stream)</td>
                </tr>
                <tr>
                  <td><span class="badge badge-warning">BEST_EFFORT</span></td>
                  <td><span class="badge badge-danger">RELIABLE</span></td>
                  <td><strong>INCOMPATIBLE ❌ (Silent Failure!)</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="l05-golden-card warning" style="margin-top: 0.25rem;">
            <div class="l05-golden-header"><span>⚠️</span><strong>The QoS "Silence" Trap</strong></div>
            <p>If a subscriber requests <code>RELIABLE</code> from a <code>BEST_EFFORT</code> publisher, both nodes run without crashing, but <strong>ZERO messages are ever received</strong>!</p>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Python QoS</span><strong>Authoring Profiles with rclpy.qos</strong></div>
            <pre><code class="language-python">from rclpy.qos import QoSProfile, ReliabilityPolicy, DurabilityPolicy, qos_profile_sensor_data

# Option A: Pre-built Sensor Profile (Best-Effort, Volatile, Depth 5)
self.sub = self.create_subscription(LaserScan, '/scan', self.cb, qos_profile=qos_profile_sensor_data)

# Option B: Custom Latched Profile (Reliable, Latched, Depth 1)
latched_qos = QoSProfile(
    reliability=ReliabilityPolicy.RELIABLE,
    durability=DurabilityPolicy.TRANSIENT_LOCAL,
    depth=1
)
self.map_sub = self.create_subscription(OccupancyGrid, '/map', self.cb, qos_profile=latched_qos)</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 11. Section 7.3: Multi-Topic Architecture: Single Node Multi Pub/Sub
  slides.push({
    id: `${lesson.id}_sec7_multi_pubsub`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '7. Multi-Topic Architecture',
    badge: '🔀 Multi-Topic Hub',
    title: '7.3 Multi-Topic Architecture: Single Node Multi Pub/Sub',
    htmlContent: `
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🧠</span><strong>Single-Node Multi-Channel Hub</strong></div>
            <p>A ROS 2 node is an OOP class that can host <strong>multiple publishers and subscribers</strong> across different topics simultaneously to serve as a central AMR safety supervisor.</p>
          </div>
          <div class="l05-golden-card">
            <div class="l05-golden-header"><span>📥</span><strong>3 Inbound Subscriptions</strong></div>
            <p><code>/sensor/ultrasonic_front</code> (Range, 10Hz), <code>/odom</code> (Odometry, 50Hz), and <code>/teleop_cmd</code> (Twist, 20Hz).</p>
          </div>
          <div class="l05-golden-card success" style="margin-top: 0.15rem;">
            <div class="l05-golden-header"><span>📤</span><strong>2 Outbound Publishers</strong></div>
            <p><code>/cmd_vel</code> (Safe motor commands) and <code>/diagnostics/safety_status</code> (Fleet telemetry).</p>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Python Hub</span><strong>amr_safety_supervisor_node.py</strong></div>
            <pre><code class="language-python">class MultiTopicSupervisor(Node):
    def __init__(self):
        super().__init__('amr_safety_supervisor_node')
        # 3 Subscriptions
        self.sub_range = self.create_subscription(Range, '/sensor/ultrasonic_front', self.range_cb, 10)
        self.sub_odom  = self.create_subscription(Odometry, '/odom', self.odom_cb, 10)
        self.sub_cmd   = self.create_subscription(Twist, '/teleop_cmd', self.teleop_cb, 10)

        # 2 Publishers
        self.pub_vel    = self.create_publisher(Twist, '/cmd_vel', 10)
        self.pub_status = self.create_publisher(String, '/diagnostics/safety_status', 10)

        # 20 Hz Arbitration Control Loop (zeros speed if obstacle < 0.50m)
        self.timer = self.create_timer(0.05, self.control_loop)</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">💡</span><strong>CLI Node Introspection</strong></div>
            <pre><code class="language-bash">ros2 node info /amr_safety_supervisor_node
# Prints all 3 subscriptions and 2 publishers!</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 12. Section 8: Student Challenge: Turtlesim Autonomous Square Patrol
  slides.push({
    id: `${lesson.id}_sec8_student_challenge`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '8. Hands-on Student Challenge',
    badge: '🎯 Student Mission',
    title: '8. Student Challenge: AMR Square Patrol Controller',
    htmlContent: `
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔄</span><strong>Two-State Finite State Machine (FSM)</strong></div>
            <p><strong>STATE_FORWARD:</strong> <code>linear.x = 2.0 m/s</code>, <code>angular.z = 0.0</code> for 2.0s (4.0m leg).<br/>
            <strong>STATE_TURN:</strong> <code>linear.x = 0.0</code>, <code>angular.z = 1.5708 rad/s</code> for 1.0s (90° CCW pivot).</p>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Transition Loop</span><strong>10 Hz Control Callback</strong></div>
            <pre><code class="language-python">self.state_elapsed_time += self.timer_period
if self.state == self.STATE_FORWARD:
    cmd.linear.x = self.linear_speed
    if self.state_elapsed_time >= self.forward_duration:
        self.state = self.STATE_TURN
        self.state_elapsed_time = 0.0
elif self.state == self.STATE_TURN:
    cmd.angular.z = self.angular_speed
    if self.state_elapsed_time >= self.turn_duration:
        self.state = self.STATE_FORWARD
        self.state_elapsed_time = 0.0
self.cmd_vel_pub.publish(cmd)</code></pre>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Execution Run Sheet</span><strong>Launch &amp; Test Controller</strong></div>
            <pre><code class="language-bash"># Terminal 1: Simulator | Terminal 2: Controller
ros2 run turtlesim turtlesim_node
ros2 run nexus_amr_basics square_turtle

# Terminal 3: Velocity Telemetry Echo
ros2 topic echo /turtle1/cmd_vel</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">🖥️</span><strong>Expected Terminal Telemetry</strong></div>
            <pre><code class="language-text">[INFO] [turtle_square]: Initializing TurtleSquareController...
[INFO] [turtle_square]: State FORWARD: driving edge #1...
[INFO] [turtle_square]: State TURN: rotating 90 degrees left...
[INFO] [turtle_square]: State FORWARD: driving edge #2...
[INFO] [turtle_square]: Zero-velocity halt published on exit.</code></pre>
          </div>
        </div>
      </div>
    `
  });


  // 14. Section 9: Production Best Practices & Golden Rules
  slides.push({
    id: `${lesson.id}_sec9_golden_rules`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Production Best Practices',
    badge: '🛡️ Production Rules',
    title: 'Publishers, Subscribers & QoS Golden Rules',
    htmlContent: `
      <div class="l05-card-grid-2x2">
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>⏱️</span><strong>1. Non-Blocking Callbacks</strong></div>
          <p>Never call <code>time.sleep()</code> inside a callback or timer! It halts the ROS 2 executor thread, freezing all other callbacks and starving incoming topic queues.</p>
        </div>
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>📡</span><strong>2. Match QoS to Data Semantics</strong></div>
          <p>Use <code>BEST_EFFORT</code> for loss-tolerant high-rate sensor streams (LiDAR, cameras). Use <code>RELIABLE</code> for safety alerts, state transitions, and navigation goals.</p>
        </div>
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>🔗</span><strong>3. Build with --symlink-install</strong></div>
          <p>Always compile with <code>--symlink-install</code> during Python development. Python script edits in <code>src/</code> execute immediately without re-compiling.</p>
        </div>
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>🛑</span><strong>4. Fail-Safe Zero-Velocity Shutdown</strong></div>
          <p>Always catch <code>KeyboardInterrupt</code> and publish a zero-velocity <code>Twist()</code> in the <code>finally:</code> block to ensure AMRs halt safely when control processes exit.</p>
        </div>
      </div>
    `
  });
}


