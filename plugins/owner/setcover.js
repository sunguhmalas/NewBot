exports.run = {
usage: ['setcover'],
hidden: ['cover'],
use: 'reply photo',
category: 'owner',
async: async (m, { func, mecha, setting, quoted }) => {
if (!/image/.test(quoted.mime)) return m.reply('Image not found.')
let media = await quoted.download()
if (!media) return m.reply(global.mess.wrong)
let catbox = await func.catbox(media)
if (!catbox.status) return m.reply(catbox.message)
setting.cover = catbox.url;
mecha.reply(m.chat, func.texted('bold', 'Cover successfully set.'), m, {
expiration: m.expiration
})
},
owner: true
}