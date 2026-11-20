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
        const listItems = Array.from(bCard.querySelectorAll('.code-breakdown-item'));
        if (listItems.length > 3) {
          const mid = Math.ceil(listItems.length / 2);
          const parts = [listItems.slice(0, mid), listItems.slice(mid)];
          parts.forEach((pItems, pIdx) => {
            const clone = bCard.cloneNode(true);
            const cloneList = clone.querySelector('.code-breakdown-list');
            if (cloneList) {
              cloneList.innerHTML = '';
              pItems.forEach(it => cloneList.appendChild(it.cloneNode(true)));
            }
            slides.push({
              id: `${baseId}_breakdown_${bIdx}_p${pIdx + 1}`,
              type: 'step_breakdown',
              lessonNum: lesson.num_str,
              lessonId: lesson.id,
              module: lesson.module,
              sectionTitle: h2Title,
              badge: 'Architecture Breakdown',
              title: `${title} — Mechanics (Part ${pIdx + 1})`,
              htmlContent: clone.outerHTML
            });
          });
          return;
        }

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

    // 1b. If an alert-callout wraps multiple code blocks or major content, flatten it so children can chunk
    container.querySelectorAll('.alert-callout, .alert').forEach(alert => {
      const internalCode = alert.querySelectorAll('.code-container, pre');
      if (internalCode.length > 1 || alert.textContent.trim().length > 600) {
        const body = alert.querySelector('.alert-body') || alert;
        const frag = doc.createDocumentFragment();
        while (body.firstChild) {
          frag.appendChild(body.firstChild);
        }
        alert.replaceWith(frag);
      }
    });

    // 1c. If a grid has >= 4 complex cards, split into 2 smaller grids so chunker can distribute them as siblings
    container.querySelectorAll('div[style*="grid"]').forEach(grid => {
      const items = Array.from(grid.children).filter(c => c.nodeType === 1);
      if (items.length >= 5 || (items.length >= 4 && grid.querySelector('pre, code'))) {
        const mid = Math.ceil(items.length / 2);
        const grid1 = grid.cloneNode(false);
        const grid2 = grid.cloneNode(false);
        items.slice(0, mid).forEach(it => grid1.appendChild(it.cloneNode(true)));
        items.slice(mid).forEach(it => grid2.appendChild(it.cloneNode(true)));
        
        if (grid.parentNode) {
          grid.parentNode.insertBefore(grid1, grid);
          grid.parentNode.insertBefore(grid2, grid);
          grid.remove();
        }
      }
    });

    // 1d. Reset excessive inline margins on tables and responsive wrappers
    container.querySelectorAll('.table-responsive, table').forEach(t => {
      t.style.marginTop = '0.2rem';
      t.style.marginBottom = '0.2rem';
    });

    // 2. Extract any .code-breakdown-card elements so they become dedicated subsequent slides
    const breakdownCards = Array.from(container.querySelectorAll('.code-breakdown-card'));
    breakdownCards.forEach(card => card.remove());

    // 3. Trim all <pre> code blocks to <= 10 lines to eliminate 1600-2000px code dumps on slides
    container.querySelectorAll('pre').forEach(pre => {
      const codeElem = pre.querySelector('code') || pre;
      const raw = codeElem.textContent;
      const lines = raw.split('\n');
      if (lines.length > 10) {
        codeElem.textContent = lines.slice(0, 9).join('\n') + '\n\n# ... [Full implementation available in Web LMS] ...';
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
    // Intelligent chunking: split if text is excessively long or if multiple bulky elements (code, tables) are present
    const childNodes = Array.from(container.children);
    const codeBlocksInContainer = container.querySelectorAll('pre, .code-container');
    const shouldChunk = depth < 1 && rawImgs.length === 0 && childNodes.length > 1 && (
      container.textContent.trim().length > 680 ||
      (codeBlocksInContainer.length > 1 && container.textContent.trim().length > 350) ||
      (container.querySelector('table') && container.textContent.trim().length > 380)
    );

    if (shouldChunk) {
      const chunks = [];
      let currentChunk = [];
      let currentLen = 0;

      childNodes.forEach(child => {
        const textLen = child.textContent.trim().length;
        const hasCode = !!child.querySelector('pre, .code-container') || child.tagName.toLowerCase() === 'pre';
        const hasTable = !!child.querySelector('table') || child.tagName.toLowerCase() === 'table';
        const isBig = textLen > 400 || (hasCode && textLen > 200) || hasTable;
        const chunkHasCode = currentChunk.some(c => c.querySelector('pre, .code-container') || c.tagName.toLowerCase() === 'pre');

        if (currentChunk.length > 0 && (isBig || currentLen + textLen > 650 || (hasCode && chunkHasCode))) {
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
  } else if (lesson.id === '06' || lesson.num_str === '06' || lesson.id === 'lesson_06') {
    buildLesson06Slides(doc, lesson, slides);
  } else if (lesson.id === '07' || lesson.num_str === '07' || lesson.id === 'lesson_07') {
    buildLesson07Slides(doc, lesson, slides);
  } else if (lesson.id === '08' || lesson.num_str === '08' || lesson.id === 'lesson_08') {
    buildLesson08Slides(doc, lesson, slides);
  } else if (lesson.id === '09' || lesson.num_str === '09' || lesson.id === 'lesson_09') {
    buildLesson09Slides(doc, lesson, slides);
  } else if (lesson.id === '10' || lesson.num_str === '10' || lesson.id === 'lesson_10') {
    buildLesson10Slides(doc, lesson, slides);
  } else if (lesson.id === '11' || lesson.num_str === '11' || lesson.id === 'lesson_11') {
    buildLesson11Slides(doc, lesson, slides);
  } else if (lesson.id === '12' || lesson.num_str === '12' || lesson.id === 'lesson_12') {
    buildLesson12Slides(doc, lesson, slides);
  } else if (lesson.id === '13' || lesson.num_str === '13' || lesson.id === 'lesson_13') {
    buildLesson13Slides(doc, lesson, slides);
  } else if (lesson.id === '14' || lesson.num_str === '14' || lesson.id === 'lesson_14') {
    buildLesson14Slides(doc, lesson, slides);
  } else if (lesson.id === '15' || lesson.num_str === '15' || lesson.id === 'lesson_15') {
    buildLesson15Slides(doc, lesson, slides);
  } else if (lesson.id === '16' || lesson.num_str === '16' || lesson.id === 'lesson_16') {
    buildLesson16Slides(doc, lesson, slides);
  } else if (lesson.id === '17' || lesson.num_str === '17' || lesson.id === 'lesson_17') {
    buildLesson17Slides(doc, lesson, slides);
  } else if (lesson.id === '18' || lesson.num_str === '18' || lesson.id === 'lesson_18') {
    buildLesson18Slides(doc, lesson, slides);
  } else if (lesson.id === '19' || lesson.num_str === '19' || lesson.id === 'lesson_19') {
    buildLesson19Slides(doc, lesson, slides);
  } else if (lesson.id === '20' || lesson.num_str === '20' || lesson.id === 'lesson_20') {
    buildLesson20Slides(doc, lesson, slides);
  } else if (lesson.id === '21' || lesson.num_str === '21' || lesson.id === 'lesson_21') {
    buildLesson21Slides(doc, lesson, slides);
  } else if (lesson.id === '22' || lesson.num_str === '22' || lesson.id === 'lesson_22') {
    buildLesson22Slides(doc, lesson, slides);
  } else {
    sections.forEach((section, secIdx) => {
    const h2 = section.querySelector('h2');
    const h2Title = h2 ? h2.textContent.trim() : `Section ${secIdx + 1}`;
    const h2Lower = h2Title.toLowerCase();

    // Skip Section 1 if it is just "Overview & Learning Objectives" or "Roadmap" (already in Launchpad)
    if (
      h2Lower.includes('learning objectives') ||
      h2Lower.includes('road map') ||
      h2Lower.includes('roadmap') ||
      (h2Lower.includes('overview') && secIdx <= 1)
    ) {
      return;
    }

    // Skip Hands-on Student Challenges and Practical Labs (3-Day Workshop PPT requirement)
    if (
      h2Lower.includes('challenge') ||
      h2Lower.includes('practical lab') ||
      h2Lower.includes('student lab') ||
      h2Lower.includes('mission') ||
      h2Lower.includes('hands-on student')
    ) {
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

    // Check for File Edit Steps (Consolidate multi-step files: Lesson 7, 17, 19, etc.)
    const fileSteps = Array.from(section.querySelectorAll('.file-edit-step'));
    if (fileSteps.length > 0) {
      const fileGroups = [];
      let currentGroup = null;

      fileSteps.forEach((step) => {
        const titleText = step.querySelector('.file-edit-step-title')?.textContent?.trim() || '';
        const descElem = step.querySelector('.step-description');
        const codeElem = step.querySelector('pre code');
        const code = codeElem ? codeElem.textContent.trim() : '';
        const lang = step.querySelector('.code-lang-tag')?.textContent?.trim() || 'python';

        const pathMatch = descElem?.textContent?.match(/([~./\w_-]+\.[a-zA-Z0-9]+)/);
        const isOpenStep = titleText.toLowerCase().includes('open') || code.length === 0;

        if (isOpenStep || !currentGroup) {
          if (currentGroup && currentGroup.codes.length > 0) {
            fileGroups.push(currentGroup);
          }
          const targetPath = pathMatch ? pathMatch[1] : '';
          const fileName = targetPath ? targetPath.split('/').pop() : 'Configuration File';
          currentGroup = {
            targetPath,
            fileName,
            descriptions: [],
            codes: [],
            lang: lang || 'python'
          };
          if (descElem && !isOpenStep) {
            currentGroup.descriptions.push(descElem.textContent.trim());
          }
        } else if (titleText.toLowerCase().includes('verify') || titleText.toLowerCase().includes('full file')) {
          if (currentGroup.codes.length === 0 && code.length > 0) {
            currentGroup.codes.push(code);
          }
        } else {
          if (descElem) {
            currentGroup.descriptions.push(descElem.textContent.trim());
          }
          if (code.length > 0) {
            currentGroup.codes.push(code);
            if (lang) currentGroup.lang = lang;
          }
        }
      });

      if (currentGroup && (currentGroup.codes.length > 0 || currentGroup.descriptions.length > 0)) {
        fileGroups.push(currentGroup);
      }

      fileGroups.forEach((group, gIdx) => {
        const combinedCode = group.codes.join('\n\n');
        const summaryDesc = group.descriptions.slice(0, 2).join(' ') || `Update ${group.fileName} configuration.`;
        const pathBadge = group.targetPath ? `<code>${group.targetPath}</code>` : `<code>${group.fileName}</code>`;

        slides.push({
          id: `${lesson.id}_file_${secIdx}_${gIdx}_${group.fileName.replace(/[^a-zA-Z0-9]/g, '_')}`,
          type: 'code_step',
          lessonNum: lesson.num_str,
          lessonId: lesson.id,
          module: lesson.module,
          sectionTitle: h2Title,
          badge: group.fileName,
          title: `${h2Title.replace(/^\d+\.\s*/, '')}: ${group.fileName}`,
          desc: `<div class="file-path-strip"><span class="file-path-label">📁 Target:</span> ${pathBadge}</div><p class="file-edit-summary">${summaryDesc}</p>`,
          code: trimCodeForPresentation(combinedCode),
          lang: group.lang,
          breakdown: null,
          htmlContent: ''
        });
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
        const subtopicLower = subtopicTitle.toLowerCase();

        // Skip challenge subtopics (e.g. Starter Template, Verification Steps for student challenge)
        if (
          subtopicLower.includes('challenge') ||
          subtopicLower.includes('starter template') ||
          subtopicLower.includes('student lab') ||
          subtopicLower.includes('solution breakdown') ||
          subtopicLower.includes('task_spawn')
        ) {
          return;
        }

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
  // Exclude Lesson 03 quiz slides per user request to maintain uninterrupted operational flow
  if (lesson.id !== '03' && lesson.num_str !== '03' && lesson.id !== 'lesson_03') {
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

  // 5. Section 3.4: Windows / PC OS Metaphor & Middleware Reality
  slides.push({
    id: `${lesson.id}_sec3_4_metaphor_and_stack`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Robotics Fundamentals & ROS 2 Architecture',
    badge: '💻 Architectural Metaphor',
    title: '3.4 What is ROS? The PC OS Metaphor & The 4-Tier Software Stack',
    htmlContent: `
      <div class="l02-metaphor-stack-layout">
        <!-- Col 1: Metaphor Visual (Enlarged) -->
        <div class="metaphor-col">
          <div class="metaphor-visual-card">
            <img src="assets/images/ros_metaphor_pc_vs_robot.jpg" alt="PC OS vs Robot OS Metaphor" />
          </div>
        </div>

        <!-- Col 2: Metaphor Comparisons & Meta-OS Reality (Replaced 1-4 points) -->
        <div class="stack-col">
          <div class="stack-alert-box">
            <strong>Core Reality: Middleware Framework, Not a Bare-Metal Kernel</strong><br/>
            ROS 2 does <em>not</em> manage CPU scheduling or raw memory. It is a <strong>meta-operating system</strong> installing in user space on top of Ubuntu Linux.
          </div>
          <div class="metaphor-comparisons">
            <div class="metaphor-compare-card pc-compare">
              <div class="card-tag"><span>🖥️</span><strong>Personal Computers (Windows / macOS)</strong></div>
              <p>Standardizes hardware abstraction (GPUs, audio, USB, Wi-Fi) and graphics APIs (DirectX). Devs focus on gameplay, not writing graphics card microcode.</p>
            </div>
            <div class="metaphor-compare-card amr-compare">
              <div class="card-tag"><span>🤖</span><strong>Autonomous Mobile Robots (ROS 2)</strong></div>
              <p>Standardizes hardware abstraction (LiDAR, cameras, IMUs, motor drives) and DDS IPC. Autonomy engineers focus on navigation, not low-level byte parsing.</p>
            </div>
          </div>
          <div class="stack-takeaway">
            <strong>💡 Unified Engineering Takeaway:</strong> The PC OS metaphor explains <em>why</em> we standardize (hardware independence); ROS 2 sits as a user-space meta-OS over Linux to achieve this.
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
          <div class="l03-concept-card" style="border-left: 3px solid #10b981; background: rgba(16, 185, 129, 0.05);">
            <div class="l03-concept-header"><span class="l03-card-icon">🐚</span><strong>Permanent Sourcing in ~/.bashrc</strong></div>
            <p>Ensure newly opened terminal panes auto-load ROS 2 without typing source each time:<br/>
            <code>echo "source /opt/ros/jazzy/setup.bash" &gt;&gt; ~/.bashrc</code></p>
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
}

/**
 * Dedicated Pedagogical Deck Builder for Lesson 04:
 * ROS 2 Workspace & Package Architecture Deep Dive.
 * Consolidates fragmented single-command micro-splits into unified,
 * high-yield architectural overviews with commands and outcomes side-by-side.
 */
function buildLesson04Slides(doc, lesson, slides) {
  // 1. Section 2: The ROS 2 Workspace Architecture (~/ros2_ws) (Direct start, no duplicate roadmap)
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
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Step 4</span><strong>Permanent ~/.bashrc Sourcing</strong></div>
            <pre><code class="language-bash">echo "source ~/ros2_ws/install/setup.bash" >> ~/.bashrc</code></pre>
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

  // 10. Section 10: Production Best Practices & Golden Rules
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
  // 1. Interactive Architecture Stage: Pub/Sub & DDS Message Flow (Merged Roadmap & Live Simulator)
  slides.push({
    id: `${lesson.id}_interactive_pubsub`,
    type: 'interactive',
    interactiveKey: 'pubsub',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '1. Topic Architecture & Pub/Sub Message Flow',
    badge: '🔄 Interactive Simulator',
    title: 'Interactive Pub/Sub Architecture & DDS Message Flow Simulator'
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

  // 10. Section 7.3: Multi-Topic Architecture: Single Node Multi Pub/Sub
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
        <div class="l05-visual-col">
          <div class="l05-visual-frame">
            <img src="assets/images/ros2_multi_topic_hub.svg" alt="Multi-Topic Architecture Diagram" class="l05-hero-svg" />
            <span class="l05-visual-caption">Decoupled Multi-Topic Topology: 3 Inbound Subscriptions &amp; 2 Outbound Publishers on 1 Node.</span>
          </div>
          <div class="l05-golden-card success" style="margin-top: 0.25rem;">
            <div class="l05-golden-header"><span>🔀</span><strong>Single Node Multi-Channel Hub</strong></div>
            <p>1 Python class binds multiple <code>create_subscription</code> &amp; <code>create_publisher</code> instances, arbitrating multi-rate sensor and command streams safely.</p>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Python Hub</span><strong>amr_safety_supervisor_node.py</strong></div>
            <pre><code class="language-python">class MultiTopicSupervisor(Node):
    def __init__(self):
        super().__init__('amr_safety_supervisor_node')
        # 3 Subscriptions (Inbound Telemetry)
        self.sub_range = self.create_subscription(Range, '/sensor/ultrasonic_front', self.range_cb, 10)
        self.sub_odom  = self.create_subscription(Odometry, '/odom', self.odom_cb, 10)
        self.sub_cmd   = self.create_subscription(Twist, '/teleop_cmd', self.teleop_cb, 10)

        # 2 Publishers (Outbound Actuation &amp; Health)
        self.pub_vel    = self.create_publisher(Twist, '/cmd_vel', 10)
        self.pub_status = self.create_publisher(String, '/diagnostics/safety_status', 10)

        # 20 Hz Arbitrated Safety Control Loop
        self.timer = self.create_timer(0.05, self.control_loop)</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">💡</span><strong>CLI Node Introspection</strong></div>
            <pre><code class="language-bash">ros2 node info /amr_safety_supervisor_node
# Verified: 3 Subscriptions and 2 Publishers active</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // Section 9: Production Best Practices & Golden Rules
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

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 06:
 * Communication Mechanism II: Service Servers & Clients in Python.
 * Replaces fragmented 23-slide micro-splits with executive-quality,
 * high-yield 2-column slides, compact code presentation, and interactive RPC simulator.
 */
function buildLesson06Slides(doc, lesson, slides) {
  // 1. Interactive Service Architecture Stage (2-Way Request ➔ Response RPC Simulator)
  slides.push({
    id: `${lesson.id}_interactive_service`,
    type: 'interactive',
    interactiveKey: 'service',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Service Architecture & Communication Flow',
    badge: '🔄 Interactive Simulator',
    title: 'Interactive Service Architecture: 2-Way Request ➔ Response (RPC)'
  });

  // 2. Section 2: Decision Matrix (Topics vs Services vs Actions)
  slides.push({
    id: `${lesson.id}_sec2_decision_matrix`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Communication Pattern Selection',
    badge: '🧭 Architecture Selection',
    title: '2. Decision Matrix: Topics vs Services vs Actions',
    htmlContent: `
      <div class="l06-two-col-layout">
        <div class="l06-visual-col">
          <div class="l06-visual-frame">
            <img src="assets/images/ros2_comm_patterns_decision.svg" alt="ROS 2 Communication Patterns Decision Architecture" class="l06-hero-svg" />
            <div class="l06-visual-caption">Figure 6.1: Deterministic Decision Flow for ROS 2 Communication Primitives</div>
          </div>
          <div class="l06-golden-card success" style="margin-top: 0.15rem;">
            <div class="l06-golden-header"><span>🎯</span><strong>Primary Decision Rule: Synchronous Confirmation</strong></div>
            <p>Use <strong>Services</strong> for short (&lt;50ms) bidirectional Request-Response transactions where explicit execution confirmation is required before proceeding.</p>
          </div>
        </div>
        <div class="l06-content-col">
          <div class="l06-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Pattern</th>
                  <th>Data Flow</th>
                  <th>Feedback?</th>
                  <th>Robotics Production Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Topics</code></td>
                  <td>Many-to-Many Stream (Unidirectional)</td>
                  <td>None</td>
                  <td>Continuous sensor feeds (<code>/scan</code>, <code>/odom</code>), velocity setpoints (<code>/cmd_vel</code>)</td>
                </tr>
                <tr>
                  <td><code>Services</code></td>
                  <td><strong>1-to-1 Unicast (Request ➔ Response)</strong></td>
                  <td><strong>Receipt Only</strong></td>
                  <td><strong>Atomic safety interlocks (<code>/robot/emergency_stop</code>), mode changes, zeroing IMU</strong></td>
                </tr>
                <tr>
                  <td><code>Actions</code></td>
                  <td>1-to-1 Client-Server (Goal / Feedback / Result)</td>
                  <td>Continuous Progress</td>
                  <td>Long-duration tasks: Nav2 waypoint navigation (<code>/navigate_to_pose</code>), arm manipulation</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="l06-golden-card warning" style="margin-top: 0.2rem;">
            <div class="l06-golden-header"><span>⚠️</span><strong>Anti-Pattern: Never Stream over Services</strong></div>
            <p>Never stream continuous 50Hz sensor data over Services. Services block until round-trip completes, introducing catastrophic latency and queue starving.</p>
          </div>
        </div>
      </div>
    `
  });

  // 3. Section 3.1: Service Interface Discovery & Contract (TriggerEmergencyStop.srv)
  slides.push({
    id: `${lesson.id}_sec3_interface_contract`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Interface Discovery & Contract',
    badge: '📋 Interface Contract',
    title: '3.1 Service Interface Discovery: TriggerEmergencyStop',
    htmlContent: `
      <div class="l06-two-col-layout">
        <div class="l06-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">💡</span><strong>Robotics Best Practice: Inspect Before Coding</strong></div>
            <p>Always query interfaces via CLI to inspect field names, data types, and the <code>---</code> request/response separator.</p>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">CLI Discovery</span><strong>Query Service Interfaces</strong></div>
            <pre><code class="language-bash"># Search service types and inspect schema:
ros2 interface list | grep srv | grep -i emergency
ros2 interface show nexus_amr_interfaces/srv/TriggerEmergencyStop</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">📄</span><strong>Interface Definition (.srv Schema)</strong></div>
            <pre><code class="language-plaintext"># Request (Input payload sent by Client)
bool emergency_stop_requested
string reason
---
# Response (Output payload returned by Server)
bool success
string status_message
float32 stop_timestamp</code></pre>
          </div>
        </div>
        <div class="l06-content-col">
          <div class="l06-table-wrap">
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
                  <td><code>emergency_stop_requested</code></td>
                  <td>bool</td>
                  <td><code>True</code> engages motor brakes; <code>False</code> clears halt</td>
                </tr>
                <tr>
                  <td><code>reason</code></td>
                  <td>string</td>
                  <td>Diagnostic rationale for safety compliance (ISO 3691-4)</td>
                </tr>
                <tr>
                  <td><code>---</code></td>
                  <td>separator</td>
                  <td><strong>Mandatory boundary:</strong> Top = Request; Bottom = Response</td>
                </tr>
                <tr>
                  <td><code>success</code></td>
                  <td>bool</td>
                  <td>Acknowledgment flag verifying physical relay engagement</td>
                </tr>
                <tr>
                  <td><code>status_message</code></td>
                  <td>string</td>
                  <td>Human-readable receipt (e.g. <code>'EMERGENCY BRAKE ENGAGED'</code>)</td>
                </tr>
                <tr>
                  <td><code>stop_timestamp</code></td>
                  <td>float32</td>
                  <td>Epoch timestamp in seconds for audit trails</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="l06-golden-card success" style="margin-top: 0.16rem;">
            <div class="l06-golden-header"><span>🎯</span><strong>Deterministic Safety Contract</strong></div>
            <p>Every service call produces exactly one strongly-typed response receipt, ensuring deterministic safety verification.</p>
          </div>
        </div>
      </div>
    `
  });

  // 4. Section 3.2: Authoring the Emergency Stop Server Node
  slides.push({
    id: `${lesson.id}_sec3_server_implementation`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Service Server Implementation',
    badge: '🛡️ Safety Server Node',
    title: '3.2 Authoring the Emergency Stop Server (emergency_stop_server.py)',
    htmlContent: `
      <div class="l06-two-col-layout">
        <div class="l06-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Python Node</span><strong>emergency_stop_server.py</strong></div>
            <pre><code class="language-python">import rclpy
from rclpy.node import Node
from nexus_amr_interfaces.srv import TriggerEmergencyStop

class EmergencyStopServer(Node):
    def __init__(self):
        super().__init__('emergency_stop_server')
        self.emergency_stop_active = False
        self.srv = self.create_service(
            TriggerEmergencyStop, '/robot/emergency_stop', self.handle_emergency_stop
        )
        self.get_logger().info('EmergencyStopServer ready on /robot/emergency_stop')

    def handle_emergency_stop(self, request, response):
        now_sec = self.get_clock().now().nanoseconds * 1e-9
        response.success = True
        response.stop_timestamp = float(round(now_sec, 3))
        if request.emergency_stop_requested:
            self.emergency_stop_active = True
            response.status_message = f'EMERGENCY BRAKE ENGAGED: "{request.reason}"'
            self.get_logger().error(f'[SAFETY] E-STOP ACTIVATED! Reason: {request.reason}')
        else:
            self.emergency_stop_active = False
            response.status_message = 'SAFETY RESET: Power restored. Drive authorized.'
            self.get_logger().info('[SAFETY] E-STOP CLEARED. Drive systems ready.')
        return response  # MANDATORY: Always return populated response</code></pre>
          </div>
        </div>
        <div class="l06-content-col">
          <div class="l05-card-grid-2x2" style="margin-top: 0; gap: 0.45rem;">
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>🔒</span><strong>1. Latching Safety State</strong></div>
              <p><code>self.emergency_stop_active</code> maintains node state. Once triggered, it latches until an explicit reset arrives.</p>
            </div>
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>⚙️</span><strong>2. create_service()</strong></div>
              <p>Registers endpoint on <code>/robot/emergency_stop</code> with interface type and binds the synchronous callback.</p>
            </div>
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>⚡</span><strong>3. Executor Callback</strong></div>
              <p>Callback receives <code>(request, response)</code> automatically. Executes fast motor brake cutoff without blocking other threads.</p>
            </div>
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>📬</span><strong>4. Mandatory Return & Spin</strong></div>
              <p>Must <code>return response</code> over DDS. <code>rclpy.spin(node)</code> handles incoming service calls until SIGINT teardown.</p>
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 5. Section 4: Configuring setup.py, Building & Testing with ROS 2 CLI
  slides.push({
    id: `${lesson.id}_sec4_server_build_cli`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Build & CLI Introspection',
    badge: '🛠️ Build & CLI Testing',
    title: '4. setup.py Entry Point, colcon Build & Service CLI Testing',
    htmlContent: `
      <div class="l06-two-col-layout">
        <div class="l06-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">setup.py</span><strong>Register Console Script Entry Point</strong></div>
            <pre><code class="language-python">entry_points={
    'console_scripts': [
        'ultrasonic_publisher = nexus_amr_basics.ultrasonic_publisher:main',
        'emergency_stop_server = nexus_amr_basics.emergency_stop_server:main',
    ],
},</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal 1</span><strong>Build & Launch Server</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash
ros2 run nexus_amr_basics emergency_stop_server</code></pre>
          </div>
        </div>
        <div class="l06-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal 2</span><strong>CLI Introspection & Live Test</strong></div>
            <pre><code class="language-bash">source /opt/ros/jazzy/setup.bash

# 1. Verify service appears in registry and check type:
ros2 service list | grep emergency_stop
ros2 service type /robot/emergency_stop

# 2. Call service endpoint with YAML payload:
ros2 service call /robot/emergency_stop nexus_amr_interfaces/srv/TriggerEmergencyStop \\
  "{emergency_stop_requested: true, reason: 'CLI Manual Safety Test'}"</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">📥</span><strong>Received Response Receipt</strong></div>
            <pre><code class="language-plaintext">response: nexus_amr_interfaces.srv.TriggerEmergencyStop_Response(
  success=True,
  status_message='EMERGENCY BRAKE ENGAGED: Actuators halted...',
  stop_timestamp=1730000000.123
)</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 6. Section 5: Authoring the Asynchronous Emergency Stop Client
  slides.push({
    id: `${lesson.id}_sec5_client_implementation`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Asynchronous Client Implementation',
    badge: '⚡ Non-Blocking Client',
    title: '5. Authoring the Asynchronous Emergency Stop Client (emergency_stop_client.py)',
    htmlContent: `
      <div class="l06-two-col-layout">
        <div class="l06-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Python Node</span><strong>emergency_stop_client.py</strong></div>
            <pre><code class="language-python">import sys, rclpy
from rclpy.node import Node
from nexus_amr_interfaces.srv import TriggerEmergencyStop

class EmergencyStopClient(Node):
    def __init__(self):
        super().__init__('emergency_stop_client')
        self.client = self.create_client(
            TriggerEmergencyStop, '/robot/emergency_stop'
        )
        while not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Waiting for /robot/emergency_stop...')
        self.get_logger().info('EmergencyStopClient connected to server.')

    def send_emergency_stop_request(self, stop_requested: bool, reason: str):
        req = TriggerEmergencyStop.Request()
        req.emergency_stop_requested = stop_requested
        req.reason = reason
        self.future = self.client.call_async(req)
        return self.future

def main(args=None):
    rclpy.init(args=args)
    node = EmergencyStopClient()
    future = node.send_emergency_stop_request(True, "Obstacle in safety envelope")
    rclpy.spin_until_future_complete(node, future)
    if future.result() is not None:
        node.get_logger().info(f'Receipt: {future.result().status_message}')
    node.destroy_node()
    rclpy.shutdown()</code></pre>
          </div>
        </div>
        <div class="l06-content-col">
          <div class="l05-card-grid-2x2" style="margin-top: 0; gap: 0.45rem;">
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>⏳</span><strong>1. wait_for_service()</strong></div>
              <p>Polls DDS discovery with a timeout before transmitting requests, avoiding premature call failures.</p>
            </div>
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>🚫</span><strong>2. Anti-Deadlock Rule</strong></div>
              <p><strong>Never use synchronous <code>call()</code> in a callback!</strong> It freezes the thread, permanently deadlocking the node.</p>
            </div>
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>⚡</span><strong>3. call_async()</strong></div>
              <p>Queues request onto DDS and immediately returns a non-blocking <code>Future</code> object without halting execution.</p>
            </div>
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>🔄</span><strong>4. spin_until_future_complete</strong></div>
              <p>Pumps the node executor event loop specifically until the response packet arrives and resolves <code>future.result()</code>.</p>
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 7. Section 6: Configuring setup.py & Verifying the Client-Server Pair
  slides.push({
    id: `${lesson.id}_sec6_dual_node_verification`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. End-to-End Verification',
    badge: '🚀 Dual-Node Drill',
    title: '6. setup.py Registration & Dual-Node Safety Verification Drill',
    htmlContent: `
      <div class="l06-two-col-layout">
        <div class="l06-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">setup.py</span><strong>Register Client Executable</strong></div>
            <pre><code class="language-python">entry_points={
    'console_scripts': [
        'ultrasonic_publisher = nexus_amr_basics.ultrasonic_publisher:main',
        'emergency_stop_server = nexus_amr_basics.emergency_stop_server:main',
        'emergency_stop_client = nexus_amr_basics.emergency_stop_client:main',
    ],
},</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Deployment Commands</span><strong>2-Terminal Execution Run Sheet</strong></div>
            <pre><code class="language-bash"># Terminal 1: Run Server
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash && ros2 run nexus_amr_basics emergency_stop_server

# Terminal 2: Run Client with Custom Reason
source install/setup.bash
ros2 run nexus_amr_basics emergency_stop_client "Obstacle within 0.35m"</code></pre>
          </div>
        </div>
        <div class="l06-content-col">
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">Terminal 1: Server Log</span></div>
            <pre><code class="language-plaintext">[INFO] [emergency_stop_server]: EmergencyStopServer initialized. Ready...
[ERROR] [emergency_stop_server]: [CRITICAL SAFETY EVENT] Emergency Stop ACTIVATED! Reason: Obstacle within 0.35m</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">Terminal 2: Client Log</span></div>
            <pre><code class="language-plaintext">[INFO] [emergency_stop_client]: Connected to safety service. Dispatching request...
[INFO] [emergency_stop_client]: SAFETY RESPONSE RECEIVED: Success: True | Status: EMERGENCY BRAKE ENGAGED</code></pre>
          </div>
          <div class="l06-golden-card success">
            <div class="l06-golden-header"><span>✅</span><strong>Verification Complete</strong></div>
            <p>Confirmed full bidirectional round-trip RPC over DDS with zero executor thread deadlocking.</p>
          </div>
        </div>
      </div>
    `
  });

  // Section 8: Production Best Practices & Golden Rules
  slides.push({
    id: `${lesson.id}_sec8_golden_rules`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Production Best Practices',
    badge: '🏆 Production Rules',
    title: 'Production Golden Rules for ROS 2 Services',
    htmlContent: `
      <div class="l05-card-grid-2x2">
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>⚡</span><strong>1. Asynchronous Client Mandate</strong></div>
          <p>Always use <code>call_async()</code> and Python <code>Future</code> callbacks in production. Never invoke synchronous <code>call()</code> inside a node's event loop, which causes permanent thread deadlock.</p>
        </div>
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>⏱️</span><strong>2. Sub-50ms Execution Budget</strong></div>
          <p>Service callbacks must execute rapidly (&lt;50ms). If a procedure requires prolonged computation, trajectory execution, or physical movement, migrate to a <strong>ROS 2 Action</strong>.</p>
        </div>
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>🔒</span><strong>3. Latching Safety State Machines</strong></div>
          <p>Safety-critical services (like emergency halt) must alter persistent node states that latch and require explicit clearance commands before normal motion resumes.</p>
        </div>
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>📬</span><strong>4. Mandatory Response Return</strong></div>
          <p>In Python service callbacks, omitting <code>return response</code> causes DDS transport failure, leaving calling clients permanently hanging in an unfulfilled Future state.</p>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 07:
 * Runtime Management & Python Launch Files.
 * Consolidates fragmented 15-slide micro-splits into 9 concise,
 * high-yield architectural overviews with interactive visuals,
 * code templates, action matrices, and multi-robot CLI workflows.
 */
function buildLesson07Slides(doc, lesson, slides) {
  // 1. ROS 2 Python Launch Execution Architecture (with SVG visual)
  slides.push({
    id: `${lesson.id}_sec2_architecture`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. The Python Launch Architecture',
    badge: '🚀 Launch Architecture',
    title: '2. ROS 2 Python Launch System Architecture',
    htmlContent: `
      <div class="l03-two-col-layout l03-graph-layout">
        <div class="l03-visual-col">
          <div class="l03-visual-frame" style="background: var(--bg-surface); padding: 0.6rem; border-radius: 10px; border: 1px solid var(--border-color); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/ros2_launch_architecture.svg" alt="ROS 2 Python Launch Execution Architecture" style="width: 100%; max-height: 275px; object-fit: contain;" />
            <span class="l03-visual-caption">Declarative Directed Acyclic Graph (DAG) Built &amp; Executed by ROS 2 Runtime</span>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🐍</span><strong>Pure Python Declarative Graph</strong></div>
            <p>Unlike static XML in ROS 1, ROS 2 uses pure Python scripts (<code>.launch.py</code>) to build an execution pipeline. You gain full programmatic power: conditionals, loops, dynamic path resolution, and environment checks.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🎯</span><strong>generate_launch_description() Entrypoint</strong></div>
            <p>The mandatory root function that returns a <code>LaunchDescription</code> holding an ordered list of actions: node spawners, CLI argument declarations, logging commands, and nested launch inclusions.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚡</span><strong>Dynamic Substitutions (LaunchConfiguration)</strong></div>
            <p>Parameters like <code>robot_namespace</code> or <code>use_sim_time</code> are evaluated lazily at runtime, allowing operators to reconfigure entire robot subsystems from the CLI without changing code.</p>
          </div>
        </div>
      </div>
    `
  });

  // 2. Writing an AMR Subsystem Launch File: The 4 Core Phases
  slides.push({
    id: `${lesson.id}_sec3_subsystem_launch`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. AMR Subsystem Launch File Implementation',
    badge: '📝 Subsystem Launch Script',
    title: '3. Writing an AMR Launch File: The 4 Core Architectural Phases',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">amr_subsystem.launch.py</span><strong>Pure Python Script</strong></div>
            <pre><code class="language-python">import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node

def generate_launch_description():
    # Phase 1: Dynamic Path Resolution
    pkg_share = get_package_share_directory('nexus_amr_basics')
    config_file = os.path.join(pkg_share, 'config', 'teleop_params.yaml')

    # Phase 2: Declare CLI Arguments
    ns_arg = DeclareLaunchArgument(
        'robot_namespace', default_value='nexus_amr',
        description='Top-level isolation namespace'
    )

    # Phase 3: Define Subsystem Node Spawners
    estop_node = Node(
        package='nexus_amr_basics',
        executable='emergency_stop_server',
        namespace=LaunchConfiguration('robot_namespace'),
        output='screen'
    )
    param_node = Node(
        package='nexus_amr_basics',
        executable='param_node_explained',
        namespace=LaunchConfiguration('robot_namespace'),
        parameters=[config_file],
        remappings=[('/cmd_vel', 'cmd_vel_filtered')],
        output='screen'
    )

    # Phase 4: Assemble & Return Pipeline
    return LaunchDescription([ns_arg, estop_node, param_node])</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📂</span><strong>Phase 1: Dynamic Path Resolution</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>get_package_share_directory()</code> portably locates installed assets across source builds and debian installs without hardcoding absolute paths.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎛️</span><strong>Phase 2: Declare Runtime Arguments</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>DeclareLaunchArgument</code> exposes CLI switches with safe defaults, enabling runtime overrides like <code>robot_namespace:=amr_alpha</code>.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🤖</span><strong>Phase 3: Managed Subsystem Nodes</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>Node(...)</code> actions declare process boundaries, YAML parameter paths, topic remappings, and terminal output streaming.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>Phase 4: Return LaunchDescription</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Hands the assembled execution list to the launch daemon to spawn and supervise the processes concurrently.</p>
          </div>
        </div>
      </div>
    `
  });

  // 3. Core Launch Actions & Syntax Matrix
  slides.push({
    id: `${lesson.id}_sec4_actions_matrix`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Key Launch Actions & Syntax Breakdown',
    badge: '⚙️ Action API Reference',
    title: '4. Essential ROS 2 Launch Actions & Syntax Reference Matrix',
    htmlContent: `
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 26%;">Launch Action / Class</th>
              <th style="width: 24%;">Module Import</th>
              <th style="width: 50%;">Core Role &amp; Production Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Node(...)</code></td>
              <td><code>launch_ros.actions</code></td>
              <td>Spawns a managed ROS 2 node process. Configures <code>package</code>, <code>executable</code>, <code>name</code>, <code>namespace</code>, <code>parameters</code>, <code>remappings</code>, and <code>output='screen'</code>.</td>
            </tr>
            <tr>
              <td><code>DeclareLaunchArgument</code></td>
              <td><code>launch.actions</code></td>
              <td>Registers a configurable CLI argument flag (e.g. <code>robot_namespace</code>, <code>use_sim_time</code>) with default values and validation rules.</td>
            </tr>
            <tr>
              <td><code>LaunchConfiguration</code></td>
              <td><code>launch.substitutions</code></td>
              <td>Dynamically evaluates and injects the runtime value of a declared launch argument into node parameters or names.</td>
            </tr>
            <tr>
              <td><code>IncludeLaunchDescription</code></td>
              <td><code>launch.actions</code></td>
              <td>Nests external launch files (e.g. Nav2 navigation stack or Gazebo world simulator) for hierarchical modular stack composition.</td>
            </tr>
            <tr>
              <td><code>remappings=[('/old', '/new')]</code></td>
              <td><code>launch_ros.actions.Node</code></td>
              <td>Redirects topic or service names dynamically at the DDS transport boundary without modifying node source code.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.5rem; padding: 0.4rem 0.7rem; font-size: 0.76rem;">
        <strong>💡 Production Golden Rule:</strong> Always keep launch files declarative. Avoid blocking loops, network I/O, or heavy computation inside <code>generate_launch_description()</code>; delegate logic to node lifecycles.
      </div>
    `
  });

  // 4. Package Integration (setup.py) & The Symlink Build Rule
  slides.push({
    id: `${lesson.id}_sec5_setup_build`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Package Integration: Directory Structure & setup.py',
    badge: '📦 Package Integration',
    title: '5. Registering Launch Files in setup.py & The Symlink Build Workflow',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">setup.py</span><strong>data_files Installation Tuple</strong></div>
            <pre><code class="language-python">import os
from glob import glob

# Inside setup(...) data_files:
data_files=[
    ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
    ('share/' + package_name, ['package.xml']),
    # 1. Install all launch files into share/nexus_amr_basics/launch:
    (os.path.join('share', package_name, 'launch'),
     glob(os.path.join('launch', '*.launch.py'))),
    # 2. Install YAML configuration files:
    (os.path.join('share', package_name, 'config'),
     glob(os.path.join('config', '*.yaml'))),
]</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📁</span><strong>Package Directory Convention</strong></div>
            <p>Store launch files in a top-level <code>launch/</code> directory beside <code>package.xml</code>. The glob pattern automatically bundles all <code>*.launch.py</code> scripts.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Build &amp; Source Workspace</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash</code></pre>
          </div>
          <div class="l05-golden-card warning" style="margin-bottom: 0.45rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚡</span><strong>Crucial: Always Use --symlink-install</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Without symlinks, Python launch edits require a full <code>colcon build</code> every time! With <code>--symlink-install</code>, ROS 2 links directly to your source files, enabling <strong>instant iteration</strong> without rebuilding.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔍</span><strong>Install Target Verification</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Verify files were installed properly: <code>ls ~/ros2_ws/install/nexus_amr_basics/share/nexus_amr_basics/launch</code></p>
          </div>
        </div>
      </div>
    `
  });

  // 5. CLI Execution & Multi-Robot Namespace Verification
  slides.push({
    id: `${lesson.id}_sec6_cli_verification`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. CLI Execution & Multi-Robot Verification',
    badge: '⚡ Runtime Verification',
    title: '6. Executing Launch Files & Multi-Robot Namespace Verification',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Launch with CLI Namespace Override</strong></div>
            <pre><code class="language-bash">ros2 launch nexus_amr_basics amr_subsystem.launch.py \\
  robot_namespace:=amr_alpha</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">Console Output</span><strong>Multi-Node Supervisor Logs</strong></div>
            <pre><code class="language-plaintext">[INFO] [launch]: Starting AMR Subsystem under namespace: amr_alpha
[INFO] [emergency_stop_server-1]: process started with pid [42110]
[INFO] [param_node_explained-2]: process started with pid [42111]
[emergency_stop_server-1] [INFO]: Ready on /amr_alpha/robot/emergency_stop
[param_node_explained-2] [INFO]: Param Node Initialized | ID: 'nexus-wh-01'</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>1️⃣</span><strong>Node Discovery Audit</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>ros2 node list</code><br/>&rarr; Confirms <code>/amr_alpha/emergency_stop_server</code> and <code>/amr_alpha/parameterized_controller</code> run concurrently under isolated namespaces.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>2️⃣</span><strong>Interface &amp; Topic Wire Audit</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>ros2 service list | grep amr_alpha</code><br/>&rarr; Confirms safety services are mapped to <code>/amr_alpha/robot/emergency_stop</code> with no cross-talk with other robots.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏭</span><strong>Industrial Multi-AMR Fleet Scaling</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Running <code>robot_namespace:=amr_beta</code> in a second terminal deploys a complete second robot on the exact same DDS physical network with zero topic collision.</p>
          </div>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 08:
 * Communication Mechanism III: Action Servers & Clients in Python.
 * Replaces 23 fragmented micro-slices with 9 coherent, executive-quality
 * slides featuring the 3-tier protocol, interactive execution flow,
 * IDL contracts, server/client callbacks, and Nav2 production integration.
 */
function buildLesson08Slides(doc, lesson, slides) {
  // 1. Action Communication Architecture (SVG Visual + 3 Tiers)
  slides.push({
    id: `${lesson.id}_sec2_architecture`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Action Communication Architecture',
    badge: '⚡ Action Protocol',
    title: '2. The ROS 2 Action Protocol: Goal, Feedback & Result Lifecycle',
    htmlContent: `
      <div class="l03-two-col-layout l03-graph-layout">
        <div class="l03-visual-col">
          <div class="l03-visual-frame" style="background: var(--bg-surface); padding: 0.5rem; border-radius: 10px; border: 1px solid var(--border-color); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/ros2_action_lifecycle.svg" alt="ROS 2 Action Lifecycle Architecture" style="width: 100%; max-height: 270px; object-fit: contain;" />
            <span class="l03-visual-caption">Goal Service + Feedback Topic + Result Service + Preemption Cancel</span>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⏱️</span><strong>Why Topics &amp; Services Fall Short</strong></div>
            <p>Topics are fire-and-forget streams with no completion signals. Services are synchronous RPCs that freeze execution threads during prolonged robot motions and cannot be aborted mid-flight.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔀</span><strong>The 3 Coordinated DDS Channels</strong></div>
            <p>Under the hood, every ROS 2 Action coordinates three primitives: a <strong>Goal Service</strong> (accept/reject), a <strong>Feedback Topic</strong> (continuous telemetry streaming), and a <strong>Result Service</strong> (terminal outcome).</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🛑</span><strong>Native Preemption &amp; Cancellation</strong></div>
            <p>Unlike services, actions allow clients to abort or cancel goals at any time (e.g. unexpected obstacle blocks the path). The server safely halts actuators and transitions to the <code>CANCELED</code> state.</p>
          </div>
        </div>
      </div>
    `
  });

  // 2. Interactive Action Flow Simulator
  slides.push({
    id: `${lesson.id}_interactive_action`,
    type: 'interactive',
    interactiveKey: 'action',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Interactive Simulation & Execution Flow',
    title: 'Interactive Action Flow: Goal Dispatch, Feedback & Cancellation'
  });

  // 3. Action Interface Definition (.action IDL)
  slides.push({
    id: `${lesson.id}_sec3_action_idl`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Action Interface Definition',
    badge: '📐 Action IDL',
    title: '3. Anatomy of an Action Definition (NavigateDistance.action)',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">NavigateDistance.action</span><strong>Action IDL Contract</strong></div>
            <pre><code class="language-plaintext"># 1. GOAL: Dispatched by Client
float32 target_distance_m
float32 speed_mps
---
# 2. RESULT: Returned Upon Completion
bool success
float32 final_distance_traveled
string message
---
# 3. FEEDBACK: Periodic Telemetry Stream
float32 distance_remaining
int32 percent_complete</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>➖</span><strong>The 3-Section Triple-Dash Format (---)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Action definitions use exactly two sets of <code>---</code> dividers to separate <strong>Goal</strong>, <strong>Result</strong>, and <strong>Feedback</strong> fields into one strict IDL schema.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚙️</span><strong>4 Auto-Generated Classes</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">ROS 2 code generators build four Python structures: <code>Goal</code>, <code>Result</code>, <code>Feedback</code>, and <code>Impl</code> for type-safe client-server contracts.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📦</span><strong>Dedicated Interface Package Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Never declare <code>.action</code> files inside an <code>ament_python</code> package. Place them in a standalone CMake package (e.g. <code>nexus_amr_interfaces</code>).</p>
          </div>
        </div>
      </div>
    `
  });

  // 4. Authoring the Action Server Node (navigate_distance_server.py)
  slides.push({
    id: `${lesson.id}_sec4_action_server`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Action Server Implementation',
    badge: '🛠️ Server Node',
    title: '4. Authoring the Action Server: Callbacks & Preemption Handling',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">navigate_distance_server.py</span><strong>ActionServer Implementation</strong></div>
            <pre><code class="language-python">from rclpy.action import ActionServer, CancelResponse, GoalResponse
from nexus_amr_interfaces.action import NavigateDistance

class NavigateDistanceServer(Node):
    def __init__(self):
        super().__init__('navigate_distance_server')
        self._action_server = ActionServer(
            self, NavigateDistance, '/navigate_distance',
            execute_callback=self.execute_callback,
            goal_callback=self.goal_callback,
            cancel_callback=self.cancel_callback
        )

    def goal_callback(self, goal_request):
        if goal_request.target_distance_m &lt;= 0:
            return GoalResponse.REJECT
        return GoalResponse.ACCEPT

    def cancel_callback(self, goal_handle):
        return CancelResponse.ACCEPT

    async def execute_callback(self, goal_handle):
        # Publish feedback in loop, monitor is_cancel_requested
        # On completion: goal_handle.succeed(); return result</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>1. goal_callback (Goal Validation)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Validates parameters before starting motion (rejecting negative distances or out-of-boundary coordinates) via <code>GoalResponse</code>.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛑</span><strong>2. cancel_callback (Preemption Trap)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Intercepts cancellation requests mid-flight. The execution loop checks <code>goal_handle.is_cancel_requested</code> and halts wheels safely.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📊</span><strong>3. execute_callback (Feedback Streaming)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Publishes periodic progress via <code>goal_handle.publish_feedback(fb)</code> at a fixed rate (e.g. 10 Hz) while advancing trajectory.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏁</span><strong>4. Succeeded Outcome Invariant</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Always invoke <code>goal_handle.succeed()</code> before returning the result. Omitting it leaves the client stuck in <code>EXECUTING</code> forever.</p>
          </div>
        </div>
      </div>
    `
  });

  // 5. NEW IN-BETWEEN SLIDE: Testing Action Server with ROS 2 CLI (Before Writing Client!)
  slides.push({
    id: `${lesson.id}_sec5_cli_server_test`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Testing Action Server via CLI',
    badge: '🔍 CLI Server Test',
    title: '5. Testing the Action Server via ROS 2 CLI & Streaming Feedback',
    htmlContent: `
      <div class="l08-cli-test-layout">
        <div class="l08-cli-code-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>CLI Action Discovery &amp; Goal Dispatch</strong></div>
            <pre><code class="language-bash"># Terminal 1: Launch Action Server
ros2 run nexus_amr_basics navigate_distance_server

# Terminal 2: Verify Action Server registration
ros2 action list
# Discovered: /navigate_distance

ros2 action info /navigate_distance
# Action: nexus_amr_interfaces/action/NavigateDistance
# Action clients: 0 | Action servers: 1

# Dispatch goal from CLI with live streaming feedback:
ros2 action send_goal /navigate_distance \
  nexus_amr_interfaces/action/NavigateDistance \
  "{target_distance_m: 5.0, speed_mps: 0.5}" --feedback</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">Terminal Output</span><strong>Live Telemetry &amp; Completion</strong></div>
            <pre><code class="language-plaintext">Feedback: distance_remaining: 3.5m, percent_complete: 30%
Feedback: distance_remaining: 1.0m, percent_complete: 80%
Result: success: True, final_distance_traveled: 5.0m
Goal finished with status: SUCCEEDED</code></pre>
          </div>
        </div>
        <div class="l08-cli-notes-col">
          <div class="l05-golden-card">
            <div class="l05-golden-header"><span>🧪</span><strong>Verify Server Before Writing Client</strong></div>
            <p>Just like testing Services with <code>ros2 service call</code>, always test your Action Server using the CLI first to verify lifecycle callbacks, goals, and feedback before writing client code.</p>
          </div>
          <div class="l05-golden-card warning">
            <div class="l05-golden-header"><span>📡</span><strong>The --feedback Switch</strong></div>
            <p>Without <code>--feedback</code>, <code>send_goal</code> only waits for the final result. Adding the flag subscribes to the asynchronous feedback topic to print progress in real time.</p>
          </div>
          <div class="l05-golden-card success">
            <div class="l05-golden-header"><span>🔍</span><strong>Endpoint Introspection (action info)</strong></div>
            <p>Validates the action interface definition, verifies active server instances (must be &ge; 1), and audits connected client node count.</p>
          </div>
        </div>
      </div>
    `
  });

  // 6. Authoring the Action Client Node (navigate_distance_client.py)
  slides.push({
    id: `${lesson.id}_sec6_action_client`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. Action Client Implementation',
    badge: '💻 Client Node',
    title: '6. Authoring the Asynchronous Action Client in Python',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">navigate_distance_client.py</span><strong>ActionClient Implementation</strong></div>
            <pre><code class="language-python">from rclpy.action import ActionClient
from nexus_amr_interfaces.action import NavigateDistance

class NavigateDistanceClient(Node):
    def __init__(self):
        super().__init__('navigate_distance_client')
        self._action_client = ActionClient(
            self, NavigateDistance, '/navigate_distance'
        )

    def send_goal(self, distance, speed):
        self._action_client.wait_for_server()
        goal_msg = NavigateDistance.Goal()
        goal_msg.target_distance_m = float(distance)
        goal_msg.speed_mps = float(speed)

        self._send_goal_future = self._action_client.send_goal_async(
            goal_msg, feedback_callback=self.feedback_callback
        )
        self._send_goal_future.add_done_callback(self.goal_response_callback)

    def feedback_callback(self, feedback_msg):
        fb = feedback_msg.feedback
        self.get_logger().info(f'Feedback: {fb.percent_complete}% ({fb.distance_remaining}m left)')</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏳</span><strong>1. Server Discovery (wait_for_server)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Ensures the action server is active on DDS before sending commands, preventing unhandled connection drops.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚡</span><strong>2. Non-Blocking Async Dispatch</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>send_goal_async()</code> delegates execution to a background Future without freezing the node's main event loop.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📊</span><strong>3. Live Telemetry Feedback Handler</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Receives real-time progress updates (percentage, distance remaining) streamed from the server at fixed frequencies.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏁</span><strong>4. Terminal Result Future Resolution</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Invokes <code>get_result_async()</code> to extract final outcome and performance metrics when the trajectory completes.</p>
          </div>
        </div>
      </div>
    `
  });

  // 7. Dual-Node Verification & Nav2 Production Integration (Server + Client Together)
  slides.push({
    id: `${lesson.id}_sec7_dual_node_nav2`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '7. Dual-Node Verification & Nav2 Integration',
    badge: '🚀 Dual-Node Drill & Nav2',
    title: '7. Dual-Node Verification & The Nav2 Navigation Stack Connection',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.4rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>2-Terminal Execution Run Sheet</strong></div>
            <pre><code class="language-bash"># Terminal 1: Run Action Server
source install/setup.bash
ros2 run nexus_amr_basics navigate_distance_server

# Terminal 2: Run Action Client Node
source install/setup.bash
ros2 run nexus_amr_basics navigate_distance_client 5.0 0.5</code></pre>
          </div>
          <div class="l03-output-card" style="margin-bottom: 0;">
            <div class="l03-output-header"><span class="l03-term-badge">Terminal Logs</span><strong>Synchronized Client-Server Execution</strong></div>
            <pre><code class="language-plaintext">[Server] Goal accepted! Moving 5.0m at 0.5 m/s...
[Client] Feedback: 3.5m left (30% done)
[Client] Feedback: 1.0m left (80% done)
[Server] Goal SUCCEEDED! Final distance: 5.0m
[Client] Final Result: Success=True | Traveled: 5.0m</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>End-to-End Coordinated Lifecycle</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Validates the full 3-tier DDS protocol: Goal Service ➔ Feedback Topic ➔ Result Service operating seamlessly between Python processes.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧭</span><strong>How Production Nav2 Uses Actions</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">In production robotics, the entire autonomous navigation stack (Nav2) is driven by the <code>nav2_msgs/action/NavigateToPose</code> and <code>NavigateThroughPoses</code> actions.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🌳</span><strong>Behavior Tree Preemption &amp; Recovery</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Nav2 Behavior Trees continuously evaluate feedback to detect path blockages, cancel actions mid-flight, and execute recovery behaviors (spin, backup).</p>
          </div>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 09:
 * 3D Robot Modeling with URDF & Xacro.
 */
function buildLesson09Slides(doc, lesson, slides) {
  // 1. URDF Kinematic Hierarchy: Links vs Joints & REP-103 Conventions
  slides.push({
    id: `${lesson.id}_sec1_anatomy`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. URDF Anatomy: Links vs. Joints',
    badge: '🤖 Kinematic Foundations',
    title: '1. URDF Kinematic Hierarchy: Links, Joints & REP-103 Conventions',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔗</span><strong>Links: Rigid Physical Bodies</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">A Link represents an unyielding physical mass. It contains three decoupled structural tags: <code>&lt;visual&gt;</code> (render meshes for RViz), <code>&lt;collision&gt;</code> (simplified bounding boxes for physics engines), and <code>&lt;inertial&gt;</code> (mass and 3D moment of inertia tensor).</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚙️</span><strong>Joints: Kinematic Constraints</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Joints establish relative motion constraints between a parent link and a child link. Every joint explicitly defines its reference origin <code>xyz/rpy</code>, axis of rotation/translation <code>&lt;axis xyz="..."/&gt;</code>, and physical joint limits.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>REP-103 Spatial Coordinate Standard</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">ROS 2 strictly enforces <strong>+X Forward</strong> (Red), <strong>+Y Port / Left</strong> (Green), and <strong>+Z Upward</strong> (Blue). Origin is grounded at <code>base_footprint</code> (ground plane, z=0) with <code>base_link</code> directly above it at the structural axle center.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l09-img-card" style="margin-bottom: 0.35rem;">
            <img src="assets/images/urdf_kinematic_hierarchy_rep103.jpg" alt="URDF Kinematic Tree & REP-103 Conventions" />
            <span class="l09-img-caption"><strong>REP-103 Kinematic DAG:</strong> +X Forward (Red), +Y Left (Green), +Z Up (Blue) anchored at <code>base_footprint</code> (z=0)</span>
          </div>
          <div class="l06-table-wrap">
            <table>
              <thead>
                <tr><th>Link Identifier</th><th>Type / Role</th><th>Parent Joint</th></tr>
              </thead>
              <tbody>
                <tr><td><code>base_footprint</code></td><td>Ground projection datum (z=0)</td><td>World / Odom</td></tr>
                <tr><td><code>base_link</code></td><td>Structural chassis center</td><td><code>base_footprint_joint</code> (fixed)</td></tr>
                <tr><td><code>right_wheel_1</code> / <code>left_wheel_1</code></td><td>Differential drive traction</td><td>Continuous joints</td></tr>
                <tr><td><code>lidar_1</code> / <code>camera_1</code></td><td>Perception sensors</td><td>Fixed joints</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `
  });

  // 2. Link Properties & Tags I: Visual Geometry & Materials
  slides.push({
    id: `${lesson.id}_sec2_link_anatomy`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. URDF Anatomy: Links vs. Joints',
    badge: '📦 Link Structure & Tripartite Tags',
    title: '2. URDF Link Anatomy: The Complete Link Excerpt (<visual>, <collision>, <inertial>)',
    htmlContent: `
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">URDF Link Excerpt</span><strong>nexus_amr.urdf / base_link</strong></div>
            <pre class="l09-xml-pre"><code class="language-xml">&lt;link name="base_link"&gt;
  &lt;!-- 1. Inertial: Mass &amp; Dynamics for Gazebo Physics Solver --&gt;
  &lt;inertial&gt;
    &lt;origin xyz="0.0015 0.0004 0.0351" rpy="0 0 0"/&gt;
    &lt;mass value="0.6558"/&gt;
    &lt;inertia ixx="0.000584" iyy="0.002255" izz="0.002722"
             ixy="0.0"      iyz="0.0"      ixz="-3.3e-05"/&gt;
  &lt;/inertial&gt;

  &lt;!-- 2. Visual: 3D CAD Render Mesh &amp; Color Appearance --&gt;
  &lt;visual&gt;
    &lt;origin xyz="0 0 0" rpy="0 0 0"/&gt;
    &lt;geometry&gt;
      &lt;mesh filename="package://nexus_amr_description/meshes/base_link.stl" scale="0.001 0.001 0.001"/&gt;
    &lt;/geometry&gt;
    &lt;material name="silver"&gt;
      &lt;color rgba="0.70 0.70 0.70 1.0"/&gt;
    &lt;/material&gt;
  &lt;/visual&gt;

  &lt;!-- 3. Collision: Simplified Fast Bounding Box Hull --&gt;
  &lt;collision&gt;
    &lt;origin xyz="0 0 0" rpy="0 0 0"/&gt;
    &lt;geometry&gt;
      &lt;box size="0.25 0.20 0.08"/&gt;
    &lt;/geometry&gt;
  &lt;/collision&gt;
&lt;/link&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l09-img-card" style="margin-bottom: 0.35rem;">
            <img src="assets/images/urdf_link_visual_collision_inertial.jpg" alt="URDF Link Tripartite Architecture: Visual, Collision, Inertial" />
            <span class="l09-img-caption"><strong>Tripartite Structure:</strong> 1. Visual Mesh &bull; 2. Collision Bounding Hull &bull; 3. Center of Mass &amp; 3x3 Inertia Tensor</span>
          </div>
          <div class="l09-tripartite-pills">
            <div class="l09-tag-pill tag-visual">
              <span class="tag-badge">🔵 &lt;visual&gt;</span>
              <p>High-poly CAD mesh (.stl/.dae) &amp; RGBA color rendered in RViz2</p>
            </div>
            <div class="l09-tag-pill tag-collision">
              <span class="tag-badge">🟠 &lt;collision&gt;</span>
              <p>Simplified low-poly box/cylinder bounding hull for fast physics contact detection</p>
            </div>
            <div class="l09-tag-pill tag-inertial">
              <span class="tag-badge">🟢 &lt;inertial&gt;</span>
              <p>Mass in kg, CoM centroid offset, and 3x3 rotational inertia tensor matrix</p>
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 3. URDF File Anatomy: Kinematic Joint Excerpt (<joint>, <origin>, <axis>, <limit>)
  slides.push({
    id: `${lesson.id}_sec3_joint_anatomy`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. URDF Anatomy: Links vs. Joints',
    badge: '🔩 Kinematic Constraint Excerpt',
    title: '3. URDF Joint Anatomy: Parent-Child Binding, Relative Poses & Limits',
    htmlContent: `
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">URDF Joint Excerpt</span><strong>nexus_amr.urdf / right_motor &amp; steer</strong></div>
            <pre class="l09-xml-pre"><code class="language-xml">&lt;!-- 1. Continuous Joint: Wheel Traction Drive --&gt;
&lt;joint name="right_motor" type="continuous"&gt;
  &lt;parent link="base_link"/&gt;
  &lt;child link="right_wheel_1"/&gt;
  &lt;origin xyz="0.0561 -0.0516 0.0350" rpy="0 0 0"/&gt;
  &lt;axis xyz="0 1 0"/&gt;
  &lt;limit effort="10.0" velocity="12.5"/&gt;
  &lt;dynamics damping="0.05" friction="0.01"/&gt;
&lt;/joint&gt;

&lt;!-- 2. Revolute Joint Example with Angular Limits --&gt;
&lt;joint name="steer_joint" type="revolute"&gt;
  &lt;parent link="base_link"/&gt;
  &lt;child link="caster_swivel_link"/&gt;
  &lt;origin xyz="-0.1200 0.0000 0.0200" rpy="0 0 0"/&gt;
  &lt;axis xyz="0 0 1"/&gt;
  &lt;limit lower="-1.5708" upper="1.5708" effort="20.0" velocity="3.14"/&gt;
  &lt;dynamics damping="0.02" friction="0.01"/&gt;
&lt;/joint&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l09-img-card" style="margin-bottom: 0.35rem;">
            <img src="assets/images/urdf_joint_anatomy_animation.svg" alt="URDF Joint Anatomy Animated Mechanical Simulation" />
            <span class="l09-img-caption"><strong>Joint Kinematics:</strong> Origin <code>xyz/rpy</code> offset &bull; Mechanical pivot &bull; Motion <code>axis</code> &bull; Travel <code>limit</code></span>
          </div>
          <div class="l09-tripartite-pills">
            <div class="l09-tag-pill">
              <span class="tag-badge" style="background: #8b5cf6;">🔗 &lt;parent&gt; &rarr; &lt;child&gt;</span>
              <p>Rigid kinematic DAG binding between parent link and child link</p>
            </div>
            <div class="l09-tag-pill">
              <span class="tag-badge" style="background: #0284c7;">📐 &lt;origin&gt;</span>
              <p>6-DoF spatial translation (xyz) &amp; orientation (rpy) offset vector</p>
            </div>
            <div class="l09-tag-pill">
              <span class="tag-badge" style="background: #dc2626;">🎯 &lt;axis&gt; &amp; &lt;limit&gt;</span>
              <p>Unit motion vector with lower/upper mechanical travel limits &amp; effort</p>
            </div>
            <div class="l09-tag-pill">
              <span class="tag-badge" style="background: #10b981;">⚙️ &lt;dynamics&gt;</span>
              <p>Simulates physical joint damping and Coulomb friction in Gazebo</p>
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 4. URDF Joint Mechanics: The 4 Primary Motion Types with Live Animation
  slides.push({
    id: `${lesson.id}_sec4_joint_animation`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. URDF Anatomy: Links vs. Joints',
    badge: '🔩 Joint Kinematics & DOF',
    title: '4. URDF Joint Mechanics: The 4 Primary Motion Types with Live Animation',
    htmlContent: `
      <div class="l09-joint-layout">
        <div class="l09-joint-anim-stage">
          <img src="assets/images/urdf_joint_types_animation.svg" alt="URDF Joint Types Animated Mechanical Motion" />
        </div>
        <div class="l05-banner-intro" style="margin-top: 0.1rem; font-size: 0.72rem; padding: 0.35rem 0.75rem; text-align: center;">
          <strong>💡 Kinematic Summary:</strong> Differential-drive AMRs combine <code>continuous</code> joints for active drive wheels and <code>fixed</code> joints for sensor mounts (LiDAR, camera). Multi-DOF joints include <code>planar</code> (3-DOF, omnidirectional bases) and <code>floating</code> (6-DOF, aerial drones).
        </div>
      </div>
    `
  });

  // 5. Modular Robot Description with Xacro
  slides.push({
    id: `${lesson.id}_sec5_xacro_macros`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Authoring nexus_amr.urdf.xacro',
    badge: '📦 Modular Xacro Engine',
    title: '5. Parameterizing Robot Models: Xacro Properties, Math & Reusable Macros',
    htmlContent: `
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">nexus_amr.urdf.xacro</span><strong>Parametric Wheel Macro</strong></div>
            <pre class="l09-xml-pre"><code class="language-xml">&lt;robot xmlns:xacro="http://www.ros.org/wiki/xacro" name="nexus_amr"&gt;
  &lt;!-- 1. Global Parameter Constants --&gt;
  &lt;xacro:property name="wheel_r" value="0.035"/&gt;
  &lt;xacro:property name="wheel_w" value="0.020"/&gt;
  &lt;xacro:property name="track_w" value="0.103"/&gt;

  &lt;!-- 2. Reusable Parametric Wheel Macro --&gt;
  &lt;xacro:macro name="drive_wheel" params="prefix parent reflect"&gt;
    &lt;link name="\${prefix}_wheel_1"&gt;
      &lt;visual&gt;
        &lt;geometry&gt;&lt;cylinder radius="\${wheel_r}" length="\${wheel_w}"/&gt;&lt;/geometry&gt;
        &lt;material name="black"/&gt;
      &lt;/visual&gt;
      &lt;collision&gt;
        &lt;geometry&gt;&lt;cylinder radius="\${wheel_r}" length="\${wheel_w}"/&gt;&lt;/geometry&gt;
      &lt;/collision&gt;
      &lt;xacro:cylinder_inertia m="0.036" r="\${wheel_r}" h="\${wheel_w}"/&gt;
    &lt;/link&gt;
    &lt;joint name="\${prefix}_motor" type="continuous"&gt;
      &lt;parent link="\${parent}"/&gt;
      &lt;child link="\${prefix}_wheel_1"/&gt;
      &lt;origin xyz="0.056 \${reflect * track_w / 2} 0.035" rpy="0 0 0"/&gt;
      &lt;axis xyz="0 1 0"/&gt;
    &lt;/joint&gt;
  &lt;/xacro:macro&gt;

  &lt;!-- 3. Symmetrical Macro Instantiations --&gt;
  &lt;xacro:drive_wheel prefix="right" parent="base_link" reflect="-1"/&gt;
  &lt;xacro:drive_wheel prefix="left"  parent="base_link" reflect="1"/&gt;
&lt;/robot&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Why Xacro Over Raw URDF?</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Raw URDF requires copying identical XML blocks for left and right wheels. Xacro macros eliminate copy-paste errors and enforce mathematical symmetry across both sides of the chassis.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>Global Properties &amp; Built-in Math</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>&lt;xacro:property&gt;</code> constants define dimensions (wheel radius, track width) in a single place. Built-in math syntax <code>\${reflect * track_w / 2}</code> calculates symmetrical joint offsets automatically.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧩</span><strong>Modular Subsystem Architecture</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Split monolithic robot files into clean modules via <code>&lt;xacro:include filename="$(find ...)/urdf/lidar.xacro"/&gt;</code>. Compile to pure URDF via <code>xacro nexus_amr.urdf.xacro &gt; /tmp/robot.urdf</code>.</p>
          </div>
        </div>
      </div>
    `
  });

  // 6. Industrial CAD Workflow: Autodesk Fusion 360 to ROS 2 URDF (with Robot Image)
  slides.push({
    id: `${lesson.id}_sec6_cad_fusion360`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Industrial CAD Workflow: From CAD to ROS 2 URDF',
    badge: '🏭 CAD to ROS 2 Pipeline',
    title: '6. Industrial CAD Pipeline: Designing in Autodesk Fusion 360 & Exporting to ROS 2 URDF',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.3rem; padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>1️⃣</span><strong>Parametric CAD Modeling in Fusion 360</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Model chassis, drive wheels, casters, and sensor mounts as individual components (<code>urr_bot v8.f3d</code>). Align joint pivot origins with component coordinate origins.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.3rem; padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>2️⃣</span><strong>Automated Export via fusion2urdf</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Run the <code>fusion2urdf-ros2</code> add-in. It automatically computes Center of Mass (CoM), 3D inertia tensors (<code>ixx, iyy, izz</code>), and exports triangular surface meshes (<code>base_link.stl</code>, <code>right_wheel_1.stl</code>, etc.).</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.3rem; padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>3️⃣</span><strong>Millimeter-to-Meter Scaling Rule</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;"><strong>Golden Rule:</strong> CAD suites export STL in millimeters (mm). ROS 2 URDF strictly requires meters (m). Always apply <code>scale="0.001 0.001 0.001"</code> inside the <code>&lt;mesh&gt;</code> tag.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>4️⃣</span><strong>Package Integration &amp; Verification</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Store meshes in <code>nexus_amr_description/meshes/</code> and install via <code>setup.py</code>. Inspect the kinematic tree using <code>check_urdf</code> and preview in RViz2 with joint sliders.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l09-cad-image-card">
            <img src="assets/images/nexus_amr_real_urdf_robot_design.jpg" alt="Real Nexus AMR URDF Robot Design" />
            <div class="cad-caption">
              <strong style="color: #0284c7;">Nexus AMR 3D URDF Digital Twin:</strong> Dual drive wheels, front caster, 360&deg; RPLiDAR puck, front camera, and active REP-103 TF coordinate frames.
            </div>
            <div class="l03-cmd-header" style="width: 100%; padding: 0.25rem 0.5rem; font-size: 0.7rem; box-sizing: border-box; background: rgba(0,0,0,0.3); border-radius: 4px;">
              <span class="l03-term-badge" style="font-size: 0.65rem;">Mesh Reference</span>
              <code>&lt;mesh filename="package://...base_link.stl" scale="0.001 0.001 0.001"/&gt;</code>
            </div>
          </div>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 10:
 * RViz2 Visualization & Kinematic TF Inspection.
 */
function buildLesson10Slides(doc, lesson, slides) {
  // 1. RViz2 vs Gazebo Distinction
  slides.push({
    id: `${lesson.id}_sec2_rviz_vs_gazebo`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. RViz2 vs. Gazebo: The Essential Distinction',
    badge: '👁️ Perception vs Physics',
    title: '2. RViz2 vs. Gazebo: The Essential Distinction in Robotics Engineering',
    htmlContent: `
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 22%;">Dimension</th>
              <th style="width: 39%;">RViz2 (Sensor &amp; State Visualizer)</th>
              <th style="width: 39%;">Gazebo (Rigid-Body Physics Simulator)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Primary Purpose</strong></td>
              <td>Visualizes what the robot <em>believes &amp; perceives</em> (LiDAR, TF, Costmaps).</td>
              <td>Simulates the <em>physical reality</em> (gravity, friction, inertia, contacts).</td>
            </tr>
            <tr>
              <td><strong>Physics Engine</strong></td>
              <td>None. Pure 3D rendering pipeline (OGRE). Displays incoming ROS 2 messages.</td>
              <td>ODE / Bullet / DART solver calculating joint torques and collisions.</td>
            </tr>
            <tr>
              <td><strong>Time Source</strong></td>
              <td>Listens to <code>/clock</code> when <code>use_sim_time:=True</code>, or wall-clock.</td>
              <td>Generates simulated time and publishes the authoritative <code>/clock</code>.</td>
            </tr>
            <tr>
              <td><strong>Sensor Data</strong></td>
              <td>Subscribes to sensor topics and renders visual representations.</td>
              <td>Computes synthetic sensor observations with physics raycasts and noise.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 Key Distinction:</strong> You can run RViz2 with a real physical robot in a factory without Gazebo. RViz2 is the robot\'s dashboard; Gazebo is its digital twin playground.
      </div>
    `
  });

  // 2. Spatial Coordinate Conventions (REP 103)
  slides.push({
    id: `${lesson.id}_sec3_rep103_rgb`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. The RGB = XYZ Rule & Coordinate Conventions',
    badge: '📐 REP-103 Standard',
    title: '3. Spatial Coordinate Conventions: The Universal "RGB = XYZ" Rule',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔴</span><strong>Red Axis = X (Forward Longitudinal)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Points strictly forward along the robot\'s primary direction of travel. Positive linear velocities (<code>+vx</code>) drive the robot forward.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🟢</span><strong>Green Axis = Y (Port / Left Lateral)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Points horizontally to the robot\'s left side. For holonomic omni-directional robots, positive strafe velocities (<code>+vy</code>) move left.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔵</span><strong>Blue Axis = Z (Upward Vertical)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Points vertically upward normal to the ground plane. Positive angular velocities (<code>+wz</code>) cause counter-clockwise yaw rotation.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>✋</span><strong>Right-Hand Coordinate Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Extend your right thumb along an axis. Your curled fingers point in the direction of positive angular rotation (Euler angles: Roll about X, Pitch about Y, Yaw about Z).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📷</span><strong>Optical Sensor Frame Exception</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Camera image sensors follow optical conventions: <strong>Z Forward</strong> (optical axis), <strong>X Right</strong>, <strong>Y Down</strong>. A static TF transform bridges <code>camera_link</code> to <code>camera_optical_frame</code>.</p>
          </div>
        </div>
      </div>
    `
  });

  // 3. Key RViz2 Displays & Fixed Frame Rule
  slides.push({
    id: `${lesson.id}_sec4_displays_fixed_frame`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Key RViz2 Displays & The Fixed Frame Rule',
    badge: '🖥️ RViz2 Displays',
    title: '4. Key RViz2 Displays & The Authoritative Fixed Frame Rule',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l06-table-wrap">
            <table>
              <thead>
                <tr><th>Display Plugin</th><th>Input Topic / Frame</th><th>Functionality</th></tr>
              </thead>
              <tbody>
                <tr><td><code>RobotModel</code></td><td><code>/robot_description</code></td><td>Renders 3D meshes and kinematic joints.</td></tr>
                <tr><td><code>TF</code></td><td><code>/tf</code> &amp; <code>/tf_static</code></td><td>Visualizes 3D coordinate frame axes.</td></tr>
                <tr><td><code>LaserScan</code></td><td><code>/scan</code></td><td>Projects 2D LiDAR range points in space.</td></tr>
                <tr><td><code>Map</code></td><td><code>/map</code> (OccupancyGrid)</td><td>Renders SLAM or global static obstacle map.</td></tr>
                <tr><td><code>Odometry</code></td><td><code>/odom</code></td><td>Renders robot position and trajectory arrow.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>The "Fixed Frame" Reference Datum</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Every incoming sensor message is rendered relative to the Fixed Frame. If an active transform path from sensor to Fixed Frame is missing, the display errors out in red.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📍</span><strong>Which Fixed Frame to Select?</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">
              &bull; <strong>URDF Modeling:</strong> Set to <code>base_footprint</code> or <code>base_link</code>.<br/>
              &bull; <strong>Odometry Testing:</strong> Set to <code>odom</code> to see the robot move relative to start.<br/>
              &bull; <strong>SLAM &amp; Navigation:</strong> Set to <code>map</code> for drift-free global coordinates.
            </p>
          </div>
        </div>
      </div>
    `
  });

  // 4. Launch Pipeline: rsp.launch.py & display.launch.py
  slides.push({
    id: `${lesson.id}_sec5_launch_pipeline`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Building the Launch Pipeline: rsp & display',
    badge: '🚀 Launch Architecture',
    title: '5. The Robot State Publisher & RViz2 Launch Pipeline Architecture',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">display.launch.py</span><strong>RViz2 Bringup Nodes</strong></div>
            <pre><code class="language-python"># 1. State Publisher (Broadcasting robot URDF & TF)
rsp_launch = IncludeLaunchDescription(
    PythonLaunchDescriptionSource([rsp_path]),
    launch_arguments={'use_sim_time': 'false'}.items()
)

# 2. Joint State Publisher GUI (Interactive joint sliders)
jsp_gui_node = Node(
    package='joint_state_publisher_gui',
    executable='joint_state_publisher_gui'
)

# 3. RViz2 Visualizer Node (Pre-configured config)
rviz_node = Node(
    package='rviz2',
    executable='rviz2',
    arguments=['-d', rviz_config_path]
)</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📡</span><strong>robot_state_publisher Role</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Parses the URDF XML, listens to <code>/joint_states</code>, calculates 3D forward kinematics, and broadcasts all coordinate frame transforms to <code>/tf</code> and <code>/tf_static</code>.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎚️</span><strong>joint_state_publisher_gui Role</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Opens an interactive GUI slider for non-fixed joints, publishing real-time mock joint angles to <code>/joint_states</code> before physical motor encoders exist.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>💾</span><strong>Config File Persistence (-d)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Always supply <code>arguments=['-d', rviz_config]</code> so your curated displays, topic bindings, and camera views load automatically without manual setup.</p>
          </div>
        </div>
      </div>
    `
  });

  // 5. Kinematic TF Diagnostics & CLI Inspection
  slides.push({
    id: `${lesson.id}_sec6_tf_cli`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. Kinematic TF Diagnostics & CLI Inspection Tools',
    badge: '🔍 TF Inspection',
    title: '6. Kinematic TF Diagnostics: view_frames, tf2_echo & tf2_monitor',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">TF2 CLI Tools</span><strong>Essential Diagnostic Commands</strong></div>
            <pre><code class="language-bash"># 1. Generate full TF kinematic tree PDF report
ros2 run tf2_tools view_frames

# 2. Inspect real-time 3D offset between two frames
ros2 run tf2_ros tf2_echo base_link laser_frame

# 3. Monitor broadcast frequency & latency across all frames
ros2 run tf2_ros tf2_monitor</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📄</span><strong>view_frames Kinematic Tree Audit</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Generates <code>frames.pdf</code> showing the complete hierarchy from root <code>base_footprint</code> to sensor frames, confirming no disjointed sub-trees or missing broadcasters.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📡</span><strong>tf2_echo Real-Time Vector Check</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Streams the exact translation (x, y, z) and rotation (quaternion / RPY) between two frames at 1Hz, verifying hardware sensor placement against CAD design.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏱️</span><strong>tf2_monitor Latency &amp; Jitter</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Measures publication rate (Hz) and age of transforms. Helps diagnose dropped frames, CPU starvation, or network buffering issues.</p>
          </div>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 11:
 * Gazebo Physics Simulation & Sensor Plugins.
 */
function buildLesson11Slides(doc, lesson, slides) {
  // 1. Gazebo Simulation Engine & Physics Architecture
  slides.push({
    id: `${lesson.id}_sec2_gazebo_arch`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Gazebo Physics Simulation Architecture',
    badge: '⚙️ Simulation Architecture',
    title: '2. Gazebo Physics Engine Mechanics: ODE Solvers & Simulated Clock',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚙️</span><strong>Open Dynamics Engine (ODE) Physics</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Gazebo evaluates Newtonian physics (F = m &middot; a) at discrete intervals. It computes wheel ground contact forces, friction cones, and actuator torques on every time step.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏱️</span><strong>Discrete Simulation Step (dt = 0.001s)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Default physics step is 1 millisecond (1000 Hz). Smaller steps enhance numerical stability for small wheel contacts but require higher CPU compute.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📊</span><strong>Real-Time Factor (RTF) Metric</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>RTF = Sim Time / Real Time</code>. An RTF of 1.0 means 1 simulation second equals 1 wall-clock second. RTF &lt; 1.0 indicates CPU physics solver bottleneck.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">The Simulated Clock Rule</span><strong>use_sim_time Synchronization</strong></div>
            <pre><code class="language-bash"># Gazebo publishes simulated time to /clock:
ros2 topic echo /clock

# All ROS 2 nodes must be launched with:
use_sim_time:=True

# In Python nodes, rclpy uses /clock automatically:
node.get_clock().now()</code></pre>
          </div>
          <div class="l05-golden-card warning" style="margin-top: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚠️</span><strong>The Time Mismatch Pitfall</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">If a node runs with wall-clock time while Gazebo runs on simulated time, TF transform lookups will fail immediately with "Lookup would require extrapolation into the future".</p>
          </div>
        </div>
      </div>
    `
  });

  // 2. Differential Drive Controller Plugin
  slides.push({
    id: `${lesson.id}_sec3_diff_drive_plugin`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. The Differential Drive Controller Plugin',
    badge: '🚜 Motion Controller Plugin',
    title: '3. Closed-Loop Kinematics: libgazebo_ros_diff_drive.so',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">gazebo.xacro</span><strong>Diff-Drive Plugin Config</strong></div>
            <pre><code class="language-xml">&lt;gazebo&gt;
  &lt;plugin name="diff_drive" filename="libgazebo_ros_diff_drive.so"&gt;
    &lt;left_joint&gt;left_wheel_joint&lt;/left_joint&gt;
    &lt;right_joint&gt;right_wheel_joint&lt;/right_joint&gt;
    &lt;wheel_separation&gt;0.44&lt;/wheel_separation&gt;
    &lt;wheel_diameter&gt;0.16&lt;/wheel_diameter&gt;
    &lt;max_wheel_torque&gt;20&lt;/max_wheel_torque&gt;
    &lt;max_wheel_acceleration&gt;1.5&lt;/max_wheel_acceleration&gt;
    &lt;command_topic&gt;cmd_vel&lt;/command_topic&gt;
    &lt;publish_odom&gt;true&lt;/publish_odom&gt;
    &lt;publish_odom_tf&gt;true&lt;/publish_odom_tf&gt;
    &lt;odometry_frame&gt;odom&lt;/odometry_frame&gt;
    &lt;robot_base_frame&gt;base_footprint&lt;/robot_base_frame&gt;
  &lt;/plugin&gt;
&lt;/gazebo&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Direct cmd_vel Ingestion</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Subscribes to <code>geometry_msgs/msg/Twist</code> on <code>/cmd_vel</code>. Calculates individual wheel velocities using track separation: <code>v_L = v - (w &middot; L / 2)</code>, <code>v_R = v + (w &middot; L / 2)</code>.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Odometry &amp; TF Broadcasting</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Integrates wheel encoder revolutions to compute dead-reckoning pose. Automatically publishes <code>nav_msgs/msg/Odometry</code> on <code>/odom</code> and broadcasts <code>odom &rarr; base_footprint</code> TF.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚙️</span><strong>Motor Limits &amp; Torque Modeling</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Enforces maximum torque (20 N&middot;m) and acceleration limits to simulate physical motor saturation and wheel slip under heavy payload.</p>
          </div>
        </div>
      </div>
    `
  });

  // 3. 2D LiDAR Ray Sensor Plugin
  slides.push({
    id: `${lesson.id}_sec4_lidar_plugin`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. The 2D LiDAR Ray Sensor Plugin',
    badge: '📡 LiDAR Ray Sensor',
    title: '4. Simulating Perception: 2D LiDAR Ray Sensor Plugin Configuration',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">gazebo.xacro</span><strong>LiDAR Plugin Config</strong></div>
            <pre><code class="language-xml">&lt;gazebo reference="laser_frame"&gt;
  &lt;sensor name="lidar" type="ray"&gt;
    &lt;always_on&gt;true&lt;/always_on&gt;
    &lt;visualize&gt;false&lt;/visualize&gt;
    &lt;update_rate&gt;10&lt;/update_rate&gt;
    &lt;ray&gt;
      &lt;scan&gt;
        &lt;horizontal&gt;
          &lt;samples&gt;360&lt;/samples&gt;
          &lt;min_angle&gt;-3.14159&lt;/min_angle&gt;
          &lt;max_angle&gt;3.14159&lt;/max_angle&gt;
        &lt;/horizontal&gt;
      &lt;/scan&gt;
      &lt;range&gt;&lt;min&gt;0.12&lt;/min&gt;&lt;max&gt;12.0&lt;/max&gt;&lt;/range&gt;
      &lt;noise&gt;&lt;type&gt;gaussian&lt;/type&gt;&lt;stddev&gt;0.01&lt;/stddev&gt;&lt;/noise&gt;
    &lt;/ray&gt;
    &lt;plugin name="lidar_controller" filename="libgazebo_ros_ray_sensor.so"&gt;
      &lt;ros&gt;&lt;remapping&gt;~/out:=scan&lt;/remapping&gt;&lt;/ros&gt;
      &lt;output_type&gt;sensor_msgs/LaserScan&lt;/output_type&gt;
      &lt;frame_name&gt;laser_frame&lt;/frame_name&gt;
    &lt;/plugin&gt;
  &lt;/sensor&gt;
&lt;/gazebo&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>360&deg; Spatial Scanning Geometry</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Casts 360 discrete rays across 2&pi; radians (-180&deg; to +180&deg;). Measures distance to the closest intersecting collision bounding box.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎲</span><strong>Gaussian Noise Injection</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Real laser sensors suffer measurement jitter. Setting Gaussian noise (&sigma; = 0.01m) trains SLAM algorithms to handle noisy industrial data robustly.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📡</span><strong>Downstream SLAM Compatibility</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Outputs standard <code>sensor_msgs/msg/LaserScan</code> directly on <code>/scan</code> with <code>frame_id: laser_frame</code>, fully ready for SLAM Toolbox and Nav2.</p>
          </div>
        </div>
      </div>
    `
  });

  // 4. RGB Camera Sensor Plugin
  slides.push({
    id: `${lesson.id}_sec5_camera_plugin`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. The RGB Camera Sensor Plugin',
    badge: '📷 Optical Sensor Plugin',
    title: '5. Vision Pipeline: RGB Camera Sensor Plugin (libgazebo_ros_camera.so)',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">gazebo.xacro</span><strong>Camera Plugin Config</strong></div>
            <pre><code class="language-xml">&lt;gazebo reference="camera_link"&gt;
  &lt;sensor name="camera_sensor" type="camera"&gt;
    &lt;update_rate&gt;30.0&lt;/update_rate&gt;
    &lt;camera name="head"&gt;
      &lt;horizontal_fov&gt;1.3962634&lt;/horizontal_fov&gt;
      &lt;image&gt;
        &lt;width&gt;640&lt;/width&gt;&lt;height&gt;480&lt;/height&gt;
        &lt;format&gt;R8G8B8&lt;/format&gt;
      &lt;/image&gt;
      &lt;clip&gt;&lt;near&gt;0.05&lt;/near&gt;&lt;far&gt;15&lt;/far&gt;&lt;/clip&gt;
    &lt;/camera&gt;
    &lt;plugin name="camera_controller" filename="libgazebo_ros_camera.so"&gt;
      &lt;frame_name&gt;camera_optical_frame&lt;/frame_name&gt;
      &lt;min_depth&gt;0.1&lt;/min_depth&gt;
      &lt;max_depth&gt;10.0&lt;/max_depth&gt;
    &lt;/plugin&gt;
  &lt;/sensor&gt;
&lt;/gazebo&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🖼️</span><strong>Synchronized Dual-Stream Output</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Publishes synchronized raw pixels on <code>/camera/image_raw</code> and calibration intrinsics (focal length, principal point) on <code>/camera/camera_info</code> at 30 Hz.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>👁️</span><strong>Optical Coordinate Frame Binding</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Binds <code>frame_name: camera_optical_frame</code> to align with OpenCV image coordinate conventions (Z forward, X right, Y down), preventing inverted image renders.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🤖</span><strong>Downstream AI &amp; Perception</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Feed camera streams into visual fiducial tag detectors (AprilTag / ArUco), YOLO object detectors, or visual SLAM packages.</p>
          </div>
        </div>
      </div>
    `
  });

  // 5. Simulation Bringup Launch File & Execution
  slides.push({
    id: `${lesson.id}_sec6_sim_bringup`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. Simulation Bringup Launch File & Entity Spawner',
    badge: '🚀 Simulation Bringup',
    title: '6. Simulation Bringup Launch Pipeline & Entity Spawner Execution',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">sim_world.launch.py</span><strong>Gazebo + Spawner Pipeline</strong></div>
            <pre><code class="language-python"># 1. Launch Gazebo Server & Client with World
gazebo = IncludeLaunchDescription(
    PythonLaunchDescriptionSource([gazebo_ros_path, '/gazebo.launch.py']),
    launch_arguments={'world': world_path}.items()
)

# 2. Robot State Publisher (use_sim_time:=True)
rsp = IncludeLaunchDescription(
    PythonLaunchDescriptionSource([rsp_path]),
    launch_arguments={'use_sim_time': 'true'}.items()
)

# 3. Spawn Nexus AMR Entity in Gazebo Physics
spawn_entity = Node(
    package='gazebo_ros',
    executable='spawn_entity.py',
    arguments=['-topic', 'robot_description', '-entity', 'nexus_amr', '-z', '0.1']
)</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📦</span><strong>Dynamic Entity Spawning via CLI</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>spawn_entity.py</code> queries the <code>/robot_description</code> topic published by RSP and injects the robot into Gazebo\'s physics space at runtime without hardcoding paths.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>Single Command Bringup</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Execute: <code>ros2 launch nexus_amr_gazebo sim_world.launch.py</code>. Launches physics simulation, loads warehouse world, spawns AMR, and starts sensors simultaneously.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎮</span><strong>Drive Verification</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Open a new terminal and run <code>ros2 run teleop_twist_keyboard teleop_twist_keyboard</code> to verify closed-loop wheel motion and odometry tracking.</p>
          </div>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 12:
 * Building Custom Simulation Worlds in Gazebo.
 */
function buildLesson12Slides(doc, lesson, slides) {
  // 1. Anatomy of an SDF World File
  slides.push({
    id: `${lesson.id}_sec2_sdf_anatomy`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Anatomy of an SDF World File',
    badge: '🌐 SDF World Architecture',
    title: '2. Anatomy of an SDF World: Environment Hierarchy & Static Elements',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">warehouse.world</span><strong>SDF Root Hierarchy</strong></div>
            <pre><code class="language-xml">&lt;sdf version="1.6"&gt;
  &lt;world name="warehouse_world"&gt;
    &lt;!-- Global Directional Lighting --&gt;
    &lt;include&gt;&lt;uri&gt;model://sun&lt;/uri&gt;&lt;/include&gt;

    &lt;!-- Infinite Ground Plane with Friction --&gt;
    &lt;include&gt;&lt;uri&gt;model://ground_plane&lt;/uri&gt;&lt;/include&gt;

    &lt;!-- Physics Solver Parameters --&gt;
    &lt;physics type="ode"&gt;
      &lt;max_step_size&gt;0.001&lt;/max_step_size&gt;
      &lt;real_time_update_rate&gt;1000&lt;/real_time_update_rate&gt;
    &lt;/physics&gt;

    &lt;!-- Custom Warehouse Obstacles & Walls --&gt;
    &lt;include&gt;
      &lt;uri&gt;model://warehouse_walls&lt;/uri&gt;
      &lt;pose&gt;0 0 0 0 0 0&lt;/pose&gt;
    &lt;/include&gt;
  &lt;/world&gt;
&lt;/sdf&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🌐</span><strong>URDF vs. SDF: Fundamental Difference</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">URDF describes a single robot kinematic tree. SDF (Simulation Description Format) describes entire environments: gravity, sky, lighting, multiple robots, and static infrastructure.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>☀️</span><strong>Directional Sun &amp; Shadows</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The <code>sun</code> model provides raycasting light and shadows essential for optical camera testing and vision-based obstacle avoidance.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧱</span><strong>Ground Plane Contact Friction</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Defines contact friction coefficients (<code>mu1</code>, <code>mu2</code>). Tuning ground friction ensures simulated rubber drive wheels don\'t spin out during acceleration.</p>
          </div>
        </div>
      </div>
    `
  });

  // 2. Physics Solver Tuning for Robotics
  slides.push({
    id: `${lesson.id}_sec3_solver_tuning`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Physics Solver Tuning for Robotics',
    badge: '⚙️ Physics Engine Tuning',
    title: '3. Physics Solver Tuning: Balancing Simulation Fidelity & Real-Time Performance',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">warehouse.world</span><strong>Tuned ODE Physics Parameters</strong></div>
            <pre><code class="language-xml">&lt;physics type="ode"&gt;
  &lt;max_step_size&gt;0.001&lt;/max_step_size&gt;
  &lt;real_time_update_rate&gt;1000&lt;/real_time_update_rate&gt;
  &lt;ode&gt;
    &lt;solver&gt;
      &lt;type&gt;quick&lt;/type&gt;
      &lt;iters&gt;50&lt;/iters&gt;
      &lt;sor&gt;1.3&lt;/sor&gt;
    &lt;/solver&gt;
    &lt;constraints&gt;
      &lt;cfm&gt;0.00001&lt;/cfm&gt;
      &lt;erp&gt;0.2&lt;/erp&gt;
      &lt;contact_max_correcting_vel&gt;100.0&lt;/contact_max_correcting_vel&gt;
      &lt;contact_surface_layer&gt;0.001&lt;/contact_surface_layer&gt;
    &lt;/constraints&gt;
  &lt;/ode&gt;
&lt;/physics&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚡</span><strong>iters: 50 Solver Iterations</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Higher iterations (50 vs default 20) resolve constraint equations accurately, completely preventing AMR wheels from jittering or penetrating through floor meshes.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📈</span><strong>sor: 1.3 (Successive Over-Relaxation)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Accelerates convergence of the iterative LCP solver, reducing CPU overhead while preserving numerical stability under heavy dynamic loads.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Target RTF = 1.0 (Real-Time Factor)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Guarantees that 1.0 second of simulation time equals 1.0 second of real world time, preserving accurate ROS 2 timer frequencies and sensor rates.</p>
          </div>
        </div>
      </div>
    `
  });

  // 3. Constructing Warehouse Elements & Static Collision Boundaries
  slides.push({
    id: `${lesson.id}_sec4_warehouse_elements`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Constructing Warehouse Elements',
    badge: '🏭 Factory Assets',
    title: '4. Constructing Warehouse Geometry: Corridors, Shelving Racks & Collision Hulls',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔒</span><strong>The static=true Performance Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Always mark permanent walls, storage racks, and structural pillars as <code>&lt;static&gt;true&lt;/static&gt;</code>. This removes them from ODE dynamic force calculations, saving massive CPU cycles.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📦</span><strong>Modular Storage Rack Dimensions</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Standardize aisles to 2.5m width and rack depths to 1.0m to reflect industrial automated logistics facilities, providing realistic clearance for 0.4m AMRs.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📡</span><strong>LiDAR Ray Reflection Realism</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Ensure collision bounding boxes match visual boundaries exactly so simulated 2D LiDAR raycasts match physical wall contours precisely.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">warehouse_shelf.sdf</span><strong>Static Warehouse Asset Model</strong></div>
            <pre><code class="language-xml">&lt;model name="warehouse_shelf"&gt;
  &lt;static&gt;true&lt;/static&gt;
  &lt;link name="shelf_link"&gt;
    &lt;visual name="visual"&gt;
      &lt;geometry&gt;
        &lt;box&gt;&lt;size&gt;2.0 0.8 2.2&lt;/size&gt;&lt;/box&gt;
      &lt;/geometry&gt;
      &lt;material&gt;&lt;ambient&gt;0.2 0.2 0.7 1&lt;/ambient&gt;&lt;/material&gt;
    &lt;/visual&gt;
    &lt;collision name="collision"&gt;
      &lt;geometry&gt;
        &lt;box&gt;&lt;size&gt;2.0 0.8 2.2&lt;/size&gt;&lt;/box&gt;
      &lt;/geometry&gt;
    &lt;/collision&gt;
  &lt;/link&gt;
&lt;/model&gt;</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 4. Viewport Camera Positioning & Spawning
  slides.push({
    id: `${lesson.id}_sec5_viewport_camera`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Viewport Camera Positioning & Spawning',
    badge: '🎥 Developer Viewport',
    title: '5. Developer Experience: Viewport Camera Presets & Dynamic Asset Spawning',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">warehouse.world</span><strong>GUI Camera Preset</strong></div>
            <pre><code class="language-xml">&lt;gui fullscreen="0"&gt;
  &lt;camera name="user_camera"&gt;
    &lt;!-- X Y Z Roll Pitch Yaw --&gt;
    &lt;pose&gt;-6.0 -6.0 8.0 0.0 0.85 0.785&lt;/pose&gt;
    &lt;view_controller&gt;orbit&lt;/view_controller&gt;
  &lt;/camera&gt;
&lt;/gui&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎥</span><strong>Isometric Overhead Camera View</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Setting a default camera pose (Z=8m, pitch=0.85 rad) positions the Gazebo viewport in an isometric perspective over the whole facility immediately upon launch.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Spawning Dynamic Obstacles</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Spawn dynamic pallets and temporary barriers on the fly using the CLI:<br/><code>ros2 run gazebo_ros spawn_entity.py -entity pallet_1 -file pallet.sdf -x 2.5 -y 1.0</code></p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏭</span><strong>Production Verification Ready</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">A complete custom world provides the realistic spatial corridors needed for mapping with SLAM Toolbox and autonomous navigation with Nav2.</p>
          </div>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 13:
 * 2D LiDAR SLAM Mapping with SLAM Toolbox.
 */
function buildLesson13Slides(doc, lesson, slides) {
  // 1. Graph SLAM Architecture & Pose Graph Optimization
  slides.push({
    id: `${lesson.id}_sec2_slam_arch`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Graph SLAM Architecture & Pose Graph Optimization',
    badge: '🗺️ SLAM Architecture',
    title: '2. Graph SLAM Foundations: Scan Matching & Pose Graph Optimization (PGO)',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔍</span><strong>Front-End Scan Matching (Karto)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Aligns consecutive 2D laser scans against local sub-maps using correlative scan matching. Computes high-precision relative pose changes between robot timesteps.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🕸️</span><strong>Pose Graph Construction</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Maintains a graph where <strong>Nodes</strong> represent robot poses at discrete locations, and <strong>Edges</strong> represent spatial constraints derived from odometry and scan matching.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Back-End Loop Closure Optimization</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">When the robot re-enters a previously visited area, SLAM detects a loop closure. The non-linear <strong>Ceres Solver</strong> redistributes cumulative odometry drift across the entire graph.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>The Authoritative TF Triad</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">SLAM Toolbox publishes the critical <code>map &rarr; odom</code> transform. Combined with wheel odometry\'s <code>odom &rarr; base_footprint</code>, the robot obtains globally drift-free coordinates.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>Why SLAM Toolbox Over Gmapping / Cartographer?</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">SLAM Toolbox is the official ROS 2 standard: handles huge multi-story warehouse facilities, supports life-long mapping, dynamic serialization, and deserialization without memory leaks.</p>
          </div>
        </div>
      </div>
    `
  });

  // 2. SLAM Toolbox Configuration (config/slam_toolbox.yaml)
  slides.push({
    id: `${lesson.id}_sec3_slam_config`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Deep Dive: config/slam_toolbox.yaml',
    badge: '⚙️ SLAM Configuration',
    title: '3. Tuning SLAM Toolbox: config/slam_toolbox.yaml Parameter Matrix',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">slam_toolbox.yaml</span><strong>Production Tuning</strong></div>
            <pre><code class="language-yaml">slam_toolbox:
  ros__parameters:
    # Frame & Topic Bindings
    odom_frame: odom
    map_frame: map
    base_frame: base_footprint
    scan_topic: /scan
    mode: mapping # online mapping

    # Spatial Resolution & Search
    resolution: 0.05       # 5cm grid resolution
    max_laser_range: 12.0  # Match LiDAR max range
    minimum_time_interval: 0.5
    transform_timeout: 0.2
    tf_buffer_duration: 30.0

    # Loop Closure Constraints
    do_loop_closing: true
    loop_search_maximum_distance: 3.0
    loop_match_minimum_chain_size: 10
    loop_match_maximum_variance_coarse: 3.0</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📏</span><strong>resolution: 0.05 (5cm / pixel)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Industrial gold standard: provides crisp pallet and doorway definition while keeping total grid memory compact for 100,000 sq ft warehouses.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>loop_search_maximum_distance: 3.0m</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Limits candidate loop closure search space within a 3.0-meter radius of the current pose estimate, preventing false positive matches in repetitive aisles.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏱️</span><strong>transform_timeout: 0.2s</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Grace period for TF buffer lookup. Prevents scan-drop errors when CPU load temporarily spikes during Ceres graph optimization steps.</p>
          </div>
        </div>
      </div>
    `
  });

  // 3. Online Mapping Workflow & Loop Closure Strategy
  slides.push({
    id: `${lesson.id}_sec4_mapping_workflow`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Step-by-Step Mapping Workflow',
    badge: '🎮 Mapping Workflow',
    title: '4. The Step-by-Step Mapping Workflow & Loop Closure Strategy',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal Operations</span><strong>Bringup &amp; Teleop Commands</strong></div>
            <pre><code class="language-bash"># Terminal 1: Launch Gazebo Simulation World
ros2 launch nexus_amr_gazebo sim_world.launch.py

# Terminal 2: Launch SLAM Toolbox & RViz2
ros2 launch nexus_amr_navigation slam.launch.py

# Terminal 3: Keyboard Teleop Control
ros2 run teleop_twist_keyboard teleop_twist_keyboard \
  --ros-args -r /cmd_vel:=/cmd_vel</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏎️</span><strong>Speed Discipline: 0.2 m/s Max</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Never drive at full speed while mapping! Smooth, slow driving (0.2 m/s linear, 0.4 rad/s angular) maximizes scan overlap and prevents scan slippage.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>The Perimeter-First Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">First drive along the outer boundary wall of the facility until you return to your starting pose. This triggers a global loop closure that locks the outer perimeter before exploring interior aisles.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🖥️</span><strong>RViz Verification</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Add the <code>Map</code> display listening to <code>/map</code>. Black lines show walls, white spaces indicate verified free corridors, and gray areas indicate unscanned space.</p>
          </div>
        </div>
      </div>
    `
  });

  // 4. Map Serialization & Occupancy Grid Storage
  slides.push({
    id: `${lesson.id}_sec5_saving_map`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Saving the Map (.yaml & .pgm Serialization)',
    badge: '💾 Map Serialization',
    title: '5. Map Serialization & Occupancy Grid Storage (.yaml & .pgm)',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">Map Saver CLI</span><strong>Serializing Active SLAM Grid</strong></div>
            <pre><code class="language-bash"># Save map files to maps/ directory
ros2 run nav2_map_server map_saver_cli \
  -f ~/ros2_ws/src/nexus_amr_navigation/maps/warehouse_map</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">warehouse_map.yaml</span><strong>Metadata Contract</strong></div>
            <pre><code class="language-yaml">image: warehouse_map.pgm
resolution: 0.050000
origin: [-10.000000, -10.000000, 0.000000]
negate: 0
occupied_thresh: 0.65
free_thresh: 0.25
mode: trinary</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🖼️</span><strong>warehouse_map.pgm (Portable Graymap)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">An 8-bit grayscale bitmap where each pixel represents a 5cm x 5cm grid cell. White (254) = Free Space, Black (0) = Solid Obstacle, Gray (205) = Unknown Space.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📍</span><strong>origin: [-10.0, -10.0, 0.0] World Anchor</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Anchors the bottom-left pixel (0,0) of the image to physical coordinates in the <code>map</code> coordinate frame. Without this, localization in Nav2 fails completely.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>Ready for Nav2 Ingestion</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">This serialized map is loaded directly by Nav2\'s <code>map_server</code> in Lesson 14, providing the foundation for global path planning and localization.</p>
          </div>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 14:
 * Nav2 Stack Architecture & Costmap 2D Configuration.
 */
function buildLesson14Slides(doc, lesson, slides) {
  // 1. The Nav2 Server Architecture
  slides.push({
    id: `${lesson.id}_sec2_nav2_arch`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. The Nav2 Server Architecture',
    badge: '🧠 Nav2 Architecture',
    title: '2. Nav2 System Architecture: Separation of Planning, Control & Recovery',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🌳</span><strong>BT Navigator (Behavior Tree Orchestrator)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The master executive brain. Evaluates behavior tree XML scripts to coordinate planning, trajectory following, progress monitoring, and cascading recovery actions.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🗺️</span><strong>Planner Server (Global Macro Path Finding)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Runs A* or NavFn on the global costmap to compute the optimal collision-free route from current pose to goal destination at low frequency (1 Hz).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚜</span><strong>Controller Server (Local Micro Path Tracking)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Runs DWB or Regulated Pure Pursuit on the rolling local costmap at high frequency (20 Hz) to output physical velocity commands (<code>/cmd_vel</code>) avoiding dynamic obstacles.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Recoveries Server (Fault Recovery Pipeline)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Executes emergency recovery behaviors when the robot gets stuck: costmap clearing, in-place rotation (spin), backing up, or waiting for dynamic obstacles to clear.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚙️</span><strong>Managed Lifecycle Architecture</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">All Nav2 servers are ROS 2 Lifecycle Nodes orchestrated by <code>lifecycle_manager</code>. They transition systematically from Unconfigured &rarr; Inactive &rarr; Active.</p>
          </div>
        </div>
      </div>
    `
  });

  // 2. Costmap 2D: Layered Representation
  slides.push({
    id: `${lesson.id}_sec3_costmap_layers`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Costmap 2D: Layered Representation',
    badge: '🧱 Layered Grid',
    title: '3. Costmap 2D Architecture: The 3-Tier Layered Representation',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>1️⃣</span><strong>Static Layer (SLAM Map Baseline)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Ingests the pre-computed SLAM <code>warehouse_map.yaml</code>. Provides permanent static walls, columns, and corridors. Remains unchanged during runtime.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>2️⃣</span><strong>Obstacle Layer (Live Sensor Streams)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Subscribes to live <code>/scan</code> (2D LiDAR) and 3D depth cameras. Uses raycasting to dynamically mark new obstacles (people, forklifts, crates) and clear free space.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>3️⃣</span><strong>Inflation Layer (Safety Clearance Buffer)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Propagates an exponential cost decay gradient outward from every obstacle cell, creating a virtual safety envelope that pushes path planners away from walls.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l06-table-wrap">
            <table>
              <thead>
                <tr><th>Cost Value</th><th>Classification</th><th>Meaning for Planner</th></tr>
              </thead>
              <tbody>
                <tr><td><code>0</code></td><td>Free Space</td><td>Safe for robot traversal.</td></tr>
                <tr><td><code>1 - 252</code></td><td>Inflation Gradient</td><td>Allowed, but penalized by cost.</td></tr>
                <tr><td><code>253</code></td><td>Inscribed Zone</td><td>Fatal! Robot center here causes collision.</td></tr>
                <tr><td><code>254</code></td><td>Lethal Obstacle</td><td>Physical solid obstacle surface.</td></tr>
                <tr><td><code>255</code></td><td>No Information</td><td>Unknown unscanned space.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `
  });

  // 3. Inflation Layer Mathematics: The Safety Buffer
  slides.push({
    id: `${lesson.id}_sec4_inflation_math`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Inflation Layer Mathematics: The Safety Buffer',
    badge: '📐 Safety Mathematics',
    title: '4. Inflation Layer Mathematics: Exponential Cost Decay & Safety Radii',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">Exponential Decay Formula</span><strong>Cost Calculation</strong></div>
            <pre><code class="language-plaintext">For distance d between inscribed_radius and inflation_radius:

cost = exp(-1.0 * cost_scaling_factor * (d - r_inscribed)) 
       * (INSCRIBED_COST - 1)

Where:
- INSCRIBED_COST = 253
- d = distance from cell to nearest lethal obstacle
- r_inscribed = 0.25m (Nexus AMR chassis radius)</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⭕</span><strong>Inscribed Radius (0.25m)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The distance from the AMR rotation center to its outermost chassis edge. Any cell closer than this distance is marked <code>253 (Inscribed)</code>, preventing collision.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📉</span><strong>cost_scaling_factor Tuning</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Inversely proportional to cost decay rate. Higher values (e.g. 5.0) produce steep drop-offs suitable for tight aisles; lower values (e.g. 2.0) enforce wide safety clearance.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>Inflation Radius (0.55m)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The maximum distance outward that obstacle costs propagate. Cells beyond 0.55m have cost <code>0</code> and zero traversal penalty.</p>
          </div>
        </div>
      </div>
    `
  });

  // 4. Global vs. Local Costmap Configuration Matrix
  slides.push({
    id: `${lesson.id}_sec5_global_vs_local`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Global vs. Local Costmap Configuration',
    badge: '🗺️ Costmap Matrix',
    title: '5. Global vs. Local Costmap Configuration: Comparative Architecture Matrix',
    htmlContent: `
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 20%;">Property</th>
              <th style="width: 40%;">Global Costmap (global_costmap)</th>
              <th style="width: 40%;">Local Costmap (local_costmap)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Primary Consumer</strong></td>
              <td><code>planner_server</code> (Global path search: NavFn / Smac)</td>
              <td><code>controller_server</code> (Local velocity generation: DWB / RPP)</td>
            </tr>
            <tr>
              <td><strong>Global Frame</strong></td>
              <td><code>map</code> (drift-free world coordinate frame)</td>
              <td><code>odom</code> (smooth, continuous local coordinate frame)</td>
            </tr>
            <tr>
              <td><strong>Rolling Window</strong></td>
              <td><code>false</code> (Encompasses entire mapped warehouse facility)</td>
              <td><code>true</code> (Small 3m x 3m window centered dynamically on robot)</td>
            </tr>
            <tr>
              <td><strong>Update Frequency</strong></td>
              <td><code>1.0 Hz</code> (Low frequency saves CPU compute)</td>
              <td><code>5.0 - 10.0 Hz</code> (High frequency reacts rapidly to obstacles)</td>
            </tr>
            <tr>
              <td><strong>Resolution</strong></td>
              <td><code>0.05m</code> (5cm / pixel)</td>
              <td><code>0.05m</code> (5cm / pixel)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 Key Insight:</strong> Global costmap plans the macroscopic itinerary across the warehouse; Local costmap acts as the robot\'s immediate personal safety bubble avoiding dynamic obstacles.
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 15:
 * Nav2 Path Planners & Local Controller Tuning.
 */
function buildLesson15Slides(doc, lesson, slides) {
  // 1. Planners vs. Controllers Paradigm
  slides.push({
    id: `${lesson.id}_sec2_planners_vs_controllers`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Planners vs. Controllers: The Two-Tier Paradigm',
    badge: '🧭 Two-Tier Motion',
    title: '2. The Two-Tier Paradigm: Global Path Planners vs. Local Controllers',
    htmlContent: `
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 20%;">Dimension</th>
              <th style="width: 40%;">Global Path Planner (planner_server)</th>
              <th style="width: 40%;">Local Controller (controller_server)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Scope &amp; Objective</strong></td>
              <td>Macroscopic route planning from start to goal coordinates across warehouse.</td>
              <td>Microscopic trajectory tracking and real-time obstacle evasion.</td>
            </tr>
            <tr>
              <td><strong>Operating Costmap</strong></td>
              <td><code>global_costmap</code> (Static SLAM map + full inflation).</td>
              <td><code>local_costmap</code> (3m x 3m rolling window with live LiDAR rays).</td>
            </tr>
            <tr>
              <td><strong>Update Frequency</strong></td>
              <td><code>1.0 Hz</code> (Low frequency; plans once upon goal receipt).</td>
              <td><code>20.0 Hz</code> (High frequency; evaluates every 50ms).</td>
            </tr>
            <tr>
              <td><strong>Output Data Type</strong></td>
              <td><code>nav_msgs/msg/Path</code> (Array of coordinate waypoints).</td>
              <td><code>geometry_msgs/msg/Twist</code> (Direct <code>cmd_vel</code> velocities).</td>
            </tr>
            <tr>
              <td><strong>Algorithms</strong></td>
              <td>NavFn (Dijkstra), Smac Planner (A*, Hybrid-A*).</td>
              <td>DWB (Dynamic Window), Regulated Pure Pursuit (RPP).</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 Motion Architecture:</strong> Planners draw the map; Controllers drive the wheels while dodging unexpected humans and forklifts.
      </div>
    `
  });

  // 2. DWB Controller: Trajectory Rollout & Critic Scoring
  slides.push({
    id: `${lesson.id}_sec3_dwb_rollout`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. DWB Local Planner: Trajectory Rollout & Critic Scoring',
    badge: '🏎️ DWB Controller',
    title: '3. DWB Controller Mechanics: Dynamic Window Velocity Sampling & Rollout',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🪟</span><strong>1. Dynamic Window Velocity Sampling</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">At each 20Hz cycle, DWB samples a discrete 2D grid of candidate velocities <code>(v_x, &omega;_z)</code> constrained strictly by motor acceleration limits: <code>v_current &plusmn; a_max &middot; dt</code>.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔮</span><strong>2. Forward Kinematic Rollout (sim_time = 1.5s)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Simulates the forward motion of the robot along each sampled velocity pair over a 1.5-second horizon. Discards any trajectory whose footprint strikes an obstacle.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚖️</span><strong>3. Multi-Critic Scoring &amp; Selection</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Scores surviving trajectories using weighted objective critics: <code>Score = &sum; (weight_i &middot; critic_i)</code>. The candidate trajectory with the highest aggregate score is dispatched to <code>cmd_vel</code>.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">nav2_params.yaml</span><strong>DWB Controller Tuning</strong></div>
            <pre><code class="language-yaml">controller_server:
  ros__parameters:
    FollowPath:
      plugin: "dwb_core::DWBLocalPlanner"
      sim_time: 1.5
      vx_samples: 20
      vtheta_samples: 40
      critics: ["RotateToGoal", "Oscillation",
                "BaseObstacle", "GoalAlign", 
                "PathAlign", "PathDist", "GoalDist"]
      BaseObstacle.scale: 0.02
      PathAlign.scale: 32.0
      GoalAlign.scale: 24.0
      PathDist.scale: 32.0
      GoalDist.scale: 24.0</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 3. Key DWB Critics & Tuning Matrix
  slides.push({
    id: `${lesson.id}_sec4_dwb_critics`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Key DWB Critics & Tuning Matrix',
    badge: '🎯 Critic Scoring Matrix',
    title: '4. DWB Critic Scoring Matrix: Balancing Clearance, Speed & Goal Accuracy',
    htmlContent: `
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 22%;">Critic Name</th>
              <th style="width: 16%;">Scale Weight</th>
              <th style="width: 34%;">Pedagogical Function</th>
              <th style="width: 28%;">Tuning Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>BaseObstacle</code></td>
              <td><code>0.02</code></td>
              <td>Penalizes trajectories grazing close to costmap obstacles.</td>
              <td>Increase if robot clips corner racks during turns.</td>
            </tr>
            <tr>
              <td><code>PathAlign</code></td>
              <td><code>32.0</code></td>
              <td>Keeps robot heading aligned with global path direction.</td>
              <td>High weight ensures robot travels straight along aisles.</td>
            </tr>
            <tr>
              <td><code>GoalAlign</code></td>
              <td><code>24.0</code></td>
              <td>Orients robot heading directly towards goal destination.</td>
              <td>Prevents robot from drifting past the target waypoint.</td>
            </tr>
            <tr>
              <td><code>PathDist</code></td>
              <td><code>32.0</code></td>
              <td>Penalizes cross-track distance away from the global path.</td>
              <td>Keeps robot glued to the center of warehouse corridors.</td>
            </tr>
            <tr>
              <td><code>RotateToGoal</code></td>
              <td><code>32.0</code></td>
              <td>Enforces final in-place rotation when within xy tolerance.</td>
              <td>Crucial for docking into charging stations or pallet bays.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>⚖️ Tuning Golden Rule:</strong> Never change multiple critic weights simultaneously! Adjust one weight by a factor of 2x, test trajectory smoothness, and verify oscillation stability.
      </div>
    `
  });

  // 4. Regulated Pure Pursuit (RPP)
  slides.push({
    id: `${lesson.id}_sec5_rpp_controller`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Regulated Pure Pursuit (RPP) Controller',
    badge: '📐 Pure Pursuit',
    title: '5. Regulated Pure Pursuit (RPP): Deterministic Industrial Path Tracking',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Geometric Lookahead Arc</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">RPP projects an imaginary anchor point along the global path at a distance <code>L_lookahead</code> ahead of the robot. It calculates the exact geometric curvature arc required to drive towards that point.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📉</span><strong>Automatic Curvature Deceleration</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Slows down automatically when encountering sharp turns (proportional to path curvature radius), eliminating the risk of AMR rollover or wheel traction loss under payload.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏭</span><strong>Why Industry Prefers RPP Over DWB</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">DWB can exhibit erratic exploratory swerves in wide open corridors. RPP produces perfectly predictable, repeatable, train-track paths preferred in commercial logistics.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">nav2_params.yaml</span><strong>RPP Configuration Snippet</strong></div>
            <pre><code class="language-yaml">controller_server:
  ros__parameters:
    FollowPath:
      plugin: "nav2_regulated_pure_pursuit_controller::RegulatedPurePursuitController"
      desired_linear_vel: 0.5
      lookahead_dist: 0.6
      min_lookahead_dist: 0.3
      max_lookahead_dist: 0.9
      lookahead_time: 1.5
      use_velocity_scaled_lookahead_dist: true
      use_regulated_linear_velocity_scaling: true
      regulated_linear_scaling_min_radius: 0.9
      use_cost_regulated_linear_velocity_scaling: true</code></pre>
          </div>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 16:
 * Autonomous Navigation Scripting with Nav2 Simple Commander.
 */
function buildLesson16Slides(doc, lesson, slides) {
  // 1. Simple Commander Python API Architecture
  slides.push({
    id: `${lesson.id}_sec2_simple_commander_arch`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. The Simple Commander Python API Architecture',
    badge: '🐍 Python Automation',
    title: '2. Nav2 Simple Commander: High-Level Python API for Autonomous Missions',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧱</span><strong>Encapsulating Low-Level DDS Plumbing</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Writing raw ROS 2 action clients requires hundreds of lines of future callbacks, feedback handles, and cancel services. <code>BasicNavigator</code> wraps these into intuitive Python methods.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Automated Lifecycle Synchronization</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Calling <code>navigator.waitUntilNav2Active()</code> verifies that BT Navigator, Costmap 2D, and Controller servers have all transitioned to the <code>ACTIVE</code> state before dispatching goals.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏭</span><strong>Fleet &amp; Business Logic Bridge</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Allows roboticists to script high-level warehouse missions (pick &amp; place, multi-checkpoint patrols, charging dock runs) cleanly in pure Python.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Python Boilerplate Reduction</span><strong>Simple Commander Abstraction</strong></div>
            <pre><code class="language-python">from nav2_simple_commander.robot_navigator import BasicNavigator
import rclpy

rclpy.init()
navigator = BasicNavigator()

# Wait for Nav2 stack to be fully active
navigator.waitUntilNav2Active()

# Set initial pose & navigate in 2 lines!
navigator.setInitialPose(initial_pose)
navigator.goToPose(goal_pose)</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 2. Core BasicNavigator API Methods Reference
  slides.push({
    id: `${lesson.id}_sec3_basic_navigator_methods`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Core BasicNavigator Methods Reference',
    badge: '📚 API Reference',
    title: '3. Core BasicNavigator API Methods: Mission Control & Telemetry Matrix',
    htmlContent: `
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 26%;">Method Signature</th>
              <th style="width: 20%;">Return Type</th>
              <th style="width: 34%;">Operational Role</th>
              <th style="width: 20%;">Blocking Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>setInitialPose(pose)</code></td>
              <td><code>None</code></td>
              <td>Seeds AMCL localization with initial world coordinates.</td>
              <td>Synchronous</td>
            </tr>
            <tr>
              <td><code>goToPose(pose)</code></td>
              <td><code>None</code></td>
              <td>Dispatches a single waypoint navigation goal to Nav2.</td>
              <td>Asynchronous (Non-blocking)</td>
            </tr>
            <tr>
              <td><code>followWaypoints(poses)</code></td>
              <td><code>None</code></td>
              <td>Dispatches an ordered list of waypoints for sequential patrol.</td>
              <td>Asynchronous (Non-blocking)</td>
            </tr>
            <tr>
              <td><code>isTaskComplete()</code></td>
              <td><code>bool</code></td>
              <td>Queries whether the active mission has finished.</td>
              <td>Instantaneous</td>
            </tr>
            <tr>
              <td><code>getFeedback()</code></td>
              <td><code>NavigationFeedback</code></td>
              <td>Returns real-time <code>distance_remaining</code> and <code>navigation_time</code>.</td>
              <td>Instantaneous</td>
            </tr>
            <tr>
              <td><code>cancelTask()</code></td>
              <td><code>None</code></td>
              <td>Immediately preempts and safely aborts the active goal.</td>
              <td>Synchronous</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 Key Pattern:</strong> <code>goToPose</code> is non-blocking! You monitor progress inside a <code>while not navigator.isTaskComplete():</code> loop to stream telemetry and detect stalls.
      </div>
    `
  });

  // 3. Complete Autonomous Patrol Script Walkthrough
  slides.push({
    id: `${lesson.id}_sec4_patrol_script`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Complete Autonomous Patrol Script Walkthrough',
    badge: '💻 Production Script',
    title: '4. Autonomous Navigation Scripting: Goal Dispatch, Feedback & Watchdog Loop',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">autonomous_patrol.py</span><strong>Production Navigation Loop</strong></div>
            <pre><code class="language-python">goal_pose = PoseStamped()
goal_pose.header.frame_id = 'map'
goal_pose.header.stamp = navigator.get_clock().now().to_msg()
goal_pose.pose.position.x = 3.5
goal_pose.pose.position.y = 1.2
goal_pose.pose.orientation.w = 1.0

navigator.goToPose(goal_pose)

# Non-blocking feedback & timeout watchdog
while not navigator.isTaskComplete():
    feedback = navigator.getFeedback()
    if feedback:
        print(f"Dist remaining: {feedback.distance_remaining:.2f}m")
    time.sleep(0.5)

result = navigator.getResult()
if result == TaskResult.SUCCEEDED:
    print("Checkpoint reached successfully!")</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📍</span><strong>header.frame_id = 'map' Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Goals must always be expressed in the global <code>map</code> frame with updated timestamps from <code>navigator.get_clock().now().to_msg()</code>.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏱️</span><strong>Non-Blocking Feedback Streaming</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Access <code>feedback.distance_remaining</code>, <code>feedback.navigation_time</code>, and <code>feedback.number_of_recoveries</code> without blocking other robot threads.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>TaskResult Terminal States</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Handles all three terminal outcomes: <code>TaskResult.SUCCEEDED</code>, <code>TaskResult.CANCELED</code>, and <code>TaskResult.FAILED</code> cleanly.</p>
          </div>
        </div>
      </div>
    `
  });

  // 4. Multi-Checkpoint Waypoint Queuing & Production Recovery
  slides.push({
    id: `${lesson.id}_sec5_waypoints_patrol`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Multi-Checkpoint Waypoint Queuing',
    badge: '🏭 Industrial Fleet Automation',
    title: '5. Multi-Checkpoint Waypoint Queuing & Mission Recovery Watchdogs',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">followWaypoints</span><strong>Queued Patrol Checkpoints</strong></div>
            <pre><code class="language-python"># Define patrol route waypoints
checkpoints = [pose_dock, pose_aisle_3, pose_aisle_7, pose_dock]

# Dispatch full multi-stop mission
navigator.followWaypoints(checkpoints)

while not navigator.isTaskComplete():
    feedback = navigator.getFeedback()
    if feedback:
        print(f"Executing waypoint: {feedback.current_waypoint + 1}/{len(checkpoints)}")
    time.sleep(1.0)</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Automated Waypoint Transitions</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Nav2 switches to the next waypoint automatically upon reaching the current checkpoint tolerance, maintaining continuous patrol flow.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🐕</span><strong>Stall Watchdog Architecture</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Track distance remaining over time. If distance does not decrease over 30 seconds (due to persistent corridor blockages), invoke <code>navigator.cancelTask()</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏭</span><strong>WMS / Fleet Manager Integration</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Expose this script via REST API or MQTT to connect warehouse inventory management systems directly with autonomous AMR tasking.</p>
          </div>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 17:
 * Dynamic Parameters & YAML Configuration.
 */
function buildLesson17Slides(doc, lesson, slides) {
  // 1. ROS 1 vs ROS 2 Parameter Architecture
  slides.push({
    id: `${lesson.id}_sec2_param_arch`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. ROS 1 vs. ROS 2 Parameter Architecture',
    badge: '⚙️ Parameter Architecture',
    title: '2. Parameter Architecture: Centralized ROS 1 vs. Distributed Typed ROS 2',
    htmlContent: `
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 22%;">Architectural Metric</th>
              <th style="width: 39%;">ROS 1 Parameter Server</th>
              <th style="width: 39%;">ROS 2 Distributed Parameters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Storage Topology</strong></td>
              <td>Centralized key-value dictionary residing inside <code>roscore</code>.</td>
              <td>Fully distributed; owned directly by each individual node over DDS.</td>
            </tr>
            <tr>
              <td><strong>Type Safety</strong></td>
              <td>Weakly typed; dynamic XML-RPC type coercion without compile-time safety.</td>
              <td>Strongly typed (Integer, Double, String, Boolean, Byte Arrays).</td>
            </tr>
            <tr>
              <td><strong>Fault Tolerance</strong></td>
              <td>Single point of failure: if <code>roscore</code> crashes, all parameters vanish.</td>
              <td>Zero single point of failure; node failure affects only its own parameters.</td>
            </tr>
            <tr>
              <td><strong>Runtime Validation</strong></td>
              <td>No native constraints; nodes must manually sanitize incoming values.</td>
              <td>Built-in <code>ParameterDescriptor</code> range constraints &amp; atomic callbacks.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 Key Concept:</strong> In ROS 2, parameters are first-class citizen services and events hosted directly by each node\'s executor.
      </div>
    `
  });

  // 2. Building a Parameterized Node (Python)
  slides.push({
    id: `${lesson.id}_sec3_declaring_params`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Building a Parameterized Node (Python)',
    badge: '🐍 Python Parameters',
    title: '3. Declaring & Reading Parameters in Python: The Mandatory Declaration Rule',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">amr_speed_controller.py</span><strong>Declaration &amp; Access</strong></div>
            <pre><code class="language-python">class SpeedController(Node):
    def __init__(self):
        super().__init__('speed_controller')

        # 1. Declare parameters with default fallback values
        self.declare_parameter('max_linear_speed', 1.5)
        self.declare_parameter('enable_safety_reverse', True)

        # 2. Access parameter values directly
        self.max_speed = self.get_parameter('max_linear_speed').value
        self.safety_rev = self.get_parameter('enable_safety_reverse').value

        self.get_logger().info(f"Initialized with max speed: {self.max_speed} m/s")</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔒</span><strong>The Mandatory Declaration Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">In ROS 2, a node cannot access or be assigned a parameter from CLI or YAML unless it is explicitly declared with <code>self.declare_parameter()</code>.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Automatic Type Inference</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The type of the default value (e.g. <code>1.5</code> double, <code>True</code> bool) automatically locks the parameter type. Attempting to pass a string causes type rejection.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>Safe Fallback Defaults</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Always supply sensible, safe production defaults so the robot operates safely even if launch arguments or configuration YAML files are omitted.</p>
          </div>
        </div>
      </div>
    `
  });

  // 3. Parameter Descriptors & Dynamic Validation
  slides.push({
    id: `${lesson.id}_sec4_param_descriptors`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Parameter Descriptors & Dynamic Validation',
    badge: '🛡️ Safety Validation',
    title: '4. Parameter Descriptors & Dynamic Validation Callbacks for Hardware Safety',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">Validation Callback</span><strong>Enforcing Physical Constraints</strong></div>
            <pre><code class="language-python"># Register dynamic change callback
self.add_on_set_parameters_callback(self.validate_parameters)

def validate_parameters(self, params):
    result = SetParametersResult(successful=True)
    for p in params:
        if p.name == 'max_linear_speed':
            if p.value &lt; 0.0 or p.value &gt; 2.2:
                result.successful = False
                result.reason = "Speed must be between 0.0 and 2.2 m/s"
            else:
                self.max_speed = p.value
    return result</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛑</span><strong>Atomic Rejection of Unsafe Values</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">If an operator attempts to set <code>max_linear_speed</code> to <code>10.0 m/s</code>, the callback returns <code>successful=False</code>, rejecting the change before hardware damage occurs.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📋</span><strong>ParameterDescriptor Metadata</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Attach <code>FloatingPointRange(from_value=0.0, to_value=2.2, step=0.1)</code> and description text so GUI tools display formatted sliders and tooltips.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Real-Time Parameter Updates</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Updating <code>self.max_speed</code> inside the callback applies the new tuning immediately in real time without restarting the node.</p>
          </div>
        </div>
      </div>
    `
  });

  // 4. Organizing Configuration with YAML Files
  slides.push({
    id: `${lesson.id}_sec5_yaml_config`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Organizing Configuration with YAML Files',
    badge: '📄 Production YAML',
    title: '5. Production YAML Configuration: The ros__parameters Nesting Rule',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">amr_params.yaml</span><strong>Production YAML Hierarchy</strong></div>
            <pre><code class="language-yaml">/speed_controller:
  ros__parameters:
    max_linear_speed: 1.8
    enable_safety_reverse: true
    wheel_radius: 0.08
    pid_gains:
      kp: 2.5
      ki: 0.1
      kd: 0.05</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">CLI &amp; Launch Ingestion</span><strong>Loading Parameters</strong></div>
            <pre><code class="language-bash"># Run node directly with YAML file:
ros2 run nexus_amr_control speed_controller \
  --ros-args --params-file config/amr_params.yaml</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚠️</span><strong>The ros__parameters Indentation Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Every parameter in ROS 2 MUST be nested under its target node name, followed by the exact key <code>ros__parameters:</code> (with double underscores). Omission causes silent parsing failure.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📦</span><strong>Nested Sub-Namespaces</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Organize related parameters cleanly into dot-separated namespaces (e.g. <code>pid_gains.kp</code>), improving readability for complex robot tuning.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>Launch File Integration</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Pass YAML configuration paths cleanly in launch files: <code>Node(..., parameters=[config_yaml_path])</code>.</p>
          </div>
        </div>
      </div>
    `
  });

  // 5. Parameter Inspection with CLI & rqt_reconfigure
  slides.push({
    id: `${lesson.id}_sec6_cli_params`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. Parameter Inspection with CLI & rqt_reconfigure',
    badge: '🔍 Parameter Diagnostics',
    title: '6. Parameter CLI Commands & Real-Time Tuning with rqt_reconfigure',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">ros2 param Verbs</span><strong>Essential CLI Commands</strong></div>
            <pre><code class="language-bash"># 1. List all parameters declared on a node
ros2 param list /speed_controller

# 2. Query current value & type of a parameter
ros2 param get /speed_controller max_linear_speed

# 3. Modify parameter dynamically at runtime
ros2 param set /speed_controller max_linear_speed 1.2

# 4. Dump all active parameters to YAML file
ros2 param dump /speed_controller &gt; tuned_params.yaml</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎛️</span><strong>rqt_reconfigure Interactive Tuning</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Run <code>ros2 run rqt_reconfigure rqt_reconfigure</code> to open a real-time GUI with sliders for every parameter declared with numerical descriptors.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>💾</span><strong>Snapshot Tuning to Disk</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">After tuning PID gains or speed limits in the warehouse, run <code>ros2 param dump</code> to persist the optimized parameters directly into production YAML.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔍</span><strong>Zero Recompile Iteration</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Change operational behaviors instantly across live robots without touching source code or re-running <code>colcon build</code>.</p>
          </div>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 18:
 * VS Code IDE Tooling & ROS 2 Logging Framework.
 */
function buildLesson18Slides(doc, lesson, slides) {
  // 1. VS Code IDE Configuration for ROS 2 Python
  slides.push({
    id: `${lesson.id}_sec2_vscode_ide`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. VS Code IDE Configuration for ROS 2 Python',
    badge: '💻 IDE Configuration',
    title: '2. Professional VS Code IDE Tooling: Autocompletion & Path Resolution',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">.vscode/settings.json</span><strong>Python Path Configuration</strong></div>
            <pre><code class="language-json">{
  "python.autoComplete.extraPaths": [
    "/opt/ros/humble/lib/python3.10/site-packages",
    "&#36;{workspaceFolder}/install/nexus_amr_control/lib/python3.10/site-packages"
  ],
  "python.analysis.extraPaths": [
    "/opt/ros/humble/lib/python3.10/site-packages",
    "&#36;{workspaceFolder}/install/nexus_amr_control/lib/python3.10/site-packages"
  ],
  "terminal.integrated.env.linux": {
    "PYTHONPATH": "/opt/ros/humble/lib/python3.10/site-packages:&#36;{workspaceFolder}/install/nexus_amr_control/lib/python3.10/site-packages"
  }
}</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🐛</span><strong>Eliminating "Import rclpy Could Not Be Resolved"</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Pylance looks only in standard virtualenvs by default. Adding ROS 2 underlay site-packages to <code>extraPaths</code> resolves all red squiggly lines instantly.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>✨</span><strong>Full IntelliSense &amp; Type Hovering</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Gain instant parameter tooltips, docstring inspection, and method autocompletion for <code>Node</code>, <code>Publisher</code>, and message dataclasses.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔨</span><strong>Integrated Colcon Tasks</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Bind <code>tasks.json</code> to trigger <code>colcon build --symlink-install</code> with a single <code>Ctrl+Shift+B</code> shortcut directly within VS Code.</p>
          </div>
        </div>
      </div>
    `
  });

  // 2. The Five Logging Severity Levels
  slides.push({
    id: `${lesson.id}_sec3_log_levels`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. The Five Logging Severity Levels',
    badge: '🚦 Severity Hierarchy',
    title: '3. The ROS 2 Logging Framework: The 5-Tier Severity Hierarchy',
    htmlContent: `
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 14%;">Level</th>
              <th style="width: 12%;">Color</th>
              <th style="width: 38%;">Architectural Intent</th>
              <th style="width: 36%;">AMR Production Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>DEBUG</code></td>
              <td>Cyan</td>
              <td>High-frequency diagnostic traces; silenced in production.</td>
              <td>Raw encoder ticks, math intermediate vectors.</td>
            </tr>
            <tr>
              <td><code>INFO</code></td>
              <td>White</td>
              <td>Normal operational milestones; standard production default.</td>
              <td>Node started, mission waypoint reached, client connected.</td>
            </tr>
            <tr>
              <td><code>WARN</code></td>
              <td>Yellow</td>
              <td>Unexpected but recoverable event; degraded performance.</td>
              <td>LiDAR packet drop, battery &lt; 20%, retry attempt.</td>
            </tr>
            <tr>
              <td><code>ERROR</code></td>
              <td>Red</td>
              <td>Component failed; functionality lost, but node survives.</td>
              <td>Sensor disconnected, goal rejected, plan aborted.</td>
            </tr>
            <tr>
              <td><code>FATAL</code></td>
              <td>Magenta</td>
              <td>Critical unrecoverable failure; immediate shutdown required.</td>
              <td>Emergency stop triggered, motor over-current thermal trip.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 Production Standard:</strong> Default threshold is <code>INFO</code>. Messages below the active threshold are dropped with zero CPU string formatting penalty.
      </div>
    `
  });

  // 3. Throttled & One-Shot Logging
  slides.push({
    id: `${lesson.id}_sec4_throttled_logging`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Throttled & One-Shot Logging',
    badge: '⏱️ Rate-Limited Logs',
    title: '4. Clean Production Logs: Throttled, One-Shot & Skip-First Patterns',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">telemetry_logger.py</span><strong>Rate-Limited Logging</strong></div>
            <pre><code class="language-python"># 1. Standard log (Dangerous in 50Hz control loop!)
# self.get_logger().info("Control loop tick") # FLOODS TERMINAL!

# 2. Throttled: Log at most once every 2.0 seconds
self.get_logger().info(
    f"Battery: {self.battery_pct}%", 
    throttle_duration_sec=2.0
)

# 3. Once: Log exactly one time across node lifespan
self.get_logger().info(
    "Motor drivers calibrated", 
    once=True
)

# 4. Skip-First: Log after warm-up stabilization
self.get_logger().warn(
    "Sensor latency high", 
    skip_first=True
)</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚫</span><strong>Preventing Terminal Flooding</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Calling <code>info()</code> unthrottled in a 50Hz motor loop generates 3,000 log lines per minute, exhausting terminal buffers and inflating log files to gigabytes.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏱️</span><strong>throttle_duration_sec=2.0</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Provides steady operational telemetry at human-readable rates while the underlying high-frequency feedback loop runs uninterrupted.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📢</span><strong>once=True for Boot Announcements</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Ideal for hardware handshake confirmation, firmware version prints, and static configuration summaries on startup.</p>
          </div>
        </div>
      </div>
    `
  });

  // 4. Runtime Log Level Configuration
  slides.push({
    id: `${lesson.id}_sec5_runtime_log_config`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Runtime Log Level Configuration',
    badge: '🎛️ Dynamic Log Control',
    title: '5. Dynamic Log Level Configuration: CLI Overrides & Live Service Reconfiguration',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Dynamic Logging CLI</span><strong>Launch &amp; Live Service Commands</strong></div>
            <pre><code class="language-bash"># 1. Override log level at launch time for all nodes:
ros2 run nexus_amr_control speed_controller \
  --ros-args --log-level DEBUG

# 2. Target a specific node's logger:
ros2 run nexus_amr_control speed_controller \
  --ros-args --log-level speed_controller:=DEBUG

# 3. Change log level dynamically on running robot via service:
ros2 service call /speed_controller/set_logger_levels \
  rcl_interfaces/srv/SetLoggerLevels \
  "{levels: [{name: 'speed_controller', level_name: 'DEBUG'}]}"</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>Targeted Launch Diagnostics</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Pass <code>--log-level DEBUG</code> during integration testing to expose raw calculations without altering your production code.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔌</span><strong>Live Service Introspection</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Elevate log severity from <code>INFO</code> to <code>DEBUG</code> on a physical robot deployed in a factory aisle without stopping its navigation mission.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📁</span><strong>Persistent Disk Logging (~/.ros/log/)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">All logs are automatically timestamped and mirrored to disk in <code>~/.ros/log/</code> for post-mortem flight recorder analysis.</p>
          </div>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 19:
 * ROS 2 Interfaces & Custom Messages, Services & Actions.
 */
function buildLesson19Slides(doc, lesson, slides) {
  // 1. Standard Interface Libraries vs Custom Interfaces
  slides.push({
    id: `${lesson.id}_sec2_standard_vs_custom`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Standard ROS 2 Interface Libraries',
    badge: '📦 Interface Ecosystem',
    title: '2. Standard ROS 2 Interfaces vs. Custom Definitions: The Ecosystem Rule',
    htmlContent: `
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 22%;">Package Name</th>
              <th style="width: 28%;">Standard Types</th>
              <th style="width: 50%;">Production Robotics Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>std_msgs</code></td>
              <td><code>String</code>, <code>Float32</code>, <code>Bool</code>, <code>Header</code></td>
              <td>Primitive datatypes and timestamped metadata structures.</td>
            </tr>
            <tr>
              <td><code>geometry_msgs</code></td>
              <td><code>Twist</code>, <code>PoseStamped</code>, <code>TransformStamped</code></td>
              <td>Spatial kinematics, Cartesian velocities, coordinate transforms.</td>
            </tr>
            <tr>
              <td><code>sensor_msgs</code></td>
              <td><code>LaserScan</code>, <code>Image</code>, <code>Imu</code>, <code>PointCloud2</code></td>
              <td>High-throughput raw perception data from physical sensors.</td>
            </tr>
            <tr>
              <td><code>nav_msgs</code></td>
              <td><code>Odometry</code>, <code>Path</code>, <code>OccupancyGrid</code></td>
              <td>Navigation trajectories, dead-reckoning, and SLAM map grids.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 The Reusability Principle:</strong> ALWAYS prefer standard interfaces when possible! Creating custom messages unnecessarily breaks interoperability with RViz2, Nav2, and community tools.
      </div>
    `
  });

  // 2. The Custom Interface Architecture Rule
  slides.push({
    id: `${lesson.id}_sec3_standalone_pkg_rule`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. The Custom Interface Architecture Rule',
    badge: '🏛️ Architecture Rule',
    title: '3. The Golden Architectural Rule: Dedicated Standalone Interface Packages',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚫</span><strong>The Python Package Limitation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">In ROS 2, custom interface generators (<code>rosidl_default_generators</code>) rely on CMake build tooling. Pure Python packages (<code>ament_python</code>) CANNOT generate custom message bindings.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📦</span><strong>The Dedicated CMake Package Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Always create a standalone CMake package named <code>&lt;robot&gt;_interfaces</code> (e.g. <code>nexus_amr_interfaces</code>) containing solely <code>msg/</code>, <code>srv/</code>, and <code>action/</code> IDL files.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Circular Dependency Immunity</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Separating interfaces decouples perception, control, and fleet nodes, allowing any Python or C++ node to import messages without circular dependency locks.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Filesystem Layout</span><strong>nexus_amr_interfaces /</strong></div>
            <pre><code class="language-plaintext">nexus_amr_interfaces/
├── CMakeLists.txt        # Calls rosidl_generate_interfaces
├── package.xml           # Declares buildtool_depend rosidl
├── msg/
│   └── UltrasonicRange.msg
├── srv/
│   └── ResetOdometry.srv
└── action/
    └── DockRobot.action</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 3. IDL Anatomy: .msg, .srv & .action Syntax
  slides.push({
    id: `${lesson.id}_sec4_idl_anatomy`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. IDL Anatomy: .msg, .srv & .action Syntax',
    badge: '📐 IDL Grammar',
    title: '4. Interface Definition Language (IDL): Anatomy of .msg, .srv & .action Files',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">UltrasonicRange.msg</span><strong>Topic Message</strong></div>
            <pre><code class="language-protobuf">std_msgs/Header header
float32 distance        # Measured range in meters
float32 min_range       # Hardware minimum
float32 max_range       # Hardware maximum
bool obstacle_detected  # Binary threshold alert</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">ResetOdometry.srv</span><strong>Service Contract</strong></div>
            <pre><code class="language-protobuf"># Request (Single dash separator: ---)
float64 x
float64 y
float64 theta
---
# Response
bool success
string message</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">DockRobot.action</span><strong>Action Contract</strong></div>
            <pre><code class="language-protobuf"># 1. Goal (First ---)
string docking_station_id
---
# 2. Result (Second ---)
bool docked
duration time_elapsed
---
# 3. Feedback
float32 distance_to_dock
float32 alignment_error</code></pre>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>The Separator Syntax Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Messages have no dividers. Services require <strong>one <code>---</code> line</strong>. Actions require <strong>two <code>---</code> lines</strong>. Extra spaces or characters on divider lines cause compiler errors.</p>
          </div>
        </div>
      </div>
    `
  });

  // 4. CMakeLists.txt & package.xml Build Wiring
  slides.push({
    id: `${lesson.id}_sec5_build_wiring`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Configuring package.xml & CMakeLists.txt',
    badge: '⚙️ Build Wiring',
    title: '5. Build Configuration: Generator Wiring in CMakeLists.txt & package.xml',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">CMakeLists.txt</span><strong>rosidl Interface Generation</strong></div>
            <pre><code class="language-cmake">cmake_minimum_required(VERSION 3.8)
project(nexus_amr_interfaces)

find_package(ament_cmake REQUIRED)
find_package(rosidl_default_generators REQUIRED)
find_package(std_msgs REQUIRED)
find_package(builtin_interfaces REQUIRED)

rosidl_generate_interfaces(&#36;{PROJECT_NAME}
  "msg/UltrasonicRange.msg"
  "srv/ResetOdometry.srv"
  "action/DockRobot.action"
  DEPENDENCIES std_msgs builtin_interfaces
)

ament_package()</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔨</span><strong>The Generator / Runtime Dependency Pair</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">In <code>package.xml</code>, declare <code>&lt;buildtool_depend&gt;rosidl_default_generators&lt;/buildtool_depend&gt;</code> for build-time generation and <code>&lt;exec_depend&gt;rosidl_default_runtime&lt;/exec_depend&gt;</code> for runtime execution.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📦</span><strong>Nested DEPENDENCIES Tag</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">If your custom messages use <code>std_msgs/Header</code> or <code>builtin_interfaces/Time</code>, list them explicitly under <code>DEPENDENCIES</code> in <code>rosidl_generate_interfaces</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>Selective Build Command</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Compile standalone: <code>colcon build --packages-select nexus_amr_interfaces</code> followed by <code>source install/setup.bash</code>.</p>
          </div>
        </div>
      </div>
    `
  });

  // 5. CLI Introspection & Python Node Ingestion
  slides.push({
    id: `${lesson.id}_sec6_cli_python_usage`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. CLI Verification & Python Node Ingestion',
    badge: '💻 Python Ingestion',
    title: '6. CLI Verification & Ingesting Custom Interfaces in Python Nodes',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">CLI Verification</span><strong>Inspecting Compiled Schemas</strong></div>
            <pre><code class="language-bash"># Verify interface is registered & inspect definition:
ros2 interface show nexus_amr_interfaces/msg/UltrasonicRange</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">range_sensor_node.py</span><strong>Python Import &amp; Population</strong></div>
            <pre><code class="language-python">from nexus_amr_interfaces.msg import UltrasonicRange

msg = UltrasonicRange()
msg.header.stamp = self.get_clock().now().to_msg()
msg.header.frame_id = 'sonar_front_link'
msg.distance = 0.42
msg.obstacle_detected = True

self.publisher_.publish(msg)</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔍</span><strong>ros2 interface show Validation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Outputs the full compiled field hierarchy and comments. If this command prints the schema, the interface is correctly registered across the ROS 2 middleware.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🐍</span><strong>Strong Python Field Typing</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Attempting to assign a string to <code>msg.distance</code> raises an immediate <code>TypeError</code> or <code>AssertionError</code> at runtime, protecting the robot from type corruption.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏭</span><strong>Fleet Interoperability</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Distribute the compiled <code>nexus_amr_interfaces</code> debian package across fleet AMRs, edge servers, and cloud telemetry backends.</p>
          </div>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 20:
 * Data Recording & Playback with ROS 2 Bags.
 */
function buildLesson20Slides(doc, lesson, slides) {
  // 1. Storage Plugins: SQLite3 vs MCAP
  slides.push({
    id: `${lesson.id}_sec2_sqlite_vs_mcap`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Storage Plugins: SQLite3 vs. MCAP',
    badge: '💾 Storage Engine',
    title: '2. ROS 2 Bag Storage Formats: Legacy SQLite3 vs. Modern MCAP',
    htmlContent: `
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 20%;">Architectural Metric</th>
              <th style="width: 40%;">SQLite3 (Default Legacy Plugin)</th>
              <th style="width: 40%;">MCAP (Modern Industrial Standard)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Write Throughput</strong></td>
              <td>Relational SQL engine; suffers write locks during high-rate camera/LiDAR streams.</td>
              <td>Append-only binary chunk streaming; zero write locks; 10x higher throughput.</td>
            </tr>
            <tr>
              <td><strong>Schema Portability</strong></td>
              <td>Requires original ROS 2 workspace message definitions installed to deserialize.</td>
              <td><strong>Self-describing</strong>: Embeds message IDL schemas directly inside file header.</td>
            </tr>
            <tr>
              <td><strong>Tooling Ecosystem</strong></td>
              <td>CLI playback and generic SQLite browsers.</td>
              <td>Native direct streaming in Foxglove Studio, PlotJuggler, and web browsers.</td>
            </tr>
            <tr>
              <td><strong>Crash Recovery</strong></td>
              <td>Unclosed SQLite transactions can corrupt index on unexpected power loss.</td>
              <td>Append-only chunk headers ensure data up to the last millisecond is recoverable.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 Industrial Standard:</strong> Always record with <code>--storage mcap</code> for field testing. Your telemetry can be inspected on any laptop without compiling custom robot interface packages.
      </div>
    `
  });

  // 2. Production CLI Recording Strategies
  slides.push({
    id: `${lesson.id}_sec3_recording_cli`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Step-by-Step: Recording Data via CLI',
    badge: '📹 CLI Recording',
    title: '3. Production CLI Recording Strategies: Selective Topics & Compression',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">ros2 bag record</span><strong>Essential Recording Recipes</strong></div>
            <pre><code class="language-bash"># 1. Selective Topic Recording (Recommended):
ros2 bag record -s mcap -o amr_patrol_01 \
  /cmd_vel /odom /scan /tf /tf_static

# 2. Regex Wildcard Topic Recording:
ros2 bag record -s mcap -e "/amr/.*"

# 3. Production Zstandard Compression:
ros2 bag record -s mcap -o mission_compressed \
  --compression-mode file \
  --compression-format zstd \
  /scan /camera/image_raw</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>The Golden Selective Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Never run <code>ros2 bag record -a</code> (record all) blindly on a production robot! Unthrottled raw camera images (60 MB/s) will exhaust SSD storage within minutes.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🗜️</span><strong>Zstandard (zstd) Compression</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Enabling <code>zstd</code> compression shrinks 2D laser scans and pointclouds by up to 70% with negligible CPU overhead on modern AMR embedded processors.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏷️</span><strong>Explicit Directory Naming (-o)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Always supply <code>-o &lt;name&gt;</code> with mission timestamps (e.g. <code>amr_patrol_2026_11_12</code>) to prevent cryptic auto-generated timestamp folder names.</p>
          </div>
        </div>
      </div>
    `
  });

  // 3. Metadata Inspection & Playback Simulation
  slides.push({
    id: `${lesson.id}_sec4_playback_simulation`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Inspecting Bag Metadata & Offline Simulation Playback',
    badge: '▶️ Simulation Playback',
    title: '4. Offline Simulation Playback: The Authoritative --clock Time Rule',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">Metadata Inspection</span><strong>ros2 bag info</strong></div>
            <pre><code class="language-bash">ros2 bag info amr_patrol_01/
# Reports: Duration, Storage format (mcap), 
# Message count, and exact Topic schemas.</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">ros2 bag play</span><strong>Offline Simulation</strong></div>
            <pre><code class="language-bash"># Playback driving simulated time:
ros2 bag play --clock 10 -r 1.0 amr_patrol_01/

# Fast-forward 2x speed:
ros2 bag play -r 2.0 amr_patrol_01/

# Remap topic for algorithm comparison:
ros2 bag play amr_patrol_01/ --remap /scan:=/recorded_scan</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏱️</span><strong>The --clock 10 Parameter Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Publishes historical timestamps to <code>/clock</code> at 10 Hz. Launch SLAM or RViz2 with <code>use_sim_time:=True</code> to reconstruct missions seamlessly as if running live.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏩</span><strong>Rate Scaling (-r) &amp; Looping (-l)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Accelerate testing at <code>-r 2.0</code> (double speed) or slow down to <code>-r 0.25</code> to inspect high-speed collision close calls frame-by-frame.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔀</span><strong>Dynamic Topic Remapping</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Remap <code>/scan:=/recorded_scan</code> to feed historical sensor data into a newly tuned SLAM Toolbox node without topic collision.</p>
          </div>
        </div>
      </div>
    `
  });

  // 4. Programmatic Bag Analysis with rosbag2_py
  slides.push({
    id: `${lesson.id}_sec5_rosbag2_py`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Offline Python Analysis using rosbag2_py',
    badge: '🐍 Python Analytics',
    title: '5. Programmatic Bag Analysis: Automated CI/CD Regression & Telemetry Extraction',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">analyze_bag.py</span><strong>SequentialReader API</strong></div>
            <pre><code class="language-python">import rosbag2_py
from rclpy.serialization import deserialize_message
from sensor_msgs.msg import LaserScan

reader = rosbag2_py.SequentialReader()
storage_options = rosbag2_py.StorageOptions(
    uri='amr_patrol_01', storage_id='mcap'
)
converter_options = rosbag2_py.ConverterOptions(
    input_serialization_format='cdr',
    output_serialization_format='cdr'
)
reader.open(storage_options, converter_options)

while reader.has_next():
    (topic, data, stamp) = reader.read_next()
    if topic == '/scan':
        scan = deserialize_message(data, LaserScan)
        # Audit minimum obstacle clearance
        min_dist = min(scan.ranges)</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📊</span><strong>Automated CI/CD Regression Testing</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Run automated Python test suites that ingest field bags, verify that minimum obstacle clearance never fell below 0.20m, and fail builds on safety violations.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📈</span><strong>Pandas &amp; NumPy Pipeline</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Extract odometry and battery telemetry directly into Pandas DataFrames for fleet MTBF (Mean Time Between Failures) analytics.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚡</span><strong>Zero ROS 2 Daemon Overhead</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Processes gigabytes of recorded robotics telemetry in seconds without launching ROS 2 middleware daemons or DDS network discovery.</p>
          </div>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 21:
 * Complete ROS 2 Command-Line Interface (CLI) Masterclass.
 */
function buildLesson21Slides(doc, lesson, slides) {
  // 1. Master CLI Reference Matrix
  slides.push({
    id: `${lesson.id}_sec2_master_cli_matrix`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Master CLI Reference Matrix',
    badge: '⌨️ Master CLI Matrix',
    title: '2. The ROS 2 CLI Architectural Framework: Unified Verb-Noun Grammar',
    htmlContent: `
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 18%;">Verb Group</th>
              <th style="width: 38%;">Primary Introspection Commands</th>
              <th style="width: 44%;">Operational Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>ros2 node</code></td>
              <td><code>list</code>, <code>info &lt;node&gt;</code></td>
              <td>Inspect active computation graph, publishers, subscribers, services.</td>
            </tr>
            <tr>
              <td><code>ros2 topic</code></td>
              <td><code>list</code>, <code>echo</code>, <code>hz</code>, <code>bw</code>, <code>info -v</code></td>
              <td>Monitor telemetry streams, data bandwidth, publication frequency, QoS.</td>
            </tr>
            <tr>
              <td><code>ros2 service</code></td>
              <td><code>list</code>, <code>type</code>, <code>call &lt;srv&gt; &lt;type&gt; &lt;data&gt;</code></td>
              <td>Execute synchronous RPC requests and test server transactions.</td>
            </tr>
            <tr>
              <td><code>ros2 action</code></td>
              <td><code>list</code>, <code>send_goal &lt;act&gt; &lt;type&gt; --feedback</code></td>
              <td>Dispatch long-duration navigation goals and monitor progress.</td>
            </tr>
            <tr>
              <td><code>ros2 param</code></td>
              <td><code>list</code>, <code>get</code>, <code>set</code>, <code>dump</code></td>
              <td>Tune PID gains, velocity limits, and node configurations in real time.</td>
            </tr>
            <tr>
              <td><code>ros2 doctor</code></td>
              <td><code>--report</code>, <code>multicast receive / send</code></td>
              <td>Audit DDS participant discovery, network interfaces, platform health.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 Grammar Uniformity:</strong> ROS 2 adheres to strict <code>ros2 &lt;verb&gt; &lt;noun&gt; [arguments]</code> syntax across all sub-systems, making terminal navigation intuitive and scriptable.
      </div>
    `
  });

  // 2. Deep Graph Introspection: Nodes, Topics & QoS Profiles
  slides.push({
    id: `${lesson.id}_sec3_deep_introspection`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Deep Graph Introspection: Nodes, Topics & QoS',
    badge: '🔍 Graph Introspection',
    title: '3. Deep Graph Introspection: Uncovering Hidden DDS Graph Topologies & QoS',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Introspection Verbs</span><strong>Deep Node &amp; Topic Analysis</strong></div>
            <pre><code class="language-bash"># 1. Uncover all publishers, subscribers, &amp; services of a node:
ros2 node info /amr_controller

# 2. Inspect verbose topic metadata &amp; QoS profiles:
ros2 topic info /scan --verbose

# 3. Measure publication frequency with microsecond precision:
ros2 topic hz /scan

# 4. Measure network bandwidth consumption:
ros2 topic bw /camera/image_raw</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔎</span><strong>ros2 node info: The X-Ray Diagnostic</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Shows every communication port hosted by the node. Instantly reveals if a subscriber topic name was misspelled or remapped incorrectly.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>QoS Compatibility Detective (topic info -v)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Identifies fatal DDS mismatches (e.g. Reliable subscriber listening to Best Effort publisher), which silently prevents messages from being delivered.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📊</span><strong>Bandwidth Auditing (topic bw)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Detects Wi-Fi congestion caused by uncompressed camera images before deploying multi-robot fleets on shared wireless access points.</p>
          </div>
        </div>
      </div>
    `
  });

  // 3. Transactional Verbs: Services, Actions & Parameter Tuning
  slides.push({
    id: `${lesson.id}_sec4_transactional_verbs`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Transactional Verbs: Services, Actions & Parameters',
    badge: '⚡ Transactional CLI',
    title: '4. Transactional Verbs: Direct RPC Service Calls & Live Action Dispatch',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">Service Call</span><strong>Testing RPC Directly</strong></div>
            <pre><code class="language-bash"># Call service with inline YAML dictionary payload:
ros2 service call /reset_odom \
  nexus_amr_interfaces/srv/ResetOdometry \
  "{x: 0.0, y: 0.0, theta: 0.0}"</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Action Dispatch</span><strong>Streaming Live Feedback</strong></div>
            <pre><code class="language-bash"># Send action goal with live feedback enabled:
ros2 action send_goal /dock_robot \
  nexus_amr_interfaces/action/DockRobot \
  "{docking_station_id: 'bay_04'}" \
  --feedback</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧪</span><strong>Headless Unit Testing Without GUIs</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Verify service server logic and response schemas directly in terminal before building complex client GUI widgets or web frontends.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📡</span><strong>The --feedback Action Flag</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Streams ongoing intermediate feedback ticks (distance remaining, alignment angle) in real time until the terminal goal result returns.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🤖</span><strong>Automated Test Scripting</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Integrate CLI service calls into bash validation scripts to test physical hardware bringup in manufacturing assembly lines.</p>
          </div>
        </div>
      </div>
    `
  });

  // 4. Advanced Network Diagnostics & ROS 2 Doctor
  slides.push({
    id: `${lesson.id}_sec5_doctor_diagnostics`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Advanced Network Diagnostics & ROS 2 Doctor',
    badge: '🩺 Network Diagnostics',
    title: '5. Fleet Diagnostics: ROS 2 Doctor & DDS Multicast Health Audits',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Diagnostic Commands</span><strong>Network &amp; Health Auditing</strong></div>
            <pre><code class="language-bash"># 1. Complete automated environment &amp; network health audit:
ros2 doctor --report

# 2. Test DDS multicast reception on Robot A:
ros2 multicast receive

# 3. Transmit test multicast ping from Developer PC:
ros2 multicast send

# 4. Enforce strict fleet domain isolation:
export ROS_DOMAIN_ID=42</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🩺</span><strong>ros2 doctor --report Automated Health Check</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Scans your Linux kernel, network MTUs, environment variables, and package versions. Pinpoints configuration conflicts instantly.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🌐</span><strong>DDS Multicast Discovery Verification</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Industrial switches frequently block UDP multicast. <code>ros2 multicast receive/send</code> validates whether discovery packets can pass through the facility network.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔒</span><strong>ROS_DOMAIN_ID Fleet Isolation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Assign distinct domain IDs (0&ndash;101) to each physical AMR on a shared warehouse Wi-Fi network to eliminate topic crosstalk and command collision.</p>
          </div>
        </div>
      </div>
    `
  });
}

/**
 * Dedicated High-Yield Pedagogical Deck Builder for Lesson 22:
 * Behavior Trees, Recovery Behaviors & Lifecycle Management.
 */
function buildLesson22Slides(doc, lesson, slides) {
  // 1. Why Behavior Trees Over State Machines?
  slides.push({
    id: `${lesson.id}_sec2_why_behavior_trees`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Why Behavior Trees Over State Machines?',
    badge: '🌳 Behavior Trees',
    title: '2. Why Behavior Trees? Overcoming Finite State Machine (FSM) Complexity',
    htmlContent: `
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 20%;">Dimension</th>
              <th style="width: 40%;">Finite State Machines (FSMs)</th>
              <th style="width: 40%;">Behavior Trees (BTs)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Scalability &amp; Transitions</strong></td>
              <td>State explosion ($O(N^2)$ transitions). Adding 1 state requires updating every existing transition.</td>
              <td>Modular tree hierarchy ($O(N)$). Nodes can be added, pruned, or reordered independently.</td>
            </tr>
            <tr>
              <td><strong>Reactive Preemption</strong></td>
              <td>Rigid polling states; interrupting an action requires complex conditional escape transitions.</td>
              <td>Ticked at high frequency (10Hz). Parent Fallback nodes can preempt children immediately.</td>
            </tr>
            <tr>
              <td><strong>Node Return Contract</strong></td>
              <td>Arbitrary internal state identifiers and variable transitions.</td>
              <td>Every node returns strictly: <code>SUCCESS</code>, <code>FAILURE</code>, or <code>RUNNING</code>.</td>
            </tr>
            <tr>
              <td><strong>Visual Reusability</strong></td>
              <td>Monolithic code structures; difficult to reuse state fragments across robots.</td>
              <td>Modular XML sub-trees reusable across arm manipulators, drones, and AMRs.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 Key BT Paradigm:</strong> <code>Sequence</code> acts as AND (ticks children until one fails); <code>Fallback</code> acts as OR (ticks children until one succeeds).
      </div>
    `
  });

  // 2. The Recovery Sub-Tree Pipeline & Behavior Tree Execution
  slides.push({
    id: `${lesson.id}_sec3_recovery_pipeline`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. The Recovery Sub-Tree Pipeline & Behavior Tree Execution',
    badge: '🔄 Cascading Recoveries',
    title: '3. Nav2 Recovery Pipeline: The Cascading NavigateRecovery Sub-Tree',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">navigate_w_replanning_and_recovery.xml</span><strong>BT Sub-Tree</strong></div>
            <pre><code class="language-xml">&lt;root main_tree_to_execute="MainTree"&gt;
  &lt;BehaviorTree ID="MainTree"&gt;
    &lt;RecoveryNode number_of_retries="6" name="NavigateRecovery"&gt;
      &lt;!-- Primary Mission Branch --&gt;
      &lt;PipelineSequence name="NavigateWithReplanning"&gt;
        &lt;ComputePathToPose goal="{goal}" path="{path}"/&gt;
        &lt;FollowPath path="{path}"/&gt;
      &lt;/PipelineSequence&gt;

      &lt;!-- Cascading Recovery Fallback Branch --&gt;
      &lt;ReactiveFallback name="RecoveryFallback"&gt;
        &lt;ClearEntireCostmap service_name="local_costmap/clear_entirely_local_costmap"/&gt;
        &lt;Spin spin_dist="1.57"/&gt;
        &lt;BackUp backup_dist="0.30" backup_speed="0.10"/&gt;
        &lt;Wait wait_duration="2.0"/&gt;
      &lt;/ReactiveFallback&gt;
    &lt;/RecoveryNode&gt;
  &lt;/BehaviorTree&gt;
&lt;/root&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>1️⃣</span><strong>Step 1: Costmap Clearing</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Purges dynamic LiDAR sensor artifacts and transient ghost obstacles from the costmap before taking physical action.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>2️⃣</span><strong>Step 2: In-Place Spin (90&deg;&ndash;180&deg;)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Rotates the AMR in place to sweep blind spots with 2D LiDAR and re-localize in AMCL against distinctive features.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>3️⃣</span><strong>Step 3: Safe BackUp (0.30m) &amp; Wait</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Reverses into verified clear space, pausing 2 seconds to allow pedestrian traffic to pass before attempting to re-plan.</p>
          </div>
        </div>
      </div>
    `
  });

  // 3. The ROS 2 Lifecycle State Machine (REP 2007)
  slides.push({
    id: `${lesson.id}_sec4_lifecycle_state_machine`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. The ROS 2 Lifecycle State Machine',
    badge: '🚦 Lifecycle Nodes',
    title: '4. Managed Lifecycle State Machine (REP-2007): Deterministic Node States',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚪</span><strong>1. Unconfigured State</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Node instantiated in memory, but no hardware handles or network resources allocated. Invoking <code>configure</code> triggers <code>on_configure()</code>.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🟡</span><strong>2. Inactive Holding State</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">All configuration loaded, publishers and subscribers created, but <strong>actuators are paused</strong>. No velocity messages are emitted. Node is completely safe.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🟢</span><strong>3. Active Execution State</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Invoking <code>activate</code> transitions node to <code>Active</code> via <code>on_activate()</code>. Actuator loops start and wheel velocity commands stream to hardware.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔴</span><strong>4. Finalized (Shutdown) State</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Hardware drivers safely parked and connections closed. Memory ready for immediate clean deallocation by the operating system.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>Why Industry Demands Lifecycle Nodes</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Prevents race conditions where motor controllers attempt to drive wheels before LiDAR drivers finish booting, eliminating startup safety accidents.</p>
          </div>
        </div>
      </div>
    `
  });

  // 4. Lifecycle Management via CLI & Nav2 Lifecycle Manager
  slides.push({
    id: `${lesson.id}_sec5_lifecycle_management_cli`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Inspecting Lifecycle States with the CLI',
    badge: '🎛️ Lifecycle Orchestration',
    title: '5. Lifecycle Orchestration: CLI State Transitions & Nav2 Lifecycle Manager',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Lifecycle CLI Verbs</span><strong>Manual Transition Commands</strong></div>
            <pre><code class="language-bash"># 1. Query active state of a node:
ros2 lifecycle get /amr_controller

# 2. Transition from Unconfigured to Inactive:
ros2 lifecycle set /amr_controller configure

# 3. Transition from Inactive to Active:
ros2 lifecycle set /amr_controller activate

# 4. Emergency pause (Active -> Inactive):
ros2 lifecycle set /amr_controller deactivate</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎼</span><strong>Nav2 lifecycle_manager Orchestration</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">In production, human operators do not manage lifecycle transitions manually. Nav2\'s <code>lifecycle_manager</code> brings all 8 navigation servers into <code>Active</code> in strict lockstep.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Dynamic Fault Reset Pipeline</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">If a hardware driver faults, execute: <code>deactivate &rarr; cleanup &rarr; configure &rarr; activate</code> to reload configuration and reset communication without rebooting the robot PC.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏆</span><strong>Curriculum Mastery Achieved</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">You now command the complete industrial ROS 2 stack: from Linux foundations and URDF to Nav2 autonomous navigation and behavior tree recovery.</p>
          </div>
        </div>
      </div>
    `
  });
}
