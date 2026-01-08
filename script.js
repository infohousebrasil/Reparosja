function nextStep(step) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + step).classList.add('active');
}

document.getElementById('multiStepForm').onsubmit = function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const nome = this.name.value;
    const bairro = this.bairro.value;
    const msg = this.message.value;

    btn.disabled = true;
    btn.innerText = "Enviando...";

    fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
    }).then(() => {
        // Redireciona com uma mensagem pedindo as fotos no Zap
        const textoZap = `Olá InfoHouse! Me chamo ${nome} do ${bairro}. Preciso de: ${msg}. Me avisem quando puderem falar para eu enviar as fotos!`;
        window.location.href = `https://wa.me/5521995901577?text=${encodeURIComponent(textoZap)}`;
    }).catch(() => {
        alert("Erro ao enviar. Tente novamente.");
        btn.disabled = false;
    });
};
