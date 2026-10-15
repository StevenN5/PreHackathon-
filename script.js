let produk = [
    {
        nama: 'Siomay',
        price: 15000,
        image: '../asset/Somay.jpg',
        tag: 'Populer',
        rating: '4,9',
        bgClass: 'art-yellow'
    },
    {
        nama: 'Batagor',
        price: 13000,
        image: '../asset/Batagor.jpg',
        tag: 'Populer',
        rating: '4,9',
        bgClass: 'art-yellow'
    },
    {
        nama: 'Cilor',
        price: 7000,
        image: '../asset/Cilor.jpg',
        tag: 'Populer',
        rating: '4,9',
        bgClass: 'art-yellow'
    },
    {
        nama: 'Telor Gulung',
        price: 3000,
        image: '../asset/telorgulung.png',
        tag: 'Populer',
        rating: '4,9',
        bgClass: 'art-yellow'
    },
    {
        nama: 'Cilung',
        price: 4000,
        image: '../asset/cilung.jpg',
        tag: 'Populer',
        rating: '4,9',
        bgClass: 'art-yellow'
    },
    {
        nama: 'Cilok',
        price: 10000,
        image: '../asset/Cilok.jpg',
        tag: 'Populer',
        rating: '4,9',
        bgClass: 'art-yellow'
    },
    {
        nama: 'Tahu isi',
        price: 2000,
        image: '../asset/Tahu.jpg',
        tag: 'Populer',
        rating: '4,9',
        bgClass: 'art-yellow'
    },
    {
        nama: 'Sempol Ayam',
        price: 10000,
        image: '../asset/Sempolayam.jpg',
        tag: 'Populer',
        rating: '4,9',
        bgClass: 'art-yellow'
    },
    {
        nama: 'Risol mayo',
        price: 2500,
        image: '../asset/Risolmayo.jpg',
        tag: 'Populer',
        rating: '4,9',
        bgClass: 'art-yellow'
    },
    {
        nama: 'Jasuke',
        price: 8000,
        image: '../asset/Jasuke.jpg',
        tag: 'Populer',
        rating: '4,9',
        bgClass: 'art-yellow'
    },
    {
        nama: 'Kue Cubit',
        price: 10000,
        image: '../asset/Kuecubit.jpeg',
        tag: 'Populer',
        rating: '4,9',
        bgClass: 'art-yellow'
    },
    {
        nama: 'Kue Pancong',
        price: 7000,
        image: '../asset/Kuepancong.jpg',
        tag: 'Populer',
        rating: '4,9',
        bgClass: 'art-yellow'
    },
    {
        nama: 'Kue Putu',
        price: 10000,
        image: '../asset/kueputu.jpg',
        tag: 'Populer',
        rating: '4,9',
        bgClass: 'art-yellow'
    },
    {
        nama: 'Cimol',
        price: 6000,
        image: '../asset/CImol.jpg',
        tag: 'Populer',
        rating: '4,9',
        bgClass: 'art-yellow'
    },
    {
        nama: 'Pisang Goreng',
        price: 6000,
        image: '../asset/Pisanggoreng.jpg',
        tag: 'Populer',
        rating: '4,9',
        bgClass: 'art-yellow'
    },
]



function homepage (){
    let container = document.getElementById("produk-gueh");
    let cardHTML = ""
    
    for (let card of produk) {
    cardHTML += `
    <article class="product-card">
    <div class="product-art ${card.bgClass}"><span><img src=${card.image} alt=${card.nama} width="300"></span><span
            class="product-tag">${card.tag}</span><button class="add-button"
            aria-label="Tambah Kentang Goreng ke keranjang">+</button></div>
    <div class="product-info">
        <p class="product-category">Jajanan Gurih</p>
        <h3>${card.nama}</h3>
        <div class="product-bottom"><strong>${card.price}</strong><span class="rating">★${card.rating}</span></div>
    </div>
</article>
    `;
}

container.innerHTML = cardHTML
}

let variable = document.getElementById('mainbtn')

variable.onclick = homepage()

