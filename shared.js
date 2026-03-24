/* ═══════════════════════════════════════
   shared.js — TikTok Login Prototype
   Used by: index.html, flow1.html,
            flow2.html, flow3.html
   ═══════════════════════════════════════ */

/* ── Scale to fit 1440px canvas ── */
function scaleToFit() {
  var wrap = document.getElementById('scaleWrap');
  var root = document.getElementById('ttRoot');
  var scale = Math.min(1, window.innerWidth / 1440);
  root.style.transform = 'scale(' + scale + ')';
  root.style.transformOrigin = 'top left';
  wrap.style.height = Math.round(window.innerHeight * scale) + 'px';
}
window.addEventListener('resize', scaleToFit);
scaleToFit();

/* ── Shared PIN box initialiser ── */
function initWidePinBoxes(containerId) {
  var container = document.getElementById(containerId);
  var boxes = container.querySelectorAll('.pin-box');
  boxes.forEach(function(box) {
    var newBox = box.cloneNode(true);
    box.parentNode.replaceChild(newBox, box);
  });
  var freshBoxes = container.querySelectorAll('.pin-box');
  freshBoxes.forEach(function(box, i) {
    box.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g,'').slice(0,1);
      if (this.value && i < freshBoxes.length - 1) freshBoxes[i+1].focus();
    });
    box.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && !this.value && i > 0) freshBoxes[i-1].focus();
    });
  });
}

/* ── Shared resend countdown ── */
function startWideResendCountdown(btnId, timerId) {
  var t = 10;
  var btn = document.getElementById(btnId);
  var timer = document.getElementById(timerId);
  if (!btn || !timer) return;
  btn.style.opacity = '0.4'; btn.style.cursor = 'default';
  timer.textContent = t + 's';
  var interval = setInterval(function() {
    t--;
    if (t <= 0) {
      clearInterval(interval);
      timer.textContent = '';
      btn.style.opacity = '1'; btn.style.cursor = 'pointer';
    } else {
      timer.textContent = t + 's';
    }
  }, 1000);
}

/* ── Shared password toggle ── */
function toggleWidePw(inputId, btn) {
  var inp = document.getElementById(inputId);
  var img = btn.querySelector('img');
  if (inp.type === 'password') {
    inp.type = 'text';
    img.src = 'Assets/Icons/Eye_Open.svg';
  } else {
    inp.type = 'password';
    img.src = 'Assets/Icons/Eye_Close.svg';
  }
}
