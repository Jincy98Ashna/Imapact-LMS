document.addEventListener('DOMContentLoaded', function() {
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(loginForm);
            const response = await fetch('/api/login', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            const errorElement = document.getElementById('error-message');
            
            if (result.error) {
                errorElement.textContent = result.error;
                errorElement.style.display = 'block';
            } else if (result.redirect) {
                window.location.href = result.redirect;
            }
        });
    }
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            
            const password = document.getElementById('password').value;
            const password2 = document.getElementById('password2').value;
            const errorElement = document.getElementById('error-message');
            
            if (password !== password2) {
                errorElement.textContent = 'Passwords do not match';
                errorElement.style.display = 'block';
                return;
            }
            
            const formData = new FormData(signupForm);
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.error) {
                errorElement.textContent = result.error;
                errorElement.style.display = 'block';
            } else if (result.redirect) {
                window.location.href = result.redirect;
            }
        });
    }
});