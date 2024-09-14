document.addEventListener('DOMContentLoaded', function() {
    // Foydalanuvchi tizimga kirganligini tekshirish
    const userId = localStorage.getItem('userId');

    if (!userId) {
        // Agar userId yo'q bo'lsa, foydalanuvchini login sahifasiga yuboring
        window.location.href = 'login.html';
    } else {
        // Foydalanuvchini xush kelibsiz xabarini yangilang
        document.getElementById('welcomeMessage').textContent = `Xush kelibsiz! Sizning ID: ${userId}`;
        window.location.href = '../index.html';
    
    }

    // Chiqish tugmasi
    document.getElementById('logoutBtn').addEventListener('click', function() {
        // LocalStorage'dan userId ni olib tashlash
        localStorage.removeItem('userId');
        // Login sahifasiga qaytarish
        window.location.href = 'login.html';
    });
});
