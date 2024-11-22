const axios = require('axios');

exports.run = {
usage: ['removebg'],
hidden: ['rbg'],
use: 'reply photo',
category: 'ai',
async: async (m, { func, mecha, quoted }) => {
if (/image\/(jpe?g|png)/.test(quoted.mime)) {
mecha.sendReact(m.chat, '🕒', m.key)
try {
const img = await quoted.download()
const { data } = await axios.post('https://backend.zyro.com/v1/ai/remove-background', { 
image: 'data:image/jpeg;base64,' + img.toString('base64') 
})
const image = Buffer.from(data.result.split(',')[1], 'base64')
await mecha.sendMessage(m.chat, {
image: image,
caption: global.mess.ok
}, {quoted: m, ephemeralExpiration: m.expiration})
} catch (e) {
m.reply(global.mess.error.api)
}
} else m.reply(`Kirim/Reply gambar dengan caption ${m.cmd}`)
},
premium: true,
limit: 3
}