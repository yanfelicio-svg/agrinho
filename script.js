// =============================================
// SCRIPT.JS - Agro Forte | Futuro Sustentável
// AGRINHO 2026 - Tema Sustentabilidade
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== MENU HAMBÚRGUER ====================
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');

    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('active');
            
            // Animação do ícone (opcional)
            if (hamburger.innerHTML === '☰') {
                hamburger.innerHTML = '✕';
            } else {
                hamburger.innerHTML = '☰';
            }
        });

        // Fecha o menu ao clicar em um link (mobile)
        document.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    menu.classList.remove('active');
                    hamburger.innerHTML = '☰';
                }
            });
        });
    }

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==================== FORMULÁRIO DE CONTATO ====================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const mensagem = this.querySelector('textarea').value.trim();
            
            // Validação simples
            if (!nome || !email || !mensagem) {
                alert('❗ Por favor, preencha todos os campos.');
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                alert('❗ Por favor, insira um e-mail válido.');
                return;
            }
            
            // Simulação de envio
            const btn = this.querySelector('button');
            const textoOriginal = btn.textContent;
            
            btn.textContent = 'Enviando...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('✅ Mensagem enviada com sucesso!\n\nObrigado por contribuir com um agro mais sustentável. 🌱');
                
                // Limpa o formulário
                contactForm.reset();
                
                // Restaura botão
                btn.textContent = textoOriginal;
                btn.disabled = false;
            }, 1200);
        });
    }

    // ==================== ANIMAÇÕES AO SCROLL ====================
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });

    // ==================== COUNTER ANIMATION (Estatísticas) ====================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (element.dataset.suffix || '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + (element.dataset.suffix || '');
            }
        }, 16);
    }

    // Exemplo: Se quiser adicionar números animados no futuro
    // Basta colocar data-target="85" class="stat-number" em um <span>

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        if (!isNaN(target)) {
            const observerStat = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(stat, target);
                        observerStat.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            observerStat.observe(stat);
        }
    });

    // ==================== BOTÃO FLUTUANTE (Opcional) ====================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--secondary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: none;
        z-index: 1000;
        transition: all 0.3s;
    `;
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==================== MENSAGEM DE BOAS-VINDAS NO CONSOLE ====================
    console.log('%c🌱 Agro Forte - Futuro Sustentável\nProjeto AGRINHO 2026 carregado com sucesso!', 
        'color: #2e7d32; font-family: monospace; font-size: 14px;');
});
