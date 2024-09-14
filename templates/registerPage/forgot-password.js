document.getElementById('forgotPassword').addEventListener('click', function(event) {
    event.preventDefault();

    const email = prompt('Iltimos, email manzilingizni kiriting:');

    if (email) {
        fetch('http://localhost:3000/api/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.error('Xato:', error));
    }
});
