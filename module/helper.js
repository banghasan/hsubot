const { Util } = require('../module/util');
const { debug } = require('../config.js');
// require('console-stamp')(console, 'HH:MM:ss.l');

let help = {
    name: 'helper',
    status: true,
    clue: ['Bantuan fungsi', 'Format: <code>.help fungsi</code>'],
    regex: /^[!\/\.]help ([\w\d_]+)$/i,
    run: function (tg, update, plugins) {
        let message = update.message
        let text = message.content.text.text

        let ketemu = false

        if (debug.active && debug.level > 1) console.log('♿️ Helper aktif..')

        if (cocok = this.regex.exec(text)) {
            plugins.forEach(plugin => {

                if (plugin.name.toLowerCase() == cocok[1].toLowerCase()) {
                    ketemu = true
                    let pesan = 'Fungsi tersebut tidak ada keterangan.'
                    if (plugin.clue) pesan = `🔖 Nama: <code>${plugin.name}</code>`
                    pesan += `\n\n ${(plugin.status ? '✅' : '❌')} Status: ${(plugin.status ? 'ON' : 'OFF')}`
                    pesan += '\n\n' + plugin.clue.join('\n')

                    return tg.sendMessage(message.chat_id, pesan, 'html', false, false, false, message.id)
                        .catch(e => console.log(e))
                }
            });

            if (!ketemu) return tg.sendMessage(message.chat_id, `❌ Fungsi <code>${cocok[1]}</code> tidak ditemukan.`, 'html', false, false, false, message.id)
                .catch(e => console.log(e))
        }
    }
}

let list = {
    name: 'listCommand',
    status: true,
    clue: ['Bantuan fungsi', 'Format: <code>.all</code>'],
    regex: /^[!\/\.](all|help)$/i,
    run: function (tg, update, plugins) {
        let message = update.message
        let text = message.content.text.text

        if (debug.active && debug.level > 1) console.log('♿️ Helper aktif..')

        if (this.regex.exec(text)) {
            let pesan = 'Format: <code>.help [command]</code>'
            pesan += '\n\nDaftar command bot :\n<code>'

            let i = 0

            plugins.forEach(plugin => {
                pesan += (i % 2 == 0) ? '\n ': ' '
                let namePlugin = plugin.name.padEnd(15, ' ')
                pesan += `${plugin.status ? '✅ ' : '❌ '} ${ Util.clearHTML(namePlugin) }`
                i++
            })

            pesan += `</code>\n\n🔆 Total <code>${(new Intl.NumberFormat('id-ID').format(i))}</code> plugins.`


            return tg.sendMessage(message.chat_id, pesan, 'html', false, false, false, message.id)
                .catch(e => console.log(e))
        }
    }
}

module.exports = {
    help,
    list
}
