// untuk override status plugins

// namaPlugins = true / false

module.exports = {
    status: {
        // bash command, di Windows atau OS lain, tidak dicoba. Karena cuma pake Linux
        bash: true,
        debugJSON: true, parseMode: false,
        // sample request :
        foto: true, dokumen: true, video: true, audio: true, voice: true, sticker: true,

        getMe: true, invoke: true,
        pin: false, unpin: false,
        ping: true, pong: true,
        quotes: false, wikipedia: false,
        uploadFoto: true, uploadDokumen: true, uploadVideo: true,
        uploadAudio: true, uploadVoice: true, uploadSticker: true,

        // getUser adalah mode offline, hanya user yang sudah pernah mengontak ada di db local
        getUser: true,
    },
    
}