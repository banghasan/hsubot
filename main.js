
const { debug, BOT_API } = require('./config.js');
const { client, API_BOT_AUTH } = require('./module/client');
const { Telegram } = require('./Library/telegram');
require('console-stamp')(console, 'HH:MM:ss.l');
const updateNewMessage = require('./update/updateNewMessage')

/*
HSUbot

Hasanudin H Syafaat
@hasanudinhs
banghasan@gmail.com

Support Grup Telegram @botindonesia
*/

// variable tg aku samakan dengan library di GAS
const tg = new Telegram(client)

client
    .on('error', err => {
        console.error('Got error:', JSON.stringify(err, null, 2))
    })
    .on('destroy', () => {
        console.log('Destroy event')
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
        console.log(JSON.stringify(debugLog, null, 1))


    // incoming event

    switch (update['_']) {

        case 'updateNewMessage':
            if (!BOT_API) tg.viewMessages(update.message.chat_id, update.message.id, true).catch(e => console.log('ERROR:', e))
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
    if (BOT_API) {
        await client.login(() => API_BOT_AUTH)
    } else {
        await client.login()
    }
}
main()
