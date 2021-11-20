const bold = '*'
const moment = require('moment-timezone')
const pong = require('performance-now')
let ping = pong()
let speed = pong() - ping

exports.menu = (pushname, ucap) => {
return`${bold}🤖SIMPLE-BOT🤖${bold}
${bold}halo${pushname}👋${bold}

${bold}${ucap}${bold}

${bold}All Featured Free!${bold}

${bold}Info:${bold}
${bold}Respon: ${speed.toFixed(4)} second${bold}
${bold}Version: 1.2.2-alpha${bold}
${bold}Lib: @Adiwajshing/baileys${bold}
${bold}Waktu: ${moment.tz('Asia/Jakarta').format("HH:ss")}${bold}`
}

exports.termofservice = () => {
return`${bold}Term-Of-Service/Rules${bold}
${bold}Jangan Spam Bot!${bold}
${bold}dah itu aja:v${bold}`
}

exports.dashbord = (pushname, prefix, ucap) => {
return`${bold}Dashboard${bold}

${bold}Halo Kak ${pushname} ${ucap}${bold}
${bold}Waktu: ${moment.tz('Asia/Jakarta').format("HH:ss")}${bold}

${bold}Simi Simi${bold}
${bold}${prefix}simi${bold} _text_

${bold}🖨️Image Maker${bold}
${bold}${prefix}nulis${bold} _text_

${bold}Converted${bold}
${bold}${prefix}takestick${bold} _reply sticker/sticker gif_
${bold}${prefix}cmdtostik${bold} _reply sticker_`
}

exports.nomem = (pushname, prefix) => {
return`${bold}hai ${pushname} kamu belum registrasi di database kami silakan registrasi dengan cara${bold}\n\n${prefix}member${bold}`
}

exports.mem = () => {
return`${bold}kamu sudah menjadi member!${bold}`
}

exports.memmenu = (pushname, sender) => {
return`${bold}Hai Kak ${pushname}${bold}

${bold}Silakan Baca TermOfService Dari Kami (:${bold}
${bold}api: https://wa.me/${sender.split("@")}

${bold}Silakan Klik Tombol Di Bawah Ini  Untuk Registrasi⬇️${bold}`
}

