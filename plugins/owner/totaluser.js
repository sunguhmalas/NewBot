const fetch = require('node-fetch');

exports.run = {
usage: ['totaluser'],
category: 'owner',
async: async (m, { func, mecha, setting }) => {
let data = Object.values(global.db.users)
let totalreg = data.filter(user => user.register)
let caption = `Total User: *${data.length}* User\nRegistered: *${totalreg.length}* User\n\n`
caption += data.map((v, i) => `${i + 1}. @${v.jid.split('@')[0]} (${v.register ? 'Yes' : 'No'})`).join('\n')
await (setting.fakereply ? mecha.sendMessageModify(m.chat, caption, m, {
title: global.header,
body: global.footer,
thumbnail: await (await fetch(setting.cover)).buffer(),
largeThumb: true,
expiration: m.expiration
}) : mecha.reply(m.chat, caption, m, {
expiration: m.expiration
}))
},
owner: true
}