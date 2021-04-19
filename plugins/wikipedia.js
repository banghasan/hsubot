const { fetchJson } = require('../module/util');

let wikipedia = {
    name: 'wikipedia',
    status: false,
    clue: ['Fungsi: Wikipedia online', 'Format:\n<code>\n .wiki kata\n .wikipedia kata</code>'],
    regex: /^[!\/\.]wiki(?:pedia) (.+)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id)
            let url = 'https://mhankbarbar.herokuapp.com/api/wiki?q=' + cocok[1]

            let data = {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            }

            fetchJson(url, data).then(res => {
                if (res.status == 200) {
                    pesan = res.result
                } else {
                    pesan = res.error
                }
                tg.sendMessage(message.chat_id, pesan)
            })

            return true;
        }
    }
}

module.exports = {
    wikipedia
}
