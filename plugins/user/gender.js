exports.run = {
usage: ['gender'],
use: 'male / female',
category: 'user',
async: async (m, { func, mecha }) => {
if (global.db.users[m.sender].gender !== '') return m.reply('Kamu sudah memiliki gender!')
if (m.args[0] === 'male') {
global.db.users[m.sender].gender = 'Laki-laki'
m.reply('Kamu telah memilih kelamin `Laki-laki`.')
} else if (m.args[0] === 'female') {
global.db.users[m.sender].gender = 'Perempuan'
m.reply('Kamu telah memilih kelamin `Perempuan`.')
} else m.reply(`Mohon masukkan keyword dengan benar!\nContoh: ${m.prefix}gender male\n\n${m.prefix}gender male untuk \`Laki-laki\`.\n${m.prefix}gender female untuk \`Perempuan\`.`)
}
}