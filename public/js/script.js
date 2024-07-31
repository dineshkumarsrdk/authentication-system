// frontend validation for change password
// const forgotPasswordForm = document.querySelector('#forgotPasswordForm');
const changePasswordForm = document.querySelector('#changePasswordForm');
const passwordMatchAlertEle = document.querySelector('.password-match');
const confirmPasswordInputEle = document.querySelector('#confirm-password');
const passwordInputEle = document.querySelector('#new-password');
const changePasswordBtnEle = document.querySelector('#change-password');
const codeInputEle = document.querySelector('#code');

if (changePasswordForm) {
    confirmPasswordInputEle.addEventListener('input', () => {
        if (passwordInputEle.value !== confirmPasswordInputEle.value) {
            passwordMatchAlertEle.style.display = 'block';
            passwordMatchAlertEle.textContent = "New and confirm password doesn't match";
        } else {
            passwordMatchAlertEle.textContent = "";
            passwordMatchAlertEle.style.display = 'none';
            changePasswordBtnEle.disabled = false;
        }
    });
}