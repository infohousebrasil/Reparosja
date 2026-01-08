document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('multiStepForm');
    const steps = Array.from(document.querySelectorAll('.step'));
    const progressBar = document.getElementById('progressBar');
    let currentStepIndex = 0;

    const SEU_ZAP = "5521995901577"; // Seu número de WhatsApp

    // Função para atualizar a barra de progresso
    function updateProgressBar() {
        const progress = ((currentStepIndex + 1) / steps.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Função para exibir o passo atual
    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === index);
        });
        currentStepIndex = index;
        updateProgressBar();
        // Rola a página para o topo do formulário
        document.getElementById('solicitar').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Navegação para o próximo passo
    document.querySelectorAll('.btn-next').forEach(button => {
        button.addEventListener('click', () => {
            const currentStepElement = steps[currentStepIndex];
            const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
            let allInputsValid = true;

            // Valida apenas os inputs do passo atual
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity();
                    allInputsValid = false;
                }
            });

            if (allInputsValid) {
                if (currentStepIndex < steps.length - 1) {
                    showStep(currentStepIndex + 1);
                }
            }
        });
    });

    // Navegação para o passo anterior
    document.querySelectorAll('.btn-prev').forEach(button => {
        button.addEventListener('click', () => {
            if (currentStepIndex > 0) {
                showStep(currentStepIndex - 1);
            }
        });
    });

    // Inicializa o formulário no primeiro passo
    showStep(0);

    // Lógica para o slider Antes/Depois
    document.querySelectorAll('.before-after-card').forEach(card => {
        const imageWrapper = card.querySelector('.image-wrapper');
        const afterImg = card.querySelector('.after-img');
        const sliderControl = card.querySelector('.slider-control');
        let isDragging = false;

        const startDragging = (e) => {
            e.preventDefault();
            isDragging = true;
            imageWrapper.classList.add('sliding'); // Adiciona classe para desativar transição CSS
        };

        const stopDragging = () => {
            isDragging = false;
            imageWrapper.classList.remove('sliding'); // Remove classe
        };

        const onDrag = (e) => {
            if (!isDragging) return;

            const rect = imageWrapper.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX); // Suporte a touch
            let x = clientX - rect.left;

            // Limitar o slider dentro da imagem
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;

            afterImg.style.width = `${x}px`;
            sliderControl.style.left = `${x}px`;
        };

        sliderControl.addEventListener('mousedown', startDragging);
        imageWrapper.addEventListener('mousemove', onDrag);
        imageWrapper.addEventListener('mouseup', stopDragging);
        imageWrapper.addEventListener('mouseleave', stopDragging);

        // Suporte a eventos de toque para mobile
        sliderControl.addEventListener('touchstart', startDragging);
        imageWrapper.addEventListener('touchmove', onDrag);
        imageWrapper.addEventListener('touchend', stopDragging);
        imageWrapper.addEventListener('touchcancel', stopDragging);
    });

    // Envio Final do Formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = form.querySelector('input[name="name"]').value;
        const servico = form.querySelector('select[name="servico"]').value;
        const descricao = form.querySelector('textarea[name="message"]').value;

        submitBtn.disabled = true;
        submitBtn.innerText = "Enviando pedido...";

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(res => {
            if (res.ok) {
                // Mensagem personalizada para o WhatsApp
                const whatsappMessage = `Olá! Sou ${nome}. Acabei de enviar um pedido de orçamento pelo site para ${servico.toUpperCase()}.\n\nDescrição do problema: ${descricao}\n\nJá anexei as fotos/vídeos. Poderiam verificar?`;
                window.location.href = `https://wa.me/${SEU_ZAP}?text=${encodeURIComponent(whatsappMessage)}`;
            } else {
                alert("Erro ao enviar o formulário. Por favor, tente novamente.");
                submitBtn.disabled = false;
                submitBtn.innerText = "Tentar Novamente";
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            alert("Erro de conexão. Verifique sua internet e tente novamente.");
            submitBtn.disabled = false;
            submitBtn.innerText = "Finalizar e Chamar no WhatsApp";
        });
    });
});
