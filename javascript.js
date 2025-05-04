// Background decorations - floating translucent hearts and sparkles
(function () {
  const canvas = document.getElementById('background-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let hearts = [];
  let sparkles = [];
  const maxHearts = 30;
  const maxSparkles = 60;

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', resize);
  resize();

  class Heart {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = randomRange(10, 20);
      this.speedX = randomRange(-0.3, 0.3);
      this.speedY = randomRange(-0.15, -0.3);
      this.opacity = randomRange(0.1, 0.3);
      this.opacityChange = randomRange(0.002, 0.007);
      this.rotation = randomRange(0, 2 * Math.PI);
      this.rotationSpeed = randomRange(-0.01, 0.01);
      this.color = `rgba(255, 71, 111, ${this.opacity})`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;

      if (this.y < -this.size || this.x < -this.size || this.x > width + this.size) {
        this.x = Math.random() * width;
        this.y = height + this.size;
        this.size = randomRange(10, 20);
        this.speedX = randomRange(-0.3, 0.3);
        this.speedY = randomRange(-0.15, -0.3);
        this.opacity = randomRange(0.1, 0.3);
        this.opacityChange = randomRange(0.002, 0.007);
        this.color = `rgba(255, 71, 111, ${this.opacity})`;
      }

      this.opacity += this.opacityChange;
      if (this.opacity > 0.35 || this.opacity < 0.1) {
        this.opacityChange = -this.opacityChange;
      }
      this.color = `rgba(255, 71, 111, ${this.opacity.toFixed(3)})`;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      const s = this.size / 2;
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(s, -s, s * 2.5, -s / 3, 0, s * 1.5);
      ctx.bezierCurveTo(-s * 2.5, -s / 3, -s, -s, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  class Sparkle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = randomRange(1, 3);
      this.twinkleSpeed = randomRange(0.01, 0.04);
      this.opacity = randomRange(0.1, 0.8);
      this.opacityDirection = 1;
    }
    update() {
      this.opacity += this.twinkleSpeed * this.opacityDirection;
      if (this.opacity >= 0.8) {
        this.opacityDirection = -1;
      } else if (this.opacity <= 0.1) {
        this.opacityDirection = 1;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }
    }
    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity.toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    hearts = [];
    sparkles = [];
    for (let i = 0; i < maxHearts; i++) {
      hearts.push(new Heart());
    }
    for (let i = 0; i < maxSparkles; i++) {
      sparkles.push(new Sparkle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    hearts.forEach(heart => {
      heart.update();
      heart.draw();
    });
    sparkles.forEach(sparkle => {
      sparkle.update();
      sparkle.draw();
    });
    requestAnimationFrame(animate);
  }

  init();
  animate();
})();

// Confetti animation
(function () {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;
  let particles = [];
  const maxParticles = 100;

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * W;
      this.y = Math.random() * H - H;
      this.radius = randomRange(6, 10);
      this.color = `hsl(${Math.floor(randomRange(340, 360))}, 90%, 60%)`;
      this.drift = randomRange(-0.8, 0.8);
      this.speed = randomRange(1, 3);
      this.tilt = randomRange(-10, 10);
      this.tiltSpeed = randomRange(0.05, 0.12);
      this.tiltAngle = 0;
    }
    update() {
      this.y += this.speed;
      this.x += this.drift;
      this.tiltAngle += this.tiltSpeed;
      this.tilt = Math.sin(this.tiltAngle) * 15;

      if (this.y > H) {
        this.x = Math.random() * W;
        this.y = -10;
        this.drift = randomRange(-0.8, 0.8);
        this.speed = randomRange(1, 3);
        this.radius = randomRange(6, 10);
        this.color = `hsl(${Math.floor(randomRange(340, 360))}, 90%, 60%)`;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.lineWidth = this.radius / 2;
      ctx.strokeStyle = this.color;
      ctx.moveTo(this.x + this.tilt + this.radius / 2, this.y);
      ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.radius / 2);
      ctx.stroke();
    }
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(draw);
  }

  createParticles();
  draw();
})();

// Interactive terraces toggle logic
const terraces = document.querySelectorAll('.terrace');
terraces.forEach(terrace => {
  terrace.addEventListener('click', toggleTerrace);
  terrace.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTerrace.call(terrace);
    }
  });
});

function toggleTerrace() {
  const isOpen = this.classList.toggle('open');
  this.setAttribute('aria-expanded', isOpen);
  const icon = this.querySelector('.terrace-header span');
  if (isOpen) {
    icon.textContent = '−';
  } else {
    icon.textContent = '➕';
  }
}

// Floating hearts animation on container click
const container = document.querySelector('.container');
const floatingHeartsContainer = container.querySelector('.floating-hearts');

container.addEventListener('click', e => {
  createFloatingHeart(e.clientX, e.clientY);
});

function createFloatingHeart(x, y) {
  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.style.left = (x - container.getBoundingClientRect().left - 10) + 'px';
  heart.style.top = (y - container.getBoundingClientRect().top - 10) + 'px';
  heart.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
  heart.style.fontSize = (Math.random() * 10 + 18) + 'px';
  heart.style.opacity = 1;
  floatingHeartsContainer.appendChild(heart);
  heart.textContent = '❤';

  heart.addEventListener('animationend', () => {
    heart.remove();
  });
}

// Hidden Secret Message logic by clicking the beating heart 7 times
const beatingHeart = document.querySelector('.heart');
const secretMessage = document.getElementById('secret-message');
let clickCount = 0;
const requiredClicks = 1;
let clickTimeout;

beatingHeart.addEventListener('click', () => {
  clickCount++;
  if (clickTimeout) clearTimeout(clickTimeout);
  clickTimeout = setTimeout(() => {
    clickCount = 0; // Reset after 2 seconds of inactivity
  }, 2000);

  if (clickCount === requiredClicks) {
    if (secretMessage.classList.contains('show')) {
      secretMessage.classList.remove('show');
      secretMessage.setAttribute('aria-hidden', 'true');
    } else {
      secretMessage.classList.add('show');
      secretMessage.setAttribute('aria-hidden', 'false');
      secretMessage.focus();
    }
    clickCount = 0;
  }
});

// Accessibility: toggle secret message by keyboard Enter or Space on heart
beatingHeart.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    // Toggle secret message visibility
    if (secretMessage.classList.contains('show')) {
      secretMessage.classList.remove('show');
      secretMessage.setAttribute('aria-hidden', 'true');
    } else {
      secretMessage.classList.add('show');
      secretMessage.setAttribute('aria-hidden', 'false');
      secretMessage.focus();
    }
  }
});