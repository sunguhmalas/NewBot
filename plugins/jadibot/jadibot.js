const { jidNormalizedUser } = require('@whiskeysockets/baileys');
const moment = require('moment-timezone');

exports.run = {
usage: ['jadibot'],
category: 'jadibot',
async: async (m, { func, mecha, plugins, users }) => {
if (!users.jadibot) return m.reply(global.mess.jadibot)
let data = global.db.jadibot.find(v => v.number === m.sender)
if (!data) global.db.jadibot.push({
number: m.sender,
name: m.pushname,
date: moment.tz('Asia/Jakarta').format('DD MMMM YYYY'),
session: '',
notice: false,
status: false
})
if (m.text && func.somematch(['on', 'off'], m.args[0].toLowerCase())) {
let option = m.args[0].toLowerCase();
let status = option === 'on' ? true : false;
if (data.status == status) return m.reply(`Jadibot has been ${option == 'on' ? 'activated' : 'inactivated'} previously.`)
data.status = status;
return m.reply(`Jadibot has been ${option == 'on' ? 'activated' : 'inactivated'} successfully.`)
}
if (m.user.jadibot) return m.reply(`Tidak dapat menggunakan jadibot disini!\n\nklik wa.me/${global.pairing.number?.replace(/[^0-9]/g, '')}?text=` + m.prefix + 'jadibot')
if (typeof global.jadibot[m.sender] != 'undefined') return m.reply(`Kamu sudah menjadi bot sebelumnya!\nIngin menghapus sesi? ketik *${m.prefix}delsesibot*`)
if (Object.keys(global.jadibot).length !== 0){
const array = Object.values(global.jadibot).filter(x => x.user)
if (array.length != 0){
const userbot = array.map(v => jidNormalizedUser(v.user.id))
const find = userbot.find(x => x.includes(m.sender))
if (find) return mecha.reply(m.chat, `Kamu sudah menjadi bot sebelumnya!\nIngin menghapus sesi? ketik *${m.prefix}delsesibot*`, m)
}
}
if (Object.keys(global.jadibot).length >= 5) return m.reply('User jadibot sudah mencapai maksimal 2')
await mecha.sendReact(m.chat, '🕒', m.key);
require('../../system/jadibot.js')(mecha, m.sender, plugins)
},
private: true
}