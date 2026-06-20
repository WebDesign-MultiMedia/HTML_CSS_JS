const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('successMsg');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

function showError(input, errorEl, message) {
  errorEl.textContent = message;
  input.style.borderColor = '#dc2626';
}

function clearError(input, errorEl) {
  errorEl.textContent = '';
  input.style.borderColor = '#d1d5db';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate() {
  let valid = true;

  if (!nameInput.value.trim()) {
    showError(nameInput, nameError, 'Name is required');
    valid = false;
  } else {
    clearError(nameInput, nameError);
  }

  if (!emailInput.value.trim()) {
    showError(emailInput, emailError, 'Email is required');
    valid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, emailError, 'Enter a valid email');
    valid = false;
  } else {
    clearError(emailInput, emailError);
  }

  if (!messageInput.value.trim()) {
    showError(messageInput, messageError, 'Message is required');
    valid = false;
  } else if (messageInput.value.trim().length < 10) {
    showError(messageInput, messageError, 'Message must be at least 10 characters');
    valid = false;
  } else {
    clearError(messageInput, messageError);
  }

  return valid;
}

// Clear errors as the user types
[nameInput, emailInput, messageInput].forEach((input) => {
  input.addEventListener('input', () => {
    const errorEl = document.getElementById(input.id + 'Error');
    clearError(input, errorEl);
    successMsg.textContent = '';
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  successMsg.textContent = '';

  if (!validate()) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Simulate sending — replace with a real fetch() call to your backend
  setTimeout(() => {
    successMsg.textContent = 'Thanks! Your message has been sent.';
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }, 800);
});
