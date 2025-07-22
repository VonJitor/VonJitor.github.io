document.addEventListener('DOMContentLoaded', function() {
    // Implementação de Lazy Load para imagens do Portfólio
    const lazyImages = document.querySelectorAll('img.lazyload');

    if ('IntersectionObserver' in window) {
        let lazyLoadObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src; // Carrega a imagem
                    lazyImage.classList.remove('lazyload'); // Remove a classe para evitar recarregamento
                    lazyLoadObserver.unobserve(lazyImage); // Para de observar a imagem
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyLoadObserver.observe(lazyImage);
        });
    } else {
        // Fallback para navegadores sem Intersection Observer (carrega todas as imagens)
        lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove('lazyload');
        });
    }

    // --- Outras interatividades aqui (se houver) ---
    // Exemplo: Feedback simples para o formulário de contato (apenas visual, não envia e-mail)
    const contactForm = document.querySelector('#contato form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Este preventDefault é importante se você for usar um serviço de terceiros
            // para o formulário (ex: Formspree). Ele impede o recarregamento da página.
            // event.preventDefault();

            // Para um site puramente estático sem backend para o formulário:
            // Alertar o usuário que o formulário é apenas demonstrativo ou que será enviado via serviço.
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;

            if (nome && email && mensagem) {
                alert('Mensagem enviada com sucesso (via serviço de formulário externo, se configurado)!');
                // Aqui você pode resetar o formulário se o preventDefault() estiver ativo
                // contactForm.reset();
            } else {
                alert('Por favor, preencha todos os campos do formulário.');
            }
        });
    }
});