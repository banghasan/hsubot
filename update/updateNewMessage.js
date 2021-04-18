const { debug, admin, BOT_TOKEN, BOT_API } = require('../config.js');
const { fetchJson, Util } = require('../module/util');
const fs = require('fs');
let dateFormat = require("dateformat");

const APP = require('../app.js');

// add timestamps in front of log messages
require('console-stamp')(console, 'HH:MM:ss.l');

let nFormat = new Intl.NumberFormat('id-ID')
let nFormatPersen = new Intl.NumberFormat('id-ID', { maximumSignificantDigits: 2 })
let userbot_id = false

let statFormat = function (dataStats, title, field) {
    let pesan = `\n\n${title}`
    pesan += `\n  ├ <code>${nFormat.format(dataStats[field].previous_value)} -> ${nFormat.format(dataStats[field].value)}</code>`
    pesan += `\n  └ <code>${dataStats[field].growth_rate_percentage >= 0 ? '+' : ''}${nFormatPersen.format(dataStats[field].growth_rate_percentage)}%</code>`
    return pesan
}

if (BOT_API) {
    let split = BOT_TOKEN.split(':')
    if (split.length < 2) {
        console.log('❌ TOKEN BOT Keliru!')
        process.exit(1)
    }
    userbot_id = split[0]
}

module.exports = function (tg, update) {
    if (!userbot_id)
        if (!BOT_API) {
            console.log('userbot_id belum dapet, .. wait!')
            tg.getMe().then(result => userbot_id = result.id)
        }

    let pesan = '-'
    let data = ''

    let message = update.message

    if (message.sender.user_id == userbot_id) {
        // tulis coding di sini jika pengen diproses
        // console.log('Pesan sendiri tidak diproses.')
        return false
    }

    if (admin.active)
        if (!Util.punyaAkses(admin.id, message.sender.user_id))
            return debug.active ? console.log('❌ Dia tidak ada akses', message.sender.user_id) : false

    if (!message.content) return false
    let content = message.content


    // deteksi event TEKS saja dulu

    if (!content.text) return false
    if (!content.text.text) return false

    var msg = content.text

    if (/^[!\/\.]ping$/i.exec(msg.text)) {
        return tg.sendMessage(message.chat_id, '<b>Pooong!</b>', 'html', false, false, false, message.id)
    }

    if (/^[!\/\.]json$/i.exec(msg.text)) {
        return tg.sendMessage(message.chat_id, JSON.stringify(update, null, 2))
    }

    if (/^[!\/\.](fw|foward)$/i.exec(msg.text)) {
        return tg.forwardMessage(message.chat_id, message.chat_id, message.id)
    }

    if (/^[!\/\.]pin$/i.exec(msg.text)) {
        if (!message.reply_to_message_id) return tg.sendMessage(message.chat_id, '🤷🏽‍♂️ Silakan reply pesan yang akan dipin.', 'html', false, false, false, message.id)
        return tg.pinChatMessage(message.chat_id, message.reply_to_message_id).catch(e => console.log(e))
    }

    if (/^[!\/\.]unpin$/i.exec(msg.text)) {
        if (!message.reply_to_message_id)
            return tg.sendMessage(message.chat_id, '❌ Reply pesan yang akan di unpin.', 'html', false, false, false, message.id)
        return tg.unpinChatMessage(message.chat_id, message.reply_to_message_id)
    }

    if (/^[!\/\.]hapus$/i.exec(msg.text))
        return tg.deleteMessage(message.chat_id, message.id, true)

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
            tg.sendMessage(message.chat_id, pesan)
        })

        return true;

    }

    // contoh pakai fetch API 2
    if (cocok = /^[!\/\.]wiki (.+)$/i.exec(msg.text)) {
        if (!BOT_API) tg.viewMessages(message.chat_id, message.id, true)
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
            tg.sendMessage(message.chat_id, pesan)
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

            return tg.sendMessage(message.chat_id, pesan)
        })
    }

    if (/^[!\/\.]ver(si)?$/i.exec(msg.text)) {
        return tg.sendMessage(message.chat_id, `🔰 <b>${APP.nama}</b>\n💠 ${tg.name} <code>v${tg.versi}</code>\n🛄 Fw <code>${APP.versi}</code>\n\n${APP.keterangan}\n\n♿️ Diskusi dan support via ${APP.support}\n📚 Repo ${APP.url}`, 'HTML')
    }

    // STATISTIK GRUP > 500 member
    if (cocok = /^[!\/\.](stats?)$/i.exec(msg.text)) {
        return tg.getChatStatistics(message.chat_id).then(dataStats => {
            // console.log(result)
            // fs.writeFileSync(`./data/${message.chat_id}_.json`, JSON.stringify(result, null, 2));
            let pesan = "📊 Statistik"

            pesan += `\n\n🗓 Periode`
            pesan += `\n  └ ${dateFormat(dataStats.period.start_date * 1000, 'd mmm \'yy')}`
            pesan += ` - ${dateFormat(dataStats.period.end_date * 1000, 'd mmm \'yy')}`

            pesan += statFormat(dataStats, '👤 Member', 'member_count')
            pesan += statFormat(dataStats, '💁🏼 Sender', 'sender_count')
            pesan += statFormat(dataStats, '💬 Message', 'message_count')
            pesan += statFormat(dataStats, '👀 Viewer', 'viewer_count')

            tg.sendMessage(message.chat_id, pesan, 'html', false, false, false, message.id)
        })
            .catch(result => tg.sendMessage(message.chat_id, `❌ <code>${result.message}</code>`, 'html', false, false, false, message.id))
    }


    if (cocok = /(^[!\/\.](html|markdown))/i.exec(msg.text)) {
        pesan = msg.text.replace(cocok[1], '').trim()
        if (pesan < 2) return tg.sendMessage(message.chat_id, `❌ Syntax keliru`, false, false, false, false, message.id)

        return tg.sendMessage(message.chat_id, pesan, cocok[2])
            .catch(result => tg.sendMessage(message.chat_id, `❌ ${result.message}`, false, false, false, false, message.id))

    }

    if (cocok = /^[!\/\.]getuser ([\d]+)$/i.exec(msg.text)) {
        return tg.getUser(cocok[1]).then(result => {

            let pesan = `🆔 ID: ${result.id}\n\n👤 First Name: ${result.first_name}`
            if (result.last_name) pesan += '\n👤 Last Name: ' + result.last_name
            if (result.username) pesan += '\n🔰 Username: @' + result.username
            if (result.phone_number) pesan += '\n☎️ Phone: ' + result.phone_number
            pesan += "\n"
            pesan += `\n- contact ${result.is_contact}`
            pesan += `\n- mutual_contact ${result.is_mutual_contact}`
            pesan += `\n- support ${result.is_support}`

            // console.log(result)
            tg.sendMessage(message.chat_id, pesan)

        })
            .catch(result => tg.sendMessage(message.chat_id, `<code>${result.message}</code>`, 'html', false, false, false, message.id))
    }

    if (cocok = /^[!\/\.]getuserfull (\d+)$/i.exec(msg.text)) {
        return tg.getUser(cocok[1]).then(result => console.log(result)).catch(e => console.log(e))
    }

    if (cocok = /^[!\/\.](cari|cariUser) ([\w\d_]+)$/i.exec(msg.text)) {
        return tg.searchPublicChat(cocok[2]).then(result => {
            console.log(result)
        }).catch(e => console.log(e))
    }

    if (cocok = /^[!\/\.](searchAll|cariGlobal) (.+)$/i.exec(msg.text)) {
        // if (BOT_API) return tg.sendMessage(message.chat_id, '❌ Hanya untuk userbot.', 'html', false, false, false, message.id)
        return tg.searchPublicChats(cocok[2]).then(result => console.log(result))
            .catch(result => tg.sendMessage(message.chat_id, `<code>${result.message}</code>`, 'html', false, false, false, message.id))
    }

    if (cocok = /^([!\.\/]invoke ([\w_]+))/i.exec(msg.text)) {
        method = cocok[2]
        parameter = msg.text.replace(cocok[1], '').trim()
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