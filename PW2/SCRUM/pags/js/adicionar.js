const input = document.getElementById('arquivoInput');
const botao = document.getElementById('enviarBtn');

botao.addEventListener('click', async () => {
    const arquivo = input.files[0];
    if (!arquivo) {
        alert('Por favor, selecione um arquivo.');
        return;
    }

    const formData = new FormData();
    formData.append('file', arquivo);

    try {
        const resposta = await fetch('https://seu-servidor.com', {
            method: 'POST',
            body: formData
        });

        const resultado = await resposta.json();
        console.log('Upload concluído:', resultado);
        alert('Upload Concluído!')
        window.location.href = '../achadinhos.html';
    } catch (erro) {
        console.error('Erro no upload:', erro);
        alert('Erro! Tente novamente mais tarde')
    }
});
