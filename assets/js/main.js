const themeLabels = {
    en: { light: 'Dark mode',   dark: 'Light mode'  },
    pt: { light: 'Tema escuro', dark: 'Tema claro'  },
    fr: { light: 'Mode sombre', dark: 'Mode clair'  }
  };

  function toggleTheme() {
    const t = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', t);
    const lang = document.body.getAttribute('data-active-lang') || 'en';
    document.getElementById('theme-label').textContent = themeLabels[lang][t];
    try { localStorage.setItem('aurora-manual-theme', t); } catch(e) {}
  }

  function setLang(lang) {
    const main = document.querySelector('main');
    main.classList.add('switching');
    setTimeout(() => {
      document.body.setAttribute('data-active-lang', lang);
      document.documentElement.setAttribute('lang', lang);
      ['en','pt','fr'].forEach(l => {
        document.getElementById('btn-' + l).classList.toggle('active', l === lang);
      });
      const titles = {
        en: 'Aurora IDE Manual — Chapter 1: Introduction',
        pt: 'Manual Aurora IDE — Capítulo 1: Introdução',
        fr: 'Manuel Aurora IDE — Chapitre 1 : Introduction'
      };
      document.title = titles[lang];
      const t = document.body.getAttribute('data-theme') || 'light';
      document.getElementById('theme-label').textContent = themeLabels[lang][t];
      try { localStorage.setItem('aurora-manual-lang', lang); } catch(e) {}
      main.classList.remove('switching');
    }, 120);
  }

  (function() {
    try {
      const lang = localStorage.getItem('aurora-manual-lang');
      const theme = localStorage.getItem('aurora-manual-theme');
      if (lang && ['en','pt','fr'].includes(lang)) {
        document.body.setAttribute('data-active-lang', lang);
        document.documentElement.setAttribute('lang', lang);
        ['en','pt','fr'].forEach(l => {
          const b = document.getElementById('btn-' + l);
          if (b) b.classList.toggle('active', l === lang);
        });
      }
      if (theme && ['light','dark'].includes(theme)) {
        document.body.setAttribute('data-theme', theme);
        const activeLang = document.body.getAttribute('data-active-lang') || 'en';
        const label = document.getElementById('theme-label');
        if (label) label.textContent = themeLabels[activeLang][theme];
      }
    } catch(e) {}
  })();