exports.run = {
usage: ['pushkontak'],
use: 'text',
category: 'owner',
async: async (m, { func, mecha }) => {
if (!m.text && !m.quoted) return m.reply('Input text or reply chat.')
let members = await m.members.map(v => v.id)
let count = members.length;
let sentCount = 0;
m.reply(global.mess.wait)
for (let i = 0; i < members.length; i++) {
setTimeout(function() {
if (m.text) {
mecha.sendMessage(members[i], {
text: m.text
}, {quoted: null, ephemeralExpiration: m.expiration});
} else if (m.quoted) {
mecha.copyNForward(members[i], m.getQuotedObj(), false);
} else if (m.text && m.quoted) {
mecha.sendMessage(members[i], {
text: m.text + '\n' + m.quoted.text
}, {quoted: null, ephemeralExpiration: m.expiration});
}
count--;
sentCount++;
if (count === 0) {
m.reply(`Berhasil Push Kontak:\nJumlah pesan terkirim: *${sentCount}*`);
}
}, i * 1000); // delay setiap pengiriman selama 1 detik
}
},
group: true,
owner: true
}