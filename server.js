const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype
} = require('@adiwajshing/baileys')
const ffmpeg = require('fluent-ffmpeg')
const axios = require('axios')
const qrcode = require('qrcode-terminal')
const get = require('get')
const path = require('path')
const fetch = require('node-fetch')
const { color } = require('./lib/color')
const fs = require('fs')
const moment = require('moment-timezone')
const { start, success } = require('./lib/spin')
const { bot } = require('./lib/message/')
const { getGroupAdmins, getRandom, uploadImages, getBuffer, fetchJson } = require('./lib/func')
const Exif = require('./exif.js')
const request = require('request')
const { exec, spawn } = require('child_process')
const exif = new Exif()

//Register 
//const member = JSON.parse(fs.readFileSync('./group/regis.json'))

var waktu = new Date();
var hari = waktu.getDay();
var jam = waktu.getHours();
var menit = waktu.getMinutes();
var detik = waktu.getSeconds();
var ucap = waktu.getHours();

switch(ucap){
case 0: ucap = "  Dah Tengah Malam 🌚 - *Udah Mau Pagi Kenapa Belum tidur?,Nnti klo Sakit Gmna:/"; break;
case 1: ucap = "  Dah Tengah Malam 🌚 - Udah Mau Pagi Kenapa Belum tidur?,Nnti klo Sakit Gmna:/"; break;
case 2: ucap = "  Dini Hari 🌒 - Udah Mau Pagi Kenapa Belum tidur?,Nnti klo Sakit Gmna:/"; break;
case 3: ucap = "  Dini Hari 🌓 - Udah Mau Pagi Kenapa Belum tidur?,Nnti klo Sakit Gmna:/"; break;
case 4: ucap = "Dah Subuh 🌔"; break;
case 5: ucap = "Dah Subuh 🌔"; break;
case 6: ucap = "Selamat Pagi 🌝"; break;
case 7: ucap = "Selamat Pagi 🌝"; break;
case 8: ucap = "Selamat Pagi 🌝"; break;
case 9: ucap = "Selamat Pagi"; break;
case 10: ucap  = "Selamat Pagi 🌞"; break;
case 11: ucap = "Selamat Siang 🌞"; break;
case 12: ucap = "Selamat Siang 🌞"; break;
case 13: ucap = "Selamat Siang 🌞"; break;
case 14: ucap = "Selamat Siang 🌞"; break;
case 15: ucap = "Selamat Sore 🌝"; break;
case 16: ucap = "Selamat Sore 🌝"; break;
case 17: ucap = "Dah Magrib 🌘"; break;
case 18: ucap = "Dah Magrib 🌘"; break;
case 19: ucap = "Dah Magrib 🌚"; break;
case 20: ucap = "Selamat Malam 🌚"; break;
case 21: ucap = "Selamat Malam 🌚"; break;
case 22: ucap = "Selamat Malam 🌚"; break;
case 23: ucap = "Dah Tengah Malam 🌚 - *Tidur Bang*:)"; break;
}
var ucp = "*" + ucap+ "*" + ", " + "*Jam :* " + jam + ":" + menit + ":" + detik + " Wib";


const { 
msgFilter,
isFiltered,
addFilter
} = require('./lib/message/spam')

prefix = '#'
self = false

module.exports = (hazn) => {
hazn.on('chat-update', async (mek) => {
try {
if (!mek.hasNewMessage) return
mek = mek.messages.all()[0]
if (!mek.message) return
if (mek.key && mek.key.remoteJid == 'status@broadcast') return
if (mek.key.fromMe) return
global.prefix
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const type = Object.keys(mek.message)[0]
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product, buttonsMessage } = MessageType
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const stickcmd = Object.keys(mek.message)[0] == "stickerMessage" ? mek.message.stickerMessage.fileSha256.toString('base64') : ""
const args = body.trim().split(/ +/).slice(1)
const codestick = ``
const a = args[0]
const isCmd = body.startsWith(prefix)

const botNumber = hazn.user.jid
const ownerNumber = ['6281539336834@c.us'] // replace this with your number
const isGroup = from.endsWith('@g.us')
const sender = isGroup ? mek.participant : mek.key.remoteJid
pushname = hazn.contacts[sender] != undefined ? hazn.contacts[sender].vname || hazn.contacts[sender].notify : undefined 
const groupMetadata = isGroup ? await hazn.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.jid : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isOwner = ownerNumber.includes(sender)
//const isMember = mem(sender)
const isGroupAdmins = groupAdmins.includes(sender) || false
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

const reply = (teks) => {
hazn.sendMessage(from, teks, text, {quoted:mek})
}

const sendMess = (hehe, teks) => {
hazn.sendMessage(hehe, teks, text)
}

const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? hazn.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : hazn.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
}

const sendMedia = async(from, url, text="", mids=[]) =>{
if(mids.length > 0){
text = normalizeMention(from, text, mids)
} 
const fn = Date.now() / 10000;
const filename = fn.toString()
let mime = ""
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
mime = res.headers['content-type']
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, filename, async function () {
console.log('kelar');
let media = fs.readFileSync(filename)
let type = mime.split("/")[0]+"Message"
if(mime === "image/gif"){
type = MessageType.video
mime = Mimetype.gif
}
if(mime.split("/")[0] === "audio"){
mime = Mimetype.mp4Audio
                   }
hazn.sendMessage(from, media, type, { quoted: mek, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                    
fs.unlinkSync(filename)
});
}
const sendWebp = async(from, url) => {
var names = Date.now() / 10000;
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, './temp' + names + '.png', async function () {
console.log('selesai');
let ajg = './temp' + names + '.png'
let palak = './temp' + names + '.webp'
exec(`ffmpeg -i ${ajg} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${palak}`, (err) => {
let media = fs.readFileSync(palak)
hazn.sendMessage(from, media, MessageType.sticker,{quoted:mek})
fs.unlinkSync(ajg)
fs.unlinkSync(palak)
});
})
}

//Media
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

//Self
if (!mek.key.fromMe && self === true) return

//Konsol
if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
//Cmd Anti Spam 
switch(stickcmd){
case`YjxaSpYEaqzkDKtKgv0RH8lgDaDLdF4yVSU8TV4/Ed8=`:
const buttons = [
{buttonId: `${prefix}dashbord`, buttonText: {displayText: 'Dashbord(allmenu)'}, type: 1},
{buttonId: `${prefix}rule`, buttonText: {displayText: 'Term-Of-Service'}, type: 1}
]
const buttonMessage = {
contentText: bot.menu(pushname,ucap),
footerText: 'Made With ❤️',
buttons: buttons,
headerType: 1
}
hazn.sendMessage(from, buttonMessage, buttonsMessage)
break
}
switch(command){
case'menu':
case'help':
const buttons = [
{buttonId: `${prefix}dashbord`, buttonText: {displayText: 'Dashbord(allmenu)'}, type: 1},
{buttonId: `${prefix}rule`, buttonText: {displayText: 'Term-Of-Service'}, type: 1}
]
const buttonMessage = {
contentText: bot.menu(pushname,ucap),
footerText: 'Made With ❤️',
buttons: buttons,
headerType: 1
}
hazn.sendMessage(from, buttonMessage, buttonsMessage)
break
case'rule':
reply(bot.termofservice())
break
case'dashbord':
reply(bot.dashbord(pushname, prefix, ucap))
break
case'simi':
hazn.updatePresence(from, Presence.composing) 
if(args.length < 1) return reply(`usage : ${prefix}simi _text_`)
axios.get(`https://api.simsimi.net/v2/?text=${body.slice(5)}&lc=id`)
.then(function (data) {
reply(`${data.data.success}`)
})
.catch(function (error) {
reply('simi gk tau kak^^')
})
//hazn.updatePresence(from, Presence.paused) 
break
case 'takestick':
if (!isQuotedSticker) return reply(`*Example*:\n*${prefix}takestick nama|author*`)
const aku = body.slice(11)
if (!aku.includes('|')) return reply(`*Example*:\n*${prefix}takestick nama|author*`)
const encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
const media = await hazn.downloadAndSaveMediaMessage(encmedia, `./temp/${sender}`)
const packnamenye = aku.split('|')[0]
const authornye = aku.split('|')[1]
exif.create(packnamenye, authornye, `aku2_${sender}`)
exec(`webpmux -set exif ./temp/aku2_${sender}.exif ./temp/${sender}.webp -o ./temp/${sender}.webp`, async (error) => {
if (error) return reply('*error ): coba ulangin*')
hazn.sendMessage(from, fs.readFileSync(`./temp/${sender}.webp`), MessageType.sticker, {quoted:mek})
fs.unlinkSync(media)
fs.unlinkSync(`./temp/aku2_${sender}.exif`)
})
break 
case 'stiktocmd':
if (!isQuotedSticker) return reply('Reply Stickernya')
const stikel = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
const download = await hazn.downloadMediaMessage(stikel)
var crypto = require('crypto')
hash = crypto.createHash('sha256').update(download).digest('base64');
reply(hash)
break
case'memegen':
if(args === 0) return reply(`usage : ${prefix}${command} _top|bottom_`)
const dekode = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
const dexode  = await hazn.downloadMediaMessage(dekode, 'buffer') 
const getlink = await uploadImages(dexode, false)
let aw = body.slice(8)
let top = aw.split('|')[0]
let bottom = aw.split('|')[1]
reply('wait')
img =`https://api.memegen.link/images/custom/${top}/${bottom}.png?background=${getlink}`
sendWebp(from, `${img}`).catch((err) => reply('failed'))
break
default:
if (isCmd && msgFilter.isFiltered(from) && isGroup && !isGroup && !isOwner) {
console.log('[\x1b[1;31mSPAM\x1b[1;37m]', time, color(`${command}`), color(sender.split('@')[0]), '/', color(pushname), 'args :', color(args.length))
teksnya = `@${sender.split('@')[0]} Spam Detected\nPlease Wait 5 Seconds :)`
return hazn.sendMessage(from, teksnya, MessageType.text, { quoted: mek, contextInfo: { mentionedJid: [sender]}})
}
if (isCmd && !isOwner) msgFilter.addFilter(from)
//if (isC& !isOwner && msgFilter.addFilter(from)
break
}
} catch (e) {
console.log('Error : %s', color(e, 'red'))
}
})
}