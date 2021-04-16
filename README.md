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

Menjalankan user bot 

1. clone proyek ini `git clone git@github.com:banghasan/hsubot.git`
2. Masuk ke dalam foldernya `cd hsubot`
3. copy `config_sample.js` ke `config.js`
4. edit `config.js`
5. `npm install`
6. `node main.js` atau `npm start`

## Config

`API_ID` dan `API_HASH` didapatkan dari [https://my.telegram.org/](https://my.telegram.org/)

> Jika konek menggunakan userbot (akun user biasa), Token BOT API tidak perlu diisi.

### Bot API

Untuk mengaktifkan :

    BOT_API: true,
    BOT_TOKEN: '123456:abcdefghi'

Menjalankannya:

    node botapi.js

## TDLib

TDLib yang disediakan di sini, dicompile dengan menggunakan `Ubuntu 20.04`

Jika menggunakan OS lain, compile sendiri ya.

### Android

Download [https://core.telegram.org/tdlib/tdlib.zip](https://core.telegram.org/tdlib/tdlib.zip)

## Fungsi Bot

Fungsi demo berjalan

- ping
- getme (example data JSON)
- json
- quote
- wiki
- ver (ngecek versi framework bot ini)

Fungsi hanya sample saja.

## Kontribusi

Dipersilakan

## Support

Diskusi hanya via [@botindonesia](https://t.me/botindonesia)