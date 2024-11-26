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
