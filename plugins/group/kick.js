exports.run = {
usage: ['kick'],
hidden: ['tendang'],
use: 'mention or reply',
category: 'group',
async: async (m, { func, mecha, setting }) => {
if (!m.text && !m.quoted) return m.reply('Mention or Reply chat target.')
let number = isNaN(m.text) ? (m.text.startsWith('+') ? m.text.replace(/[()+\s-]/g, '') : m.text.split('@')[1]) : m.quoted ? m.quoted.sender.split('@')[0] : m.text
if (isNaN(number)) return m.reply('Invalid number.')
if (number.length > 15) return m.reply('Invalid format.')
let target = number + '@s.whatsapp.net'
if ([global.owner, m.bot, ...setting.owner].includes(target)) return m.reply('Access denied.')
let cek = await mecha.onWhatsApp(target)
if (cek.length == 0) return m.reply(`Masukkan nomor yang valid dan terdaftar di WhatsApp!`)
await mecha.groupParticipantsUpdate(m.chat, [target], 'remove').then(data => {
for (let i of data) {
if (i.status == 406){
m.reply(`@${target.split('@')[0]} yang membuat grup ini!`)
} else m.reply('Success kick member')
}
}).catch((err) => m.reply(func.jsonFormat(err)))
},
main: async (m, { func, mecha }) => {
if (m.isGc && (m.mtype == 'reactionMessage') && m.message.reactionMessage.text === '🦶🏻' && m.isBotAdmin && m.isAdmin) {
let key = m.msg.key
if ([global.owner, m.bot].includes(key.participant)) return
await mecha.groupParticipantsUpdate(m.chat, [key.participant], 'remove').then(async (data) => {
for (let i of data) {
if (i.status == 406){
m.reply(`Gagal mengeluarkan @${key.participant.split('@')[0]} dengan alasan: dia yang membuat grup ini.`)
} else {
await mecha.sendMessage(m.chat, {text: `@${m.sender.split('@')[0]} successfully kicked @${key.participant.split('@')[0]} from this group`, mentions: [m.sender, key.participant]}, {quoted: m, ephemeralExpiration: m.expiration})
.then(() => mecha.sendMessage(key.remoteJid, {delete: {remoteJid: m.chat, id: key.id, fromMe: key.fromMe, participant: key.participant }}))
}
}
}).catch((err) => m.reply(func.jsonFormat(err)))
}
},
group: true,
admin: true,
botAdmin: true
}