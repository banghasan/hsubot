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
let pong = {
    name: 'pong',
    status: true,
    clue: ['Fungsi: Test respon bot', 'Format: <code>.pong</code>'],
    regex: /^[!\/\.]pong$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {  
            tg.sendChatAction(message.chat_id)          
            return tg.sendMessage(message.chat_id, '🐧 <b>Ping..uin!</b>', 'html', false, false, false, message.id)
                .catch(e => console.log(e))
        }
    }
}
module.exports = {
    ping, pong
}
