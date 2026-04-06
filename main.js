// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseConfig = {
  apiKey: "AIzaSyA2uMQ-SO6cfFcAmoKbaBNDh_N34TYU68o",
  authDomain: "insancemerlang-c6ff2.firebaseapp.com",
  projectId: "insancemerlang-c6ff2",
  storageBucket: "insancemerlang-c6ff2.firebasestorage.app",
  messagingSenderId: "996228614767",
  appId: "1:996228614767:web:715bac465789728e9b9b9a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const tanamanCollection = collection(db, "tanaman")

// fungsi untuk menampilkan daftar tanaman
export async function tampilkanDaftarTanaman() {
  // ambil snapshot data dari koleksi tanaman
  const snapshot = await getDocs(tanamanCollection)
  
  // ambil elemen tabel data
  const tabel = document.getElementById("tabelData")
  
    // kosongkan isi tabel
  tabel.innerHTML = ""
  
  // loop setiap dokumen dalam snapshot 
  snapshot.forEach((doc) => {
    // variabel untuk menyimpan data
    const data = doc.data()
    const id = doc.id
    
    // buat elemen baris baru
    const baris = document.createElement("tr")
    const kolomNo = document.createElement('td')
    kolomNo.textContent = tabel.rows.length+1
    
    // buat elemen kolom untuk nama tanaman
    const kolomNamaTanaman = document.createElement("td")
    kolomNamaTanaman.textContent = data.namaTanaman
    
    // buat elemen kolom untuk warna
    const kolomWarna = document.createElement("td")
    kolomWarna.textContent = data.warna
    
    //bual elemen kolom untuk jenis
    const kolomJenis = document.createElement("td")
    kolomJenis.textContent = data.jenis
    
    // buat elemen kolom untuk aksi
    const kolomAksi = document.createElement("td")
     //buat tombol edit
    const tombolEdit = document.createElement("a")
    tombolEdit.textContent = "edit"
    tombolEdit.href = "edit.html?id=" + id
    tombolEdit.className = "button edit"
    
    //buat tombol hapus
    const tombolHapus = document.createElement("button")
    tombolHapus.textContent = "Hapus"
    tombolHapus.className = "button delete"
    tombolHapus.onclick = async () => {
      await hapusTanaman(id)
    }
    //tambahkan elemen ke dalam kolom Aksi
    kolomAksi.appendChild(tombolEdit)
    kolomAksi.appendChild(tombolHapus)
    
    //tambah kolom ke dalam baris
    baris.appendChild(kolomNo)
    baris.appendChild(kolomNamaTanaman)
    baris.appendChild(kolomWarna)
    baris.appendChild(kolomJenis)
    baris.appendChild(kolomAksi)
    
    //tambahkan baris ke dalam tabel
    tabel.appendChild(baris)
  })
}

//fungsi untuk menambah data siswa
export async function tambahDataTanaman() {
  //ambil nilai dari form
  const namaTanaman = document.getElementById('namaTanaman').value
  const warna = document.getElementById('warna').value
  const jenis = document.getElementById('jenis').value
  
  
  //tambahkan data ke firestore
  await addDoc(tanamanCollection, {
    namaTanaman: namaTanaman,
    warna: warna,
    jenis: jenis
  })
  
  //alihkan ke halaman daftar siswa
  window.location.href = 'daftar.html'
}
    //fungsi untuk menghapus daftar siswa
export async function hapusTanaman(id) {
  //konfrimasi sebelum menghapus
  if (!confirm("yakin ingin menghapus data tanaman?")) return
  //menghapus dokumen siswa berdasarkan id
  await deleteDoc(doc(db, "tanaman", id))
  //refsesh daftar siswa
  await tampilkanDaftarTanaman()
  
}

// fungsi untuk mengambil data siswa berdasarkan id
export async function ambilDataTanaman(id) {
  const docRef = doc(db, "tanaman", id)
  const docSnap = await getDoc(docRef)
  
  return await docSnap.data()
}

// fungsi untuk mengubah data siswa
export async function ubahDataTanaman(id, namaTanaman, warna, jenis) {
  await updateDoc(doc(db, "tanaman", id), {
    namaTanaman: namatanaman,
    warna: warna,
    jenis: jenis
  })
  
  // alihkan ke halaman daftar siswa 
  window. location. href = 'daftar.html'
}
