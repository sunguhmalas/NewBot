const fetch = require('node-fetch');

exports.run = {
usage: ['asmaulhusna'],
use: '1 - 99',
category: 'islamic',
async: async (m, { func, mecha }) => {
let asmaulhusna = await fetch('https://raw.githubusercontent.com/Jabalsurya2105/database/master/data/asmaulhusna.json').then(response => response.json())
if (!m.text || isNaN(m.args[0]) || Number(m.args[0]) < 1 || Number(m.args[0]) > asmaulhusna.length) {
let caption = '*A S M A U L - H U S N A*\n\n'
caption += `_(Contoh, ketik: *${m.cmd} 1* untuk memilih opsi 1)._\n\n`
caption += asmaulhusna.map(item => `${item.index}. ${item.latin}`).join('\n');
mecha.reply(m.chat, caption, m, {
expiration: m.expiration
})
} else {
let { index, latin, arabic, translation_id, translation_en } = asmaulhusna.find(v => v.index == Number(m.args[0]))
let caption = `${index}. ${latin}\n`
caption += `${arabic}\n\n`
caption += `*Artinya:* ${translation_id}`
mecha.reply(m.chat, caption, m, {
expiration: m.expiration
})
}
}
}