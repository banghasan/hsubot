const { fetchJson } = require('../module/util');

let quotes = {
    name: 'quotes',
    status: true,
    clue: ['Fungsi: Mendapatkan quote', 'Format:\n <code>.quote</code>'],
    regex: /^[!\/\.]quotes?$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id)

            url = 'https://mhankbarbar.herokuapp.com/api/randomquotes'

            data = {
                method: 'get',
                // body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            }

            fetchJson(url, data).then(res => {
                if (res.status == 200) {
                    pesan = `${res.quotes} (${res.author})`
                } else {
                    pesan = 'Terjadi kesalahan internal.'
                }
                tg.sendMessage(message.chat_id, pesan)
            })

            return true;
        }
    }
}

module.exports = {
    quotes
}