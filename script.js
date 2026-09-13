/* =========================================================
   EunJin Jeong — shared behaviour for every page
   1) light / dark theme toggle
   2) mobile menu
   3) current-page highlight in the nav
   4) copy email
   5) footer year
   ========================================================= */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- 1. theme ---------- */
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon = document.getElementById('themeIcon');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '◑' : '◐';
    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }
  }

  // 시작 테마는 OS 설정을 따릅니다. localStorage는 쓰지 않았으므로
  // 페이지를 옮기거나 새로고침하면 OS 설정으로 돌아갑니다.
  applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- 2. mobile menu ---------- */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  if (nav && navToggle) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- 3. current page ---------- */
  // 파일명을 비교합니다. 루트(/)는 index.html로 봅니다.
  var here = window.location.pathname.split('/').pop() || 'index.html';

  Array.prototype.forEach.call(document.querySelectorAll('.nav a'), function (a) {
    var target = a.getAttribute('href');
    if (!target) return;
    if (target === here) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* ---------- 4. copy email ---------- */
  var copyBtn = document.getElementById('copyMail');
  var copyStatus = document.getElementById('copyStatus');

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var mail = copyBtn.getAttribute('data-mail');

      function done(ok) {
        if (!copyStatus) return;
        copyStatus.textContent = ok
          ? 'Address copied.'
          : 'Could not copy — select the address above instead.';
        window.setTimeout(function () { copyStatus.textContent = ''; }, 3000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(mail).then(
          function () { done(true); },
          function () { done(false); }
        );
      } else {
        done(false);
      }
    });
  }

  /* ---------- 5. footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
