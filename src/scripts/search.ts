// ============================================================
// search.ts — 客户端搜索 + 文本高亮 + 标签筛选
// ============================================================

let activeTag = '全部';

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function deriveTags(el: HTMLElement): string[] {
  return (el.getAttribute('data-tags') || '').split(',').map(t => t.trim()).filter(Boolean);
}

export function initSearch(): void {
  const searchInput = document.getElementById('searchInput') as HTMLInputElement;
  const searchClear = document.getElementById('searchClear');

  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (searchClear) {
      searchClear.classList.toggle('show', query.length > 0);
    }
    filterPosts(query);
  });

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchClear.classList.remove('show');
      filterPosts('');
      searchInput.focus();
    });
  }

  // 标签筛选
  document.querySelectorAll('.tag-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const tag = pill.getAttribute('data-tag') || '全部';
      document.querySelectorAll('.tag-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeTag = tag;
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.classList.remove('show');
      removeHighlight();
      filterPosts('');
    });
  });
}

function filterPosts(query: string): void {
  const cards = document.querySelectorAll<HTMLElement>('.post-card');
  const noResults = document.getElementById('noResults');
  let visibleCount = 0;

  removeHighlight();

  cards.forEach(card => {
    const dataTags = deriveTags(card);
    const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
    const excerpt = card.querySelector('.post-excerpt')?.textContent?.toLowerCase() || '';
    const allText = `${title} ${excerpt} ${dataTags.join(' ')}`;

    const tagMatch = activeTag === '全部' || dataTags.includes(activeTag);
    const searchMatch = !query || allText.includes(query);

    if (tagMatch && searchMatch) {
      card.classList.remove('hidden');
      visibleCount++;
      if (query) highlightInElement(card, query);
    } else {
      card.classList.add('hidden');
    }
  });

  if (noResults) {
    noResults.classList.toggle('show', visibleCount === 0);
  }

  // 更新结果计数
  const countEl = document.getElementById('resultCount');
  if (countEl) {
    countEl.textContent = `${visibleCount} 篇`;
  }
}

function highlightInElement(root: HTMLElement, query: string): void {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.textContent) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.classList.contains('highlight'))) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.textContent.toLowerCase().includes(query) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    },
  );

  const nodes: Text[] = [];
  let node: Text | null;
  while ((node = walker.nextNode() as Text)) {
    nodes.push(node);
  }

  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');

  nodes.forEach(textNode => {
    const parent = textNode.parentNode;
    if (!parent) return;
    const fragment = document.createDocumentFragment();
    const parts = textNode.textContent!.split(regex);
    parts.forEach(part => {
      if (part.toLowerCase() === query) {
        const mark = document.createElement('mark');
        mark.className = 'highlight';
        mark.textContent = part;
        fragment.appendChild(mark);
      } else {
        fragment.appendChild(document.createTextNode(part));
      }
    });
    parent.replaceChild(fragment, textNode);
  });
}

function removeHighlight(): void {
  document.querySelectorAll('mark.highlight').forEach(mark => {
    const parent = mark.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(mark.textContent || ''), mark);
      parent.normalize();
    }
  });
}
