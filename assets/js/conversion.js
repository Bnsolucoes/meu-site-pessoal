// Estratégias Avançadas de Conversão - BNSoluções

// 1. Exit Intent Popup
let exitIntentShown = false;

const showExitIntentPopup = () => {
    if (exitIntentShown) return;
    
    const popup = document.createElement('div');
    popup.className = 'exit-intent-popup';
    popup.innerHTML = `
        <div class="popup-overlay">
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <div class="popup-header">
                    <h3>🚀 Espere! Não Perca Esta Oportunidade</h3>
                    <p>Antes de sair, que tal agendar um <strong>diagnóstico gratuito</strong> para sua empresa?</p>
                </div>
                <div class="popup-benefits">
                    <div class="benefit">
                        <i class="fas fa-check-circle"></i>
                        <span>Análise completa do seu negócio</span>
                    </div>
                    <div class="benefit">
                        <i class="fas fa-check-circle"></i>
                        <span>Identificação de oportunidades</span>
                    </div>
                    <div class="benefit">
                        <i class="fas fa-check-circle"></i>
                        <span>Plano de ação personalizado</span>
                    </div>
                </div>
                <div class="popup-urgency">
                    <span class="urgency-text">⏰ Apenas <strong>3 vagas</strong> disponíveis esta semana!</span>
                </div>
                <div class="popup-actions">
                    <a href="https://wa.me/5511940663895?text=Olá! Vi o popup no site e quero agendar meu diagnóstico gratuito antes que as vagas acabem!" 
                       class="btn btn-primary btn-large popup-cta" target="_blank">
                        <i class="fab fa-whatsapp"></i> Quero Meu Diagnóstico Gratuito
                    </a>
                    <button class="btn btn-secondary popup-later">Talvez Mais Tarde</button>
                </div>
            </div>
        </div>
    `;
    
    // Estilos do popup
    const popupStyles = `
        .exit-intent-popup {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .popup-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .popup-content {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            max-width: 500px;
            width: 100%;
            position: relative;
            animation: slideInUp 0.4s ease-out;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        
        .popup-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6B7280;
            transition: color 0.3s ease;
        }
        
        .popup-close:hover {
            color: #374151;
        }
        
        .popup-header h3 {
            color: #1E3A8A;
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
        }
        
        .popup-header p {
            color: #6B7280;
            margin-bottom: 1.5rem;
        }
        
        .popup-benefits {
            margin-bottom: 1.5rem;
        }
        
        .benefit {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
            color: #374151;
        }
        
        .benefit i {
            color: #10B981;
        }
        
        .popup-urgency {
            background: linear-gradient(135deg, #FEF3C7, #FDE68A);
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 1.5rem;
            border-left: 4px solid #F59E0B;
        }
        
        .urgency-text {
            color: #92400E;
            font-weight: 500;
        }
        
        .popup-actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .popup-cta {
            width: 100%;
            justify-content: center;
        }
        
        .popup-later {
            width: 100%;
            justify-content: center;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 480px) {
            .popup-content {
                padding: 1.5rem;
                margin: 10px;
            }
            
            .popup-actions {
                gap: 0.5rem;
            }
        }
    `;
    
    // Adicionar estilos
    if (!document.querySelector('#popup-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'popup-styles';
        styleSheet.textContent = popupStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(popup);
    exitIntentShown = true;
    
    // Event listeners
    const closeBtn = popup.querySelector('.popup-close');
    const laterBtn = popup.querySelector('.popup-later');
    const overlay = popup.querySelector('.popup-overlay');
    
    const closePopup = () => {
        popup.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => popup.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closePopup);
    laterBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup();
    });
    
    // Tracking
    gtag && gtag('event', 'exit_intent_popup_shown', {
        event_category: 'conversion',
        event_label: 'exit_intent'
    });
};

// Detectar exit intent
document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !exitIntentShown) {
        setTimeout(showExitIntentPopup, 500);
    }
});

// 2. Scroll-based CTA
let scrollCtaShown = false;

const showScrollCta = () => {
    if (scrollCtaShown) return;
    
    const scrollCta = document.createElement('div');
    scrollCta.className = 'scroll-cta';
    scrollCta.innerHTML = `
        <div class="scroll-cta-content">
            <div class="scroll-cta-text">
                <strong>🎯 Pronto para acelerar seu crescimento?</strong>
                <span>Fale com nossos especialistas agora!</span>
            </div>
            <a href="https://wa.me/5511940663895?text=Olá! Estava navegando no site e quero falar com um especialista sobre as soluções da BNSoluções." 
               class="btn btn-primary scroll-cta-btn" target="_blank">
                <i class="fab fa-whatsapp"></i> Falar Agora
            </a>
            <button class="scroll-cta-close">&times;</button>
        </div>
    `;
    
    // Estilos do scroll CTA
    const scrollCtaStyles = `
        .scroll-cta {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #1E3A8A, #10B981);
            color: white;
            padding: 1rem;
            z-index: 9999;
            animation: slideInUp 0.4s ease-out;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
        }
        
        .scroll-cta-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            position: relative;
        }
        
        .scroll-cta-text {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
        
        .scroll-cta-text strong {
            font-size: 1.125rem;
        }
        
        .scroll-cta-text span {
            font-size: 0.875rem;
            opacity: 0.9;
        }
        
        .scroll-cta-btn {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.3);
            color: white;
            backdrop-filter: blur(10px);
        }
        
        .scroll-cta-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
        
        .scroll-cta-close {
            position: absolute;
            top: -10px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }
        
        .scroll-cta-close:hover {
            opacity: 1;
        }
        
        @media (max-width: 768px) {
            .scroll-cta-content {
                flex-direction: column;
                text-align: center;
                gap: 0.75rem;
            }
            
            .scroll-cta-btn {
                width: 100%;
                justify-content: center;
            }
        }
    `;
    
    // Adicionar estilos
    if (!document.querySelector('#scroll-cta-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'scroll-cta-styles';
        styleSheet.textContent = scrollCtaStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(scrollCta);
    scrollCtaShown = true;
    
    // Ajustar posição do botão WhatsApp
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.style.bottom = '120px';
    }
    
    // Event listener para fechar
    const closeBtn = scrollCta.querySelector('.scroll-cta-close');
    closeBtn.addEventListener('click', () => {
        scrollCta.style.animation = 'slideOutDown 0.3s ease-out';
        setTimeout(() => {
            scrollCta.remove();
            if (whatsappFloat) {
                whatsappFloat.style.bottom = '20px';
            }
        }, 300);
    });
    
    // Tracking
    gtag && gtag('event', 'scroll_cta_shown', {
        event_category: 'conversion',
        event_label: 'scroll_cta'
    });
};

// Mostrar CTA após 60% de scroll
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > 60 && !scrollCtaShown) {
        showScrollCta();
    }
});

// 3. Chatbot Simples
const createChatbot = () => {
    const chatbot = document.createElement('div');
    chatbot.className = 'chatbot';
    chatbot.innerHTML = `
        <div class="chatbot-header">
            <div class="chatbot-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="chatbot-info">
                <strong>Assistente BN</strong>
                <span class="online-status">Online agora</span>
            </div>
            <button class="chatbot-toggle">
                <i class="fas fa-chevron-down"></i>
            </button>
        </div>
        <div class="chatbot-body">
            <div class="chatbot-messages">
                <div class="message bot-message">
                    <div class="message-content">
                        Olá! 👋 Sou o assistente da BNSoluções. Como posso ajudar você hoje?
                    </div>
                </div>
            </div>
            <div class="chatbot-options">
                <button class="option-btn" data-option="servicos">
                    🎯 Conhecer nossos serviços
                </button>
                <button class="option-btn" data-option="diagnostico">
                    📊 Agendar diagnóstico gratuito
                </button>
                <button class="option-btn" data-option="orcamento">
                    💰 Solicitar orçamento
                </button>
                <button class="option-btn" data-option="contato">
                    📞 Falar com especialista
                </button>
            </div>
        </div>
    `;
    
    // Estilos do chatbot
    const chatbotStyles = `
        .chatbot {
            position: fixed;
            bottom: 90px;
            left: 20px;
            width: 320px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            z-index: 9998;
            animation: slideInLeft 0.4s ease-out;
            overflow: hidden;
        }
        
        .chatbot-header {
            background: linear-gradient(135deg, #1E3A8A, #10B981);
            color: white;
            padding: 1rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            cursor: pointer;
        }
        
        .chatbot-avatar {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .chatbot-info {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .chatbot-info strong {
            font-size: 1rem;
        }
        
        .online-status {
            font-size: 0.75rem;
            opacity: 0.9;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }
        
        .online-status::before {
            content: '';
            width: 8px;
            height: 8px;
            background: #10B981;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        .chatbot-toggle {
            background: none;
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .chatbot.collapsed .chatbot-toggle {
            transform: rotate(180deg);
        }
        
        .chatbot-body {
            max-height: 300px;
            transition: max-height 0.3s ease;
            overflow: hidden;
        }
        
        .chatbot.collapsed .chatbot-body {
            max-height: 0;
        }
        
        .chatbot-messages {
            padding: 1rem;
            max-height: 200px;
            overflow-y: auto;
        }
        
        .message {
            margin-bottom: 1rem;
        }
        
        .bot-message .message-content {
            background: #F3F4F6;
            color: #374151;
            padding: 0.75rem;
            border-radius: 12px;
            font-size: 0.875rem;
            line-height: 1.4;
        }
        
        .chatbot-options {
            padding: 0 1rem 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .option-btn {
            background: transparent;
            border: 2px solid #E5E7EB;
            color: #374151;
            padding: 0.75rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.875rem;
            text-align: left;
        }
        
        .option-btn:hover {
            border-color: #10B981;
            background: #F0FDF4;
            color: #059669;
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @media (max-width: 768px) {
            .chatbot {
                left: 10px;
                right: 10px;
                width: auto;
                bottom: 80px;
            }
        }
    `;
    
    // Adicionar estilos
    if (!document.querySelector('#chatbot-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'chatbot-styles';
        styleSheet.textContent = chatbotStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(chatbot);
    
    // Event listeners
    const header = chatbot.querySelector('.chatbot-header');
    const toggle = chatbot.querySelector('.chatbot-toggle');
    const options = chatbot.querySelectorAll('.option-btn');
    
    header.addEventListener('click', () => {
        chatbot.classList.toggle('collapsed');
    });
    
    // Respostas do chatbot
    const responses = {
        servicos: {
            message: "Oferecemos 4 soluções principais:\n\n🔧 Tecnologia Empresarial\n📱 Marketing Digital\n⚙️ Automação de Processos\n📈 Consultoria de Crescimento\n\nQual te interessa mais?",
            action: "https://wa.me/5511940663895?text=Olá! Gostaria de saber mais sobre os serviços da BNSoluções."
        },
        diagnostico: {
            message: "Perfeito! Nosso diagnóstico gratuito inclui:\n\n✅ Análise completa do negócio\n✅ Identificação de oportunidades\n✅ Plano de ação personalizado\n\nVamos agendar?",
            action: "https://wa.me/5511940663895?text=Olá! Quero agendar meu diagnóstico gratuito com a BNSoluções."
        },
        orcamento: {
            message: "Vou te conectar com nossa equipe para um orçamento personalizado. Eles vão entender suas necessidades e criar uma proposta sob medida.",
            action: "https://wa.me/5511940663895?text=Olá! Gostaria de solicitar um orçamento para os serviços da BNSoluções."
        },
        contato: {
            message: "Vou te conectar diretamente com um de nossos especialistas. Eles estão prontos para ajudar você agora mesmo!",
            action: "https://wa.me/5511940663895?text=Olá! Vim através do chatbot e gostaria de falar com um especialista da BNSoluções."
        }
    };
    
    options.forEach(option => {
        option.addEventListener('click', () => {
            const optionType = option.dataset.option;
            const response = responses[optionType];
            
            // Adicionar mensagem do bot
            const messagesContainer = chatbot.querySelector('.chatbot-messages');
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            botMessage.innerHTML = `
                <div class="message-content">
                    ${response.message.replace(/\n/g, '<br>')}
                </div>
            `;
            messagesContainer.appendChild(botMessage);
            
            // Scroll para baixo
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Abrir WhatsApp após 2 segundos
            setTimeout(() => {
                window.open(response.action, '_blank');
            }, 2000);
            
            // Tracking
            gtag && gtag('event', 'chatbot_option_clicked', {
                event_category: 'conversion',
                event_label: optionType
            });
        });
    });
    
    // Auto-mostrar após 30 segundos
    setTimeout(() => {
        if (!chatbot.classList.contains('collapsed')) {
            chatbot.style.animation = 'bounce 0.6s ease-out';
        }
    }, 30000);
};

// Mostrar chatbot após 15 segundos
setTimeout(createChatbot, 15000);

// 4. Contador de Urgência
const createUrgencyCounter = () => {
    const urgencyBar = document.createElement('div');
    urgencyBar.className = 'urgency-bar';
    urgencyBar.innerHTML = `
        <div class="urgency-content">
            <div class="urgency-icon">⚡</div>
            <div class="urgency-text">
                <strong>Oferta Especial:</strong> Diagnóstico gratuito termina em 
                <span class="countdown" id="urgency-countdown">02:47:33</span>
            </div>
            <button class="urgency-close">&times;</button>
        </div>
    `;
    
    // Estilos da barra de urgência
    const urgencyStyles = `
        .urgency-bar {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #DC2626, #EF4444);
            color: white;
            padding: 0.75rem;
            z-index: 9997;
            animation: slideInDown 0.4s ease-out;
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }
        
        .urgency-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            position: relative;
        }
        
        .urgency-icon {
            font-size: 1.25rem;
            animation: flash 1s infinite;
        }
        
        .urgency-text {
            text-align: center;
            font-size: 0.875rem;
        }
        
        .countdown {
            font-family: 'Courier New', monospace;
            font-weight: bold;
            background: rgba(255, 255, 255, 0.2);
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            margin-left: 0.25rem;
        }
        
        .urgency-close {
            position: absolute;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 1.25rem;
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        }
        
        .urgency-close:hover {
            opacity: 1;
        }
        
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-100%);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes flash {
            0%, 50% { opacity: 1; }
            25%, 75% { opacity: 0.5; }
        }
        
        @media (max-width: 768px) {
            .urgency-text {
                font-size: 0.75rem;
            }
            
            .urgency-content {
                padding: 0 2rem;
            }
        }
    `;
    
    // Adicionar estilos
    if (!document.querySelector('#urgency-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'urgency-styles';
        styleSheet.textContent = urgencyStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(urgencyBar);
    
    // Contador regressivo
    let timeLeft = 2 * 60 * 60 + 47 * 60 + 33; // 2h 47m 33s
    const countdownElement = document.getElementById('urgency-countdown');
    
    const updateCountdown = () => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            // Reiniciar contador
            timeLeft = 2 * 60 * 60 + 47 * 60 + 33;
        }
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Event listener para fechar
    const closeBtn = urgencyBar.querySelector('.urgency-close');
    closeBtn.addEventListener('click', () => {
        urgencyBar.style.animation = 'slideOutUp 0.3s ease-out';
        setTimeout(() => urgencyBar.remove(), 300);
    });
    
    // Ajustar padding do body
    document.body.style.paddingTop = '140px';
    
    // Tracking
    gtag && gtag('event', 'urgency_bar_shown', {
        event_category: 'conversion',
        event_label: 'urgency_counter'
    });
};

// Mostrar barra de urgência após 10 segundos
setTimeout(createUrgencyCounter, 10000);

// 5. Social Proof Notifications
const socialProofMessages = [
    "João Silva acabou de agendar um diagnóstico gratuito",
    "Maria Santos contratou nossos serviços de Marketing Digital",
    "TechCorp aumentou vendas em 180% com nossas soluções",
    "Carlos Lima agendou uma consultoria de crescimento",
    "InnovaBiz automatizou seus processos conosco"
];

let socialProofIndex = 0;

const showSocialProof = () => {
    const notification = document.createElement('div');
    notification.className = 'social-proof-notification';
    notification.innerHTML = `
        <div class="social-proof-content">
            <div class="social-proof-avatar">
                <i class="fas fa-user-check"></i>
            </div>
            <div class="social-proof-text">
                <strong>Atividade Recente</strong>
                <span>${socialProofMessages[socialProofIndex]}</span>
            </div>
            <button class="social-proof-close">&times;</button>
        </div>
    `;
    
    // Estilos da notificação
    const socialProofStyles = `
        .social-proof-notification {
            position: fixed;
            bottom: 160px;
            left: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            z-index: 9996;
            animation: slideInLeft 0.4s ease-out;
            max-width: 300px;
            border-left: 4px solid #10B981;
        }
        
        .social-proof-content {
            padding: 1rem;
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            position: relative;
        }
        
        .social-proof-avatar {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #10B981, #059669);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            flex-shrink: 0;
        }
        
        .social-proof-text {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            flex: 1;
        }
        
        .social-proof-text strong {
            font-size: 0.875rem;
            color: #374151;
        }
        
        .social-proof-text span {
            font-size: 0.75rem;
            color: #6B7280;
            line-height: 1.3;
        }
        
        .social-proof-close {
            position: absolute;
            top: 8px;
            right: 8px;
            background: none;
            border: none;
            color: #9CA3AF;
            font-size: 1rem;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .social-proof-close:hover {
            color: #6B7280;
        }
        
        @media (max-width: 768px) {
            .social-proof-notification {
                left: 10px;
                right: 10px;
                max-width: none;
                bottom: 140px;
            }
        }
    `;
    
    // Adicionar estilos
    if (!document.querySelector('#social-proof-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'social-proof-styles';
        styleSheet.textContent = socialProofStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Event listener para fechar
    const closeBtn = notification.querySelector('.social-proof-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutLeft 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutLeft 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Próxima mensagem
    socialProofIndex = (socialProofIndex + 1) % socialProofMessages.length;
    
    // Tracking
    gtag && gtag('event', 'social_proof_shown', {
        event_category: 'conversion',
        event_label: 'social_proof_notification'
    });
};

// Mostrar social proof a cada 45 segundos
setInterval(showSocialProof, 45000);
setTimeout(showSocialProof, 20000); // Primeira vez após 20 segundos

// 6. Tracking de Conversões
const trackConversion = (type, label) => {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            event_category: 'lead_generation',
            event_label: label,
            value: 1
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_category: type,
            content_name: label
        });
    }
    
    // Console log para debug
    console.log(`Conversão rastreada: ${type} - ${label}`);
};

// Rastrear cliques em CTAs
document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href*="wa.me"]');
    if (target) {
        const buttonText = target.textContent.trim();
        trackConversion('whatsapp_click', buttonText);
    }
});

// 7. A/B Testing para Headlines
const headlines = [
    "Transforme Seu Negócio com Tecnologia e Marketing Digital",
    "Acelere o Crescimento da Sua Empresa com Soluções Digitais",
    "Da Eficiência Interna ao Crescimento Exponencial"
];

const runHeadlineTest = () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];
        const parts = randomHeadline.split(' ');
        const highlighted = parts.map((word, index) => {
            if (word.includes('Tecnologia') || word.includes('Marketing') || word.includes('Digital') || word.includes('Crescimento')) {
                return `<span class="highlight">${word}</span>`;
            }
            return word;
        }).join(' ');
        
        heroTitle.innerHTML = highlighted;
        
        // Tracking
        gtag && gtag('event', 'headline_test', {
            event_category: 'ab_testing',
            event_label: randomHeadline
        });
    }
};

// Executar teste A/B
runHeadlineTest();

console.log('Estratégias de conversão carregadas com sucesso! 🎯');

