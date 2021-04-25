let getme = {
    name: 'getMe',
    status: true,
    clue: ['Fungsi: informasi bot', 'Format:\n <code>.getme</code>'],
    regex: /^[!\/\.]getme$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            return tg.getMe().then(result => {
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
        }
    }
}
module.exports = {
    getme
}
