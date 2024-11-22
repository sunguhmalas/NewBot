const fetch = require('node-fetch');

exports.run = {
usage: ['limit'],
hidden: ['ceklimit', 'balance'],
use: 'mention or reply',
category: 'user',
async: async (m, { func, mecha, setting, froms, isPrem }) => {
if (m.quoted || m.text) {
if (!froms) return m.reply('Invalid number.')
if (typeof global.db.users[froms] == 'undefined') return m.reply('User data not found.')
let text = `Limit ${global.db.users[froms].name}`
let isPrim = global.db.users[froms].premium
mecha.sendMessageModify(m.chat, text, m, {
title: `Limit: ${global.db.users[froms].limit}/${isPrim ? 99999 : setting.limit}\nBalance: $${func.rupiah(global.db.users[froms].balance)}`,
body: `Status: ${isPrim ? 'Premium' : 'Gratisan'}`,
thumbnail: await (await fetch(await mecha.profilePictureUrl(froms, 'image').catch(_ => setting.cover))).buffer(),
url: setting.link, 
expiration: m.expiration
})
} else mecha.sendMessageModify(m.chat, `Limit ${m.pushname}`, m, {
title: `Limit: ${global.db.users[m.sender].limit}/${isPrem ? 99999 : setting.limit}\nBalance: $${func.rupiah(global.db.users[m.sender].balance)}`,
body: `Status: ${m.isOwner ? 'Owner' : isPrem ? 'Premium' : 'Gratisan'}`,
thumbnail: await (await fetch(await mecha.profilePictureUrl(m.sender, 'image').catch(_ => setting.cover))).buffer(),
url: setting.link, 
expiration: m.expiration
})
}
}