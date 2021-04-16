/*
Library Telegram
(untuk TDLib/MTProto)

Versi 0.1 Alpha
15 April 2021

Sedang dibuat / disusun ulang dari awal, masih acakadul.

Hasanudin H Syafaat
Telegram/Twitter/IG: @hasanudinhs
Email: bangHasan@gmail.com
Support Grup: @botindonesia

*/

function Telegram(handle) {
    this.handle = handle
}

Telegram.prototype = {

    parseMode: function (text, parse_mode) {

        let pesan = { text: text }

        if (parse_mode) {
            parse_mode = parse_mode.toLowerCase()
            if (parse_mode == 'markdown') {
                parseMode = 'textParseModeMarkdown'
            } else if (parse_mode == 'html') {
                parseMode = 'textParseModeHTML'
            } else {
                parse_mode = false
            }
        }

        if (parse_mode) {
            pesan = this.handle.execute({
                _: 'parseTextEntities',
                parse_mode: { _: parseMode },
                text: text
            })
        }

        return pesan

    },

    // fungsi seperti Bot API

    getMe() {
        return this.handle.invoke({ _: 'getMe' })
    },

    sendMessage: function (chat_id, text, parse_mode = false, entities = false, disable_web_page_preview = false) {
        let pesan = this.parseMode(text, parse_mode)
        return this.handle.invoke({
            '_': "sendMessage",
            chat_id: chat_id,
            disable_notification: false,
            from_background: true,
            input_message_content: {
                '_': "inputMessageText",
                text: pesan,
                disable_web_page_preview: disable_web_page_preview,
                clear_draft: false
            }
        })
    },

    editMessageText: function (chat_id, message_id, text, parse_mode = false, entities = false, disable_web_page_preview = false) {
        let pesan = this.parseMode(text, parse_mode)
        return this.handle.invoke({
            '_': "editMessageText",
            chat_id: chat_id,
            message_id: message_id,
            input_message_content: {
                '_': "inputMessageText",
                text: pesan,
                disable_web_page_preview: disable_web_page_preview,
                clear_draft: false
            }
        })
    }
}

module.exports = {
    Telegram
}