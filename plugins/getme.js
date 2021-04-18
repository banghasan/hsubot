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
    }
}
module.exports = {
    getme
}
