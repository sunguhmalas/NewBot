// nomor owner ubah nomor lu
global.owner = '6283863545778@s.whatsapp.net' // 62882003321562
// nama owner ubah nama lu
global.ownerName = '𝐇𝐚𝐧𝐧𝐁𝐞𝐭𝐦𝐮𝐭'
// nama bot lu
global.botName = 'ᴍᴇᴄʜᴀ ʙᴏᴛ'
// fake pada beberapa fitur
global.fake = 'Copyright © 2024 SuryaDev'
// header pada beberapa fitur
global.header = `© mecha-bot v${require('./package.json').version}`
// footer pada beberapa fitur
global.footer = 'ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴍᴀᴅᴇ ʙʏ ʜᴀɴɴ' 
// jeda anti spam / detik
global.cooldown = 1
// ram maksimal untuk auto restart / gb
global.max_ram = 3
// blacklist nomor dengan kode negara tersebut
global.blocks = ['91', '92', '212']
// multi prefix default
global.prefixes = /^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i
// qris url di beberapa fitur seperti donate, buyprem dan sewabot
global.qrisUrl = 'https://telegra.ph/file/91ec74ba6a45936c0c127.jpg'
// audio url yang ada di menu
global.audioUrl = 'https://cdn.filestackcontent.com/2r7cSUozTQ2tTS15NfFj';
// url database mongodb (daftar di https://www.mongodb.com/)
global.mongoUrl = ''
// setting pairing code
global.pairing = {
status: true, // ubah false jika ingin menggunakan qr
number: '3197010291304' // ubah jadi nomor bot lu
}
// setting configuration baileys
global.config = {
session: 'session',
online: false,
version: [2, 3000, 1015901307],
browser: ['Windows', 'Chrome', '20.0.04']
}
// teks welcome default
global.tekswelcome = 'Hello, +user Thank you for joining the group +group\n\nPlease intro first :\nName :\nAge :\nHome town :'
// teks leave default
global.teksleft = 'Goodbye +user'
// apikey fitur quickchat
global.quoteApi = 'https://bot.lyo.su/quote/generate'
// setting message
global.mess = {
wait: 'Processed . . .',
ok: 'Successfully.',
limit: 'Anda mencapai limit dan akan disetel ulang pada pukul 00.00\n\nUntuk mendapatkan limit unlimited, tingkatkan ke paket premium.',
premium: 'This feature only for premium user.',
jadibot: 'This feature only for jadibot user.',
owner: 'This feature is only for owners.',
group: 'This feature will only work in groups.',
private: 'Use this feature in private chat.',
admin: 'This feature only for group admin.',
botAdmin: 'This feature will work when I become an admin',
gconly: 'Bot hanya dapat digunakan di dalam grup.',
wrong: 'Wrong format!',
error: {
url: 'URL is Invalid!', 
api: 'Sorry an error occurred!'
},
block: {
owner: `This feature is being blocked by owner!`,
system: `This feature is being blocked by system because an error occurred!`
},
query: 'Enter search text',
search: 'Searching . . .',
scrap: 'Scrapping . . .',
wrongFormat: 'Incorrect format, please look at the menu again',
}
// menghapus cache setelah update
require('./system/functions.js').reloadFile(__filename);