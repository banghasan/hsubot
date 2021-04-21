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

// pong untuk yang interaktif

const { performance } = require('perf_hooks');

let pong = {
    name: 'pong',
    status: true,
    clue: ['Fungsi: Test respon bot', 'Format: <code>.pong</code>'],
    regex: /^[!\/\.]pong$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            return tg.sendMessage(message.chat_id, 'Pingiiin...', false, false, false, false, message.id)
                .then(result => {

                    let t0 = performance.now();

                    // console.log(result)
                    tg.client.once('message' + result.id, (message) => {
                        // console.log(message)
                        let t1 = performance.now();
                        let selisih = '<code>' + (t1 - t0).toLocaleString('id-ID') + "</code> milidetik."
                        let pesan = '🐧 <b>Ping-uin!</b>\n👟 ... berlari dalam ' + selisih
                        tg.editMessageText(message.chat_id, message.id, pesan, 'html')
                    })
                })
                .catch(e => console.log(e))
        }
    }
}
module.exports = {
    ping, pong
}
