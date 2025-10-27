document.addEventListener("DOMContentLoaded", () => {
    
    // --- Logika Navigasi Tab Bar ---
    const tabItems = document.querySelectorAll(".tab-item");
    const pages = document.querySelectorAll(".page");

    // Tampilkan halaman 'photo-generator' sebagai default saat pertama kali dimuat
    // (karena di HTML kita tandai 'active')
    showPage("photo-generator"); 

    tabItems.forEach(item => {
        item.addEventListener("click", () => {
            // Hapus 'active' dari semua tab
            tabItems.forEach(tab => tab.classList.remove("active"));
            // Tambahkan 'active' ke tab yang diklik
            item.classList.add("active");
            
            // Dapatkan ID halaman dari atribut data-page
            const pageId = item.getAttribute("data-page");
            showPage(pageId);
        });
    });

    function showPage(pageId) {
        // Sembunyikan semua halaman
        pages.forEach(page => page.classList.remove("active"));
        // Tampilkan halaman yang sesuai
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.add("active");
        }
    }

    // --- Fitur 1: Pembuat Stiker (Demo Frontend) ---
    const stickerUpload = document.getElementById("sticker-upload");
    const stickerPreview = document.getElementById("sticker-preview");
    const stickerPreviewContainer = document.getElementById("sticker-preview-container");
    const createStickerBtn = document.getElementById("create-sticker-btn");

    stickerUpload.addEventListener("change", function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                stickerPreview.src = event.target.result;
                stickerPreviewContainer.style.display = "flex";
                createStickerBtn.style.display = "flex";
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    createStickerBtn.addEventListener("click", () => {
        alert("FITUR BACKEND DIPERLUKAN!\n\nUntuk benar-benar membuat stiker, foto ini perlu dikirim ke server untuk:\n1. Menghapus background (menggunakan AI).\n2. Mengkonversi ke format .webp.\n3. Mengirimnya kembali ke pengguna.");
    });


    // --- Fitur 2: Generator Foto Kreatif (Demo Canvas) ---
    const userPhotoUpload = document.getElementById("user-photo-upload");
    const generatePhotoBtn = document.getElementById("generate-photo-btn");
    const canvas = document.getElementById("result-canvas");
    const ctx = canvas.getContext("2d");
    const downloadBtn = document.getElementById("download-btn");

    // Placeholder untuk gambar template dan foto pengguna
    const templateImg = new Image();
    const userImg = new Image();
    let userPhotoSelected = false;

    // Anda harus mengganti ini dengan path ke gambar template Anda
    // Saya gunakan placeholder
    templateImg.src = "https://via.placeholder.com/400x500.png?text=Template+Foto+Berdua";
    templateImg.crossOrigin = "anonymous"; // Diperlukan jika memuat dari domain lain

    // Muat foto pengguna saat dipilih
    userPhotoUpload.addEventListener("change", function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                userImg.src = event.target.result;
                userPhotoSelected = true;
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    // Logika tombol Generate
    generatePhotoBtn.addEventListener("click", () => {
        if (!userPhotoSelected) {
            alert("Harap pilih fotomu terlebih dahulu!");
            return;
        }

        // Tunggu kedua gambar (template dan pengguna) selesai dimuat
        const imagesToLoad = [templateImg, userImg];
        let imagesLoaded = 0;

        imagesToLoad.forEach(img => {
            if (img.complete) {
                imagesLoaded++;
            } else {
                img.onload = () => {
                    imagesLoaded++;
                    if (imagesLoaded === imagesToLoad.length) {
                        drawImages();
                    }
                };
            }
        });

        if (imagesLoaded === imagesToLoad.length) {
            drawImages();
        }
    });

    function drawImages() {
        // Bersihkan canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Gambar template sebagai background
        ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

        // 2. Gambar foto pengguna di atasnya
        // (Ini adalah bagian "menempelkan foto")
        // Anda harus menyesuaikan koordinat (x, y, width, height) ini
        // agar pas dengan "lubang" wajah di template Anda.
        // Format: ctx.drawImage(gambar, x, y, lebar, tinggi);
        ctx.drawImage(userImg, 150, 70, 100, 100); // Contoh: (x:150, y:70, w:100, h:100)

        alert("Foto berhasil digabungkan!");

        // Tampilkan tombol download
        downloadBtn.style.display = "flex";
        // Atur data URL untuk tautan download
        downloadBtn.href = canvas.toDataURL("image/png");
    }
});
                  
