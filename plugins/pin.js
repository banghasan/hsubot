
let pin = {
    name: 'pin',
    status: true,
    clue: ['Fungsi: Menyematkan pesan', 'Format:\n <code>.pin</code> dengan mereply pesan yang akan di pin'],
    regex: /^[!\/\.]pin$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            if (!message.reply_to_message_id) return tg.sendMessage(message.chat_id, '🤷🏽‍♂️ Silakan reply pesan yang akan dipin.', 'html', false, false, false, message.id)
            return tg.pinChatMessage(message.chat_id, message.reply_to_message_id).catch(e => console.log(e))
        }
    }
}

let unpin = {
    name: 'unpin',
    status: true,
    clue: ['Fungsi: Melepaskan semat pesan', 'Format:\n <code>.unpin</code> dengan mereply pesan yang akan di pin'],
    regex: /^[!\/\.]unpin$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            if (!message.reply_to_message_id)
                return tg.sendMessage(message.chat_id, '❌ Reply pesan yang akan di unpin.', 'html', false, false, false, message.id)
            return tg.unpinChatMessage(message.chat_id, message.reply_to_message_id)
        }
    }
}

module.exports = {
    pin,
    unpin,
}
