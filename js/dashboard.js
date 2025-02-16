// Página acessível apenas para usuários logados
if(!sessionStorage.getItem('UsuarioLogado')) {
    location.replace('./index');
}

// Selecionar uma aba
const Abas = Array.from(document.getElementsByClassName('BarraLateralItem')).filter(aba => aba.parentElement.id === "BarraLateralItens");
Abas.forEach(aba => {
    aba.addEventListener('click', () => {

        Abas.forEach((aba2) => {
            if (aba2.classList.contains('ativo')) {
                aba2.classList.remove('ativo');
            };
        });

        aba.classList.add('ativo');
        alert(aba.children.namedItem('span').id)

    });
});