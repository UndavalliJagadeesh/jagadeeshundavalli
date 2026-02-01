/* Simple interactive behavior: theme toggle, mobile nav, form handling */
document.addEventListener('DOMContentLoaded',()=>{
  // create or reuse fullscreen canvas for starfield
  let canvas = document.getElementById('stars-canvas');
  if(!canvas){
    canvas = document.createElement('canvas');
    canvas.id = 'stars-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);
  }
  // ensure canvas sits behind UI but above body background
  canvas.style.position = canvas.style.position || 'fixed';
  canvas.style.inset = canvas.style.inset || '0';
  canvas.style.width = canvas.style.width || '100%';
  canvas.style.height = canvas.style.height || '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = canvas.style.zIndex || '0';
  const ctx = canvas.getContext('2d');
  let DPR = Math.max(1, window.devicePixelRatio || 1);
  function resizeCanvas(){
    DPR = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.floor(window.innerWidth * DPR);
    canvas.height = Math.floor(window.innerHeight * DPR);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
    if(typeof generateStars === 'function') generateStars();
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // starfield configuration (tweak to adjust density/brightness/spawn)
  const STAR_DENSITY = 1.8; // increase density for better visibility
  const STAR_BRIGHTNESS_MIN = 0.45;
  const STAR_BRIGHTNESS_MAX = 1.0;
  const STAR_TWINKLE_MIN = 0.004;
  const STAR_TWINKLE_MAX = 0.035;
  const SHOOTING_SPAWN_PROB = 0.07; // increase shooting-star frequency

  // background static stars
  const stars = [];
  function generateStars(){
    stars.length = 0;
    const baseCount = Math.floor((window.innerWidth * window.innerHeight) / 12000);
    const STAR_COUNT = Math.max(30, Math.floor(baseCount * STAR_DENSITY));
    for(let i=0;i<STAR_COUNT;i++){
      stars.push({
        x: Math.random()*window.innerWidth,
        y: Math.random()*window.innerHeight,
        r: Math.random()*1.4 + 0.3,
        a: Math.random()*(STAR_BRIGHTNESS_MAX - STAR_BRIGHTNESS_MIN) + STAR_BRIGHTNESS_MIN,
        tw: Math.random()*(STAR_TWINKLE_MAX - STAR_TWINKLE_MIN) + STAR_TWINKLE_MIN
      });
    }
  }
  generateStars();

  // shooting stars container
  const shooting = [];

  function spawnShootingStar(){
    const startX = Math.random()*window.innerWidth;
    const startY = Math.random()*window.innerHeight*0.45;
    const len = Math.random()*360 + 260;
    const speed = Math.random()*10 + 10;
    const angle = Math.PI*0.9 + (Math.random()*0.35 - 0.175);
    shooting.push({x:startX, y:startY, len, speed, angle, life:1});
  }

  // Navigation and form handling
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  // set year
  yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  navToggle.addEventListener('click',()=>{
    if(getComputedStyle(nav).display === 'none'){
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.right = '1rem';
      nav.style.top = '64px';
      nav.style.background = 'rgba(255,255,255,.98)';
      nav.style.padding = '1rem';
      nav.style.borderRadius = '8px';
      nav.style.boxShadow = '0 6px 18px rgba(10,10,20,.08)';
    } else {
      nav.style.display = '';
    }
  });

  // smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href=a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
        // close mobile nav
        if(window.innerWidth<=640) nav.style.display='';
      }
    });
  });

  // form handling (fake submit)
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    statusEl.textContent = '';
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if(!name||!email||!message){
      statusEl.textContent = 'Please fill out all fields.';
      return;
    }
    // Basic email pattern check
    if(!/^\S+@\S+\.\S+$/.test(email)){
      statusEl.textContent = 'Please enter a valid email.';
      return;
    }

    // Simulate send
    statusEl.textContent = 'Sending…';
    try{
      await new Promise(r=>setTimeout(r,800));
      statusEl.textContent = 'Message sent. Thanks!';
      form.reset();
    }catch(err){
      statusEl.textContent = 'Could not send message. Try again later.';
    }
  });

  // Scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
  if(revealElements.length > 0){
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },{threshold: 0.1, rootMargin: '0px 0px -100px 0px'});

    revealElements.forEach(el=>{
      observer.observe(el);
    });
  }

  // Reveal hero section immediately
  const heroContent = document.querySelector('.hero-content');
  const heroVisual = document.querySelector('.hero-visual');
  if(heroContent) {
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  }
  if(heroVisual) {
    heroVisual.style.opacity = '1';
    heroVisual.style.transform = 'translateY(0)';
  }
});;