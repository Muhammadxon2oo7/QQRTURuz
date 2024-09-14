document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const newPassword = document.getElementById('newPassword').value;

    fetch('http://localhost:3000/api/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token, newPassword: newPassword })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === 'Parolingiz muvaffaqiyatli tiklandi') {
            window.location.href = 'login.html';
        }
    })
    .catch(error => console.error('Xato:', error));
});
