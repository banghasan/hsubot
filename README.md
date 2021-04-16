## USERBOT

Proyek experimental (percobaan) untuk membuat bot menggunakan TDLib yang merupakan wrapper untuk protokol MTProto Telegram

Bisa konek menggunakan account biasa (nomor handphone), bisa juga menggunakan bot API.

## Tujuan

Dalam beberapa kasus, ada teman-teman yang membutuhkan _jembatan_ antara Bot API. Yakni, agar sesama Bot Api dapat berkomunikasi.

Ada juga kasus untuk mendapatkan informasi seluruh isi user pada Grup. Ada juga yang berkeinginan me-mention seluruh anggotanya atau memfilter tertentu.

Hal ini hanya dapat dilakukan oleh userbot. 

Pada kasus mention all user dan broadcast, aplikasi ini tidak bertanggung jawab atas penyalahgunaan hal tersebut. Seperti berakibat spamming (RAS), akun di banned, dan segala hal lainnya.

## Penampilan

![HSUbot v0.1](https://raw.githubusercontent.com/banghasan/hsubot/main/hsubot.jpg)

## Menjalankan


1. clone proyek ini `git clone git@github.com:banghasan/hsubot.git`
2. Masuk ke foldernya `cd hsubot`
3. copy `config_sample.js` ke `config.js`
4. edit `config.js` baca penjelasan dibawah
5. `npm install` untuk menginstall dependency paket
6. Jalankan userbot: `node main.js` atau `npm start` atau `npm run userbot`
7. Atau jalankan botapi: `node botapi.js` atau `npm run botapi`

## Config

`API_ID` dan `API_HASH` didapatkan dari [https://my.telegram.org/](https://my.telegram.org/)

> Jika konek menggunakan userbot (akun user biasa), Token BOT API tidak perlu diisi.

### Bot API

Untuk mengaktifkan :

    BOT_API: true,
    BOT_TOKEN: '123456:abcdefghi'

Menjalankannya:

    node botapi.js

atau

    npm run botapi

## TDLib

TDLib yang disediakan di sini, dicompile dengan menggunakan `Ubuntu 20.04`

Jika menggunakan OS lain, compile sendiri ya.

### Android

Download [https://core.telegram.org/tdlib/tdlib.zip](https://core.telegram.org/tdlib/tdlib.zip)

Ekstrak dan dapatkan file `libtdjni.so` pada folder `./libtd/src/main/libs/` sesuai arsitektur hardwarenya. Kemudian sesuaikan file pada `main.js` atau `botapi.js`

## Telegram Lib TD

Library (helper) ditulis dari awal (from scratch) dan belum selesai.

Tidak hanya library, namun diberikan sample implementasi bot.

## Fungsi Bot

Fungsi demo berjalan

- ping
- getme (example data JSON)
- json
- quote
- wiki
- ver (ngecek versi framework bot ini)

Fungsi hanya sample saja.

## File

Sistem handle pesan update ada di dalam folder `./update`

### History

Melihat history versi klik [history](https://github.com/banghasan/hsubot/blob/main/doc/history.md)

### Heroku

Baca [heroku.md](https://github.com/banghasan/hsubot/blob/main/doc/heroku.md)

## Kontribusi

Dipersilakan

## Support

Diskusi hanya via [@botindonesia](https://t.me/botindonesia)