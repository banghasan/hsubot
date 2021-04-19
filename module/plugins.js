const { Util } = require('./util');
require('console-stamp')(console, 'HH:MM:ss.l');
const CONFIG = require('../config.js');

let debug = CONFIG.debug

let folder = "../plugins/"
let pathPlugins = require("path").join(__dirname, folder);

let plugins = []

if (debug.active) {
    console.log('🔎 Pengecekkan file plugins')
    console.log('     '.padEnd(25,'-'))
}

require("fs").readdirSync(pathPlugins).forEach(file => {
    let data = require(folder + file);
    let pesan = `[ ${file.padEnd(17, ' ')}] `
    let list = []
    Util.forEach(data, plugin => {
        if (!plugin.name || !plugin.regex || !plugin.run) {
            console.log('- ❌ Gagal load:', file)
            process.exit(1)
        }

        if (CONFIG.plugins) {
          if (CONFIG.plugins.hasOwnProperty(plugin.name))
          plugin.status = CONFIG.plugins[plugin.name]
        }

        list.push(plugin.name)
        plugins.push(plugin)
    })
    pesan+= list.join(', ') + `... ✔️`
    if (debug.active) console.log(' 🔖 ',pesan)
});

if (debug.active) {
    console.log('     '.padEnd(25,'-'))
    console.log('✅ Pengecekkan plugins selesai.\n')
}

module.exports = { plugins }