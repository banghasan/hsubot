## HSUbot

Proyek experimental (percobaan) untuk membuat bot menggunakan TDLib yang merupakan wrapper untuk protokol MTProto Telegram

Bisa konek menggunakan account biasa (nomor handphone), bisa juga menggunakan bot API.

Ini adalah rilis awal, dibangun dari scratch. So, masih banyak kekurangan. Jika banyak yang pakai atau masukkan akan dikembangkan lagi.

### Tujuan

Dalam beberapa kasus, ada teman-teman yang membutuhkan _jembatan_ antara Bot API. Yakni, agar sesama Bot Api dapat berkomunikasi.

Ada juga kasus untuk mendapatkan informasi seluruh isi user pada Grup. Ada juga yang berkeinginan me-mention seluruh anggotanya atau memfilter tertentu.

Hal ini hanya dapat dilakukan oleh userbot. 

Pada kasus mention all user dan broadcast, aplikasi ini tidak bertanggung jawab atas penyalahgunaan hal tersebut. Seperti berakibat spamming (RAS), akun di banned, dan segala hal lainnya.

### Log History

Untuk melihat [history versi](https://github.com/banghasan/hsubot/blob/main/doc/history.md)

## Penampilan

![HSUbot v0.1](https://raw.githubusercontent.com/banghasan/hsubot/main/screenshot/hsubot.jpg)

## Menjalankan

1. clone proyek `git clone git@github.com:banghasan/hsubot.git`
2. Masuk foldernya `cd hsubot`
3. copy `config_sample.js` ke `config.js`
4. edit `config.js` baca penjelasannya
5. `npm install` untuk menginstall dependency paket
6. Jalankan userbot: `node main.js` atau `npm start`

## Config

`API_ID` dan `API_HASH` didapatkan dari [https://my.telegram.org/](https://my.telegram.org/)

> Jika konek menggunakan userbot (akun user biasa), Token BOT API tidak perlu diisi.

### Bot API

Jika tidak aktif, maka mode userbot yang akan berjalan.

Untuk mengaktifkan :

    BOT_API: true

Jangan lupa di set tokennya :

    BOT_TOKEN: '123456:abcdefghi'

## TDLib

TDLib yang disediakan di sini, dicompile dengan menggunakan `Ubuntu 20.04`

Jika menggunakan OS lain, compile sendiri ya.

### Android

Download [https://core.telegram.org/tdlib/tdlib.zip](https://core.telegram.org/tdlib/tdlib.zip)

Ekstrak dan dapatkan file `libtdjni.so` pada folder `./libtd/src/main/libs/` sesuai arsitektur hardwarenya. Kemudian sesuaikan file pada `main.js` atau `botapi.js`

## Library Telegram

Library (helper) ditulis dari awal (from scratch) dan belum selesai.

Tidak hanya library, namun diberikan sample implementasi bot. Ini adalah framewrok bot TD Lib.

## Fungsi Bot

Semua fungsi bisa diawali dengan salah satu karakter: `/!.`

Fungsi demo berjalan

- ping
- fw (test foward pesan)
- getme (example data JSON)
- json
- quote
- wiki [kata kunci]
- ver (ngecek versi framework bot ini)

Fungsi tersebut sekadar sample saja.

## File

Sistem handle pesan update ada di dalam folder `./update`

### Heroku

Catatan tentang [Heroku](https://github.com/banghasan/hsubot/blob/main/doc/heroku.md)

## Kontribusi

Dipersilakan

## Support

Diskusi hanya via [@botindonesia](https://t.me/botindonesia)