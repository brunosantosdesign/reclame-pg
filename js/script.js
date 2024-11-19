<<<<<<< HEAD
// const btnMobile = document.getElementById('btn-mobile');

// function toggleMenu() {
//   const nav = document.getElementById('nav');
//   nav.classList.toggle('active');
// }

// btnMobile.addEventListener('click', toggleMenu);

// Seleciona os botões "Entrar" e "Cadastrar"
const btnEntrar = document.querySelector('.btn-entrar');
const btnCadastrar = document.querySelector('.btn-cadastrar');

// Função para redirecionar o usuário para a página de login
btnEntrar.addEventListener('click', () => {
  window.location.href = 'login.html'; // Redireciona para a página de login 
})

// Função para redirecionar o usuário para a página de cadastro
btnCadastrar.addEventListener('click', () => {
  alert("Página de cadastro em desenvolvimento") // Pode ser substituído pelo link da página de cadastro quando estiver pronto
})


// Verifique se os elementos foram selecionados corretamente
console.log('Botão de Pesquisa:', document.querySelector('.btn-search'));
console.log('Campo de Pesquisa:', document.querySelector('.search input[type="text"]'));

// Seleciona o botão de pesquisa e o campo de entrada de texto
const btnSearch = document.querySelector('.btn-search');
const inputSearch = document.querySelector('.search input [type="text"]');

// Verifique se os elementos foram selecionados corretamente antes de adicionar o evento
if (btnSearch && inputSearch) {
  btnSearch.addEventListener('click', (event) => {
    event.preventDefault() // Impede o envio do formulário
    const searchTerm = inputSearch.value.trim() // Obtém o valor do campo de entrada

    if (searchTerm) {
      alert(`Você Pesquisou por: ${searchTerm}`);
    } else {
      alert('Por favor, digite algo para buscar.');
    }
  });
} else {
  console.error("Erro: Não foi possível encontrar os elementos de pesquisa.");
}

// Função de pesquisa que exibe o termo digitado pelo usuário
// btnSearch.addEventListener('click', (event) => {
//   event.preventDefault(); // Evita o comportamento padrão do botão de pesquisa
//   const searchTerm = inputSearch.value.trim(); // Obtém e remove espaços extras

//   if (searchTerm) {
//     alert(`Você pesquisou por: ${searchTerm}`);
//   } else {
//     alert('Por favor, digite algo para buscar.');
//   }
// });




// Seleciona todos os cartões de categoria
const cards = document.querySelectorAll('.card');

// Adiciona um evento de clique para cada cartão
cards.forEach(card => {
  card.addEventListener('click', () => {
    const category = card.querySelector('h3').innerText; // Pega o nome da categoria do cartão
    alert(`Categoria selecionada: ${category}`);
  });
});
=======
const btnMobile = document.getElementById('btn-mobile');

function toggleMenu() {
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');
}

btnMobile.addEventListener('click', toggleMenu);

>>>>>>> 6920e4779c9f6c7de7bd69b0234cdcd7325654a8
