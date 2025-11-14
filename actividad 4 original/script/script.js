document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica del Tema (Día/Noche)
    const body = document.body;
    const themeDiaOpt = document.getElementById('theme-dia-opt');
    const themeNocheOpt = document.getElementById('theme-noche-opt');

    // Función para aplicar el tema
    const applyTheme = (theme) => {
        body.classList.remove('theme-dia', 'theme-noche');
        body.classList.add(theme);
        localStorage.setItem('websiteTheme', theme);
    };

    // Cargar tema guardado o usar 'theme-dia' por defecto
    const savedTheme = localStorage.getItem('websiteTheme') || 'theme-dia';
    applyTheme(savedTheme);

    // Event Listeners para cambiar el tema
    if (themeDiaOpt) {
        themeDiaOpt.addEventListener('click', (e) => {
            e.preventDefault();
            applyTheme('theme-dia');
        });
    }

    if (themeNocheOpt) {
        themeNocheOpt.addEventListener('click', (e) => {
            e.preventDefault();
            applyTheme('theme-noche');
        });
    }


    // 2. Lógica del Login (solo en login.html)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        // Credenciales de ejemplo para el par de programadores
        // ¡Cada par debe usar sus propias credenciales!
        const VALID_USERS = {
            'yoel': '123',
            'rosa': '0123', 
        };

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Detener el envío normal del formulario

            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            // Limpiar mensaje de error
            errorMessage.textContent = '';

            // Validar credenciales
            if (VALID_USERS[usernameInput] && VALID_USERS[usernameInput] === passwordInput) {
                // Credenciales correctas
                alert('Inicio de sesión exitoso. Redirigiendo a home.html');
                window.location.href = 'home.html';
            } else {
                // Credenciales incorrectas
                errorMessage.textContent = 'Usuario o contraseña incorrectos.';
            }
        });
    }

    // 3. Lógica del Idioma (index.html) - Funcionalidad básica sin traducción real
    const langEn = document.getElementById('lang-en');
    const langEs = document.getElementById('lang-es');

    if (langEn && langEs) {
        const setLanguage = (langCode) => {
            // En una aplicación real, esto cargaría archivos de traducción
            alert(`Cambiando idioma a: ${langCode === 'en' ? 'English' : 'Español'}`);
            document.documentElement.lang = langCode;
            // Solo para el ejemplo: se podría actualizar dinámicamente el contenido
        };

        langEn.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage('en');
        });

        langEs.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage('es');
        });
    }
});