const form = document.querySelector(".cadastro-form")
const nomeInput = document.getElementById("nome")
const emailInput = document.getElementById("email")
const senhaInput = document.getElementById("senha")
const confirmarSenhaInput = document.getElementById("confirmar-senha")
const feedback = document.getElementById("feedback")

function showFeedback(message, isSuccess) {
  feedback.style.display = "block"
  feedback.textContent = message
  feedback.className = "feedback"
  feedback.classList.add(isSuccess ? "success" : "error")
  
}



function validarCadastro(event) {
  event.preventDefault()

  const nome = nomeInput.value.trim()
  const email = emailInput.value.trim()
  const senha = senhaInput.value.trim()
  const confirmarSenha = confirmarSenhaInput.value.trim()

  if (!nome || !email || !senha || !confirmarSenha) {
    return showFeedback("Por favor, preencha todos os campos.", false)
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return showFeedback("Por favor, insira um e-mail válido.", false)
  }

  if (senha !== confirmarSenha) {
    return showFeedback("As senhas não coincidem.", false)
  }

  const dadosCadastro = {
    name: nome,
    email: email,
    password: senha,
  }

  fetch("/cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosCadastro),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showFeedback(data.message, true)
        form.reset()
        // Redirecionar para a página de login
        setTimeout(() => {
          window.location.href = "./login.html" // Altere para o caminho correto
        }, 2000) // Pequeno delay para o usuário visualizar o feedback
      } else {
        showFeedback(data.message, false)
      }
    })
    .catch((error) => {
      console.error("Erro ao enviar dados:", error)
      showFeedback(
        "Erro ao processar seu cadastro. Tente novamente mais tarde.",
        false
      )
    })
}

form.addEventListener("submit", validarCadastro)



