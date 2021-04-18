let json = {
    name: 'debugJSON',
    status: true,
    clue: ['Fungsi: Mendebug mengeluarkan isi message dalam format JSON', 'Format: ketikkan <code>.json</code>'],
    regex: /^[!\/\.]json$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            return tg.sendMessage(message.chat_id, JSON.stringify(update, null, 2))
        }
    }
}

let parseMode = {
    name: 'parseMode',
    status: true,
    clue: ['Fungsi: Test parse mode', 'Format: <code>.(html|markdown) isi pesan</code>'],
    regex: /^([!\/\.](html|markdown))/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            let pesan = text.replace(cocok[1], '').trim()
            if (pesan < 2) return tg.sendMessage(message.chat_id, `❌ Syntax keliru`, false, false, false, false, message.id)                

            return tg.sendMessage(message.chat_id, pesan, cocok[2])
                .catch(result => tg.sendMessage(message.chat_id, `❌ ${result.message}`, false, false, false, false, message.id))
        }
    }
}

module.exports = {
    json, parseMode
}
