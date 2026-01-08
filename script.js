// Navegação do Formulário
function nextStep(step) {
    const nameInput = document.querySelector('input[name="name"]');
    if (step === 2 && !nameInput.checkValidity()) {
        return nameInput.reportValidity();
    }
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + step).classList.add('active');
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === (step - 1)));
}

// Modal de Serviços
function openServices() {
    document.getElementById('servicesModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeServices() {
    document.getElementById('servicesModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Envio para WhatsApp
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
        const textoZap = `Olá InfoHouse Itaboraí! Sou ${nome} do ${bairro}. Preciso de: ${msg}.`;
        window.location.href = `https://wa.me/5521995901577?text=${encodeURIComponent(textoZap)}`;
    }).catch(() => {
        alert("Erro na conexão. Tente novamente.");
        btn.disabled = false;
    });
};

// Fechar modal ao clicar fora
window.onclick = function(e) {
    if (e.target.className === 'modal-overlay') closeServices();
};
