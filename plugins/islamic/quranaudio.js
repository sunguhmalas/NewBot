const fetch = require('node-fetch');

exports.run = {
usage: ['quranaudio'],
hidden: ['qa'],
use: 'surah',
category: 'islamic',
async: async (m, { func, mecha }) => {
if (isNaN(m.args[0])) return m.reply(func.example(m.cmd, '1'))
if (Number(m.args[0]) < 1) return m.reply(`Minimal 1!`)
if (Number(m.args[0]) > 114) return m.reply(`Maksimal 114!`)
let quranaudio = await fetch('https://raw.githubusercontent.com/Jabalsurya2105/database/master/data/quranaudio.json').then(response => response.json())
let { number, ayatCount, urutan, asma, preBismillah, type, tafsir, audio } = quranaudio.find(v => v.number == Number(m.args[0]))
let caption = `No. ${number}\n`
caption += `Nama : ${asma.id.long}\n`
caption += `Jumlah Ayat : ${ayatCount}\n`
caption += `preBismillah : ${preBismillah}\n`
caption += `Type Surah : ${type}\n`
caption += `Tafsir : ${tafsir}`
await mecha.reply(m.chat, caption, m, {
expiration: m.expiration
})
.then(message => mecha.sendMessage(m.chat, {audio: {url: audio}, mimetype: 'audio/mpeg'}, {quoted: message, ephemeralExpiration: m.expiration}))
}
}