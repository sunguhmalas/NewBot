const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');

exports.run = {
usage: ['delsesibot'],
category: 'jadibot',
desc: 'Untuk menghapus session jadibot',
async: async (m, { func, mecha, users }) => {
if (!users.jadibot) return m.reply(global.mess.jadibot)
const sessionName = path.join(process.cwd(), 'database', m.sender.split('@')[0])
if (fs.existsSync(sessionName)) {
if (Object.keys(global.jadibot).includes(m.sender)) {
try {
const client = global.jadibot[m.sender];
const data = global.db.jadibot.find(v => v.number === m.sender);
delete global.jadibot[m.sender];
data.status = false;
await client.end('delsesibot');
await client.logout();
} catch {}
}
rimraf.sync(sessionName);
m.reply('Successfully deleted Jadibot session.')
} else return m.reply('Session jadibot tidak ditemukan!')
},
private: true
}