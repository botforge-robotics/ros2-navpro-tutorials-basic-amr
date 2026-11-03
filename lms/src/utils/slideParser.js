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
      const partA = doc.createElement('div');
      const partB = doc.createElement('div');
      let foundTable = false;
      Array.from(container.children).forEach(child => {
        if (child.querySelector('table') || child.tagName.toLowerCase() === 'table' || child.classList.contains('table-responsive')) {
          foundTable = true;
        }
        if (!foundTable) partA.appendChild(child.cloneNode(true));
        else partB.appendChild(child.cloneNode(true));
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
          <div class="terminator-merged-slide-layout">
            <div class="term-left-col">${partA.innerHTML}</div>
            <div class="term-right-col">
              <div class="term-shortcuts-header"><span class="shortcuts-badge">⌨️ Essential Shortcuts</span></div>
              ${partB.innerHTML}
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
  if (lesson.id === '02' || lesson.num_str === '02') {
    buildLesson02Slides(doc, lesson, slides);
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

  // 5. Section 3.4: Windows OS Metaphor (Reorganized Layout: Hero 16:9 Banner + Comparison Cards)
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
      <div class="deck-metaphor-reorganized-layout">
        <div class="metaphor-hero-visual-wrap">
          <img src="assets/images/ros_metaphor_pc_vs_robot.jpg" alt="PC OS vs Robot OS Metaphor" class="metaphor-wide-hero-img" />
        </div>
        <div class="metaphor-cards-row">
          <div class="metaphor-card pc-card">
            <div class="card-tag"><span class="card-icon">🖥️</span><strong>Personal Computers (Windows / macOS)</strong></div>
            <p>Standardizes hardware abstraction (GPUs, audio, USB, Wi-Fi) and graphics APIs (DirectX, Metal). Game developers focus on gameplay, not writing custom graphics card microcode.</p>
          </div>
          <div class="metaphor-card robot-card">
            <div class="card-tag"><span class="card-icon">🤖</span><strong>Autonomous Mobile Robots (ROS 2)</strong></div>
            <p>Standardizes hardware abstraction (LiDAR, cameras, IMUs, motor drives) and publish-subscribe IPC. Autonomous navigation engineers focus on path planning, not low-level byte parsing.</p>
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

  // 14. Section 8: Sourcing ROS 2 Underlay
  slides.push({
    id: `${lesson.id}_sec8_sourcing`,
    type: 'command',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '8. Sourcing ROS 2 Environment',
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

  // 15. Section 9: Verification & Smoke Test
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
}
