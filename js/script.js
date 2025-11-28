// ============================================
// PARTÍCULAS ANIMADAS - BACKGROUND
// ============================================
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(0, 217, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 20 + 20}s linear infinite;
            pointer-events: none;
        `;
        particlesContainer.appendChild(particle);
    }

    // Adicionar animação no CSS dinâmico
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(0px) translateX(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-${window.innerHeight}px) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

createParticles();

// ============================================
// MENU RESPONSIVO
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// EFEITO DE MOUSE TRACKING NOS CARDS
// ============================================
const projectCards = document.querySelectorAll('.project-card, .skill-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
    });
});

// ============================================
// VALIDAÇÃO DE FORMULÁRIO DE CONTATO
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validações
        if (!name) {
            showMessage('Por favor, preencha seu nome', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Por favor, insira um email válido', 'error');
            return;
        }

        if (!subject) {
            showMessage('Por favor, preencha o assunto', 'error');
            return;
        }

        if (!message) {
            showMessage('Por favor, preencha a mensagem', 'error');
            return;
        }

        // Se passou na validação
        showMessage('✓ Mensagem enviada com sucesso! Obrigado pelo contato.', 'success');
        contactForm.reset();

        // Limpar após 3 segundos
        setTimeout(() => {
            const existingMessage = document.querySelector('.form-message');
            if (existingMessage) existingMessage.remove();
        }, 3000);
    });
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para mostrar mensagem
function showMessage(text, type) {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Cria novo elemento de mensagem
    const message = document.createElement('div');
    message.className = `form-message form-message-${type}`;
    message.textContent = text;
    message.style.cssText = `
        animation: slideInDown 0.3s ease-out;
    `;

    // Insere a mensagem após o formulário
    contactForm.parentElement.insertBefore(message, contactForm.nextSibling);

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        message.style.animation = 'slideInUp 0.3s ease-out';
        setTimeout(() => message.remove(), 300);
    }, 5000);
}

// ============================================
// ANIMAÇÃO DE SCROLL - INTERSECTION OBSERVER
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            entry.target.style.opacity = '0';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards com delay progressivo
document.querySelectorAll('.skill-card, .project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = (index * 0.1) + 's';
    observer.observe(card);
});

// ============================================
// SCROLL SUAVE PARA LINKS INTERNOS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// EFEITO PARALLAX AO SCROLL
// ============================================
const floatingCards = document.querySelectorAll('.floating-card');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    floatingCards.forEach((card, index) => {
        const offset = scrollY * (0.5 + index * 0.1);
        card.style.transform = `translateY(${offset}px) rotate(${offset * 0.1}deg)`;
    });

    // Efeito glow nos gradientes
    const heroBeforeEl = document.querySelector('.hero::before');
    if (scrollY < window.innerHeight) {
        const offset = scrollY * 0.5;
        document.querySelector('.hero::before').style.transform = `translate(${offset}px, ${offset * -0.5}px)`;
    }
});

// ============================================
// ANIMAÇÃO DO NAVEGADOR AO SCROLL
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 10px 40px rgba(0, 217, 255, 0.15)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.backdropFilter = 'blur(10px)';
    }

    lastScroll = currentScroll;
});

// ============================================
// CONTADOR AUTOMÁTICO DE ESTATÍSTICAS
// ============================================
const observerCounterOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const finalNumber = parseInt(stat.textContent);

            if (!stat.hasAttribute('data-counted')) {
                animateCounter(stat, finalNumber, 2000);
                stat.setAttribute('data-counted', 'true');
            }

            counterObserver.unobserve(stat);
        }
    });
}, observerCounterOptions);

document.querySelectorAll('.stat-number').forEach(stat => {
    counterObserver.observe(stat);
});

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============================================
// EFEITO DE GLOW NAS LABELS
// ============================================
const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.3)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.boxShadow = 'none';
    });
});

// ============================================
// PROGRESS BAR - ANIMAR AO SCROLL
// ============================================
const progressBars = document.querySelectorAll('.progress');

const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target;
            const width = progress.style.width;
            progress.style.width = '0';
            
            setTimeout(() => {
                progress.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                progress.style.width = width;
            }, 100);

            progressObserver.unobserve(progress);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// ============================================
// EFEITO DE RIPPLE NO CLIQUE
// ============================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple-animation 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Adicionar animação de ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c✨ Bem-vindo ao Portfólio Moderno! ✨', 'color: #00d9ff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #00d9ff;');
console.log('%cDesenvolvido com ❤️ usando HTML, CSS e JavaScript', 'color: #ff006e; font-size: 12px;');
