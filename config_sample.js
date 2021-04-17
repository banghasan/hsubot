module.exports = {
  // di dapat dari https://my.telegram.org/
  API_ID: 123456,
  API_HASH: 'copasDiSini',

  // aktifkan jika pakai bot API
  BOT_API: false,
  // HANYA jika BOT_API true, token bot API dari @botfather
  BOT_TOKEN: '',

  // untuk verbose mode
  debug: {
    active: false,
    level: 1 // 1 event only, 2 detail, 3 semua termasuk object dan fungsi
  },
  admin:
  {
    active: false,
    // Jika admin.active, sesuaikan dengan ID mu
    id: [123456],
  },


}
