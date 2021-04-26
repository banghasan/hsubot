// getUser adalah mode offline, hanya user yang sudah pernah mengontak dan yang ada di db local

let getuser = {
    name: 'getUser',
    status: true,
    regex: /^[!\/\.]getuser (\d+)$/i,
    clue: ['Mengecek User berdasarkan ID', 'Format: <code>.getuser ID</code>', '', 'contoh: <code>.getuser 213567634</code>'],
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            return tg.getUser(Number(cocok[1])).then(result => {
                // console.log(result)
                let pesan = `🆔 ID: ${result.id}\n\n👤 First Name: ${result.first_name}`
                if (result.last_name) pesan += '\n  └ Last Name: ' + result.last_name
                if (result.username) pesan += '\n🔰 Username: @' + result.username
                if (result.phone_number) pesan += '\n☎️ Phone: ' + result.phone_number
                pesan += `\n\n ⚜️ ${result.type._}`
                if (result.is_contact) pesan += `\n📱 ada dalam kontak`
                if (result.is_mutual_contact) pesan += `\n♾ mutual kontak`
                if (result.is_support) pesan += `\n♿️ support`
                if (result.is_verified) pesan += `\n✅ verified`

                if (result.is_scam) pesan += `\n👻 scam`
                if (result.is_fake) pesan += `\n👻 fake`
                if (result.have_access) pesan += `\n📑 punya akses`

                // console.log(result)
                return tg.sendMessage(message.chat_id, pesan)

            })
                .catch(result => tg.sendMessage(message.chat_id, `❌ <code>${result.message}</code>`, 'html', false, false, false, message.id))
        }
    }
}


const { Util } = require('../module/util');

let chatList = {
    name: 'chatList',
    status: true,
    clue: ['Fungsi: melihat daftar chat pada userbot', 'Format:\n <code>.chatlist</code>'],
    regex: /^[!\/\.]chatlist$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            return tg.getChatList().then( result => {
                let pesan = '🗂 Daftar Chat:\n'
                Util.forEach(result, data => {
                    pesan += `\n 🔗 ${data.id} 👉🏼 ${data.title}`
                })
                return tg.sendMessage(message.chat_id, pesan, 'html', false, false, false, message.id)
            })
            .catch(result => tg.sendMessage(message.chat_id, `❌ <code>${result.message}</code>`, 'html', false, false, false, message.id))
            
        }
    }
}

let whois = {
    name: 'whois',
    status: true,
    clue: ['Fungsi: melihat detail user', 'Format:\n <code>.whois</code> reply pesannya'],
    regex: /^[!\/\.]whois$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {

            if (!message.reply_to_message_id) return tg.sendMessage(message.chat_id, `❌ <code>Reply pesannya.</code>`, 'html', false, false, false, message.id)

            return tg.getMessage(message.reply_in_chat_id, message.reply_to_message_id).then( async function (result) {
                // return console.log(result)
                let user_id = result.sender.user_id
                let user = {}
                user.info = await tg.getUser(user_id)
                user.detail = await tg.getUserFullInfo(user_id)
                console.log(user)
                // console.log(JSON.stringify(user.detail.photo, null, 2))

                let nama = user.info.first_name
                if (user.info.last_name) nama += ' ' + user.info.last_name

                let pesan = `🔰 ID : <code>${user.info.id}</code>`
                if (user.info.username) pesan += `\n  ├👤 @${user.info.username}`
                pesan += `\n  └🙋🏽 ${Util.clearHTML(nama)}`

                pesan += `\n\n🗒 Informasi`

                if (user.info.is_support) pesan += `\n  ├♿️ support`
                if (user.info.is_verified) pesan += `\n  ├✅ verified`
                if (user.info.is_scam) pesan += `\n  ├👻 scam`
                if (user.info.is_fake) pesan += `\n  ├👻 fake`

                if (user.detail.group_in_common_count) pesan+= `\n  ├👥 grup yang sama: <code>${user.detail.group_in_common_count}</code>`

                let lastSeen = false
                if (user.info.status) {
                    if (user.info.status.expires) lastSeen = user.info.status.expires
                    if (user.info.status.was_online) lastSeen = user.info.status.was_online
                }

                let waktuRelatif = lastSeen ? Util.timeDifference((lastSeen * 1000), new Date()) : '-'
                if (user.info.status._ == 'userStatusRecently') waktuRelatif = 'baru-baru ini.'
                if (! user.info.type == 'userTypeBot') pesan += `\n  └⏰ diketahui ${waktuRelatif}`

                if (user.detail.bio) pesan += `\n\n🎶 <i>${Util.clearHTML(user.detail.bio)}</i> 🎶`


                return tg.sendMessage(message.chat_id, pesan, 'html', false, false, false, message.id)
            })
            .catch(result => tg.sendMessage(message.chat_id, `❌ <code>${result.message}</code>`, 'html', false, false, false, message.id))
            
        }
    }
}

module.exports = {
    getuser, chatList, whois
}



    /*  sisa migrasi
            
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
    
         */