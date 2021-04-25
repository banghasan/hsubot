const CONFIG = require('../config.js');
const { plugins } = require('../module/plugins');
const helper = require('../module/helper');
const { Util } = require('../module/util');
const APP = require('../app.js');
require('console-stamp')(console, 'HH:MM:ss.l');

module.exports = function (tg, update) {
    let message = update.message

    if (CONFIG.skipMe) {
        if (message.sender.user_id == tg.id) {
            if (CONFIG.debug.active && CONFIG.debug.level > 1) console.log('👟 skip me')
            return 1
        }
    }

    if (CONFIG.admin.active)
        if (!Util.punyaAkses(CONFIG.admin.id, message.sender.user_id)) {
            if (CONFIG.debug.active) {
                if (CONFIG.debug.level > 1) console.log('❌ Dia tidak ada akses', message.sender.user_id)
            }
            return false
        }

    if (!message.content) return false
    let content = message.content


    // Mari kita deteksi event TEKS 

    if (!content.text) return false
    if (!content.text.text) return false

    let ketemu = false

    plugins.forEach(plugin => {
        if (!plugin.status) return false
        if (ketemu) return true
        let result = plugin.run(tg, update)
        if (result) {
            ketemu = true
            if (CONFIG.debug.active) console.log('-> 🥅 Terdeteksi:', { name: plugin.name, regex: plugin.regex })
        }
    })

    // modul helper
    if (!ketemu)
        Util.forEach(helper, help => {
            if (help.status) help.run(tg, update, plugins)
        })

}