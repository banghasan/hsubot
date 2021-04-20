module.exports = {
  // di dapat dari https://my.telegram.org/
  API_ID: 123456,
  API_HASH: 'copasDiSini',

  // path TDLib (tersedia untuk Linux 64 compile via Ubuntu 20.04)
  pathTDLib: './tdlib/libtdjson.so',

  // aktifkan jika pakai bot API
  // jika bot API aktif, userbot otomatis OFF
  BOT_API: false,
  // token bot API dari @botfather, HANYA jika BOT_API true
  BOT_TOKEN: '',

  // jika konek dengan nomor hp
  // pake tipe string, format internasional 628xxxxxxx

  phone: '6281234567890', // ini contoh saja, ganti dengan yang sesuai

  // untuk verbose mode
  debug: {
    active: true,
    level: 0 // 0 minimalis, 1 event only, 2 detail, 3 semua termasuk object dan fungsi
  },

  admin:
  {
    active: true, // <-- aktifkan jika ingin membatasi bot dipergunakan oleg admin saja

    // jika skipme false, dan admin true.. id bot harus dimasukkan di sini. 
    // Amannya sih masukkan saja, kawatir berubah pikiran trus lupa ngisinya
    id: [
      213567634, // <- ganti ini ke ID kamu
    ],
  },

  // detail aplikasi

  // untuk keperluan plugins
  base: {
    uploadPath: '',
  },

  // override plugins status
  // namaPlugins = true / false
  plugins: {
    bash: false,
    debugJSON: false, parseMode: false,
    foto: true, dokumen: true, video: true, audio: true, voice: true, sticker: true,
    getMe: true, invoke: false,
    pin: true, unpin: true, ping: true, pong: true,
    quotes: true, wikipedia: true,
    uploadFoto: true, uploadDokumen: true, uploadVideo: true,
    uploadAudio: true, uploadVoice: true, uploadSticker: true,
    getUser: false
  },

  // userbot: jika true, maka pesan ditandai terbaca
  terbaca: true,

  // aktifkan jika pesan sendiri tidak ingin diproses
  skipme: false,

}
