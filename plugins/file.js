let foto = {
    name: 'foto',
    status: true,
    clue: ['Fungsi: test kirim foto', 'Format:<code>\n .foto\n .photo</code>'],
    regex: /^[!\/\.](fo|pho)to$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id, 'photo')
            let data = './data/banghasan_pedang.jpg'
            let caption = 'Klotok, <b>Kediri</b>'
            return tg.sendPhoto(message.chat_id, data, caption, 'html').catch(e => console.log(e))
        }
    }
}

let dokumen = {
    name: 'dokumen',
    status: true,
    clue: ['Fungsi: test kirim dokumen', 'Format:<code>\n .doc</code>'],
    regex: /^[!\/\.](doc|doc|document)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id, 'document')
            let data = './data/hsubot.pdf'
            let caption = '<b>HSubot</b>: Salam Perkenalan'
            return tg.sendDocument(message.chat_id, data, caption, 'html').catch(e => console.log(e))
        }
    }
}

let video = {
    name: 'video',
    status: true,
    clue: ['Fungsi: test kirim video', 'Format:<code>\n .video</code>'],
    regex: /^[!\/\.](vid|video)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id, 'video')
            // contoh lain: https://gist.github.com/jsturgis/3b19447b304616f18657
            let data = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
            let caption = 'Apa Saja, <b>Contoh</b>'
            return tg.sendVideo(message.chat_id, data, caption, 'html').catch(e => console.log(e))
        }
    }
}

let audio = {
    name: 'audio',
    status: true,
    clue: ['Fungsi: test kirim audio', 'Format:<code>\n .audio</code>'],
    regex: /^[!\/\.](audio)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id, 'audio')
            let data = './data/terpesona.mp3'
            let caption = '<i>Terpesona.. aku terpesona</i>'
            return tg.sendAudio(message.chat_id, data, caption, 'html').catch(e => console.log(e))
        }
    }
}

let voice = {
    name: 'voice',
    status: true,
    clue: ['Fungsi: test kirim voice', 'Format:<code>\n .voice</code>'],
    regex: /^[!\/\.](voice)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id, 'voice')
            let data = './data/terpesona.ogg'
            let caption = '<i>Terpesona.. aku terpesona</i>'
            return tg.sendVoice(message.chat_id, data, caption, 'html').catch(e => console.log(e))
        }
    }
}

let sticker = {
    name: 'sticker',
    status: true,
    clue: ['Fungsi: test kirim sticker', 'Format:<code>\n .sticker</code>'],
    regex: /^[!\/\.](sticker)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id)
            let data = './data/sticker.png'
            return tg.sendSticker(message.chat_id, data).catch(e => console.log(e))
        }
    }
}

module.exports = {
    foto, dokumen, video, audio, voice, sticker
}
