// Menu mobile toggle
const menuToggle = document.getElementById("menuToggle")
const nav = document.getElementById("navLinks")

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("show") // Mostra/esconde o menu
})


// Função para controlar o dropdown do usuário
document.addEventListener("DOMContentLoaded", function() {
    const dropdownToggle = document.getElementById("userToggle");
    const dropdownMenu = document.getElementById("dropdownMenu");

    dropdownToggle.addEventListener("click", function(event) {
        event.stopPropagation(); // Evita que o clique propague para o body
        dropdownMenu.classList.toggle("show");
    });

    // Fecha o dropdown se clicar fora dele
    document.addEventListener("click", function(event) {
        if (!dropdownToggle.contains(event.target)) {
            dropdownMenu.classList.remove("show");
        }
    });
});

// Botão "Nova Reclamação" (Navlinks e Acesso Rápido)
const novaReclamacaoBtns = document.querySelectorAll(".nova-reclamacao-btn")

novaReclamacaoBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Pode ser um link para uma nova página:
    // window.location.href = 'nova-reclamacao.html';

    // Ou abrir um modal (se estiver usando modais):
    // document.getElementById('modalNovaReclamacao').classList.add('open');

    console.log('Botão "Nova Reclamação" clicado!')
  })
})

// Botão "Sair" (Menu Dropdown)
const botaoSair = document.getElementById("logout-btn")

botaoSair.addEventListener("click", () => {
  // Aqui você pode limpar os dados de autenticação do usuário
  // localStorage.removeItem('token'); // Exemplo para JWT

  // Redirecionar para a página de login
  window.location.href = "/pages/login.html"
})

// Notificações
const notificacaoBtn = document.getElementById("notificacao-btn")
const dropdownNotificacoes = document.querySelector(".dropdown-notificacoes")

notificacaoBtn.addEventListener("click", () => {
  dropdownNotificacoes.classList.toggle("show")
})

// Fecha se clicar fora
document.addEventListener("click", (e) => {
  if (
    !notificacaoBtn.contains(e.target) &&
    !dropdownNotificacoes.contains(e.target)
  ) {
    dropdownNotificacoes.classList.remove("show")
  }
})





