let ping = {
    name: 'ping',
    status: true,
    clue: ['Fungsi: Test respon bot', 'Format:\n <code>.ping</code>'],
    regex: /^[!\/\.]ping$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id)
            return tg.sendMessage(message.chat_id, '🏓 <b>Pooong!</b>', 'html', false, false, false, message.id)
        }
    }
}

module.exports = {
    ping
}
