const wrapper = document.querySelector('.wrapper')
const carousel = document.querySelector('.carousel')
const arrowBtns = document.querySelectorAll('.wrapper i')
const firstCardWidth = carousel.querySelector('.card').offsetWidth
const carouselChildrens = [...carousel.children]


let isDragging = false, startX, startScrollLeft, timeoutId
/* obtenha o número de cards que cabem no carrossel de uma só vez */
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)




arrowBtns.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth
    })
})



/* inserindo copias dos ultimos cards no inicio do carrossel para um scroll ou rolagem infinita */
carouselChildrens.slice(-cardPerView).reverse().forEach(card =>{
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML)
})
/* inserindo copias dos primeiros cards no fim do carrossel para um scroll ou rolagem infinita */
carouselChildrens.slice(0, cardPerView).reverse().forEach(card =>{
    carousel.insertAdjacentHTML('beforeend', card.outerHTML)
})




const dragStart = (evt)=>{
    isDragging = true
    carousel.classList.add('dragging')

    startX = evt.pageX
    startScrollLeft = carousel.scrollLeft
}

const dragging = (e)=>{
    if (!isDragging) {
        return
    }
    /* actualiza a posição do scroll do carrossel de acordo com a movimentação do cursor */
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
}

const dragStop = ()=>{
    isDragging = false
    carousel.classList.remove('dragging')
}

const autoPlay = ()=>{
    if (window.innerWidth < 800){
        return
    } else {
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2000)
    }
}
autoPlay()



const infiniteScroll = ()=>{
    if (carousel.scrollLeft === 0) {
        carousel.classList.add('no-transition')
        carousel.scrollLeft =carousel.scrollWidth - (2*carousel.offsetWidth)
        carousel.classList.remove('no-transition')
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add('no-transition')
        carousel.scrollLeft = carousel.offsetWidth
        carousel.classList.remove('no-transition')
    }

    clearTimeout(timeoutId)
    if (!wrapper.matches(':hover')) {
        autoPlay()
    }
}


carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('mousemove', dragging)
document.addEventListener('mouseup', dragStop)
carousel.addEventListener('scroll', infiniteScroll)