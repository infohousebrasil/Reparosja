document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('multiStepForm');
    const steps = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const submitBtn = document.getElementById('submitBtn');

    // Função para mudar de passo corrigida
    function goToStep(stepNumber) {
        steps.forEach(s => s.classList.remove('active'));
        document.getElementById(`step${stepNumber}`).classList.add('active');
        window.scrollTo(0, document.getElementById('solicitar').offsetTop - 100);
    }

    // Botões Próximo
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = button.closest('.step');
            const input = currentStep.querySelector('input, select, textarea');
            
            if (input.checkValidity()) {
                const nextStepNum = parseInt(currentStep.id.replace('step', '')) + 1;
                goToStep(nextStepNum);
            } else {
                input.reportValidity();
            }
        });
    });

    // Botões Voltar
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = button.closest('.step');
            const prevStepNum = parseInt(currentStep.id.replace('step', '')) - 1;
            goToStep(prevStepNum);
        });
    });

    // Envio Final
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const SEU_ZAP = "5521995901577";
        const nome = document.getElementById('input_name').value;
        const servico = document.getElementById('input_servico').value;

        submitBtn.disabled = true;
        submitBtn.innerText = "Enviando fotos...";

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(res => {
            if (res.ok) {
                const msg = `Olá! Sou ${nome}. Acabei de enviar fotos no site para o serviço de ${servico}. Pode me passar o orçamento?`;
                window.location.href = `https://wa.me/${SEU_ZAP}?text=${encodeURIComponent(msg)}`;
            } else {
                alert("Erro ao enviar. Tente novamente.");
                submitBtn.disabled = false;
            }
        })
        .catch(() => {
            alert("Erro de conexão.");
            submitBtn.disabled = false;
        });
    });
});
