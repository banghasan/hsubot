const CONFIG = require('../config.js');

let uPath = CONFIG.base.uploadPath

let ufoto = {
    name: 'uploadFoto',
    status: true,
    clue: ['Fungsi: Upload foto', 'Format:<code>\n .foto [id/file/url]\n .photo [id/file/url]</code>'],
    regex: /^[!\/\.](?:fo|pho)to (.+)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id, 'photo')
            let tipe = tg.typeFile(cocok[1])
            let data = (tipe._ === 'inputFileLocal' ? uPath : '') + cocok[1]

            return tg.sendPhoto(message.chat_id, data)
                .catch(result => tg.sendMessage(message.chat_id, `❌ ${cocok[2]}\n<code>${result.message}</code>`, 'html', false, false, false, message.id))
        }
    }
}

let udokumen = {
    name: 'uploadDokumen',
    status: true,
    clue: ['Fungsi: upload dokumen', 'Format:<code>\n .doc [id/file/url]</code>'],
    regex: /^[!\/\.](?:doc|doc|document) (.+)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id, 'document')

            let tipe = tg.typeFile(cocok[1])
            let data = (tipe._ === 'inputFileLocal' ? uPath : '') + cocok[1]
            return tg.sendDocument(message.chat_id, data)
                .catch(result => tg.sendMessage(message.chat_id, `❌ ${cocok[2]}\n<code>${result.message}</code>`, 'html', false, false, false, message.id))
        }
    }
}

let uvideo = {
    name: 'uploadVideo',
    status: true,
    clue: ['Fungsi: upload video', 'Format:<code>\n .video [id/file/url]</code>'],
    regex: /^[!\/\.](?:vid|video) (.+)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id, 'video')
            let tipe = tg.typeFile(cocok[1])
            let data = (tipe._ === 'inputFileLocal' ? uPath : '') + cocok[1]
            return tg.sendVideo(message.chat_id, data)
                .catch(result => tg.sendMessage(message.chat_id, `❌ ${cocok[2]}\n<code>${result.message}</code>`, 'html', false, false, false, message.id))
        }
    }
}

let uaudio = {
    name: 'uploadAudio',
    status: true,
    clue: ['Fungsi: Upload audio', 'Format:<code>\n .audio [id/file/url]</code>'],
    regex: /^[!\/\.](?:audio) (.+)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id, 'audio')
            let tipe = tg.typeFile(cocok[1])
            let data = (tipe._ === 'inputFileLocal' ? uPath : '') + cocok[1]
            return tg.sendAudio(message.chat_id, data)
                .catch(result => tg.sendMessage(message.chat_id, `❌ ${cocok[2]}\n<code>${result.message}</code>`, 'html', false, false, false, message.id))
        }
    }
}

let uvoice = {
    name: 'uploadVoice',
    status: true,
    clue: ['Fungsi: Upload voice', 'Format:<code>\n .voice [id/file/url]</code>'],
    regex: /^[!\/\.](?:voice) (.+)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id, 'voice')
            let tipe = tg.typeFile(cocok[1])
            let data = (tipe._ === 'inputFileLocal' ? uPath : '') + cocok[1]
            return tg.sendVoice(message.chat_id, data)
                .catch(result => tg.sendMessage(message.chat_id, `❌ ${cocok[2]}\n<code>${result.message}</code>`, 'html', false, false, false, message.id))
        }
    }
}

let usticker = {
    name: 'uploadSticker',
    status: true,
    clue: ['Fungsi: Upload sticker', 'Format:<code>\n .sticker [id/file/url]</code>'],
    regex: /^[!\/\.](?:sticker) (.+)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id)
            let tipe = tg.typeFile(cocok[1])
            let data = (tipe._ === 'inputFileLocal' ? uPath : '') + cocok[1]
            return tg.sendSticker(message.chat_id, data)
                .catch(result => tg.sendMessage(message.chat_id, `❌ ${cocok[2]}\n<code>${result.message}</code>`, 'html', false, false, false, message.id))
        }
    }
}

module.exports = {
    ufoto, udokumen, uvideo, uaudio, uvoice, usticker
}
