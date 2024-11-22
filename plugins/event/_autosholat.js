exports.run = {
main: async (m, { func, mecha, setting }) => {
mecha.autosholat = mecha.autosholat ? mecha.autosholat : {};
let id = m.chat;
if (id in mecha.autosholat) {
return false;
}
// jadwal sholat wilayah jakarta dan sekitarnya
let jadwalSholat = {
Subuh: '04:05',
Dhuhur: '11:36',
Ashar: '14:54',
Maghrib: '17:47',
Isya: '18:59',
};
let thumb = {
'Subuh': 'https://telegra.ph/file/b666be3c20c68d9bd0139.jpg',
'Dhuhur': 'https://telegra.ph/file/5295095dad53783b9cd64.jpg',
'Ashar': 'https://telegra.ph/file/c0e1948ad75a2cba22845.jpg',
'Maghrib': 'https://telegra.ph/file/0082ad9c0e924323e08a6.jpg',
'Isya': 'https://telegra.ph/file/fd141833a983afa0a8412.jpg',
};
let date = new Date(new Date().toLocaleString('en-US', {
timeZone: 'Asia/Jakarta'
}));
let hours = date.getHours();
let minutes = date.getMinutes();
let timeNow = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
for (let [sholat, waktu] of Object.entries(jadwalSholat)) {
if (timeNow === waktu) {
mecha.autosholat[id] = [
mecha.sendMessage(m.chat, {
audio: {
url: 'https://cdn.filestackcontent.com/KUVE2KRaQUuoNDH08JmM'
},
mimetype: 'audio/mpeg',
contextInfo: {
mentionedJid: [m.sender], 
externalAdReply: {
title: `Waktu ${sholat} telah tiba, ambilah air wudhu dan segeralah sholat.`,
body: `${waktu} untuk wilayah Jakarta dan sekitarnya`,
mediaType: 1,
previewType: 'PHOTO', 
sourceUrl: '',
thumbnailUrl: thumb[sholat],
renderLargerThumbnail: true
}
}
}, {quoted: func.fverified, ephemeralExpiration: m.expiration}),
setTimeout(() => {
delete mecha.autosholat[id];
}, 1000 * 60 * 10)
];
}
}
}
}