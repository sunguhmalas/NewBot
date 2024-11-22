const fetch = require('node-fetch')

exports.run = {
usage: ['listbot'],
hidden: ['listjadibot'],
category: 'jadibot',
async: async (m, { func, mecha, setting }) => {
const data = Object.values(global.db.users).filter(v => v.jadibot)
if (data.length == 0) return m.reply('Empty data.')
let caption = '乂  *L I S T  J A D I  B O T*\n'
data.forEach((v, i) => {
let bot = Object.values(global.jadibot).filter(v => v.user).find(x => x.id.split(':')[0] === v.jid)
caption += `\n${i + 1}. @${v.jid.split('@')[0]}`
caption += `\n◦  Expire: ${v.expired.jadibot === 'PERMANENT' ? 'PERMANENT' : func.expireTime(v.expired.jadibot)}`
caption += `\n◦  Status: ${bot ? '✅' : '❌'}\n`
if (bot) caption += `◦  Uptime : ${func.clockString(new Date - bot.user.uptime)}\n`
})
await (setting.fakereply ? mecha.sendMessageModify(m.chat, caption, m, {
title: global.header,
body: global.footer,
thumbnail: await (await fetch(setting.cover)).buffer(),
largeThumb: true, 
expiration: m.expiration
}) : mecha.reply(m.chat, caption, m, {
expiration: m.expiration
}))
}
}