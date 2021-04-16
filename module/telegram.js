/*
Library Telegram
(untuk TDLib/MTProto)

Versi 0.1.2 Alpha
16 April 2021

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

    parseMode: function (text, parse_mode, entities) {

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

        if (entities) {
            pesan = {
                _: 'formattedText',
                text: text,
                entities: entities
            }
        }

        return pesan

    },

    // fungsi seperti Bot API

    getMe() {
        return this.handle.invoke({ _: 'getMe' })
    },

    sendMessage: function (chat_id, text, parse_mode = false, entities = false, disable_web_page_preview = false, disable_notification = false, reply_to_message_id = false) {
        let pesan = this.parseMode(text, parse_mode, entities)

        let data = {
            '_': "sendMessage",
            chat_id: chat_id,
            input_message_content: {}
        }

        if (reply_to_message_id) {
            data.reply_to_message_id = reply_to_message_id;
        }
        if (disable_notification) {
            data.disable_notification = disable_notification;
        }

        data.input_message_content = {
            '_': "inputMessageText",
            text: pesan,
            disable_web_page_preview: disable_web_page_preview,
            clear_draft: false
        }

        return this.handle.invoke(data)
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
    },

    forwardMessage: function (chat_id, from_chat_id, message_id) {
        let data = {
            '_': "sendMessage",
            chat_id: chat_id,
            input_message_content: {}
        }

        data.input_message_content = {
            '_': "inputMessageForwarded",
            from_chat_id: from_chat_id,
            message_id: message_id
        }

        return this.handle.invoke(data)
    },


}

module.exports = {
    Telegram
}