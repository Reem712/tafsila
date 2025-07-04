// Preloader
window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 1000);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
  this.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Sticky Navigation
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Animate Stats Counter
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      
      stat.textContent = Math.floor(current);
      if (stat.getAttribute('data-count') === '99.7') {
        stat.textContent = current.toFixed(1);
      }
    }, 16);
  });
}

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('hero-stats')) {
        animateStats();
      }
      
      entry.target.classList.add('animate');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.hero-stats, .feature-card, .step, .testimonial-card, .pricing-card').forEach(el => {
  observer.observe(el);
});

// Testimonial Slider
let currentSlide = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  testimonialCards.forEach(card => card.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  testimonialCards[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

document.querySelector('.slider-next').addEventListener('click', () => {
  let nextSlide = (currentSlide + 1) % testimonialCards.length;
  showSlide(nextSlide);
});

document.querySelector('.slider-prev').addEventListener('click', () => {
  let prevSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
  showSlide(prevSlide);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
  });
});

// Initialize slider
showSlide(0);

// Form Submission
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your message! We will contact you soon.');
  this.reset();
});

document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for subscribing to our newsletter!');
  this.reset();
});