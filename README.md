## HSUbot

![art](https://raw.githubusercontent.com/banghasan/hsubot/dev/art/HSubot_logo_640_320.jpg)

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

![stats](https://raw.githubusercontent.com/banghasan/hsubot/main/screenshot/stats.jpg)
![Terminal](https://raw.githubusercontent.com/banghasan/hsubot/main/screenshot/terminal.jpg)

## Menjalankan

1. clone proyek `git clone git@github.com:banghasan/hsubot.git`
2. Masuk foldernya `cd hsubot`
3. copy `config_sample.js` ke `config.js`
4. edit `config.js` baca penjelasannya
5. `npm install` untuk menginstall dependency paket
6. Jalankan userbot: `npm start` atau `node main.js`

## Config

`API_ID` dan `API_HASH` didapatkan dari [https://my.telegram.org/](https://my.telegram.org/)

> Jika konek menggunakan userbot (akun user biasa), Token BOT API tidak perlu diisi.

### Bot API

Jika tidak aktif, maka mode userbot yang akan berjalan.

Untuk mengaktifkan :

    BOT_API: true

Jangan lupa di set tokennya :

    BOT_TOKEN: '123456:abcdefghi'

### Dependency

Belum diteliti lebih lanjut apa aja.

Biar aman, install saja lah 

#### Ubuntu/Debian:

    sudo apt-get install make git zlib1g-dev libssl-dev cmake g++

#### CentOS

    sudo yum install -y gcc-c++ make git zlib-devel openssl-devel cmake

#### Alphine

    sudo apk add --update alpine-sdk linux-headers git zlib-dev openssl-dev cmake

Beberapa case, butuh `python` juga yang terinstall.

### TDLib

TDLib yang disediakan di sini, dicompile dengan menggunakan `Ubuntu 20.04`.

Jika menggunakan OS lain (Android/Windows/Mac), compile sendiri ya. Kalau sesama Ubuntu/Debian, tidak perlu build. Hanya install dependency nya saja.

Setingan diletakkan pada `config.js`

Detail baca di halaman [TDLib](https://github.com/banghasan/hsubot/blob/main/doc/tdlib.md)

#### Android 

Download [https://core.telegram.org/tdlib/tdlib.zip](https://core.telegram.org/tdlib/tdlib.zip)

Ekstrak dan dapatkan file `libtdjni.so` pada folder `./libtd/src/main/libs/` sesuai arsitektur hardwarenya. 

## Library Telegram

Library (helper) ditulis dari awal (from scratch) dan belum selesai.

Tidak hanya library, namun diberikan sample implementasi bot. Ini adalah framewrok bot TD Lib.

## Fitur

- Sejak versi `0.3` sudah plugable fitur
- Bersifat modular dan mudah dikembangkan
- Command bisa dipantau dengan mengetikkan `.help`

### Plugins

Baca disini tentang [plugins](https://github.com/banghasan/hsubot/blob/main/doc/plugins.md)

### Heroku

Catatan tentang [Heroku](https://github.com/banghasan/hsubot/blob/main/doc/heroku.md)

Mohon kabari kalau sudah bisa jalan userbot di situ ^^

## Kontribusi

Dipersilakan.

## Support

Diskusi hanya via [@botindonesia](https://t.me/botindonesia)