let getuser = {
    name: 'getUser',
    status: true,
    regex: /^[!\/\.]getuser ([\d]+)$/i,
    clue: ['Mengecek User berdasarkan ID', 'Format: <code>.getuser ID</code>', '', 'contoh: <code>.getuser 213567634</code>'],
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
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
    }
}


module.exports = {
    getuser
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