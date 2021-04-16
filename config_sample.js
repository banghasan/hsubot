module.exports = {
  API_ID: 123456, // di dapat dari https://my.telegram.org/
  API_HASH: 'copasDiSini', // di dapat dari https://my.telegram.org/

  debug: { // untuk verbose mode
    active: false,
    level: 1 // 1 event only, 2 banyak tidak termasuk object atau fungsi, 3 semua
  },
  admin:
  {
    active: false,
    id: [123456],  // Jika admin.active, sesuaikan dengan ID mu
  },

  /* 
  klo mau pakai bot api
  gunakan node botapi.js
  */

  BOT_API: false,
  BOT_TOKEN: ''  // token bot API dari @botfather
}
