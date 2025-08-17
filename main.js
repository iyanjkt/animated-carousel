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
let carouselAnimation

const imageUrls = dataProduct.map(item => item.img)

function preloadAllImages() {
    return new Promise((resolve) => {
        const promises = imageUrls.map(url => {
            return new Promise((imgResolve, imgReject) => {
                const img = new Image()
                img.src = url
                img.onload = imgResolve
                img.onerror = imgReject
            })
        })
        Promise.all(promises).then(resolve).catch(resolve)
    })
}

const preloadAll = preloadAllImages()
preloadAll.then(response => console.log(response))


function updateCarousel(index, direction) {
    const data = dataProduct[index]

    imgProduct.src = data.img;
    titleProduct.innerHTML = data.title
    priceProduct.textContent = data.price
    bgColor.classList.remove(previousBgClass)
    bgColor.classList.add(data.bg)
    previousBgClass = data.bg

    if (carouselAnimation && carouselAnimation.isActive()) {
        return; // Hentikan fungsi jika animasi sedang berjalan
    }

    carouselAnimation = gsap.timeline()

    carouselAnimation
        .from(imgProduct, { x: direction === 'right' ? -100 : 100, opacity: 0, duration: 0.8 })
    gsap.from(titleProduct, { y: -50, opacity: 0 })
}


rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % dataProduct.length;
    updateCarousel(currentIndex, 'right');
})

leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + dataProduct.length) % dataProduct.length;
    updateCarousel(currentIndex, 'left');
})

const imgPreload = document.getElementById('image-preload')
const content = document.getElementById('content')

gsap.set(imgProduct, { y: -50, opacity: 0 });
gsap.set(content, { y: 50, opacity: 0 });
gsap.set(imgPreload, { y: 270, opacity: 0.5 })

preloadAllImages().then(() => {
    const preLoadTimeline = gsap.timeline();
    updateCarousel(currentIndex)

    preLoadTimeline.to(imgPreload, {
        opacity: 0.2,
        duration: 1,
    })
        .to(imgPreload, {
            opacity: 0,
            duration: 0.1,
            onComplete: () => {
                imgPreload.style.display = "none";
                gsap.to([imgProduct, content], {
                    y: 0,
                    opacity: 1,
                    duration: 1
                })
            }
        })
})


/* ꘏꘏꘏꘏꘏꘏꘏꘏꘏ HAMBURGER MENU ꘏꘏꘏꘏꘏꘏꘏꘏꘏ */
const hamburger = document.getElementById('hamburger')
const dropdownMenu = document.getElementById('dropdown-menu')

hamburger.addEventListener('click', () => {
    if (
        dropdownMenu.classList.contains('max-sm:scale-y-0')) {
        dropdownMenu.classList.replace('max-sm:scale-y-0', 'max-sm:scale-y-100');
        document.querySelector('#hamburger i').classList.replace('bx-menu', 'bx-menu-wider')

    } else {
        dropdownMenu.classList.replace('max-sm:scale-y-100', 'max-sm:scale-y-0');
        document.querySelector('#hamburger i').classList.replace('bx-menu-wider', 'bx-menu')
    }
})

window.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.replace('max-sm:scale-y-100', 'max-sm:scale-y-0');
        document.querySelector('#hamburger i').classList.replace('bx-menu-wider', 'bx-menu')
    }
})