document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form")
  const emailField = document.getElementById("email")
  const senhaField = document.getElementById("senha")
  const lembrarCheckbox = document.getElementById("lembrar-senha")

  // Carregar pares de e-mails e senhas salvos no localStorage
  const savedCredentials =
    JSON.parse(localStorage.getItem("savedCredentials")) || {}

  // Evento para autocompletar o e-mail e a senha ao focar no campo de e-mail
  emailField.addEventListener("focus", () => {
    const email = emailField.value.trim()
    if (savedCredentials[email]) {
      senhaField.value = savedCredentials[email] // Preenche a senha
    }
  })

  // Evento para autocompletar a senha ao digitar no campo de e-mail
  emailField.addEventListener("input", () => {
    const email = emailField.value.trim()
    if (savedCredentials[email]) {
      senhaField.value = savedCredentials[email]
    } else {
      senhaField.value = "" // Limpa o campo de senha caso o e-mail não tenha senha associada
    }
  })

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault() // Impede o envio padrão do formulário

    const email = emailField.value.trim()
    const senha = senhaField.value.trim()

    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.")
      return
    }

    try {
      // Enviar os dados de login ao servidor
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      })

      const data = await response.json()

      if (response.ok) {
        // Salvar nome no localStorage
        localStorage.setItem("userName", data.userName)

        // Salvar ou remover as credenciais com base no estado do checkbox
        if (lembrarCheckbox.checked) {
          savedCredentials[email] = senha // Adiciona ou atualiza o par e-mail/senha
          localStorage.setItem(
            "savedCredentials",
            JSON.stringify(savedCredentials)
          )
        } else {
          delete savedCredentials[email] // Remove as credenciais do e-mail
          localStorage.setItem(
            "savedCredentials",
            JSON.stringify(savedCredentials)
          )
        }

        // Alerta de sucesso no login
        alert("Login realizado com sucesso!")

        // Redirecionar para o dashboard
        window.location.href = "./dashboard.html"
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error("Erro durante o login:", error)
      alert("Erro ao conectar ao servidor.")
    }
  })
})
