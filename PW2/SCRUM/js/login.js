// FUNÇÃO QUE CAPTURA O ELEMENTO HTML DO BUTTON
const login_button = document.querySelector('.login_button')
login_button.addEventListener('click', login);

// FUNÇÃO AO CLICAR NO BOTÃO
function login(event) {
    if (event) event.preventDefault();
    // ENVIO PARA O INDEX DO SISTEMA
    window.location.href = '../pags/index.html';
}