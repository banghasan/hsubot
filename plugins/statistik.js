// STATISTIK GRUP > 500 member

let dateFormat = require("dateformat");
// const fs = require('fs');

let nFormat = new Intl.NumberFormat('id-ID')
let nFormatPersen = new Intl.NumberFormat('id-ID', { maximumSignificantDigits: 2 })

let statFormat = function (dataStats, title, field) {
    let pesan = `\n\n${title}`
    pesan += `\n  ├ <code>${nFormat.format(dataStats[field].previous_value)} -> ${nFormat.format(dataStats[field].value)}</code>`
    pesan += `\n  └ <code>${dataStats[field].growth_rate_percentage >= 0 ? '+' : ''}${nFormatPersen.format(dataStats[field].growth_rate_percentage)}%</code>`
    return pesan
}

let statistik = {
    name: 'Statistik',
    status: true,
    clue: ['Fungsi: Mendapatkan statisktik grup yang member di atas 500 user', 'Format:\n<code> .stats\n .statistik</code>'],
    regex: /^[!\/\.]stat(s|istiks?)?$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            return tg.getChatStatistics(message.chat_id).then(dataStats => {
                // console.log(result)

                // jika ingin di simpan ke file
                // fs.writeFileSync(`../data/${message.chat_id}_.json`, JSON.stringify(result, null, 2));
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
    }
}


module.exports = {
    statistik
}
