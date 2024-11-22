const axios = require('axios');

async function downloadImage(url) {
try {
const response = await axios.get(url, { responseType: 'arraybuffer' })
return Buffer.from(response.data, 'binary')
} catch (error) {
return null
}
}

exports.run = {
usage: ['play'],
use: 'judul lagu',
category: 'downloader',
async: async (m, { func, mecha, YT }) => {
if (!m.text) return m.reply(func.example(m.cmd, 'melukis senja'))
mecha.sendReact(m.chat, '🕒', m.key)
try {
const data = await YT.search(m.text);
if (!data) return m.reply(data.message);
let caption = '*Y O U T U B E - P L A Y*\n'
caption += `\n∘ Title : ${data.title}`
caption += `\n∘ Duration : ${data.duration}`
caption += `\n∘ Views : ${data.views}`
caption += `\n∘ Upload : ${data.publish}`
caption += `\n∘ Author : ${data.channel}`
caption += `\n∘ URL : ${data.url}`
caption += `\n∘ Description: ${data.description}`
caption += `\n\nPlease wait, the audio file is being sent...`
const thumbnailBuffer = await downloadImage(data.thumbnail)
const result = await YT.download(data.url, 'audio', '128');
if (!result.media.status) return m.reply(result.media.message);
await mecha.relayMessage(m.chat, {
extendedTextMessage: {
text: caption,
contextInfo: {
externalAdReply: {
title: data.title,
mediaType: 1,
previewType: 0,
renderLargerThumbnail: true,
thumbnail: thumbnailBuffer,
sourceUrl: data.url
}
},
mentions: [m.sender]
}
}, {
quoted: m,
ephemeralExpiration: m.expiration
})
await mecha.sendMessage(m.chat, {
audio: {
url: result.media.url
},
mimetype: 'audio/mpeg',
fileName: data.title + '.mp3',
contextInfo: {
externalAdReply: {
title: data.title,
body: data.duration,
thumbnail: thumbnailBuffer,
mediaType: 2,
mediaUrl: data.url,
sourceUrl: data.url
}
}
}, {
quoted: m,
ephemeralExpiration: m.expiration
})
mecha.sendReact(m.chat, '✅', m.key)
} catch (error) {
console.log(error);
mecha.sendReact(m.chat, '❌', m.key)
}
},
restrict: true,
limit: 3
}