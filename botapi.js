// Contoh Koneksi menggunakan BOT API

const { Client } = require('tdl')
//const { TDLib } = require('tdl-tdlib-ffi')
const { TDLib } = require('tdl-tdlib-addon')
const { API_ID, API_HASH, BOT_TOKEN, debug, admin } = require('./config.js');
const { Telegram } = require('./module/telegram');

const API_BOT_AUTH = {
    type: 'bot',
    token: BOT_TOKEN,           // in document say write this line but
    getToken: () => BOT_TOKEN   // if this line dont set pakase get error and dont work
}

const tdlib = new TDLib('./tdlib/libtdjson.so')

const client = new Client(tdlib, {
    apiId: API_ID,
    apiHash: API_HASH,
    databaseDirectory: 'data/_td_database',
    filesDirectory: 'data/_td_files'
})

// variable tg aku samakan dengan library di GAS
const tg = new Telegram(client)

client.connect()
client.login(() => API_BOT_AUTH)
client.on('error', e => console.log('Bot error', e))


let meee = await tg.getMe()
userbot_id = meee.id

client.on('update', update => {
    if (debug.active)
        console.log(JSON.stringify(debugLog, null, 1))

    if (!userbot_id) return console.log('userbot_id belum dapet, .. wait!')
    let me = userbot_id;

    if (update['_'] == 'updateNewMessage') {

        if (update.message.sender.user_id == me) return false

        if (!update.message.content) return false

        var content = update.message.content

        if (!content.text) return false
        if (!content.text.text) return false

        var msg = content.text

        if (/^[!\/\.]ping$/i.exec(msg.text))
            return tg.sendMessage(update.message.chat_id, '<b>Pooong!</b>', 'html')

        if (/^[!\/\.]ver(si)?$/i.exec(msg.text)) {
            return tg.sendMessage(update.message.chat_id, `🔰 <b>${APP.nama}</b>\n🔖 <code>${APP.versi}</code>\n🗓 ${APP.rilis}\n\n${APP.keterangan}\nDiskusi dan support via ${APP.support}`, 'HTML')
        }

    }
})
