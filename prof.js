document.addEventListener('DOMContentLoaded', function () {
    const auth = document.getElementById('auth');
    const register = document.getElementById('register');
    const dashboard = document.getElementById('dashboard');
    const userDisplay = document.getElementById('user_display');

    const authButton = document.getElementById('auth_button');
    const registerButton = document.getElementById('register_button');
    const logoutButton = document.getElementById('logout_button');

    const toggle = document.getElementById('toggle');
    const toggleLogin = document.getElementById('toggle_login');

    // Проверяем, есть ли сохраненный пользователь
    if (localStorage.getItem('username')) {
        showDashboard(localStorage.getItem('username'));
    }

    // Вход
    authButton.addEventListener('click', function () {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (localStorage.getItem(username) === password) {
            showDashboard(username);
        } else {
            alert('Неправильное имя пользователя или пароль');
        }
    });

    // Регистрация
    registerButton.addEventListener('click', function () {
        const regUsername = document.getElementById('reg_username').value;
        const regPassword = document.getElementById('reg_password').value;

        if (localStorage.getItem(regUsername)) {
            alert('Пользователь с таким именем уже существует!');
        } else {
            localStorage.setItem(regUsername, regPassword);
            alert('Регистрация прошла успешно! Пожалуйста, войдите.');
            toggleLogin.click(); // переключаемся на форму входа
        }
    });

    // Выход
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('username');
        showAuth();
    });

    // Переключение между формами
    toggle.addEventListener('click', function () {
        register.style.display = 'block';
        auth.style.display = 'none';
    });

    toggleLogin.addEventListener('click', function () {
        register.style.display = 'none';
        auth.style.display = 'block';
    });

    function showDashboard(username) {
        userDisplay.textContent = username;
        dashboard.style.display = 'block';
        auth.style.display = 'none';
        register.style.display = 'none';

        // Сохраняем имя пользователя в LocalStorage
        localStorage.setItem('username', username);
    }

    function showAuth() {
        dashboard.style.display = 'none';
        auth.style.display = 'block';
        register.style.display = 'none';
    }
});






const iconUploadInput = document.getElementById('icon-upload');
const userIconImg = document.getElementById('user-icon');
const userIconDashboardImg = document.getElementById('user-icon-dashboard');

iconUploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    const imageData = event.target.result;
    localStorage.setItem('user-icon', imageData);
    userIconImg.src = imageData;
    userIconDashboardImg.src = imageData;
  };

  reader.readAsDataURL(file);
});

// Load the saved image data from localStorage
const savedImageData = localStorage.getItem('user-icon');
if (savedImageData) {
  userIconImg.src = savedImageData;
  userIconDashboardImg.src = savedImageData;
}