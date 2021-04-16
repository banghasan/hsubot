const fetch = require('node-fetch')
const FormData = require('form-data')
const fs = require('fs')
const { fromBuffer } = require('file-type')
const sharp = require('sharp')


/**
Kelas berbagai utilitas
*/
var Util = {
    /**
    Membersihkan tag HTML
    @param {string} text yang akan dibersihkan
    */
    clearHTML: function (s) {
        return s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    },

    /**
    Membersihkan tag Markdown
    @param {string} text yang akan dibersihkan
    */
    clearMarkdown: function (s) {
        return s
            .replace(/_/g, "\\_")
            .replace(/\*/g, "\\*")
            .replace(/\[/g, "\\[")
            .replace(/`/g, "\\`");
    },


    /**
    Menghasilkan waktu
    @param {date} tanggal dama timeunixstamp
    @param {string} timezone
    @param {string} format yang akan disajikan
    */
    formatDate: function (date, timeZone, format) {
        // contoh: formatDate(new Date(), "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");
        // format https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
        return Utilities.formatDate(date, timeZone, format);
    },

    formatString: function (template, args) {
        // contoh: formatString('%6s', 'abc');
        // "   abc"
        return Utilities.formatString(template, args);
    },

    // untuk pengecekkan hak akses
    /* contoh: 
        var adminID = [1, 2, 3, 4]
        if ( tg.util.punyaAkses(adminID, msg.from.id) ) { .. }
    */
    punyaAkses: function (array, index) {
        if (array.indexOf(index) > -1) {
            return true;
        } else {
            return false;
        }
    },

}


var Button = {
    text: function (text, data) {
        return {
            'text': text,
            'callback_data': data
        }
    },
    // inline = alias dari text
    inline: function (text, data) {
        return {
            'text': text,
            'callback_data': data
        }
    },
    query: function (text, data) {
        return {
            'text': text,
            'switch_inline_query': data
        }
    },
    url: function (text, url) {
        return {
            'text': text,
            'url': url
        }
    }
}

// eslint-disable-next-line no-async-promise-executor
const resizeImage = (buff, encode) => new Promise(async (resolve, reject) => {
    console.log('Resizeing image...')
    const { mime } = await fromBuffer(buff)
    sharp(buff, { failOnError: false })
        .resize(512, 512)
        .toBuffer()
        .then(resizedImageBuffer => {
            if (!encode) return resolve(resizedImageBuffer)
            console.log('Create base64 from resizedImageBuffer...')
            const resizedImageData = resizedImageBuffer.toString('base64')
            const resizedBase64 = `data:${mime};base64,${resizedImageData}`
            resolve(resizedBase64)
        })
        .catch(error => reject(error))
})

/**
 *Fetch Json from Url
 *
 *@param {String} url
 *@param {Object} options
 */
const fetchJson = (url, options) =>
    new Promise((resolve, reject) =>
        fetch(url, options)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(err => {
                console.error(err)
                reject(err)
            })
    )

/**
 * Fetch Text from Url
 *
 * @param {String} url
 * @param {Object} options
 */
const fetchText = (url, options) => {
    return new Promise((resolve, reject) => {
        return fetch(url, options)
            .then(response => response.text())
            .then(text => resolve(text))
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}

/**
 * Fetch base64 from url
 * @param {String} url
 */

const fetchBase64 = (url, mimetype) => {
    return new Promise((resolve, reject) => {
        console.log('Get base64 from:', url)
        return fetch(url)
            .then((res) => {
                const _mimetype = mimetype || res.headers.get('content-type')
                res.buffer()
                    .then((result) => resolve(`data:${_mimetype};base64,` + result.toString('base64')))
            })
            .catch((err) => {
                console.error(err)
                reject(err)
            })
    })
}

/**
 * Upload Image to Telegra.ph
 *
 * @param  {String} base64 image buffer
 * @param  {Boolean} resize
 */

const uploadImages = (buffData, type) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        const { ext } = await fromBuffer(buffData)
        const filePath = 'helpers/tmp.' + ext
        const _buffData = type ? await resizeImage(buffData, false) : buffData
        fs.writeFile(filePath, _buffData, { encoding: 'base64' }, (err) => {
            if (err) return reject(err)
            console.log('Uploading image to telegra.ph server...')
            const fileData = fs.readFileSync(filePath)
            const form = new FormData()
            form.append('file', fileData, 'tmp.' + ext)
            fetch('https://telegra.ph/upload', {
                method: 'POST',
                body: form
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) return reject(res.error)
                    resolve('https://telegra.ph' + res[0].src)
                })
                .then(() => fs.unlinkSync(filePath))
                .catch(err => reject(err))
        })
    })
}


module.exports = {
    fetchJson,
    fetchText,
    fetchBase64,
    uploadImages,
    resizeImage,
    Button, Util

}