const sanduiche = document.querySelector('.sanduiche');
const headerMenu = document.querySelector('.header-menu');
const modoEscuroToggle = document.querySelector('.modo-escuro-toggle');
const modoEscuroIcon = document.querySelector('.modo-escuro-icon');
const azulToggle = document.querySelector('.azul-toggle');
const verdeAguaToggle = document.querySelector('.verde-agua-toggle');
const pretoToggle = document.querySelector('.preto-toggle');
const coresToggles = document.querySelectorAll('.cor-toggle');
const body = document.body;

// Função para alternar o menu mobile
function toggleMenu(){
    // Pega o elemento e adiciona na classe do css, ou remove se existir
    sanduiche.classList.toggle('active');
    headerMenu.classList.toggle('active');
    
    // Controla o scroll do body quando o menu está aberto/fechado
    if (headerMenu.classList.contains('active')) {
        // Menu aberto - permite scroll
        body.classList.remove('menu-closed');
    } else {
        // Menu fechado - bloqueia scroll
        body.classList.add('menu-closed');
    }
}

// Evento para o botão sanduíche
sanduiche.addEventListener('click', toggleMenu);
headerMenu.addEventListener('click', (e)=>{
    if(e.target.classList.contains('item-menu')){
        toggleMenu();
    }
});

// Função para alternar o modo escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Alterna o ícone do botão
    if (document.body.classList.contains('dark-mode')) {
        modoEscuroIcon.textContent = '🌙';
        modoEscuroToggle.classList.add('dark');
        // Salva a preferência no localStorage
        localStorage.setItem('darkMode', 'enabled');
    } else {
        modoEscuroIcon.textContent = '☀️';
        modoEscuroToggle.classList.remove('dark');
        // Remove a preferência do localStorage
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Função para alternar entre os temas de cores
function setColorTheme(theme) {
    // Remove todas as classes de tema
    document.body.classList.remove('tema-azul', 'tema-verde-agua', 'tema-preto');
    
    // Remove a classe 'active' de todos os botões de cor
    coresToggles.forEach(toggle => {
        toggle.classList.remove('active');
    });
    
    // Adiciona a classe do tema selecionado
    if (theme) {
        document.body.classList.add(theme);
        
        // Adiciona a classe 'active' ao botão correspondente
        if (theme === 'tema-azul') {
            azulToggle.classList.add('active');
        } else if (theme === 'tema-verde-agua') {
            verdeAguaToggle.classList.add('active');
        } else if (theme === 'tema-preto') {
            pretoToggle.classList.add('active');
        }
        
        // Salva a preferência no localStorage
        localStorage.setItem('colorTheme', theme);
    }
}

// Adiciona eventos de clique aos botões de cor
azulToggle.addEventListener('click', () => setColorTheme('tema-azul'));
verdeAguaToggle.addEventListener('click', () => setColorTheme('tema-verde-agua'));
pretoToggle.addEventListener('click', () => setColorTheme('tema-preto'));

// Verifica se o usuário já tinha preferência de modo escuro
function checkDarkModePreference() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        modoEscuroIcon.textContent = '🌙';
        modoEscuroToggle.classList.add('dark');
    }
}

// Verifica se o usuário já tinha preferência de tema de cor
function checkColorThemePreference() {
    const theme = localStorage.getItem('colorTheme');
    if (theme) {
        setColorTheme(theme);
    } else {
        // Define o tema azul como padrão se não houver preferência
        setColorTheme('tema-azul');
    }
}

// Adiciona evento de clique ao botão de modo escuro
modoEscuroToggle.addEventListener('click', toggleDarkMode);

// Verifica preferências ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    checkDarkModePreference();
    checkColorThemePreference();
    
    // Adiciona a classe menu-closed ao body por padrão para bloquear o scroll
    body.classList.add('menu-closed');
});

//DECLARANDO UM ARRAY DE IMAGENS 
let imagens = [
    'src/images/capa1.jpg',
    'src/images/capa2.jpg',
    'src/images/capa3.jpg',
    'src/images/capa4.jpg',
];

//DECLARANDO AS VARIAVEIS
let i = 0;
let tempo = 2000;
const hero = document.querySelector('.hero');

//CRIANDO A FUNÇÂO DO SLIDESHOW
function slideShow(){
    if(hero){
        hero.style.backgroundImage= `var(--gradient), url('${imagens[i]}')`
    }
    i++;
    if(i == imagens.length){
        i=0;
    }
    setTimeout('slideShow()',tempo);
}

slideShow();
