function validatePassword(password) {
  // Regular expressions for each requirement
  const lengthRegex = /^.{8,}$/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numericRegex = /[0-9]/;

  const lengthMessage = document.getElementById('length-message');
  const uppercaseMessage = document.getElementById('uppercase-message');
  const lowercaseMessage = document.getElementById('lowercase-message');
  const numericMessage = document.getElementById('numeric-message');

  if (!lengthRegex.test(password)) {
    lengthMessage.style.color = 'red';
  } else {
    lengthMessage.style.color = 'green';
  }

  if (!uppercaseRegex.test(password)) {
    uppercaseMessage.style.color = 'red';
  } else {
    uppercaseMessage.style.color = 'green';
  }

  if (!lowercaseRegex.test(password)) {
    lowercaseMessage.style.color = 'red';
  } else {
    lowercaseMessage.style.color = 'green';
  }

  if (!numericRegex.test(password)) {
    numericMessage.style.color = 'red';
  } else {
    numericMessage.style.color = 'green';
  }
}

const passwordInput = document.getElementById('password-input');
const passwordConfirm = document.getElementById('password-confirm-input');

passwordInput.addEventListener('input', function () {
  const errorMessagesEl = document.querySelector('.error-message');
  const password = passwordInput.value;
  if (password) {
    errorMessagesEl.classList.add('show');
  } else {
    errorMessagesEl.classList.remove('show');
  }
  validatePassword(password);
});

passwordConfirm.addEventListener('input', function () {
  const matchErorr = document.querySelector('#match-message');
  const password = passwordInput.value;
  const passwordConfirmValue = passwordConfirm.value;

  if (password === passwordConfirmValue || !passwordConfirmValue) {
    matchErorr.classList.remove('show');
  } else {
    matchErorr.classList.add('show');
  }
})

function togglePassword() {
  const type = passwordInput.type;
  passwordInput.type = type === 'text' ? 'password' : 'text';
}

