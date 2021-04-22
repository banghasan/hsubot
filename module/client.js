const { Client } = require('tdl')
const { TDLib } = require('tdl-tdlib-addon')
const CONFIG = require('../config.js');
const APP = require('../app.js');
// add timestamps in front of log messages
require('console-stamp')(console, 'HH:MM:ss.l');

let logAuth

if (CONFIG.BOT_API) {
    logAuth = {
        type: 'bot',
        token: CONFIG.BOT_TOKEN,           // in document say write this line but
        getToken: () => CONFIG.BOT_TOKEN   // if this line dont set pakase get error and dont work
    }

    pathData = './data_botapi'
} else {
    logAuth = {
        type: 'user',
        getPhoneNumber: (retry) =>
            retry
                ? Promise.reject('Invalid phone number')
                : Promise.resolve(CONFIG.phone),
    }

    pathData = './data_userbot'
}


/*

Untuk TEST AUTH

client.login({
  phoneNumber: '...',
  getAuthCode: async (retry) => {
    const code = await getPhoneCodeSomehow()
    return code
  }
})

*/


const tdlib = new TDLib(CONFIG.pathTDLib)

const client = new Client(tdlib, {
    apiId: CONFIG.API_ID ? CONFIG.API_ID : 0,
    apiHash: CONFIG.API_HASH ? CONFIG.API_HASH : '1' ,
    databaseDirectory: pathData + '/_td_database',
    filesDirectory: pathData + '/_td_files',

    skipOldUpdates: CONFIG.skipMessage,
    verbosityLevel: CONFIG.debug.level,

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
    logAuth
}