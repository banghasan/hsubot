const fetch = require('node-fetch')
const FormData = require('form-data')
const fs = require('fs')
const { fromBuffer } = require('file-type')


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


    toString: Object.prototype.toString,

    isArray: function (obj) {
        return toString.call(obj) === '[object Array]';
    },

    isString: function (val) {
        return typeof val === 'string';
    },

    isNumber: function (val) {
        return typeof val === 'number';
    },

    isObject: function (val) {
        return val !== null && typeof val === 'object';
    },

    isDate: function (val) {
        return toString.call(val) === '[object Date]';
    },

    isFunction: function (val) {
        return toString.call(val) === '[object Function]';
    },

    isBlob: function (val) {
        return toString.call(val) === '[object Blob]';
    },

    forEach: function (obj, fn) {
        // Don't bother if no value provided
        if (obj === null || typeof obj === 'undefined') {
            return;
        }

        // Force an array if not already something iterable
        if (typeof obj !== 'object') {
            /*eslint no-param-reassign:0*/
            obj = [obj];
        }

        if (this.isArray(obj)) {
            // Iterate over array values
            for (var i = 0, l = obj.length; i < l; i++) {
                fn.call(null, obj[i], i, obj);
            }
        } else {
            // Iterate over object keys
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    fn.call(null, obj[key], key, obj);
                }
            }
        }
    },

    // allReplace('Hasanudin', {'a':4, 's': 5, 'n|u': 'o'}) //> H454oodio
    allReplace: function (str, obj) {
        var hasil = str;
        for (var x in obj) {
            hasil = hasil.replace(new RegExp(x, 'gi'), obj[x]);
        }
        return hasil;
    },

    random: function () {

        // random(list) : item
        if (arguments.length === 1 && this.isArray(arguments[0])) {
            var list = arguments[0];
            return list[Math.floor((Math.random() * list.length))];
        }

        // random(min, max) : integer
        if (arguments.length === 2 && typeof (arguments[0]) === 'number' && typeof (arguments[1]) === 'number') {
            var min = arguments[0];
            var max = arguments[1];
            if (max < min) { [min, max] = [max, min]; }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return false;
    },

    timeDifference: function (current, previous) {

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = current - previous;

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' detik yang lalu';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' menit yang lalu';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' jam yang lalu';
        }

        else if (elapsed < msPerMonth) {
            return 'approximately ' + Math.round(elapsed / msPerDay) + ' hari yang lalu';
        }

        else if (elapsed < msPerYear) {
            return 'approximately ' + Math.round(elapsed / msPerMonth) + ' bulan yang lalu';
        }

        else {
            return 'approximately ' + Math.round(elapsed / msPerYear) + ' tahun yang lalu';
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
    Button, Util
}