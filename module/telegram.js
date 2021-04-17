/*
HSTgLib

Library Telegram
(untuk TDLib/MTProto)

Sedang dibuat / disusun ulang dari awal, masih acakadul.

Hasanudin H Syafaat
Telegram/Twitter/IG: @hasanudinhs
Email: bangHasan@gmail.com
Support Grup: @botindonesia

*/

const { Util } = require('./util');

function Telegram(handle) {
    this.handle = handle
}

Telegram.prototype = {
    name: 'HSTgLib',
    versi : '1.0.1',
    version : this.versi,

    invoke : function (method, parameters = false) {
        let data = {
            '_': method
        }

        if (parameters) {            
            Util.forEach(parameters, (nilai, index) => {
                data[index] = nilai
            })
        }

        return this.handle.invoke(data)
    },

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

    deleteMessage: function (chat_id, message_id, revoke = false) {
        message_id = message_id.constructor === Array ? message_id : [message_id]
        let data = {
            '_': "deleteMessages",
            chat_id: chat_id,
            message_ids: message_id
        }

        if (revoke) data.revoke = true

        return this.handle.invoke(data)
    },

    pinChatMessage: function (chat_id, message_id, disable_notification = false, only_for_self = false) {
        let data = {
            '_': "pinChatMessage",
            chat_id: chat_id,
            message_id: message_id
        }

        if (disable_notification) {
            data.disable_notification = disable_notification;
        }

        if (only_for_self) {
            data.only_for_self = only_for_self;
        }

        return this.handle.invoke(data)
    },

    unpinChatMessage: function (chat_id, message_id) {
        let data = {
            '_': "unpinChatMessage",
            chat_id: chat_id,
            message_id: message_id
        }
        return this.handle.invoke(data)
    },

    unpinAllMessages: function (chat_id) {
        let data = {
            '_': "unpinAllMessages",
            chat_id: chat_id
        }
        return this.handle.invoke(data)
    },

    getUser: function (user_id) {
        let data = {
            '_': "getUser",
            user_id: user_id,
        }

        return this.handle.invoke(data)
    },

    getUserFullInfo: function (user_id) {
        let data = {
            '_': "getUserFullInfo",
            user_id: user_id,
        }

        return this.handle.invoke(data)
    },

    searchPublicChat: function (username) {
        let data = {
            '_': "searchPublicChat",
            username: username,
        }

        return this.handle.invoke(data)
    },


    // userbot

    searchPublicChats: function (query) {
        let data = {
            '_': "searchPublicChats",
            query: query,
        }

        return this.handle.invoke(data)
    },

    viewMessages: function (chat_id, message_id, force_read = false) {
        message_id = message_id.constructor === Array ? message_id : [message_id]
        let data = {
            '_': "viewMessages",
            chat_id: chat_id,
            message_ids: message_id
        }

        if (force_read) data.force_read = true

        return this.handle.invoke(data)
    },

    getChatStatistics: function (chat_id) {
        let data = {
            '_': "getChatStatistics",
            chat_id: chat_id
        }
        return this.handle.invoke(data)
    },

}

module.exports = {
    Telegram
}