const form = document.getElementById('repairForm');
const btn = document.getElementById('submitBtn');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Configurações
    const SEU_ZAP = "5521995901577"; // COLOQUE SEU NÚMERO AQUI
    
    // Coleta de dados
    const nome = form.name.value;
    const servico = form.servico.value;
    const descricao = form.descricao.value;

    // Feedback visual
    btn.disabled = true;
    btn.innerText = "Enviando fotos e dados...";

    const formData = new FormData(form);

    // 1. Enviar para o E-mail via Web3Forms
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(res => {
        if (res.status === 200) {
            // 2. Redirecionar para WhatsApp
            const texto = `Olá! Me chamo ${nome}. Solicitei um orçamento no site para ${servico.toUpperCase()}.\n\nDescrição: ${descricao}\n\nJá enviei as fotos pelo formulário!`;
            const linkZap = `https://wa.me/${SEU_ZAP}?text=${encodeURIComponent(texto)}`;
            
            window.location.href = linkZap;
        } else {
            alert("Erro ao enviar. Verifique se a chave do Web3Forms está correta.");
            btn.disabled = false;
            btn.innerText = "Tentar novamente";
        }
    })
    .catch(err => {
        alert("Erro de rede. Tente novamente.");
        btn.disabled = false;
        btn.innerText = "Enviar Pedido e Abrir WhatsApp";
    });
});
