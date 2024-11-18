// Validação de Entrada com JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio imediato do formulário

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
    } else if (!validateEmail(email)) {
      alert("Por favor, insira um e-mail válido.");
    } else {
      alert("Dados válidos! Pronto para enviar.");
      // Aqui você chamará a função para enviar os dados ao back-end mais tarde
    } 
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});


// Simulação de Envio (Mock)
async function mockApiCall(email, senha) {
  return new  Promise((resolve) => {
    setTimeout(() => {
      if (email === "usuario@exemplo.com" && senha === "123456") {
        resolve(({ status: 200, message: "Login bem-sucedido!" }));
      } else {
        resolve({ status: 401, message: "E-mail ou senha icnorretos."});
      }
    }, 1000); // Simula um tempo de espera de 1 segundo
  });
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (email && senha && calidateEmail(email)) {
    const response = await mockApiCall(email, senha);
    alert(response.message);

    if (response.status === 200) {
      // Aqui você pode redirecionar o usuário para a página principal
      console.log("redirecionando para a página principal...");
    }
  }
});

// Checkbox "Lembrar senha"

// Carregar email salvo no localStorage, se existir
window.onload = function () {
  const emailSalvo = localStorage.getItem("email");
  if (emailSalvo) {
    document.getElementById("email").value = emailSalvo;
    document.getElementById("lembrar-senha").checked = true;
  }
};

// Simular o envio do formulário
function enviarFormulario() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const lembrarSenha = document.getElementById("lembrarSenha").checked;

  // Se o checkbox estiver marcadom salva o email
  if (lembrarSenha) {
    localStorage.setItem("emailSalvo", email);
  }else {
    localStorage.removeItem("emailSalvo"); // Limpa o email salvo
  }
  alert("Dados válidos! Pronto para enviar.");
}

// Link "Esqueceu sua senha?"

function esquecerSenha() {
  const email = prompt("Digite seu email para redefinir a senha:");
  if (email) {
    // Simulação de uma requisição de recuperação
    alert(`Um link de recuperação foi enviado para ${email}`);
  } else {
    alert("Por favor, insira um email válido.");
  }
}
