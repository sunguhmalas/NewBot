exports.run = {
usage: ['toptv'],
use: 'reply video',
category: 'convert',
async: async (m, { func, mecha }) => {
if (!m.quoted) return m.reply('Reply video yang ingin di jadikan ptv.')
if (/video/.test(m.quoted.mime)) {
try {
if (m.message.extendedTextMessage) {
const dataVideo = {
ptvMessage: m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage
}
mecha.relayMessage(m.chat, dataVideo, {})
}
} catch (error) {
console.error(error) 
}
}
},
limit: true
}