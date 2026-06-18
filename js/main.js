document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initContactForm();
  updateActiveNavLink();
});

/**
 * Accessible Mobile Navigation Menu
 */
function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!navToggle || !navMenu) return;

  const navLinks = navMenu.querySelectorAll('.nav-link');
  const firstFocusable = navToggle;
  const lastFocusable = navLinks[navLinks.length - 1];

  function toggleMenu() {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('open');
    
    // Toggle body scroll
    document.body.style.overflow = isExpanded ? '' : 'hidden';

    // If opening, focus first link inside menu (or close button if we had one)
    if (!isExpanded && navLinks.length > 0) {
      setTimeout(() => navLinks[0].focus(), 100);
    }
  }

  navToggle.addEventListener('click', toggleMenu);

  // Close menu on link click (important for hash navigation/mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Handle Keyboard Navigation within Menu (Trap Focus / Close on Esc)
  document.addEventListener('keydown', (e) => {
    const isMenuOpen = navMenu.classList.contains('open');
    if (!isMenuOpen) return;

    // Close on Escape key
    if (e.key === 'Escape') {
      toggleMenu();
      navToggle.focus();
      return;
    }

    // Tab Trap
    if (e.key === 'Tab') {
      const activeEl = document.activeElement;
      
      if (e.shiftKey) {
        // Shift + Tab: if on toggle (first element), wrap to last link
        if (activeEl === navToggle) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        // Tab: if on last link, wrap back to toggle
        if (activeEl === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
  });
}

/**
 * Highlight Active Navigation Link based on current URL
 */
function updateActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    // Get page file name (e.g. "about.html" or "about")
    const href = link.getAttribute('href');
    
    if (
      currentPath.endsWith(href) || 
      (currentPath === '/' && href === 'index.html') ||
      (currentPath.endsWith('/') && href === 'index.html')
    ) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * Accessible Contact Form Validation
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successBanner = document.getElementById('success-banner');
  const successMessage = document.getElementById('success-message');
  const closeBannerBtn = document.getElementById('close-banner-btn');
  
  if (!form) return;

  const inputs = form.querySelectorAll('.form-input');

  // Input validation helper
  function validateInput(input) {
    const errorId = `${input.id}-error`;
    const errorElement = document.getElementById(errorId);
    let isValid = true;
    let message = '';

    if (input.required && !input.value.trim()) {
      isValid = false;
      message = `${getLabelText(input)} is required.`;
    } else if (input.type === 'email' && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        isValid = false;
        message = 'Please enter a valid email address.';
      }
    }

    if (!isValid) {
      input.setAttribute('aria-invalid', 'true');
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('active');
      }
    } else {
      input.setAttribute('aria-invalid', 'false');
      if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('active');
      }
    }

    return isValid;
  }

  // Get field label text for screen-readable error messages
  function getLabelText(input) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    return label ? label.textContent.replace('*', '').trim() : 'This field';
  }

  // Validate on blur for inline feedback
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateInput(input);
    });
    
    // Reset invalid state on input
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') {
        validateInput(input);
      }
    });
  });

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;
    let firstInvalidInput = null;

    inputs.forEach(input => {
      const isValid = validateInput(input);
      if (!isValid) {
        isFormValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = input;
        }
      }
    });

    if (isFormValid) {
      // Clear form inputs
      form.reset();
      inputs.forEach(input => {
        input.removeAttribute('aria-invalid');
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) errorElement.classList.remove('active');
      });

      // Show success message and notify assistive technologies via aria-live
      if (successBanner && successMessage) {
        successBanner.classList.add('active');
        successMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you shortly.';
        
        // Focus the banner close button to allow users to easily dismiss and continue
        setTimeout(() => {
          closeBannerBtn.focus();
        }, 100);
      }
    } else if (firstInvalidInput) {
      // Focus the first invalid field for better keyboard UX
      firstInvalidInput.focus();
    }
  });

  // Close Success Banner
  if (closeBannerBtn && successBanner) {
    closeBannerBtn.addEventListener('click', () => {
      successBanner.classList.remove('active');
      // Return focus to the form
      form.focus();
    });
  }
}
