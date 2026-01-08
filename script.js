document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('multiStepForm');
    const steps = Array.from(document.querySelectorAll('.step'));
    const progress = document.getElementById('progress');
    const submitBtn = document.getElementById('submitBtn');
    let currentStep = 1;

    // Navegação Próximo
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = steps[currentStep-1].querySelector('input, select');
            if(input.checkValidity()) {
                steps[currentStep-1].classList.remove('active');
                currentStep++;
                steps[currentStep-1].classList.add('active');
                updateUI();
            } else {
                input.reportValidity();
            }
        });
    });

    // Navegação Voltar
    document.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', () => {
            steps[currentStep-1].classList.remove('active');
            currentStep--;
            steps[currentStep-1].classList.add('active');
            updateUI();
        });
    });

    function updateUI() {
        progress.style.width = (currentStep / steps.length) * 100 + '%';
        window.scrollTo({ top: document.getElementById('orcamento').offsetTop - 100, behavior: 'smooth' });
    }

    // Envio Final
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.innerText = "Enviando Pedido...";

        const formData = new FormData(form);
        const zapLink = "https://wa.me/5521995901577?text=";
        const msg = encodeURIComponent(`Olá! Me chamo ${form.name.value}. Enviei as fotos no site para o serviço de ${form.servico.value}. Pode me passar o orçamento?`);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(res => {
            if(res.ok) {
                window.location.href = zapLink + msg;
            } else {
                alert("Erro ao enviar. Tente novamente.");
                submitBtn.disabled = false;
            }
        }).catch(() => {
            alert("Erro de conexão.");
            submitBtn.disabled = false;
        });
    });
});
