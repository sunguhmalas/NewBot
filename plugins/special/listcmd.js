const fetch = require('node-fetch');

exports.run = {
usage: ['listcmd'],
category: 'special',
async: async (m, { func, mecha, setting }) => {
const data = Object.entries(global.db.stickercmd)
if (data.length == 0) return m.reply('*Empty data.*')
let caption = `乂  *LIST STICKER CMD*\n`
caption += data.map(([key, v], index) => `\n${index++}. ${v.text}\n◦  Creator: @${v.creator.split('@')[0]}\n◦  Key: ${key}`).join('\n')
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