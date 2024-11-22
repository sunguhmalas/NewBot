const fetch = require('node-fetch');

exports.run = {
usage: ['listsewa'],
category: 'special',
async: async (m, { func, mecha, setting }) => {
const data = Object.values(global.db.groups).filter(v => v.sewa.status)
if (data.length == 0) return m.reply('*Empty data.*')
let caption = '乂  *L I S T  S E W A*\n'
caption += data.map((v, i) => `\n${i + 1}. ${v.name}\n◦  ID: ${v.jid}\n◦  Expire: ${v.sewa.expired === 'PERMANENT' ? 'PERMANENT' : func.expireTime(v.sewa.expired)}`).join('\n')
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