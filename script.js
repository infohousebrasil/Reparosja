document.addEventListener('DOMContentLoaded', () => {
    let current = 0;
    const steps = document.querySelectorAll('.step');
    const dots = document.querySelectorAll('.step-dots .dot');

    const move = (dir) => {
        const inputs = steps[current].querySelectorAll('input, textarea');
        if (dir === 1 && !Array.from(inputs).every(i => i.checkValidity())) {
            return inputs[0].reportValidity();
        }
        steps[current].classList.remove('active');
        current += dir;
        steps[current].classList.add('active');
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    };

    document.querySelectorAll('.btn-next').forEach(b => b.onclick = () => move(1));
    document.querySelectorAll('.btn-prev').forEach(b => b.onclick = () => move(-1));

    document.getElementById('multiStepForm').onsubmit = function(e) {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.disabled = true; btn.innerText = "Enviando...";
        
        fetch(this.action, { method: 'POST', body: new FormData(this), headers: { 'Accept': 'application/json' }})
        .then(() => {
            const nome = this.name.value;
            const bairro = this.bairro.value;
            const link = `https://wa.me/5521995901577?text=Olá Info House! Sou ${nome} do bairro/condomínio ${bairro}. Acabei de enviar as fotos do reparo pelo app.`;
            window.location.href = link;
        });
    };
});
