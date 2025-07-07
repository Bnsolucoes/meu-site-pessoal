// Navegação móvel
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header transparente no scroll
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    // Esconder/mostrar header no scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Animações ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observar elementos para animação
const animateElements = document.querySelectorAll('.problem-card, .service-card, .testimonial-card, .feature');
animateElements.forEach(el => observer.observe(el));

// Contador animado para estatísticas
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('%')) {
                    counter.textContent = Math.ceil(current) + '%';
                } else if (counter.textContent.includes('+')) {
                    counter.textContent = '+' + Math.ceil(current);
                } else {
                    counter.textContent = Math.ceil(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent.includes('%') ? target + '%' : 
                                   counter.textContent.includes('+') ? '+' + target : target;
            }
        };
        
        updateCounter();
    });
};

// Observar seção hero para iniciar contadores
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Formulário de contato
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Criar mensagem para WhatsApp
        const whatsappMessage = `Olá! Meu nome é ${name}.

📧 Email: ${email}
📱 Telefone: ${phone}
🎯 Serviço de interesse: ${service}

💬 Mensagem: ${message}

Gostaria de saber mais sobre as soluções da BNSoluções.`;
        
        // Codificar mensagem para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Abrir WhatsApp
        const whatsappURL = `https://wa.me/5511940663895?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
        
        // Mostrar mensagem de sucesso
        showSuccessMessage();
        
        // Limpar formulário
        this.reset();
    });
}

// Função para mostrar mensagem de sucesso
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10B981, #059669);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        ">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-check-circle"></i>
                <span>Mensagem enviada! Redirecionando para WhatsApp...</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    // Remover mensagem após 3 segundos
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Adicionar CSS para animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading para imagens
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Preloader (opcional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Botão de voltar ao topo
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #1E3A8A, #10B981);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // Mostrar/esconder botão baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
};

createBackToTopButton();

// Validação de formulário em tempo real
const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remover mensagens de erro anteriores
    clearError(e);
    
    // Validações específicas
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Por favor, insira um email válido');
        }
    }
    
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\(\)\-\+]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Por favor, insira um telefone válido');
        }
    }
    
    if (field.required && !value) {
        showFieldError(field, 'Este campo é obrigatório');
    }
}

function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #EF4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    field.style.borderColor = '#EF4444';
    field.parentNode.appendChild(errorDiv);
}

function clearError(e) {
    const field = e.target;
    const errorDiv = field.parentNode.querySelector('.field-error');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    field.style.borderColor = '#E5E7EB';
}

// Analytics e tracking (Google Analytics, Facebook Pixel, etc.)
// Adicionar aqui os códigos de tracking quando necessário

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log('Page Load Time:', entry.loadEventEnd - entry.loadEventStart);
        }
    }
});

perfObserver.observe({ entryTypes: ['navigation'] });

// Service Worker para cache (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Otimização de imagens responsivas
const updateImageSources = () => {
    const images = document.querySelectorAll('img[data-sizes]');
    images.forEach(img => {
        const sizes = JSON.parse(img.dataset.sizes);
        const screenWidth = window.innerWidth;
        
        let selectedSize = sizes[0];
        for (const size of sizes) {
            if (screenWidth >= size.minWidth) {
                selectedSize = size;
            }
        }
        
        if (img.src !== selectedSize.src) {
            img.src = selectedSize.src;
        }
    });
};

window.addEventListener('resize', updateImageSources);
updateImageSources();

// Detecção de dispositivo móvel
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    document.body.classList.add('mobile-device');
    
    // Otimizações específicas para mobile
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.style.bottom = '80px'; // Evitar conflito com navegação mobile
    }
}

// Acessibilidade - navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Fechar menu mobile se estiver aberto
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Focus trap para menu mobile
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        const firstFocusable = navMenu.querySelector(focusableElements);
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
});

// Smooth reveal animations
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

console.log('BNSoluções - Site carregado com sucesso! 🚀');

