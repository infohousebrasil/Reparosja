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
    // Substitua o bloco do fetch por este para testar:
fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData
})
.then(async res => {
    const json = await res.json(); // Isso nos mostra a resposta do servidor
    if (res.status === 200) {
        window.location.href = linkZap;
    } else {
        console.log("Erro detalhado:", json);
        alert("Erro do servidor: " + json.message); // Vai te dizer exatamente o que está errado
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
