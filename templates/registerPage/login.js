document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password,
    };

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.userId) {
            // Foydalanuvchini localStorage'da saqlash
            localStorage.setItem('userId', data.userId);
            window.location.href = 'dashboard.html';
        } else if (data.message === 'Email yoki parol noto\'g\'ri') {
            alert('Ro\'yxatdan o\'ting');
        }
    })
    .catch(error => console.error('Xato:', error));
});
