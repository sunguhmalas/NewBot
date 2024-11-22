/*
* Nama Pengembang: SuryaDev.
* Kontak Whatsapp: wa.me/6285702691440
* Kontak Telegram: t.me/surya_skylark
* Akun Instagram: surya_skylark05
* Catatan: tolong laporkan kepada saya jika anda menemukan ada yang menjual script ini tanpa seizin saya.
*/

const fs = require('fs');
const chalk = require('chalk');
const func = require('./functions.js');

module.exports = async(mecha, json) => {
try {
const { from, id, status, isVideo, isGroup } = json[0];
if (global.db.setting.anticall && status == 'offer' && !isGroup) {
await mecha.rejectCall(id, from)
if (Object.values(global.devs).includes(from)) return mecha.sendMessage(global.owner, {text: `Terdeteksi @${from.split('@')[0]} telah melakukan ${isVideo ? 'Video Call' : 'Voice Call'}`, mentions: [from]}, {quoted: func.fstatus('System Notification'), ephemeralExpiration: 86400})
if (typeof global.db.users[from] == 'undefined') return;
if (global.db.users[from].premium) return;
await mecha.sendMessage(from, {
text: `*${mecha.user.name || mecha.user.verifiedName || 'mecha-bot'}* tidak bisa menerima telfon.\n${from !== global.owner ? 'Kamu telah melanggar rules bot, maaf kamu akan diblokir.\n\nJika ingin membuka blokir akan dikenakan biaya sebesar Rp. 5.000,-' : ''}`, 
mentions: [from]
}, {quoted: func.fstatus('System Notification'), ephemeralExpiration: 86400})
.then(msg => mecha.sendkontak(from, global.owner, global.ownerName, msg))
setTimeout(async () => {
global.db.users[from].banned = true;
global.db.users[from].expired.banned = 'PERMANENT';
await mecha.updateBlockStatus(from, 'block');
}, 3000)
}
} catch (err) {
console.error(err);
}
}

func.reloadFile(__filename)