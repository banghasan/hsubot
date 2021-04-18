## Plugins

Adalah fitur untuk menambahkan fungsi pada framework HSUbot.

Silakan fokus pada folder `./plugins` ini.

Penjelasan seperti dibawah ini.


### Contoh

Contoh:

```javascript
let ping = {
    name: 'ping',
    status: true,
    clue: ['Fungsi: Test respon bot', 'Format:\n <code>.ping</code>'],
    regex: /^[!\/\.]ping$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            return tg.sendMessage(message.chat_id, '🏓 <b>Pooong!</b>', 'html', false, false, false, message.id)
        }
    }
}

module.exports = {
    ping, pong
}
```

## Penjelasan

### Wajib

Field wajib adalah `name`, `regex`, dan `run`

`name` adalah nama fungsi sebagai pengenal untuk helper dan debugging

Format `run` saat ini adalah `(tg, update) => {}`

Terakhir jangan lupa di `module.exports`

## Tambahan

- `status` jika true, berarti dapat dipergunakan. Set `false` jika di non aktifkan.
- `clue` adalah untuk fungsi `helper`. Akan ditampilkan ketika mengetik `.help ping`

## Next

Format ini akan masih berkembang sesuai kebutuhan.