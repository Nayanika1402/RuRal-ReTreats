// Enhanced Search System - Production Optimized
(() => {
    'use strict';

    // Configuration and data
    const c = { min: 2, max: 6, cache: 60000 }, cache = new Map();
    let cacheTime = 0;

    // Block old alerts
    const o = window.alert;
    window.alert = m => m?.includes('No results') ? !1 : o(m);

    // Compact data structure
    const d = {
        p: { home: 'index.html', homestays: 'homestays.html', services: 'services.html', adventures: 'Adventure.html', faq: 'faq.html', contact: 'contact.html', blog: 'blog.html', about: 'about.html' },
        i: [
            { k: ['home', 'main', 'start', 'welcome'], p: ['home'] },
            { k: ['homestay', 'stay', 'accommodation', 'lodge'], p: ['homestays'] },
            { k: ['service', 'package', 'booking', 'tour'], p: ['services'] },
            { k: ['adventure', 'activity', 'outdoor', 'trek'], p: ['adventures'] },
            { k: ['faq', 'question', 'help', 'support'], p: ['faq'] },
            { k: ['contact', 'reach', 'phone', 'email'], p: ['contact'] },
            { k: ['blog', 'article', 'story', 'guide'], p: ['blog'] },
            { k: ['about', 'company', 'team', 'info'], p: ['about'] },
            { k: ['mountain', 'hills', 'peak', 'climb'], p: ['homestays', 'adventures'] },
            { k: ['sea', 'ocean', 'beach', 'coast', 'water'], p: ['homestays', 'services'] },
            { k: ['trek', 'hike', 'walk', 'trail'], p: ['adventures'] },
            { k: ['budget', 'cheap', 'affordable'], p: ['homestays', 'services'] },
            { k: ['luxury', 'premium', 'deluxe'], p: ['homestays'] },
            { k: ['book', 'reserve', 'package', 'tour'], p: ['services'] },
            { k: ['rural', 'village', 'countryside', 'nature'], p: ['homestays', 'adventures'] }
        ],
        t: {
            home: { title: 'Home', url: 'index.html', desc: 'Welcome to RuRal ReTreats' },
            homestays: { title: 'Homestays', url: 'homestays.html', desc: 'Authentic rural accommodations' },
            services: { title: 'Services', url: 'services.html', desc: 'Tour packages & bookings' },
            adventures: { title: 'Adventures', url: 'Adventure.html', desc: 'Outdoor activities & trekking' },
            faq: { title: 'FAQ', url: 'faq.html', desc: 'Frequently asked questions' },
            contact: { title: 'Contact', url: 'contact.html', desc: 'Get in touch with us' },
            blog: { title: 'Blog', url: 'blog.html', desc: 'Travel stories & guides' },
            about: { title: 'About', url: 'about.html', desc: 'Learn more about us' }
        }
    };

    // Utilities
    const db = (f, t) => { let i; return (...a) => { clearTimeout(i); i = setTimeout(() => f(...a), t) } };
    const q = s => document.querySelector(s);
    const qa = s => document.querySelectorAll(s);
    const h = () => { const e = q('#searchDropdown'); e?.remove() };
    const hp = () => { const e = q('#searchOverlay'); e && (e.classList.remove('active'), setTimeout(() => e.remove(), 300)) };

    // Live dropdown
    const sd = (input, results) => {
        h();
        if (!results.length) return;
        const dropdown = document.createElement('div');
        dropdown.id = 'searchDropdown';
        dropdown.className = 'search-dropdown';
        dropdown.innerHTML = results.map((r, i) =>
            `<div class="dropdown-item" data-url="${r.url}" data-index="${i}">
<div class="dropdown-title">${r.title}</div>
<div class="dropdown-desc">${r.desc}</div>
</div>`).join('');

        const rect = input.getBoundingClientRect();
        Object.assign(dropdown.style, {
            top: `${rect.bottom + scrollY}px`,
            left: `${rect.left + scrollX}px`,
            width: `${rect.width}px`
        });

        document.body.appendChild(dropdown);

        // Events
        dropdown.querySelectorAll('.dropdown-item').forEach(item =>
            item.onclick = () => location.href = item.dataset.url);

        let sel = -1;
        const items = dropdown.querySelectorAll('.dropdown-item');
        const kh = e => {
            if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, items.length - 1); us() }
            else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, -1); us() }
            else if (e.key === 'Enter' && sel >= 0) { e.preventDefault(); location.href = items[sel].dataset.url }
            else if (e.key === 'Escape') h()
        };
        const us = () => items.forEach((item, i) => item.classList.toggle('selected', i === sel));

        input.addEventListener('keydown', kh);
        dropdown._kh = kh;
        dropdown._i = input;
    };

    // Search functions
    const pls = q => {
        try {
            const cl = q.toLowerCase().trim().replace(/[^\w\s]/g, '');
            if (cl.length < 2) return [];
            const r = new Map();

            // Direct matches
            Object.keys(d.p).forEach(p => {
                if (p.includes(cl) || cl.includes(p)) {
                    const pd = d.t[p];
                    pd && r.set(p, { ...pd, priority: 1 });
                }
            });

            // Title matches
            Object.entries(d.t).forEach(([k, data]) => {
                if (!r.has(k) && data.title.toLowerCase().includes(cl))
                    r.set(k, { ...data, priority: 2 });
            });

            // Keyword matches
            const fz = new RegExp(cl.split('').join('.*'), 'i');
            d.i.forEach(({ k, p }) => {
                if (k.some(key => key.includes(cl) || cl.includes(key) || fz.test(key))) {
                    p.forEach(pk => {
                        if (!r.has(pk) && d.t[pk]) r.set(pk, { ...d.t[pk], priority: 3 });
                    });
                }
            });

            return Array.from(r.values()).sort((a, b) => a.priority - b.priority).slice(0, 5);
        } catch (e) { return [] }
    };

    const s = q => {
        try {
            const cl = q.toLowerCase().trim().replace(/[^\w\s]/g, '');
            if (cl.length < c.min) return;
            if (d.p[cl]) return location.href = d.p[cl];

            if (Date.now() - cacheTime < c.cache && cache.has(cl)) return sr(cache.get(cl), q);

            const results = new Set();
            const fz = new RegExp(cl.split('').join('.*'), 'i');
            d.i.forEach(({ k, p }) => {
                if (k.some(key => key.includes(cl) || cl.includes(key) || fz.test(key)))
                    p.forEach(page => results.add(page));
            });

            const found = Array.from(results).map(k => d.t[k]).filter(Boolean).slice(0, c.max);
            cache.set(cl, found);
            cacheTime = Date.now();
            sr(found, q);
        } catch (e) { }
    };

    // UI functions
    const sr = (results, q) => {
        const isR = results.length > 0;
        const icons = { homestays: '🏠', adventures: '⛰️', services: '🎯', contact: '📞', about: 'ℹ️' };
        const content = isR ?
            results.map(r => `<div class="search-item" data-url="${r.url}">
<div class="search-item-title">${r.title}</div>
<div class="search-item-desc">${r.desc}</div>
<div class="search-item-arrow">→</div>
</div>`).join('') :
            `<div class="no-results">
<div class="no-results-icon">🎯</div>
<h3>No Results Found</h3>
<p>We couldn't find anything matching "<strong>${q}</strong>"</p>
<div class="suggestions">
<p>✨ Popular searches:</p>
<div class="suggestion-tags">
${['homestays', 'adventures', 'services', 'contact', 'about'].map(t =>
                `<button class="tag" data-query="${t}">${icons[t]} ${t.charAt(0).toUpperCase() + t.slice(1)}</button>`).join('')}
</div>
</div>
</div>`;

        sp(isR ? '🔍 Search Results' : 'No Results', content, isR ? 'results' : 'no-results');
    };

    const sp = (title, content, type) => {
        hp();
        document.body.insertAdjacentHTML('beforeend',
            `<div class="search-overlay" id="searchOverlay">
<div class="search-popup ${type}">
<button class="search-close" aria-label="Close">✕</button>
<div class="search-header"><h2>${title}</h2></div>
<div class="search-content">${content}</div>
</div>
</div>`);

        const overlay = q('#searchOverlay');
        requestAnimationFrame(() => overlay.classList.add('active'));
        be();
    };

    const be = () => {
        const overlay = q('#searchOverlay');
        if (!overlay) return;
        overlay.querySelector('.search-close')?.addEventListener('click', hp);
        overlay.onclick = e => e.target === overlay && hp();
        overlay.querySelectorAll('.search-item').forEach(i => i.onclick = () => location.href = i.dataset.url);
        overlay.querySelectorAll('.tag').forEach(t => t.onclick = () => s(t.dataset.query));
        const eh = e => e.key === 'Escape' && (hp(), document.removeEventListener('keydown', eh));
        document.addEventListener('keydown', eh);
    };

    // Live search
    const ls = db(input => {
        const q = input.value.trim();
        q.length < 2 ? h() : ((r = pls(q)) => r.length ? sd(input, r) : h())();
    }, 300);

    // Initialize
    const init = () => {
        try {
            window.handleSearch = () => !1;

            qa('#search-input,#mobile-search-input').forEach(input => {
                const ni = input.cloneNode(!0);
                input.parentNode.replaceChild(ni, input);

                ni.oninput = () => ls(ni);
                ni.onfocus = () => ni.value.trim().length >= 2 && ls(ni);
                ni.onblur = () => setTimeout(h, 150);
                ni.onkeypress = e => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); h(); s(ni.value); ni.blur();
                    }
                };
            });

            qa('.search-btn,[class*="search"] button').forEach(btn => {
                const nb = btn.cloneNode(!0);
                btn.parentNode.replaceChild(nb, btn);
                nb.onclick = e => {
                    e.preventDefault();
                    const input = q('#search-input,#mobile-search-input');
                    input?.value && (h(), s(input.value));
                };
            });

            document.onclick = e => {
                const dropdown = q('#searchDropdown');
                const inputs = qa('#search-input,#mobile-search-input');
                const isInput = Array.from(inputs).some(i => i.contains(e.target));
                dropdown && !dropdown.contains(e.target) && !isInput && h();
            };
        } catch (e) { }
    };

    // Initialize multiple times for complete override
    init();
    document.readyState === 'loading' && document.addEventListener('DOMContentLoaded', init);
    setTimeout(init, 100);

    // Global API
    window.enhancedSearch = { search: s, close: hp, clearCache: () => cache.clear() };
})();