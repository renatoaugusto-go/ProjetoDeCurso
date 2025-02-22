// Página acessível apenas para usuários logados
if(!sessionStorage.getItem('UsuarioLogado')) {
    location.replace('./index');
}

// Sidebar oculta
let startX = 0;
let sidebar = document.getElementById("BarraLateral");

document.addEventListener("touchstart", function (e) {
  startX = e.touches[0].clientX;
});
document.addEventListener("touchmove", function (e) {
  let moveX = e.touches[0].clientX;
  let diff = moveX - startX;

  if (startX < 50 && diff > 50) {
    sidebar.style.left = "0"; // Exibe a sidebar
  }
});
document.addEventListener("touchend", function () {
  setTimeout(() => {
    sidebar.style.left = "-100%"; // Esconde a sidebar após um tempo
  }, 5000);
});


// Selecionar uma aba
const Abas = Array.from(document.getElementsByClassName('BarraLateralItem')).filter(aba => aba.onclick == null);
const CorpoAbas = Array.from(document.getElementsByClassName('CorpoAba'));
Abas.forEach(aba => {
    aba.addEventListener('click', () => {

        Abas.forEach((aba2) => {
            if (aba2.classList.contains('ativo')) {
                aba2.classList.remove('ativo');
            };
        });

        CorpoAbas.forEach((aba2) => {
            if (aba2.classList.contains('ativo')) {
                aba2.classList.remove('ativo');
            };
        });

        aba.classList.add('ativo');
        CorpoAbas.find(caba => caba.id.replace("Corpo","Lateral") == aba.children.namedItem('span').id).classList.add('ativo');

    });
});

// Aba pelo link
let AbaPadrao = Abas.find(aba => window.location.hash.replace("#","").startsWith(aba.children.namedItem('span').id.replace("LateralAba","")));
if(AbaPadrao) {
    let aba = AbaPadrao;
    aba.classList.add('ativo');
    CorpoAbas.find(caba => caba.id.replace("Corpo","Lateral") == aba.children.namedItem('span').id).classList.add('ativo');
} else {
    let aba = Abas.find(aba => aba.children.namedItem('span').id == "LateralAbaInicio");
    aba.classList.add('ativo');
    CorpoAbas.find(caba => caba.id.replace("Corpo","Lateral") == aba.children.namedItem('span').id).classList.add('ativo');
}

/// Funcionários 

// Abrir caixa de adição de funcionário
document.getElementById("BotaoAdicionarFuncionario").addEventListener('click', (event) => {
    document.getElementById("DashboardFormularioFuncionario").classList.add("ativo");
});
document.getElementById("CancelarFuncionarioBotao").addEventListener('click', (event) => {
    document.getElementById("DashboardFormularioFuncionario").classList.remove("ativo");
});

// Adicionar funcionários 
// Pesquisar funcionários
document.getElementById('FuncionariosPesquisa').addEventListener('submit', async (event) => {
    event.preventDefault();

    const empresa = window.sessionStorage.getItem('UsuarioLogadoEmpresa');
    const pesquisa = document.getElementById('FuncionariosCabecalhoPesquisa').elements["pesquisa"].value;
    const classificar = document.getElementById('FuncionariosCabecalhoPesquisa').elements["classificar"].value;

    try {
        // Comunicação com o backend
        const response = await fetch('https://evolved-legible-spider.ngrok-free.app/dashboard-funcionarios-pesquisa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ empresa, pesquisa, classificar })
        });

        const data = await response.json();

        if(data.error_message) return Notificar(`Erro de pesquisa`, `${data.error_message}`, 'OK');

        if (!response.ok) {
            throw new Error('Falha na solicitação');
        }

        // Código específico
        

    } catch (error) {
        console.error(error);
        Notificar('Erro de pesquisa', error, 'OK');
    }

})

// Pegar funcionários

/// Produtos

// Abrir caixa de adição de produtos
document.getElementById("BotaoAdicionarProduto").addEventListener('click', (event) => {
    document.getElementById("DashboardFormularioProduto").classList.add("ativo");
});
document.getElementById("CancelarProdutoBotao").addEventListener('click', (event) => {
    document.getElementById("DashboardFormularioProduto").classList.remove("ativo");
});