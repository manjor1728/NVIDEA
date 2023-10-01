const botaoSlide = document.querySelectorAll('.slide i')
const slides = document.querySelector('.slides')
const widthCard1 = slides.querySelector('.card').offsetWidth
const slideFilho = [...slides.children]


let cardPerView = Math.round(slides.offsetWidth/widthCard1)


botaoSlide.forEach(botao =>{
    botao.addEventListener('click', ()=>{
        slides.scrollLeft += botao.id === 'left' ? -widthCard1 : widthCard1
    })
})

/* inserindo copias dos ultimos cards no inicio do carrossel para um scroll ou rolagem infinita */
slideFilho.slice(-cardPerView).reverse().forEach(card =>{
    slides.insertAdjacentHTML('afterbegin', card.outerHTML)
})
/* inserindo copias dos primeiros cards no fim do carrossel para um scroll ou rolagem infinita */
slideFilho.slice(0, cardPerView).reverse().forEach(card =>{
    slides.insertAdjacentHTML('beforeend', card.outerHTML)
})


slides.addEventListener('scroll', ()=>{
    if (slides.scrollLeft === 0) {
        slides.scrollLeft = slides.scrollWidth - (2*slides.offsetWidth)
        slides.classList.remove('no-transition')
        slides.classList.add('no-transition')
    } else if(Math.ceil(slides.scrollLeft) === slides.scrollWidth - slides.offsetWidth) {
        slides.classList.remove('no-transition')
        slides.classList.add('no-transition')
        slides.scrollLeft = slides.offsetWidth
    }
})

/* setInterval(() => {
    slides.scrollLeft += widthCard1
}, 2000); */




