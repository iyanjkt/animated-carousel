const dataProduct = [
    {
        title: 'Sublime<br/>Lime',
        bg: 'bg-lime',
        img: 'images/carousel-1.png',
        price: '$5.50'
    },
    {
        title: 'Caramel<br/>Crave',
        bg: 'bg-caramel',
        img: 'images/carousel-2.png',
        price: '$5.40'
    },
    {
        title: 'Creamy<br/>Coffee',
        bg: 'bg-coffee',
        img: 'images/carousel-3.png',
        price: '$5.30'
    }
];

const bgColor = document.getElementById('bg-color')
const imgProduct = document.getElementById('image-product')
const titleProduct = document.getElementById('title-product')
const priceProduct = document.getElementById('price')
const leftArrow = document.getElementById('left-arrow')
const rightArrow = document.getElementById('right-arrow')


let currentIndex = 0
let previousBgClass = 'bg-lime'

function updateCarousel(index) {
    const data = dataProduct[index]

    imgProduct.src = data.img;
    titleProduct.innerHTML = data.title
    priceProduct.textContent = data.price
    bgColor.classList.remove(previousBgClass)
    bgColor.classList.add(data.bg)
    previousBgClass = data.bg
}

rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % dataProduct.length;
    gsap.timeline({
        onComplete: () => {
            updateCarousel(currentIndex);
            gsap.from(imgProduct, { x: -100, opacity: 0 })
            gsap.from(titleProduct, { y: -50, opacity: 0 })
        }
    })
})

leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + dataProduct.length) % dataProduct.length;
    gsap.timeline({
        onComplete: () => {
            updateCarousel(currentIndex);
            gsap.from(imgProduct, { x: 100, opacity: 0 })
            gsap.from(titleProduct, { y: -50, opacity: 0 })
        }
    })
})

updateCarousel(currentIndex)


const hamburger = document.getElementById('hamburger')
const dropdownMenu = document.getElementById('dropdown-menu')

hamburger.addEventListener('click', () => {
    if (
        dropdownMenu.classList.contains('max-sm:scale-y-0')) {
        dropdownMenu.classList.replace('max-sm:scale-y-0', 'max-sm:scale-y-100')

    } else {
        dropdownMenu.classList.replace('max-sm:scale-y-100', 'max-sm:scale-y-0')
    }


    if (document.querySelector('#hamburger i').classList.contains('bx-menu-wider')) {
        document.querySelector('#hamburger i').classList.replace('bx-menu-wider', 'bx-menu')
    } else { document.querySelector('#hamburger i').classList.replace('bx-menu', 'bx-menu-wider') }

})

window.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.replace('max-sm:scale-y-100', 'max-sm:scale-y-0')
    }
})


/* ꘏꘏꘏꘏꘏꘏꘏꘏꘏꘏꘏꘏꘏꘏ GSAP ꘏꘏꘏꘏꘏꘏꘏꘏꘏꘏꘏꘏꘏꘏ */

