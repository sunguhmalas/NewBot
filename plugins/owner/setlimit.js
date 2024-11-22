exports.run = {
usage: ['setlimit'],
use: 'amount',
category: 'owner',
async: async (m, { func, mecha, setting }) => {
if (!m.text) return m.reply(func.example(m.cmd, '15'))
if (isNaN(m.args[0])) return m.reply('Amount harus berupa angka!')
if (setting.limit == m.args[0]) return m.reply('Limit already this.')
let limit = Number(parseInt(m.args[0]));
setting.limit = limit;
m.reply(`Limit user successfully set to *${limit}*`)
},
owner: true
}