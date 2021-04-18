let invoke = {
    name: 'invoke',
    status: true,
    clue: ['Fungsi: Memanggil command langsung ke MTProto', 'Format:\n<code> .invoke method [dataJSON]</code>'],
    regex: /^([!\.\/]invoke ([\w_]+))/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            method = cocok[2]
            parameter = text.replace(cocok[1], '').trim()
            try {
                dataInvoke = parameter.length < 3 ? false : JSON.parse(parameter)
            } catch (e) {
                return tg.sendMessage(message.chat_id, '❌ ' + e, false, false, false, false, message.id)
            }
            return tg.invoke(method, dataInvoke)
                .then(result => tg.sendMessage(message.chat_id, JSON.stringify(result, null, 2), false, false, false, false, message.id))
                .catch(result => tg.sendMessage(message.chat_id, `❌ ${cocok[2]}\n<code>${result.message}</code>`, 'html', false, false, false, message.id))
        }
    }
}

module.exports = {
    invoke
}
