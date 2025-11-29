// ============================================
// DETECÇÃO DE DISPOSITIVO MÓVEL
// ============================================
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const isLowEndDevice = navigator.deviceMemory < 4 || navigator.hardwareConcurrency < 2;

// ============================================
// CRIAR PARTÍCULAS
// ============================================
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    // Reduzir partículas em mobile
    const particleCount = isMobile ? 15 : 50;

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
            will-change: transform;
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

// ============================================
// MENU RESPONSIVO
// ============================================
function setupMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle) menuToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
}

// ============================================
// EFEITO DE MOUSE TRACKING NOS CARDS
// ============================================
function setupMouseTracking() {
    if (!isMobile) {
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
    }
}

// ============================================
// VALIDAÇÃO DE FORMULÁRIO DE CONTATO
// ============================================
function setupContactForm() {
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

            // Enviar para WhatsApp
            sendToWhatsApp(name, email, subject, message);
        });
    }
}

// Função para enviar mensagem via WhatsApp
function sendToWhatsApp(name, email, subject, message) {
    const contactForm = document.getElementById('contactForm');
    const phone = '5516999973261'; // Número sem formatação
    const text = `*Novo Contato do Portfólio*\n\n*Nome:* ${name}\n*Email:* ${email}\n*Assunto:* ${subject}\n\n*Mensagem:*\n${message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;
    
    // Abrir WhatsApp em nova aba
    window.open(whatsappUrl, '_blank');
    
    // Mostrar mensagem de sucesso
    showMessage('✓ Redirecionando para WhatsApp...', 'success');
    contactForm.reset();

    // Limpar após 2 segundos
    setTimeout(() => {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();
    }, 2000);
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para mostrar mensagem
function showMessage(text, type) {
    const contactForm = document.getElementById('contactForm');
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
function setupScrollAnimations() {
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
}

// ============================================
// SCROLL SUAVE PARA LINKS INTERNOS
// ============================================
function setupSmoothScroll() {
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
}

// ============================================
// EFEITO PARALLAX AO SCROLL - OTIMIZADO
// ============================================
function setupParallax() {
    const floatingCards = document.querySelectorAll('.floating-card');
    let scrollThrottleTimer;

    function handleScroll() {
        if (scrollThrottleTimer) return;
        
        scrollThrottleTimer = setTimeout(() => {
            const scrollY = window.pageYOffset;

            if (isMobile) {
                // Parallax mais suave em mobile
                floatingCards.forEach((card, index) => {
                    const offset = scrollY * 0.2;
                    card.style.transform = `translateY(${offset}px)`;
                });
            } else {
                // Parallax completo em desktop
                floatingCards.forEach((card, index) => {
                    const offset = scrollY * (0.5 + index * 0.1);
                    card.style.transform = `translateY(${offset}px) rotate(${offset * 0.1}deg)`;
                });
            }

            scrollThrottleTimer = null;
        }, 16);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
}

// ============================================
// ANIMAÇÃO DO NAVEGADOR AO SCROLL - OTIMIZADO
// ============================================
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let navbarScrollTimer;

    function handleNavbarScroll() {
        if (navbarScrollTimer) return;
        
        navbarScrollTimer = setTimeout(() => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 10px 40px rgba(0, 217, 255, 0.15)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.backdropFilter = 'blur(10px)';
            }

            lastScroll = currentScroll;
            navbarScrollTimer = null;
        }, 16);
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
}

// ============================================
// CONTADOR AUTOMÁTICO DE ESTATÍSTICAS
// ============================================
function setupCounters() {
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
}

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
function setupInputGlow() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.3)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
    });
}

// ============================================
// RIPPLE EFFECT - APENAS DESKTOP
// ============================================
function setupRippleEffect() {
    if (!isMobile) {
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
    }
}

// ============================================
// THEME TOGGLE - DARK/LIGHT MODE
// ============================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
}

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const isLight = document.body.classList.contains('light-theme');
        const themeText = themeToggle.querySelector('.theme-text');
        if (themeText) {
            themeText.textContent = isLight ? 'Escuro' : 'Claro';
        }
    }
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isLight = document.body.classList.contains('light-theme');
            const newTheme = isLight ? 'dark' : 'light';
            
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }
}

// ============================================
// ADICIONAR ESTILOS DINÂMICOS
// ============================================
function addDynamicStyles() {
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
}

// ============================================
// INICIALIZAR TUDO QUANDO DOM ESTIVER PRONTO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Criar partículas
    createParticles();
    
    // Setup das funcionalidades
    setupMenu();
    setupMouseTracking();
    setupContactForm();
    setupScrollAnimations();
    setupSmoothScroll();
    setupParallax();
    setupNavbarScroll();
    setupCounters();
    setupInputGlow();
    setupRippleEffect();
    addDynamicStyles();
    
    // Inicializar tema
    initTheme();
    setupThemeToggle();
    
    // Console message
    console.log('%c✨ Bem-vindo ao Portfólio Moderno! ✨', 'color: #00d9ff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #00d9ff;');
    console.log('%cDesenvolvido com ❤️ usando HTML, CSS e JavaScript', 'color: #ff006e; font-size: 12px;');
});