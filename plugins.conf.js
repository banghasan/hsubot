// untuk override status plugins

// namaPlugins = true / false

module.exports = {
    status: {
        // bash command, di Windows atau OS lain, tidak dicoba. Karena cuma pake Linux
        start: true, 
        bash: true,

        invoke: false,
        debugJSON: true, parseMode: false,

        // sample request :
        foto: true, dokumen: true, video: true, audio: true, voice: true, sticker: true,

        getMe: true, 
        
        ping: true, pong: true,
        pin: false, unpin: false,        

        quotes: false, wikipedia: false,
        upFoto: true, upDokumen: true, upVideo: true,
        upAudio: true, upVoice: true, upSticker: true,

        // untuk grup > 500 user
        Statistik: true,

        // getUser adalah mode offline, hanya user yang sudah pernah mengontak ada di db local
        getUser: true,
    },
    
}