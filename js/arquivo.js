var iconMenu = document.getElementById('iconMenu')
var imagemActual = document.getElementById('actual')
var actual = 0
var quantImagens = document.querySelectorAll('.slides .image')
var balls = document.querySelector('.balls')
var rolar = true



iconMenu.addEventListener('click', ()=>{
    let menuHamburguer = document.querySelector('.menuHamburguer')

    if (menuHamburguer.classList.contains('open')) {
        menuHamburguer.classList.remove('open')
    } else {
        menuHamburguer.classList.add('open')
    }
    /* menuHamburguer.classList.toggle('open') */
})



/* SLIDE */
for (let i=0; i<quantImagens.length; i++) {
    var div = document.createElement('div')
    div.id = i
    balls.appendChild(div)
}
document.getElementById('0').classList.add('ballsActual')

var posicao = document.querySelectorAll('.balls div')
for (let i=0; i<posicao.length; i++) {
    posicao[i].addEventListener('click', ()=>{
        actual = posicao[i].id
        slide()
        rolar = false
    })
}

function slide() {
    if (actual >= quantImagens.length) {
        actual = 0
    } else if (actual < 0){
        actual= quantImagens.length-1
    }
    document.querySelector('.ballsActual').classList.remove('ballsActual')
    imagemActual.style.marginLeft = actual*-99+'vw'
    document.getElementById(actual).classList.add('ballsActual')
}
setInterval(() => {
    if (rolar) {
        actual++
        slide()
    } else{
        rolar = true
    }

}, 8000);





/* CARDS */
const botaoSlide = document.querySelectorAll('.slide i')
const cardDosSlides = document.querySelector('.cardPrincipal')
const slideFilho = [...cardDosSlides.children]
const tamanhoDoCard1 = cardDosSlides.querySelector('.card1').offsetWidth

let cardPerView = Math.round(cardDosSlides.offsetWidth/tamanhoDoCard1)


botaoSlide.forEach(botao =>{
    botao.addEventListener('click', ()=>{
        cardDosSlides.scrollLeft += botao.id === 'btnLeft' ? -tamanhoDoCard1 : tamanhoDoCard1
    })
})

/* inserindo copias dos ultimos cards no inicio do carrossel para um scroll ou rolagem infinita */
slideFilho.slice(-cardPerView).reverse().forEach(card =>{
    cardDosSlides.insertAdjacentHTML('afterbegin', card.outerHTML)
})
/* inserindo copias dos primeiros cards no fim do carrossel para um scroll ou rolagem infinita */
slideFilho.slice(0, cardPerView).reverse().forEach(card =>{
    cardDosSlides.insertAdjacentHTML('beforeend', card.outerHTML)
})



cardDosSlides.addEventListener('scroll', ()=>{
    if (cardDosSlides.scrollLeft === 0) {
        cardDosSlides.classList.add('no-transition')
        cardDosSlides.scrollLeft = cardDosSlides.scrollWidth - (2*cardDosSlides.offsetWidth)
        cardDosSlides.classList.remove('no-transition')
    } else if (Math.ceil(cardDosSlides.scrollLeft) === cardDosSlides.scrollWidth - cardDosSlides.offsetWidth) {
        cardDosSlides.classList.add('no-transition')
        cardDosSlides.scrollLeft = cardDosSlides.offsetWidth
        cardDosSlides.classList.remove('no-transition')
    }
})


/* setInterval(() => {
    cardDosSlides.scrollLeft += tamanhoDoCard1
}, 2000); */




/* CARDS 2 */
const botao2 = document.querySelectorAll('.slide2 i')
const cardDosSlides2 = document.querySelector('.slides2')
const slideFilho2 = [...cardDosSlides2.children]
const tamanhoDoCard2 = cardDosSlides2.querySelector('.card2').offsetWidth

let cardPerView2 = Math.round(cardDosSlides2.offsetWidth/tamanhoDoCard2)



botao2.forEach(btn2 =>{
    btn2.addEventListener('click', ()=>{
        cardDosSlides2.scrollLeft += btn2.id === 'btnLeft' ? -tamanhoDoCard2 : tamanhoDoCard2
    })
})

slideFilho2.slice(-cardPerView2).reverse().forEach(card2 =>{
    cardDosSlides2.insertAdjacentHTML('afterbegin', card2.outerHTML)
})
slideFilho2.slice(0, cardPerView2).reverse().forEach(card2 =>{
    cardDosSlides2.insertAdjacentHTML('beforeend', card2.outerHTML)
})

cardDosSlides2.addEventListener('scroll', ()=>{
    if (cardDosSlides2.scrollLeft === 0) {
        cardDosSlides2.scrollLeft = cardDosSlides2.scrollWidth - (2*cardDosSlides2.offsetWidth)
        cardDosSlides2.classList.remove('no-transition')
        cardDosSlides2.classList.add('no-transition')
    } else if(Math.ceil(cardDosSlides2.scrollLeft) === cardDosSlides2.scrollWidth - cardDosSlides2.offsetWidth) {
        cardDosSlides2.classList.remove('no-transition')
        cardDosSlides2.classList.add('no-transition')
        cardDosSlides2.scrollLeft = cardDosSlides2.offsetWidth
    }
})