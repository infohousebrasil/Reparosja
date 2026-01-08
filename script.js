const modal = document.getElementById('servicesModal');
const btnOpen = document.getElementById('openModalBtn');
const btnClose = document.getElementById('closeModalBtn');

function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

if(btnOpen) btnOpen.onclick = openModal;
if(btnClose) btnClose.onclick = closeModal;

function nextStep(step) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + step).classList.add('active');
    const dots = document.querySelectorAll('.dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === (step - 1)));
}

document.getElementById('multiStepForm').onsubmit = function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.innerText = "Enviando...";
    
    fetch(this.action, { method: 'POST', body: new FormData(this), headers: { 'Accept': 'application/json' }})
    .then(() => {
        const texto = `Olá! Sou ${this.name.value} do ${this.bairro.value}. Preciso de: ${this.message.value}`;
        window.location.href = `https://wa.me/5521995901577?text=${encodeURIComponent(texto)}`;
    });
};
