// Página acessível apenas para usuários logados
if(!sessionStorage.getItem('UsuarioLogado')) {
    location.replace('./index');
}

// Selecionar uma aba
const Abas = document.getElementsByClassName('BarraLateralItem');
Array.from(Abas).forEach(aba => {
    alert(aba.innerHTML);
});