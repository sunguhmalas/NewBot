const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

exports.run = {
usage: ['tourl', 'tourl2'],
use: 'reply photo',
category: 'convert',
async: async (m, { func, mecha, quoted }) => {
switch (m.command) {
case 'tourl':{
if (/image|video|audio|webp/.test(quoted.mime)) {
mecha.sendReact(m.chat, '🕒', m.key)
let buffer = await quoted.download()
let catbox = await func.catbox(buffer)
if (!catbox.status) return m.reply(catbox.message)
mecha.reply(m.chat, (catbox.url || ''), m, {
expiration: m.expiration
})
} else m.reply('Input media dengan benar!')
}
break;
case 'tourl2':{
if (/image|video|audio|webp/.test(quoted.mime)) {
mecha.sendReact(m.chat, '🕒', m.key)
let buffer = await quoted.download()
const { ext, mime } = (await fromBuffer(buffer)) || {};
const form = new FormData();
form.append("file", buffer, {
filename: `tmp.${ext}`,
contentType: mime
});
try {
const { data } = await axios.post("https://tmpfiles.org/api/v1/upload", form, {
headers: form.getHeaders()
});
const match = /https?:\/\/tmpfiles.org\/(.*)/.exec(data.data.url);
await mecha.sendMessage(m.chat, {text: `https://tmpfiles.org/dl/${match[1]}`, edit: wait.key}, {quoted: m, ephemeralExpiration: m.expiration});
} catch (error) {
await mecha.sendMessage(m.chat, {text: String(error), edit: wait.key}, {quoted: m, ephemeralExpiration: m.expiration});
}
} else m.reply('Input media dengan benar!')
}
break
}
},
limit: true
}