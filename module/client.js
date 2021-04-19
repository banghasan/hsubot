const { Client } = require('tdl')
const { TDLib } = require('tdl-tdlib-addon')
// const { Client } = require('../tdlib/tdl')
// const { TDLib } = require('../tdlib/tdlib')
const { API_ID, API_HASH, BOT_TOKEN, BOT_API, pathTDLib } = require('../config.js');
const APP = require('../app.js');
// add timestamps in front of log messages
require('console-stamp')(console, 'HH:MM:ss.l');

const API_BOT_AUTH = {
    type: 'bot',
    token: BOT_TOKEN,           // in document say write this line but
    getToken: () => BOT_TOKEN   // if this line dont set pakase get error and dont work
}

let pathData = BOT_API ? './data_botapi' : './data_userbot'

const tdlib = new TDLib(pathTDLib)

const client = new Client(tdlib, {
    apiId: API_ID,
    apiHash: API_HASH,
    databaseDirectory: pathData + '/_td_database',
    filesDirectory: pathData + '/_td_files',

    skipOldUpdates: true,
    verbosityLevel: 2,

    tdlibParameters: {
        enable_storage_optimizer: true,
        system_language_code: 'en',
        application_version: APP.versi,
        device_model: APP.nama,
        system_version: APP.system,
    }
})

module.exports = {
    client,
    API_BOT_AUTH
}