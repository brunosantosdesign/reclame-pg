// Seleciona os elementos do formulário e os campos de entrada
const form = document.querySelector('.cadastro-form');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const confirmarSenhaInput = document.getElementById('confirmar-senha');
const cadastrarButton = document.querySelector(".cadastro-button");
const googleButton = document.querySelector(".google-button");
const loginLink = document.querySelector(".login-link a");
const feedback = document.getElementById("feedback");

// Adiciona um evento de envio ao formulário
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio padrão do formulário para realizar a validação
  validarCadastro(); // Chama a função de validação
});

// Função de validação
function validarCadastro() {
  // Obtem os valores dos campos de entrada
  const nome = nomeInput.value.trim()
  const email = emailInput.value.trim()
  const senha = senhaInput.value.trim()
  const confirmarSenha = confirmarSenhaInput.value.trim()

  // Validação dos campos
  if (nome === "") {
    alert("Por favor, insira seu nome completo.")
    return
  }

  if (email === "") {
    alert("Por favor, insira seu e-mail.")
    return
  }

  // Adicionando Validação de Email
  // Expressão regular para validar o e-mail
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    alert("Por favor, insira um e-mail válido.")
    return
  }

  if (senha === "") {
    alert("Por favor, insira sua senha.")
    return
  }

  if (confirmarSenha === "") {
    alert("Por favor, confirme sua senha.")
    return
  }

  // Verifica se as senhas coincidem
  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem. Por favor, tente novamente.")
  }

  // Se tudo estiver certo, envia o formulário
  form.submit()
}



// 1. Função para validar o formulário de cadastro
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Previne o envio automático do formulário

  // Verificar se todos os campos estão preenchidos
  if (nomeInput.value === "" || emailInput.value === "" || senhaInput.value === "" || confirmarSenhaInput.value === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Verificar se a senha e a confirmação de senha coincidem
  if (senhaInput.value !== confirmarSenhaInput.value) {
    alert("As senhas não coincidem.");
    return;
  }

  // Exibe uma mensagem de sucesso
  //alert("Cadastro realizado com sucesso!");
  // Aqui você pode adicionar o código para enviar o formulário a um servidor ou processá-lo conforme necessário
});

// 2. Função para o botão "Entrar com o Google"
googleButton.addEventListener("click", function() {
  alert("Função de login com o Google em desenvolvimento.");
  // Aqui é onde a autenticação com o Google seria implementada usando a API de login do Google
});

// 3. Redirecionamento para a página de login
loginLink.addEventListener("click", function(event) {
  event.preventDefault(); // Evita o comportamento padrão do link
  window.location.href = "/pages/login.html"; // Redireciona para a página de login
});

// Função para mostrar a mensagem de feedback
function showFeedback(message, isSuccess) {
  feedback.style.display = "block";
  feedback.textContent = message;
  feedback.className = "feedback"; // Reseta as classes

  if (isSuccess) {
    feedback.classList.add("success");
  } else {
    feedback.classList.add("error");
  }
}

// 1. Função para validar o formulário de cadastro
form.addEventListener("submit", function(event) {
  event.preventDefault() // Previne o envio automático do formulário

  // Verificar se todos os campos estão preenchidos
  if (
    nomeInput.value === "" ||
    emailInput.value === "" ||
    senhaInput.value === "" ||
    confirmarSenhaInput.value === ""
  ) {
    showFeedback("Por favor, preencha todos os campos.", false)
    return
  }

  // Verificar se a senha e a confirmação de senha coincidem
  if (senhaInput.value !== confirmarSenhaInput.value) {
    showFeedback("As senhas não coincidem.", false)
    return;
  }

  // Exibe uma mensagem de sucesso
  showFeedback("Cadastro realizado com sucesso!", true)

  // Limpar os campos após o sucesso (opcional)
  form.reset();
});

// 2. Função para o botão "Entrar com o Google"
googleButton.addEventListener("click", function() {
  showFeedback("Função de login com o Google em desenvolvimento.", false);
});

// 3. Redirecionamento para a página de login
loginLink.addEventListener("click", function(event) {
  event.preventDefault();
  window.location.href = "/pages/login.html"
});

