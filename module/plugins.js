const { Util } = require('./util');
require('console-stamp')(console, 'HH:MM:ss.l');
const { debug } = require('../config.js');

let folder = "../plugins/"
let pathPlugins = require("path").join(__dirname, folder);

let plugins = []

if (debug.active) console.log('🔎 Pengecekkan file plugins...','\n')

require("fs").readdirSync(pathPlugins).forEach(file => {
    let data = require(folder + file);
    let pesan = file+': '
    Util.forEach(data, fungsi => {
        if (!fungsi.name || !fungsi.regex || !fungsi.run) {
            console.log('- ❌ Gagal load:', file)
            process.exit(1)
        }
        pesan += ` ${fungsi.name}`
        plugins.push(fungsi)
    })
    pesan+= `... done.`
    if (debug.active) console.log('+',pesan)
});

if (debug.active) console.log('✅ Pengecekkan plugins selesai.\n')

module.exports = { plugins }