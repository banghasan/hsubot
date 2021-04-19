
// ada yang lebih bagus metode nya ???
const { exec } = require("child_process");

let bash = {
    name: 'bash',
    status: false,
    clue: ['Fungsi: menjalankan bash command', 'Format: <code>.bash command</code>'],
    regex: /^[!\/\.](?:ba)?sh (.+)/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            let cmd = cocok[1].trim();

            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    pesan = `🚫 error: ${error.message}`
                } else
                    if (stderr) {
                        pesan = `🚫 stderr: ${stderr}`
                    } else {
                        pesan = stdout
                    }

                tg.sendMessage(message.chat_id, pesan, false, false, false, false, message.id)
                    .catch(e => console.log(e))
            });
            return true

        }
    }
}
module.exports = {
    bash
}