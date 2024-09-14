// document.getElementById('registerForm').addEventListener('submit', function(event) {
//   event.preventDefault();

//   const name = document.getElementById('name').value;
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   const confirmPassword = document.getElementById('confirmPassword').value;

//   const userData = {
//       name: name,
//       email: email,
//       password: password,
//       confirmPassword: confirmPassword,
//   };

//   fetch('http://localhost:3000/api/register', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userData)
//   })
//   .then(response => response.json())
//   .then(data => {
//     //   alert(data.message);
//       if (data.message === 'Tasdiqlash kodi emailingizga yuborildi') {
//           document.getElementById('verificationSection').style.display = 'block';
//       }
//   })
//   .catch(error => console.error('Xato:', error));
// });

// document.getElementById('verifyEmailBtn').addEventListener('click', function() {
//   const email = document.getElementById('email').value;
//   const name = document.getElementById('name').value;
//   const password = document.getElementById('password').value;
//   const code = document.getElementById('verificationCode').value;

//   const verificationData = {
//       email: email,
//       name: name,
//       password: password,
//       code: code
//   };

//   fetch('http://localhost:3000/api/verify-email', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(verificationData)
//   })
//   .then(response => response.json())
//   .then(data => {
//       alert(data.message);
//       if (data.message === 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz') {
//           window.location.href = 'login.html';
//       }
//   })
//   .catch(error => console.error('Xato:', error));
// });
