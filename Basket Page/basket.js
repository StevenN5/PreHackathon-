"use strict";

// 1. Daftar makanan. ID dipakai untuk mengenali makanan yang dipilih.
const daftarMakanan = [
  { id: 1, nama: "Dimsum Ayam", harga: 18000, emoji: "🥟" },
  { id: 2, nama: "Donat Cokelat", harga: 24000, emoji: "🍩" },
  { id: 3, nama: "Kentang Goreng", harga: 20000, emoji: "🍟" },
  { id: 4, nama: "Brown Sugar Boba", harga: 22000, emoji: "🧋" },
  { id: 5, nama: "Soft Cookies", harga: 26000, emoji: "🍪" }
];
const kunciPenyimpanan = "jajankuy-pesanan-v1";
const isiKeranjang = document.querySelector("#basket-content");
const isiMenu = document.querySelector("#menu-content");
let keranjang = [];
let promo = false;

function cariMakanan(id) {
  for (let i = 0; i < daftarMakanan.length; i++) {
    if (daftarMakanan[i].id === id) return daftarMakanan[i];
  }
  return null;
}

function money(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

// 2. Baca pesanan dari browser. Data yang rusak diabaikan.
function bacaPesanan() {
  keranjang = [];
  try {
    const data = JSON.parse(localStorage.getItem(kunciPenyimpanan));
    if (!Array.isArray(data)) return;
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (!item || !cariMakanan(item.id)) continue;
      if (!Number.isInteger(item.jumlah) || item.jumlah < 1 || item.jumlah > 99) continue;
      let sudahAda = false;
      for (let j = 0; j < keranjang.length; j++) {
        if (keranjang[j].id === item.id) sudahAda = true;
      }
      if (!sudahAda) keranjang.push({ id: item.id, jumlah: item.jumlah });
    }
  } catch (error) {
    console.log("Pesanan belum bisa dibaca dari penyimpanan browser.");
  }
}

function simpanPesanan() {
  try {
    localStorage.setItem(kunciPenyimpanan, JSON.stringify(keranjang));
    return true;
  } catch (error) {
    alert("Browser tidak dapat menyimpan pesanan. Pilihan hanya bertahan di halaman ini.");
    return false;
  }
}

// 3. Tambah makanan. Jika sudah ada, cukup tambah jumlahnya.
function tambahPesanan(id, jumlah) {
  if (!cariMakanan(id)) return false;
  if (!Number.isInteger(jumlah) || jumlah < 1 || jumlah > 99) {
    alert("Masukkan jumlah 1 sampai 99.");
    return false;
  }
  for (let i = 0; i < keranjang.length; i++) {
    if (keranjang[i].id === id) {
      if (keranjang[i].jumlah + jumlah > 99) {
        alert("Maksimal 99 untuk setiap makanan.");
        return false;
      }
      keranjang[i].jumlah += jumlah;
      simpanPesanan();
      tampilkanHalaman();
      return true;
    }
  }
  keranjang.push({ id: id, jumlah: jumlah });
  simpanPesanan();
  tampilkanHalaman();
  return true;
}

function hapusPesanan(id) {
  for (let i = 0; i < keranjang.length; i++) {
    if (keranjang[i].id === id) {
      keranjang.splice(i, 1);
      break;
    }
  }
  simpanPesanan();
  tampilkanHalaman();
}

// 4. Hitung subtotal dengan looping.
function hitungSubtotal() {
  let total = 0;
  for (let i = 0; i < keranjang.length; i++) {
    const makanan = cariMakanan(keranjang[i].id);
    total += makanan.harga * keranjang[i].jumlah;
  }
  return total;
}

function hitungJumlah() {
  let jumlah = 0;
  for (let i = 0; i < keranjang.length; i++) {
    jumlah += keranjang[i].jumlah;
  }
  return jumlah;
}

// 5. Tampilkan daftar makanan hanya di menu.html.
function tampilkanMenu() {
  let html = "";
  for (let i = 0; i < daftarMakanan.length; i++) {
    const makanan = daftarMakanan[i];
    html += `<article class="cart-item">
      <div class="food-art" aria-hidden="true">${makanan.emoji}</div>
      <div class="item-info"><h2>${makanan.nama}</h2><p>${money(makanan.harga)}</p></div>
      <form data-pesan="${makanan.id}">
        <label>Jumlah <input type="number" name="jumlah" value="1" min="1" max="99" required></label>
        <button type="submit">Tambah ke keranjang</button>
      </form>
    </article>`;
  }
  isiMenu.innerHTML = html;
}

// 6. Buat isi keranjang dari pesanan user, bukan makanan contoh.
function tampilkanKeranjang() {
  if (keranjang.length === 0) {
    promo = false;
    isiKeranjang.innerHTML = `<div class="empty-cart" tabindex="-1">
      <div class="empty-art" aria-hidden="true">🛍️</div>
      <h2>Keranjang kamu masih kosong</h2>
      <p>Pilih makanan dulu, lalu pesananmu akan muncul di sini.</p>
      <a href="menu.html">Pilih jajanan →</a>
    </div>`;
    return;
  }
  let rows = "";
  for (let i = 0; i < keranjang.length; i++) {
    const item = keranjang[i];
    const makanan = cariMakanan(item.id);
    rows += `<article class="cart-item">
      <div class="food-art" aria-hidden="true">${makanan.emoji}</div>
      <div class="item-info"><h3>${makanan.nama}</h3><p>${money(makanan.harga)} / item</p></div>
      <div class="item-actions"><strong>${money(makanan.harga * item.jumlah)}</strong>
        <div class="controls">
          <label class="quantity">Jumlah <input type="number" min="1" max="99" value="${item.jumlah}" data-jumlah="${item.id}"></label>
          <button type="button" data-hapus="${item.id}">Hapus ${makanan.nama}</button>
        </div>
      </div>
    </article>`;
  }
  const count = hitungJumlah();
  const subtotal = hitungSubtotal();
  let discount = 0;
  if (promo) discount = Math.min(15000, subtotal);
  isiKeranjang.innerHTML = `<div class="basket-layout">
        <div class="cart-panel">
        <div class="panel-heading">
        <h2>Jajanan pilihanmu</h2>
        <p>${count} item</p>
        </div>${rows}<div class="cart-footer">
        <button type="button" data-clear>Hapus semua</button>
        </div>
        </div>
        <aside class="summary">
        <h2 id="summary-title">Ringkasan pesanan</h2>
        <form id="promo-form">
        <label for="promo">Punya kode promo?</label>
        <div class="promo-field">
        <input id="promo" name="promo" placeholder="Masukkan kode promo" value="${promo ? 'JAJAN15' : ''}">
        <button type="submit">Pakai</button>
        </div>
        </form>
        <p class="promo-hint">${promo ? 'Promo JAJAN15 aktif. Hemat hingga Rp15.000!' : 'Coba JAJAN15 untuk hemat hingga Rp15.000.'}</p>
        <dl>
        <div>
        <dt>Subtotal (${count} item)</dt>
        <dd>${money(subtotal)}</dd>
        </div>
        <div>
        <dt>Ongkos kirim</dt>
        <dd>${money(12000)}</dd>
        </div>
        <div>
        <dt>Biaya layanan</dt>
        <dd>${money(2000)}</dd>
        </div>
        <div class="discount">
        <dt>Diskon jajan</dt>
        <dd>− ${money(discount)}</dd>
        </div>
        </dl>
        <div class="total">
        <p>Total pembayaran</p>
        <strong>${money(subtotal + 14000 - discount)}</strong>
        </div>
        <button class="button checkout" type="button" data-checkout>Lanjut checkout →</button>
        <div class="delivery">
        <div>
        <strong>Jajanan segera meluncur</strong>
        <p>Estimasi tiba 30–45 menit</p>
        </div>
        </div>
        <p class="summary-note">Dibuat fresh, diantar dengan sepenuh hati.</p>
        </aside>
        </div>`;
}

function tampilkanHalaman() {
  document.querySelector("#cart-link").textContent = "Keranjang (" + hitungJumlah() + ")";
  if (isiKeranjang) tampilkanKeranjang();
}

// 7. Event: menghubungkan tombol dan input ke function di atas.
document.addEventListener("submit", function (event) {
  const form = event.target;
  event.preventDefault();
  if (form.dataset.pesan) {
    const id = Number(form.dataset.pesan);
    const jumlah = Number(form.elements.jumlah.value);
    if (tambahPesanan(id, jumlah)) alert("Makanan ditambahkan. Buka Keranjang untuk melihat pesanan.");
  } else if (form.id === "promo-form") {
    if (form.elements.promo.value.trim().toUpperCase() === "JAJAN15") {
      promo = true;
      tampilkanHalaman();
    } else {
      alert("Kode promo tidak valid. Coba JAJAN15.");
    }
  }
});

document.addEventListener("click", function (event) {
  const tombol = event.target.closest("button, [data-account]");
  if (!tombol) return;
  if (tombol.dataset.hapus) {
    hapusPesanan(Number(tombol.dataset.hapus));
    isiKeranjang.focus();
  } else if (tombol.hasAttribute("data-clear")) {
    keranjang = [];
    simpanPesanan();
    tampilkanHalaman();
    isiKeranjang.focus();
  } else if (tombol.hasAttribute("data-checkout")) {
    alert("Total pesanan sudah dihitung. Halaman pembayaran belum terhubung.");
  } else if (tombol.hasAttribute("data-account")) {
    event.preventDefault();
    alert("Halaman masuk belum terhubung.");
  }
});

document.addEventListener("change", function (event) {
  const input = event.target;
  if (!input.dataset.jumlah) return;
  const jumlah = Number(input.value);
  for (let i = 0; i < keranjang.length; i++) {
    if (keranjang[i].id === Number(input.dataset.jumlah)) {
      if (!Number.isInteger(jumlah) || jumlah < 1 || jumlah > 99) {
        input.value = keranjang[i].jumlah;
        alert("Jumlah harus angka bulat 1 sampai 99.");
        return;
      }
      keranjang[i].jumlah = jumlah;
      simpanPesanan();
      tampilkanHalaman();
      document.querySelector('[data-jumlah="' + input.dataset.jumlah + '"]').focus();
      break;
    }
  }
});

// Mulai: baca pesanan, lalu tampilkan halaman yang sedang dibuka.
bacaPesanan();
if (isiMenu) tampilkanMenu();
tampilkanHalaman();

// Saat pesanan berubah di tab lain, baca ulang data yang sama.
window.addEventListener("storage", function (event) {
  if (event.key === kunciPenyimpanan || event.key === null) {
    bacaPesanan();
    tampilkanHalaman();
  }
});
