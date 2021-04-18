module.exports = {
  // di dapat dari https://my.telegram.org/
  API_ID: 123456,
  API_HASH: 'copasDiSini',
  pathTDLib : './tdlib/libtdjson.so',

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
    active: true, // <-- selalu aktifkan saja
    id: [123456], // <-- batasi di sini, jika bot pengen diproses.. kasih ID nya bot sekalian
  },


}
