const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const subjectInput = document.getElementById('subject');
const emailInput = document.getElementById('email');
const addressInput = document.getElementById('address');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault();
  validateForm();
});

function validateForm() {
  resetErrors();
  let isValid = true;

  if (nameInput.value.trim() === '') {
    showError(nameInput, 'Name is required.');
    isValid = false;
  }

  if (subjectInput.value.trim().length < 5) {
    showError(subjectInput, 'Subject must have a minimum length of 5.');
    isValid = false;
  }

  if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, 'Email is invalid.');
    isValid = false;
  }

  if (addressInput.value.trim().length < 10) {
    showError(addressInput, 'Address must have a minimum length of 10.');
    isValid = false;
  }

  if (isValid) {
    showSuccessMessage();
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(input, message) {
  const errorDiv = document.getElementById(`${input.id}Error`);
  errorDiv.textContent = message;
  input.classList.add('error');
}

function resetErrors() {
  const errorMessages = document.getElementsByClassName('error');
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].textContent = '';
  }

  const inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove('error');
  }
}

function showSuccessMessage() {
  const successMessageDiv = document.getElementById('successMessage');
  successMessageDiv.textContent = 'Registering was successful!';
}