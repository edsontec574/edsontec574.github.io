// Efecto de desplazamiento suave para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Ajuste para el header fijo
                behavior: 'smooth'
            });
            
            // Actualizar la URL sin recargar la página
            history.pushState(null, '', targetId);
        }
    });
});

// Animación de aparición de las tarjetas al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar las tarjetas de etapas y seguridad
document.querySelectorAll('.etapa-card, .seguridad-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Añadir la clase visible cuando se carga la página
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.etapa-card, .seguridad-item').forEach(card => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 100);
    });
});

// Actualizar estilos cuando los elementos son visibles
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.etapa-card, .seguridad-item').forEach(card => {
        card.addEventListener('transitionend', function() {
            if (this.classList.contains('visible')) {
                this.style.opacity = '1';
                this.style.transform = 'translateY(0)';
            }
        });
    });
});

// Efecto de carga suave de la página
document.body.style.opacity = '0';
window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.5s ease-in';
    document.body.style.opacity = '1';
});
