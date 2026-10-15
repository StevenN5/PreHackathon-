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

const kunciKeranjang = "jajankuy-keranjang";

function bacaKeranjang() {
    try {
        const data = JSON.parse(localStorage.getItem(kunciKeranjang) || "[]");
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

let keranjang = bacaKeranjang();

function updateJumlahKeranjang() {
    const jumlah = keranjang.reduce((total, item) => total + item.jumlah, 0);

    document.querySelectorAll(".cart-count").forEach((elemen) => {
        elemen.textContent = jumlah;
    });
}

function tambahKeKeranjang(index) {
    const itemDipilih = produk[index];
    if (!itemDipilih) return;

    const itemDiKeranjang = keranjang.find((item) => item.nama === itemDipilih.nama);

    if (itemDiKeranjang) {
        itemDiKeranjang.jumlah += 1;
    } else {
        keranjang.push({
            nama: itemDipilih.nama,
            price: itemDipilih.price,
            image: itemDipilih.image,
            jumlah: 1
        });
    }

    localStorage.setItem(kunciKeranjang, JSON.stringify(keranjang));
    updateJumlahKeranjang();
}

function homepage() {
    const container = document.getElementById("produk-gueh");
    if (!container) return;

    let cardHTML = "";

    for (const card of produk) {
        cardHTML += `
            <article class="product-card">
                <div class="product-art ${card.bgClass}">
                    <span><img src="${card.image}" alt="${card.nama}" width="300"></span>
                    <span class="product-tag">${card.tag}</span>
                    <button class="add-button"
                        data-index="${produk.indexOf(card)}"
                        aria-label="Tambah ${card.nama} ke keranjang">+</button>
                </div>
                <div class="product-info">
                    <p class="product-category">Jajanan Gurih</p>
                    <h3>${card.nama}</h3>
                    <div class="product-bottom">
                        <strong>Rp${card.price.toLocaleString("id-ID")}</strong>
                        <span class="rating">★ ${card.rating}</span>
                    </div>
                </div>
            </article>
        `;
    }

    container.innerHTML = cardHTML;
}

function tampilkanBasket() {
    const container = document.getElementById("basket-content");
    if (!container) return;

    keranjang = bacaKeranjang();

    if (keranjang.length === 0) {
        container.innerHTML = `
            <div class="empty-cart" tabindex="-1">
                <div class="empty-art" aria-hidden="true">🛍️</div>
                <h2>Keranjang kamu masih kosong</h2>
                <p>Yuk, temukan jajanan favorit untuk menemani harimu.</p>
                <a href="../HomePage/jajankuy.html">Pilih jajanan →</a>
            </div>`;
        return;
    }

    const jumlah = keranjang.reduce((total, item) => total + item.jumlah, 0);
    const subtotal = keranjang.reduce((total, item) => total + item.price * item.jumlah, 0);
    const itemsHTML = keranjang.map((item) => `
        <article class="cart-item">
            <img src="${item.image}" alt="${item.nama}" width="90">
            <div class="item-info">
                <h3>${item.nama}</h3>
                <p>Rp${item.price.toLocaleString("id-ID")} / item</p>
            </div>
            <div class="item-actions">
                <strong>${item.jumlah} × Rp${item.price.toLocaleString("id-ID")}</strong>
                <div class="controls">
                    <label class="quantity">Jumlah
                        <input type="number" min="1" max="99" value="${item.jumlah}" data-jumlah="${item.nama}">
                    </label>
                    <button type="button" data-hapus="${item.nama}">Hapus</button>
                </div>
            </div>
        </article>`).join("");

    container.innerHTML = `
        <div class="basket-layout">
            <section class="cart-panel">
                <div class="panel-heading"><h2>Jajanan pilihanmu</h2><p>${jumlah} item</p></div>
                ${itemsHTML}
                <button type="button" data-kosongkan>Hapus semua</button>
            </section>
            <div class="summary-column">
                <aside class="summary">
                    <h2>Ringkasan pesanan</h2>
                    <dl><div><dt>Subtotal (${jumlah} item)</dt>
                        <dd>Rp${subtotal.toLocaleString("id-ID")}</dd></div></dl>
                    <div class="total"><p>Total pembayaran</p>
                        <strong>Rp${(subtotal + 14000).toLocaleString("id-ID")}</strong></div>
                </aside>
                <a class="button checkout" href="../ProsesPembayaran/prosespembayaran.html">Lanjut pembayaran →</a>
            </div>
        </div>`;
}

function tampilkanPembayaran() {
    const daftar = document.getElementById("payment-items");
    if (!daftar) return;

    keranjang = bacaKeranjang();
    const jumlah = keranjang.reduce((total, item) => total + item.jumlah, 0);
    const subtotal = keranjang.reduce((total, item) => total + item.price * item.jumlah, 0);
    daftar.innerHTML = keranjang.length
        ? keranjang.map((item) => `
            <article class="product-row">
                <div class="product-cell">
                    <div class="product-picture picture-orange"><img src="${item.image}" alt="${item.nama}" width="60"></div>
                    <div class="product-description"><h3>${item.nama}</h3><small class="stock-note">Stok tersedia</small></div>
                </div>
                <span class="unit-price">Rp${item.price.toLocaleString("id-ID")}</span>
                <span class="quantity">${item.jumlah}</span>
                <strong class="subtotal">Rp${(item.price * item.jumlah).toLocaleString("id-ID")}</strong>
            </article>`).join("")
        : `<p>Keranjang masih kosong. <a href="../HomePage/jajankuy.html">Pilih jajanan</a>.</p>`;

    const labelJumlah = document.getElementById("payment-item-count");
    const labelSubtotal = document.getElementById("payment-subtotal");
    const labelTotal = document.getElementById("payment-total");
    if (labelJumlah) labelJumlah.textContent = `Total harga (${jumlah} barang)`;
    if (labelSubtotal) labelSubtotal.textContent = `Rp${subtotal.toLocaleString("id-ID")}`;
    if (labelTotal) labelTotal.textContent = `Rp${(subtotal + 14000).toLocaleString("id-ID")}`;
}

document.addEventListener("click", (event) => {
    const tombol = event.target.closest(".add-button");
    if (tombol) {
        tambahKeKeranjang(Number(tombol.dataset.index));
        tampilkanBasket();
        return;
    }

    const hapus = event.target.closest("[data-hapus]");
    if (hapus) {
        keranjang = keranjang.filter((item) => item.nama !== hapus.dataset.hapus);
    } else if (event.target.closest("[data-kosongkan]")) {
        keranjang = [];
    } else if (event.target.closest("#place-order")) {
        event.preventDefault();
        if (keranjang.length === 0) return;
        document.getElementById("pembayaran-berhasil")?.classList.add("show-success");
        keranjang = [];
        localStorage.setItem(kunciKeranjang, JSON.stringify(keranjang));
        updateJumlahKeranjang();
        tampilkanBasket();
        return;
    } else {
        return;
    }

    localStorage.setItem(kunciKeranjang, JSON.stringify(keranjang));
    tampilkanBasket();
    updateJumlahKeranjang();
});

document.addEventListener("change", (event) => {
    const input = event.target.closest("[data-jumlah]");
    if (!input) return;
    const jumlah = Number(input.value);
    if (!Number.isInteger(jumlah) || jumlah < 1 || jumlah > 99) {
        tampilkanBasket();
        return;
    }
    const item = keranjang.find((produk) => produk.nama === input.dataset.jumlah);
    if (item) item.jumlah = jumlah;
    localStorage.setItem(kunciKeranjang, JSON.stringify(keranjang));
    tampilkanBasket();
    updateJumlahKeranjang();
});

homepage();
tampilkanBasket();
tampilkanPembayaran();
updateJumlahKeranjang();
