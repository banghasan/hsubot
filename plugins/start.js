let start = {
    name: 'start',
    status: true,
    clue: ['Fungsi: Test respon bot', 'Format:\n <code>.ping</code>'],
    regex: /^[!\/\.]start$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id)
            let pesan = 'Halo, aku <b>bot</b>.\n\nItu saja perkenalannya ^,^'
            return tg.sendMessage(message.chat_id, pesan, 'html')
        }
    }
}

module.exports = {
    start
}