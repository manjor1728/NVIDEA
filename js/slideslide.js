const botaoSlide = document.querySelectorAll('.wrapper i')
const cardDosSlides = document.querySelector('.carousel')
const tamanhoDoCard1 = cardDosSlides.querySelector('.card').offsetWidth
const slideFilho = [...cardDosSlides.children]

let cardPerView = Math.round(cardDosSlides.offsetWidth/tamanhoDoCard1)


botaoSlide.forEach(botao=>{
    botao.addEventListener('click', ()=>{
        cardDosSlides.scrollLeft += botao.id === 'left' ? -tamanhoDoCard1 : tamanhoDoCard1
    })
})


/* inserindo copias dos ultimos cards no inicio do carrossel para um scroll ou rolagem infinita */
slideFilho.slice(-cardPerView).reverse().forEach(card =>{
    cardDosSlides.insertAdjacentHTML('afterbegin', card.outerHTML)
})
/* inserindo copias dos primeiros cards no inicio do carrossel para um scroll ou rolagem infinita */
slideFilho.slice(0, cardPerView).reverse().forEach(card =>{
    cardDosSlides.insertAdjacentHTML('beforeend', card.outerHTML)
})


cardDosSlides.addEventListener('scroll', ()=>{
    if (cardDosSlides.scrollLeft === 0) {
        cardDosSlides.classList.add('no-transition')
        cardDosSlides.scrollLeft = cardDosSlides.scrollWidth - (2*cardDosSlides.offsetWidth)
        cardDosSlides.classList.remove('no-transition')
    } else if(Math.ceil(cardDosSlides.scrollLeft) === cardDosSlides.scrollWidth - cardDosSlides.offsetWidth) {
        cardDosSlides.classList.add('no-transition')
        cardDosSlides.scrollLeft = cardDosSlides.offsetWidth
        cardDosSlides.classList.remove('no-transition')
    }
})


setInterval(() => {
    cardDosSlides.scrollLeft += tamanhoDoCard1
}, 2000);