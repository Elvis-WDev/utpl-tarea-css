/**
 * ============================================
 * JAVASCRIPT PRINCIPAL - EVOLUCIÓN HTML
 * Universidad Técnica Particular de Loja
 * Tecnología Web - 2025
 * ============================================
 */

// ============================================
// TEMA CLARO/OSCURO
// ============================================

/**
 * Inicializa el sistema de tema claro/oscuro
 * Guarda la preferencia del usuario en localStorage
 */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');

    // Verificar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Aplicar tema inicial
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme, themeIcon);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark', themeIcon);
    }

    // Event listener para el botón de cambio de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // Aplicar nuevo tema
            document.documentElement.setAttribute('data-theme', newTheme);

            // Guardar preferencia en localStorage
            localStorage.setItem('theme', newTheme);

            // Actualizar icono
            updateThemeIcon(newTheme, themeIcon);

            // Animación del botón
            themeToggle.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 300);
        });
    }
}

/**
 * Actualiza el icono según el tema actual
 * @param {string} theme - Tema actual ('light' o 'dark')
 * @param {HTMLElement} iconElement - Elemento del icono
 */
function updateThemeIcon(theme, iconElement) {
    if (iconElement) {
        if (theme === 'dark') {
            iconElement.classList.remove('fa-moon');
            iconElement.classList.add('fa-sun');
        } else {
            iconElement.classList.remove('fa-sun');
            iconElement.classList.add('fa-moon');
        }
    }
}

// ============================================
// BOTÓN SCROLL TO TOP
// ============================================

/**
 * Inicializa el botón de scroll hacia arriba
 */
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        // Mostrar/ocultar botón según la posición del scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Acción al hacer clic
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// NAVEGACIÓN ACTIVA
// ============================================

/**
 * Marca el enlace de navegación activo según la página actual
 */
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Obtener solo el nombre del archivo
        const linkPage = href.split('/').pop();

        // Remover clase active de todos
        link.classList.remove('active');

        // Añadir clase active al enlace correcto
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// ============================================
// ANIMACIONES DE ENTRADA
// ============================================

/**
 * Inicializa animaciones de entrada para elementos
 * usando Intersection Observer
 */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar secciones y artículos
    const animatedElements = document.querySelectorAll('section, article, .feature-card, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// VALIDACIÓN DE FORMULARIO
// ============================================

/**
 * Inicializa la validación del formulario de contacto
 */
function initFormValidation() {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Obtener valores del formulario
            const nombre = document.getElementById('nombre')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const mensaje = document.getElementById('mensaje')?.value.trim();

            // Validación básica
            if (!nombre || !email || !mensaje) {
                showNotification('Por favor, completa todos los campos requeridos.', 'error');
                return;
            }

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }

            // Simular envío exitoso
            showNotification('¡Mensaje enviado correctamente! Gracias por contactarnos.', 'success');
            form.reset();
        });
    }
}

/**
 * Muestra una notificación temporal
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación ('success' o 'error')
 */
function showNotification(message, type) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        font-family: 'Poppins', sans-serif;
        font-size: 0.95rem;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    // Añadir al DOM
    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Añadir estilos de animación para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// EFECTO RIPPLE EN BOTONES
// ============================================

/**
 * Añade efecto ripple a los botones
 */
function initRippleEffect() {
    const buttons = document.querySelectorAll('button, .btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Añadir keyframe para ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// INICIALIZACIÓN
// ============================================

/**
 * Inicializa todas las funcionalidades cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollTop();
    setActiveNav();
    initFormValidation();
    initRippleEffect();

    // Iniciar animaciones con un pequeño delay
    setTimeout(() => {
        initAnimations();
    }, 100);

    console.log('✅ Sitio web cargado correctamente - Evolución del HTML');
});

// ============================================
// MEJORA DE ACCESIBILIDAD - FOCUS TRAP
// ============================================

/**
 * Mejora la accesibilidad del teclado
 */
document.addEventListener('keydown', (e) => {
    // Esc para cerrar notificaciones
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(n => n.remove());
    }
});
