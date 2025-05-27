//DECLARANDO AS VARIAVEIS COM DOM
const sanduiche = document.querySelector('.sanduiche');
const headerMenu = document.querySelector('.header-menu');


//CRIANDO A FUNÇÃO 

function toggleMenu(){
    //Pega o elemento e adiciona na classe do css, ou remove se existir
    sanduiche.classList.toggle('active');
    headerMenu.classList.toggle('active');
}
    //CRIAR UM EVENTO QUE AO CLICAR EXECUTA FUNÇÃO TOGGLE
    sanduiche.addEventListener('click', toggleMenu);
    headerMenu.addEventListener('click', (e)=>{
        if(e.target.classList.contains('item-menu')){
            toggleMenu();
        }
})


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