// Contoh Koneksi menggunakan BOT API

const { Client } = require('tdl')
//const { TDLib } = require('tdl-tdlib-ffi')
const { TDLib } = require('tdl-tdlib-addon')
const { API_ID, API_HASH, BOT_TOKEN, debug, admin } = require('./config.js');
const { Telegram } = require('./module/telegram');

// add timestamps in front of log messages
require('console-stamp')(console, 'HH:MM:ss.l');

const APP = require('./app.js');

let split = BOT_TOKEN.split(':')
if (split.length<2) {
    console.log('❌ TOKEN BOT Keliru!')
    process.exit(1)
} 
userbot_id = split[0]

const API_BOT_AUTH = {
    type: 'bot',
    token: BOT_TOKEN,           // in document say write this line but
    getToken: () => BOT_TOKEN   // if this line dont set pakase get error and dont work
}

const tdlib = new TDLib('./tdlib/libtdjson.so')

const client = new Client(tdlib, {
    apiId: API_ID,
    apiHash: API_HASH,
    databaseDirectory: 'data_botapi/_td_database',
    filesDirectory: 'data_botapi/_td_files'
})

// variable tg aku samakan dengan library di GAS
const tg = new Telegram(client)

client.connect()
client.login(() => API_BOT_AUTH)
client.on('error', e => console.log('Bot error', e))

function updateNewMessage(update) {

    if (!userbot_id) return console.log('userbot_id belum dapet, .. wait!')

    let pesan = '-'
    let data = ''

    if (update.message.sender.user_id == userbot_id) {
        // tulis coding di sini jika pengen diproses
        // console.log('Pesan sendiri tidak diproses.')
        return false
    }

    if (admin.active)
        if (!Util.punyaAkses(admin.id, update.message.sender.user_id))
            return debug.active ? console.log('❌ Dia tidak ada akses', update.message.sender.user_id) : false

    if (!update.message.content) return false

    let content = update.message.content


    // deteksi event TEKS saja dulu

    if (!content.text) return false
    if (!content.text.text) return false

    var msg = content.text

    if (/^[!\/\.]start$/i.exec(msg.text))
        return tg.sendMessage(update.message.chat_id, '<b>Masoook!</b>', 'html')

    if (/^[!\/\.]ping$/i.exec(msg.text))
        return tg.sendMessage(update.message.chat_id, '<b>Pooong!</b>', 'html')

    if (/^[!\/\.]json$/i.exec(msg.text)) {
        return tg.sendMessage(update.message.chat_id, JSON.stringify(update, null, 2))
    }

    // contoh pakai fetch API 1
    if (cocok = /^[!\/\.]quotes?$/i.exec(msg.text)) {
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
            tg.sendMessage(update.message.chat_id, pesan)
        })

        return true;

    }

    // contoh pakai fetch API 2
    if (cocok = /^[!\/\.]wiki (.+)$/i.exec(msg.text)) {
        url = 'https://mhankbarbar.herokuapp.com/api/wiki?q=' + cocok[1]

        data = {
            method: 'get',
            // body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        }

        fetchJson(url, data).then(res => {
            if (res.status == 200) {
                pesan = res.result
            } else {
                pesan = res.error
            }
            tg.sendMessage(update.message.chat_id, pesan)
        })

        return true;

    }

    // debugging getme
    if (/^[!\/\.]getme$/i.exec(msg.text)) {
        return tg.getMe().then(result => {
            let pesan = "📥 Event: " + result._
            pesan += '\n\n👤 First Name: ' + result.first_name
            if (result.last_name) pesan += '\n👤 Last Name: ' + result.last_name
            if (result.username) pesan += '\n🔰 Username: @' + result.username
            if (result.phone_number) pesan += '\n☎️ Phone: ' + result.phone_number
            pesan += "\n"
            pesan += `\n- contact ${result.is_contact}`
            pesan += `\n- mutual_contact ${result.is_mutual_contact}`
            pesan += `\n- support ${result.is_support}`

            return tg.sendMessage(update.message.chat_id, pesan)
        })
    }

    if (/^[!\/\.]ver(si)?$/i.exec(msg.text)) {
        return tg.sendMessage(update.message.chat_id, `🔰 <b>${APP.nama}</b>\n🔖 <code>${APP.versi}</code>\n🗓 ${APP.rilis}\n\n${APP.keterangan}\n\nDiskusi dan support via ${APP.support}`, 'HTML')
    }


    if (cocok = /^[!\/\.](html|markdown) (.+)/i.exec(msg.text)) {
        return tg.sendMessage(update.message.chat_id, cocok[2], cocok[1])
    }

}


client.on('update', update => {

    // handle debugging
    let debugLog
    switch (debug.level) {
        case 1:
            debugLog = '📥 ' + update['_']
            break;

        case 2:
        case 3:
            debugLog = update
            break;

        default:
            debug.active = false
            break;
    }

    if (debug.active)
        console.log(JSON.stringify(debugLog, null, 1))


    // incoming event

    switch (update['_']) {

        case 'updateNewMessage':
            updateNewMessage(update)
            break;

        case 'updateMessageSendSucceeded':
            break;

        case 'updateConnectionState':
            break;

        default:
            break;
    }
})
