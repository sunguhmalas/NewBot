const fetch = require('node-fetch');

exports.run = {
usage: ['listbadword'],
category: 'special',
async: async (m, { func, mecha, setting }) => {
if (setting.toxic.length == 0) return m.reply('Empty data.')
let caption = `乂  *LIST BAD WORD*\n\nTotal : ${setting.toxic.length}\n`
caption += setting.toxic.map((v, i) => `${i + 1}. ${v}`).join('\n')
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