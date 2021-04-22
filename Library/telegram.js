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

const { Util } = require('../module/util');

function Telegram(client) {
    this.client = client
}

Telegram.prototype = {
    name: 'HSTgLib',
    versi: '1.4',
    version: this.versi,

    id: null,

    invoke: function (method, parameters = false) {
        let data = {
            '_': method
        }

        if (parameters) {
            Util.forEach(parameters, (nilai, index) => {
                data[index] = nilai
            })
        }

        return this.client.invoke(data)
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
            pesan = this.client.execute({
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


    typeFile: function (content) {

        let data = {}

        if (/^http/i.exec(content)) {
            data = {
                '_': 'inputFileRemote',
                id: content
            }
        } else if (/^(\/|\.\.?\/|~\/)/i.exec(content)) { // deteksi : awal / atau ./ ../ atau ~/
            data = {
                '_': 'inputFileLocal',
                path: content
            }
        } else if (Util.isNumber(content)) {
            data = {
                '_': 'inputFileId',
                id: content
            }
        } else {
            data = {
                '_': 'inputFileRemote',
                id: content
            }

            // mode blob belum aku masukkan, butuh waktu buat coba-coba
        }

        return data

    },

    // fungsi seperti Bot API

    getMe() {
        return this.client.invoke({ _: 'getMe' })
    },

    sendMessage: function (chat_id, text, parse_mode = false, entities = false, disable_web_page_preview = false, disable_notification = false, reply_to_message_id = false) {
        let pesan = this.parseMode(text, parse_mode, entities)

        let data = {
            '_': "sendMessage",
            chat_id: chat_id,
            input_message_content: {}
        }

        if (disable_notification) {
            data.disable_notification = disable_notification;
        }

        if (reply_to_message_id) {
            data.reply_to_message_id = reply_to_message_id;
        }

        data.input_message_content = {
            '_': "inputMessageText",
            text: pesan,
            disable_web_page_preview: disable_web_page_preview,
            clear_draft: false
        }

        return this.client.invoke(data)
    },

    sendChatAction: function (chat_id, type = 'typing') {
        let action
        switch (type.toLowerCase()) {
            case 'photo':
                action = 'chatActionUploadingPhoto'
                break;
            case 'document':
                action = 'chatActionUploadingDocument'
                break;
            case 'video':
                action = 'chatActionUploadingVideo'
                break;
            case 'voice':
            case 'audio':
                action = 'chatActionRecordingVoiceNote'
                break;
            case 'location':
            case 'venue':
                action = 'chatActionChoosingLocation'
                break;
            case 'cancel':
                action = 'chatActionCancel'
                break;
            case 'typing':
            default:
                action = 'chatActionTyping'
                break;
        }

        return this.client.invoke({
            '_': "sendChatAction",
            chat_id: chat_id,
            'action': { '_': action }
        })

    },

    getMessage: function (chat_id, message_id) {
        return this.client.invoke({
            '_': "getMessage",
            chat_id: chat_id,
            message_id: message_id
        })
    },

    editMessageText: function (chat_id, message_id, text, parse_mode = false, entities = false, disable_web_page_preview = false) {
        let pesan = this.parseMode(text, parse_mode)
        return this.client.invoke({
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

        return this.client.invoke(data)
    },

    deleteMessage: function (chat_id, message_id, revoke = false) {
        message_id = message_id.constructor === Array ? message_id : [message_id]
        let data = {
            '_': "deleteMessages",
            chat_id: chat_id,
            message_ids: message_id
        }

        if (revoke) data.revoke = true

        return this.client.invoke(data)
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

        return this.client.invoke(data)
    },

    unpinChatMessage: function (chat_id, message_id) {
        let data = {
            '_': "unpinChatMessage",
            chat_id: chat_id,
            message_id: message_id
        }
        return this.client.invoke(data)
    },

    unpinAllMessages: function (chat_id) {
        let data = {
            '_': "unpinAllMessages",
            chat_id: chat_id
        }
        return this.client.invoke(data)
    },

    getUser: function (user_id) {
        let data = {
            '_': "getUser",
            user_id: user_id,
        }

        return this.client.invoke(data)
    },

    getUserFullInfo: function (user_id) {
        let data = {
            '_': "getUserFullInfo",
            user_id: user_id,
        }

        return this.client.invoke(data)
    },

    searchPublicChat: function (username) {
        let data = {
            '_': "searchPublicChat",
            username: username,
        }

        return this.client.invoke(data)
    },

    sendPhoto: function (chat_id, photo, caption = false, parse_mode = false, caption_entities = false, disable_notification = false, reply_to_message_id = false) {
        // { '_': 'inputFileBlob', name: file.name, size: file.size, data: file },
        let detailData = this.typeFile(photo)

        let data = {
            '_': "sendMessage",
            chat_id: chat_id,
            input_message_content: {}
        }

        if (disable_notification) {
            data.disable_notification = disable_notification;
        }

        if (reply_to_message_id) {
            data.reply_to_message_id = reply_to_message_id;
        }

        data.input_message_content = {
            '_': "inputMessagePhoto",
            photo: detailData,
        }

        if (caption) {
            let text = this.parseMode(caption, parse_mode, caption_entities)
            data.input_message_content.caption = text
        }

        return this.client.invoke(data)
    },

    sendDocument: function (chat_id, document, caption = false, parse_mode = false, caption_entities = false, disable_notification = false, reply_to_message_id = false) {
        // { '_': 'inputFileBlob', name: file.name, size: file.size, data: file },
        let detailData = this.typeFile(document)

        let data = {
            '_': "sendMessage",
            chat_id: chat_id,
            input_message_content: {}
        }

        if (disable_notification) {
            data.disable_notification = disable_notification;
        }

        if (reply_to_message_id) {
            data.reply_to_message_id = reply_to_message_id;
        }

        data.input_message_content = {
            '_': "inputMessageDocument",
            document: detailData,
        }

        if (caption) {
            let text = this.parseMode(caption, parse_mode, caption_entities)
            data.input_message_content.caption = text
        }

        return this.client.invoke(data)
    },

    sendVideo: function (chat_id, video, caption = false, parse_mode = false, caption_entities = false, disable_notification = false, reply_to_message_id = false) {
        // { '_': 'inputFileBlob', name: file.name, size: file.size, data: file },
        let detailData = this.typeFile(video)

        let data = {
            '_': "sendMessage",
            chat_id: chat_id,
            input_message_content: {}
        }

        if (disable_notification) {
            data.disable_notification = disable_notification;
        }

        if (reply_to_message_id) {
            data.reply_to_message_id = reply_to_message_id;
        }

        data.input_message_content = {
            '_': "inputMessageVideo",
            video: detailData,
        }

        if (caption) {
            let text = this.parseMode(caption, parse_mode, caption_entities)
            data.input_message_content.caption = text
        }

        return this.client.invoke(data)
    },

    sendAudio: function (chat_id, audio, caption = false, parse_mode = false, caption_entities = false, disable_notification = false, reply_to_message_id = false) {
        // { '_': 'inputFileBlob', name: file.name, size: file.size, data: file },
        let detailData = this.typeFile(audio)

        let data = {
            '_': "sendMessage",
            chat_id: chat_id,
            input_message_content: {}
        }

        if (disable_notification) {
            data.disable_notification = disable_notification;
        }

        if (reply_to_message_id) {
            data.reply_to_message_id = reply_to_message_id;
        }

        data.input_message_content = {
            '_': "inputMessageAudio",
            audio: detailData,
        }

        if (caption) {
            let text = this.parseMode(caption, parse_mode, caption_entities)
            data.input_message_content.caption = text
        }

        return this.client.invoke(data)
    },

    sendVoice: function (chat_id, voice, caption = false, parse_mode = false, caption_entities = false, disable_notification = false, reply_to_message_id = false) {
        // { '_': 'inputFileBlob', name: file.name, size: file.size, data: file },
        let detailData = this.typeFile(voice)

        let data = {
            '_': "sendMessage",
            chat_id: chat_id,
            input_message_content: {}
        }

        if (disable_notification) {
            data.disable_notification = disable_notification;
        }

        if (reply_to_message_id) {
            data.reply_to_message_id = reply_to_message_id;
        }

        data.input_message_content = {
            '_': "inputMessageVoiceNote",
            voice_note: detailData,
        }

        if (caption) {
            let text = this.parseMode(caption, parse_mode, caption_entities)
            data.input_message_content.caption = text
        }

        return this.client.invoke(data)
    },

    sendSticker: function (chat_id, sticker, disable_notification = false, reply_to_message_id = false) {
        // { '_': 'inputFileBlob', name: file.name, size: file.size, data: file },
        let detailData = this.typeFile(sticker)

        let data = {
            '_': "sendMessage",
            chat_id: chat_id,
            input_message_content: {}
        }

        if (disable_notification) {
            data.disable_notification = disable_notification;
        }

        if (reply_to_message_id) {
            data.reply_to_message_id = reply_to_message_id;
        }

        data.input_message_content = {
            '_': "inputMessageSticker",
            sticker: detailData,
        }

        return this.client.invoke(data)
    },

    // remote_file_id : int32
    // Returns information about a file; this is an offline request.
    getFile: function (file_id) {
        let data = {
            '_': "getFile",
            file_id: file_id,
        }

        return this.client.invoke(data)
    },

    // remote_file_id : string
    getRemoteFile: function (remote_file_id) {
        let data = {
            '_': "getRemoteFile",
            remote_file_id: remote_file_id,
        }

        return this.client.invoke(data)
    },


    /* pakai ini buat download
     fileID nilai harus integer, dari localfile
     dapatkan dari getRemoteFile atau getFile

     jika proses selesai is_downloading_completed akan true
    */
    downloadFile: function (file_id, priority = 1) {
        if (!Util.isNumber(file_id)) return false
        let data = {
            '_': "downloadFile",
            file_id: file_id,
            priority: priority,
        }

        return this.client.invoke(data)
    },

    // userbot

    searchPublicChats: function (query) {
        let data = {
            '_': "searchPublicChats",
            query: query,
        }

        return this.client.invoke(data)
    },

    viewMessages: function (chat_id, message_id, force_read = false) {
        message_id = message_id.constructor === Array ? message_id : [message_id]
        let data = {
            '_': "viewMessages",
            chat_id: chat_id,
            message_ids: message_id
        }

        if (force_read) data.force_read = true

        return this.client.invoke(data)
    },

    getChatStatistics: function (chat_id) {
        let data = {
            '_': "getChatStatistics",
            chat_id: chat_id
        }
        return this.client.invoke(data)
    },


    // method yang jarang dipakai

    joinChat: function (chat_id) {
        let data = {
            '_': "joinChat",
            chat_id: chat_id
        }
        return this.client.invoke(data)
    },

    destroy: function () {
        let data = {
            '_': "destroy"
        }
        return this.client.invoke(data)
    },

}

module.exports = {
    Telegram
}