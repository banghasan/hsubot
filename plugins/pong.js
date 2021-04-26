// pong untuk contoh yang interaktif
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
                    // console.log(result)
                    let t0 = performance.now();                    
                    tg.client.once('message' + result.id, (message) => {
                        // console.log(message)
                        let t1 = performance.now();
                        let selisih = '<code>' + ((t1 - t0)/1000).toLocaleString( 'id-ID', { maximumFractionDigits: 3 }) + "</code> detik."
                        let pesan = '🐧 <b>Ping-uin!</b>\n👟 berlari ... ' + selisih
                        return tg.editMessageText(message.chat_id, message.id, pesan, 'html')
                    })
                })
                .catch(e => console.log(e))
        }
    }
}

module.exports = {
    pong
}