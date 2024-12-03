// TELA DESCRICAO
document.getElementById("descricao-form").addEventListener("submit", function (event) {
  event.preventDefault() // Evita o envio padrão do formulário

  const titulo = document.getElementById("titulo-reclamacao").value.trim()
  const descricao = document
    .getElementById("descricao-reclamacao")
    .value.trim()
  const data = document.getElementById("data-ocorrencia").value
  const hora = document.getElementById("hora-ocorrencia").value

  if (!titulo || !descricao || !data || !hora) {
    alert("Por favor, preencha todos os campos obrigatórios.")
    return
  }

  // Dados para avançar para a próxima etapa (podem ser armazenados em um objeto)
  const reclamacaoData = { titulo, descricao, data, hora }
  console.log(reclamacaoData) // Debug: exibe os dados no console

  // Redireciona para a próxima etapa (exemplo fictício)
  window.location.href = "localizacao.html" // Altere para a rota real
})


// TELA CATEGORIA
document.addEventListener("DOMContentLoaded", () => {
  const categoriaCards = document.querySelectorAll(".categoria-card")
  const etapas = document.querySelectorAll(".etapa")
  const btnAvancar = document.getElementById("btn-avancar")
  const btnVoltar = document.getElementById("btn-voltar")
  let etapaAtual = 1

  // Função para selecionar a categoria
  categoriaCards.forEach((card) => {
    card.addEventListener("click", () => {
      categoriaCards.forEach((c) => c.classList.remove("active"))
      card.classList.add("active")
    })
  })

  // Função para avançar a etapa
  btnAvancar.addEventListener("click", () => {
    if (etapaAtual < etapas.length - 1) {
      etapas[etapaAtual].classList.remove("active")
      etapaAtual++
      etapas[etapaAtual].classList.add("active")
    }
  })

  // Função para voltar a etapa
  btnVoltar.addEventListener("click", () => {
    if (etapaAtual > 0) {
      etapas[etapaAtual].classList.remove("active")
      etapaAtual--
      etapas[etapaAtual].classList.add("active")
    }
  })
})

document.getElementById("btn-avancar").addEventListener("click", function () {
  window.location.href = "finalizar.html" // Caminho para a próxima tela
})

document.getElementById("btn-voltar").addEventListener("click", function () {
  window.location.href = "categoria.html" // Caminho para a tela anterior
})

// Menu mobile toggle
const menuToggle = document.getElementById("menuToggle")
const nav = document.getElementById("navLinks")

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("show") // Mostra/esconde o menu
})

// Função para controlar o dropdown do usuário
document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggle = document.getElementById("userToggle")
  const dropdownMenu = document.getElementById("dropdownMenu")

  dropdownToggle.addEventListener("click", function (event) {
    event.stopPropagation() // Evita que o clique propague para o body
    dropdownMenu.classList.toggle("show")
  })

  // Fecha o dropdown se clicar fora dele
  document.addEventListener("click", function (event) {
    if (!dropdownToggle.contains(event.target)) {
      dropdownMenu.classList.remove("show")
    }
  })
})

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
