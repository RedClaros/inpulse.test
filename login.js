// login.js

document.addEventListener('DOMContentLoaded', () => {
    // Find the login form and error message div from your login.html
    const loginForm = document.getElementById('login-form-element');
    const errorDiv = document.getElementById('login-error');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            // 1. Prevent the default form submission
            event.preventDefault();
            errorDiv.textContent = ''; // Clear previous errors

            // 2. Collect data from the inputs
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!username || !password) {
                errorDiv.textContent = 'Please enter both username and password.';
                return;
            }

            // --- Start of Mock Login Logic (Replaces Backend API Call) ---

            // 3. Simulate a network delay for realism
            setTimeout(() => {
                // 4. Check for the hardcoded mock credentials
                if (username === '123' && password === '123') {
                    // SUCCESS!
                    // Redirect the user to your mock dashboard file.
                    // Make sure the file name matches yours.
                    window.location.href = 'inpulse.test.html'; 
                } else {
                    // ERROR
                    // Display an error message if credentials do not match.
                    errorDiv.textContent = 'Invalid credentials. Please use username "123" and password "123".';
                }
            }, 500); // 0.5 second delay

            // --- End of Mock Login Logic ---

        });
    }
});