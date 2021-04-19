module.exports = {
  // di dapat dari https://my.telegram.org/
  API_ID: 123456,
  API_HASH: 'copasDiSini',

  // path TDLib (tersedia untuk Linux 64 compile via Ubuntu 20.04)
  pathTDLib: './tdlib/libtdjson.so',

  // aktifkan jika pakai bot API
  BOT_API: false,
  // HANYA jika BOT_API true, token bot API dari @botfather
  BOT_TOKEN: '',

  // untuk verbose mode
  debug: {
    active: true,
    level: 0 // 0 minimalis, 1 event only, 2 detail, 3 semua termasuk object dan fungsi
  },

  admin:
  {
    active: true, // <-- aktifkan jika ingin membatasi bot dipergunakan oleg admin saja
    id: [  // jika skipme false, dan admin true.. id bot harus dimasukkan di sini
      213567634,
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
