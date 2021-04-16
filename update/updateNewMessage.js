const { debug, admin, BOT_TOKEN, BOT_API } = require('../config.js');
const { fetchJson, Util } = require('../module/util');
const APP = require('../app.js');

// add timestamps in front of log messages
require('console-stamp')(console, 'HH:MM:ss.l');


let userbot_id

if (BOT_API) {
    let split = BOT_TOKEN.split(':')
    if (split.length < 2) {
        console.log('❌ TOKEN BOT Keliru!')
        process.exit(1)
    }
    userbot_id = split[0]
}

module.exports = function (tg, update) {
    if (!userbot_id) {
        if (!BOT_API) tg.getMe().then(result => userbot_id = result.id)
        // return console.log('userbot_id belum dapet, .. wait!')
    }

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

    if (/^[!\/\.]ping$/i.exec(msg.text))
        return tg.sendMessage(update.message.chat_id, '<b>Pooong!</b>', 'html', false, false, false, update.message.id)

    if (/^[!\/\.]json$/i.exec(msg.text)) {
        return tg.sendMessage(update.message.chat_id, JSON.stringify(update, null, 2))
    }

    if (/^[!\/\.]fw$/i.exec(msg.text))
        return tg.forwardMessage(update.message.chat_id, update.message.chat_id, update.message.id).catch(e => console.log(e))

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