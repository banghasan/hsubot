const APP = require('../app.js');

let version = {
    name: 'version',
    status: true,
    clue: ['Fungsi: Mengetahui versi bot', 'Format:\n <code>.ver\n .versi</code>'],
    regex: /^[!\/\.]ver(si|tion)?$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            return tg.sendMessage(message.chat_id, `🔰 <b>${APP.nama}</b>\n💠 ${tg.name} <code>v${tg.versi}</code>\n🛄 Fw <code>${APP.versi}</code>\n\n${APP.keterangan}\n\n♿️ Diskusi dan support via ${APP.support}\n📚 Repo ${APP.url}`, 'HTML')
        }
    }
}

module.exports = {
    version
}
