const { Client } = require('tdl')
//const { TDLib } = require('tdl-tdlib-ffi')
const { TDLib } = require('tdl-tdlib-addon')
const { API_ID, API_HASH, debug } = require('./config.js');
const APP = require('./app.js');
const { Telegram } = require('./module/telegram');

const updateNewMessage = require('./update/updateNewMessage')

// add timestamps in front of log messages
require('console-stamp')(console, 'HH:MM:ss.l');

/* main aplikasi 
userbot (nomor hp / akun biasa untuk koneksi)

Hasanudin H Syafaat
@hasanudinhs
banghasan@gmail.com
*/

const tdlib = new TDLib('./tdlib/libtdjson.so')

const client = new Client(tdlib, {
    apiId: API_ID,
    apiHash: API_HASH,
    databaseDirectory: 'data_userbot/_td_database',
    filesDirectory: 'data_userbot/_td_files',

    skipOldUpdates: true,
    verbosityLevel: 2,

    tdlibParameters: {
        enable_storage_optimizer: true,
        system_language_code: 'en',
        application_version: APP.versi,
        device_model: `${APP.nama} v${APP.versi}`,
        system_version: 'Unknown',
    }
})


// variable tg aku samakan dengan library di GAS
const tg = new Telegram(client)

client
    .on('error', err => {
        console.error('Got error:', JSON.stringify(err, null, 2))
    })
    .on('destroy', () => {
        console.log('destroy event')
    })


client.on('update', update => {

    // handle debugging
    let debugLog
    switch (debug.level) {
        case 1:
            debugLog = '📥 ' + update['_']
            break;

        case 2:
            debugLog = update
            break;
        case 3:
            debugLog = JSON.stringify(update, null, 1)
            break;

        default:
            debug.active = false
            break;
    }

    if (debug.active)
        console.log(debugLog)


    // incoming event

    switch (update['_']) {

        case 'updateNewMessage':
            updateNewMessage(tg, update)
            break;

        case 'updateMessageSendSucceeded':
            break;

        case 'updateConnectionState':
            break;

        default:
            break;
    }
})

async function main() {
    await client.connect()
    await client.login()
}
main()
