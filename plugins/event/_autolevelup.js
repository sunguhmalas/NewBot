const axios = require('axios');
// Cooldown XP diperoleh untuk mencegah spam
const database = new Set()

const isGained = (userId) => {
return !!database.has(userId)
}

const addCooldown = (userId) => {
database.add(userId)
setTimeout(function () {
return database.delete(userId)
}, 1000 * 60) // Setiap menit
}

exports.run = {
main: async (m, { func, mecha, groups, setting }) => {
let user = global.db.users[m.sender]
if (user.register && setting.autolevelup && !isGained(m.sender) && (user.level < 1000) && !m.fromMe && (m.isPc || (m.isGc && !groups.mute))) {
if (m.isPrefix) return
let currentLevel = user.level;
addCooldown(m.sender);
let currentXp = Math.floor(Math.random() * (15 - 25 + 1) + 20);
let requiredXp = 10 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100;
user.exp += currentXp;
if (requiredXp <= user.exp) {
user.level += 1;
let userLevel = user.level;
let username = m.pushname;
let text = `Selamat 🥳, anda telah naik level!\n\n*Level Up : ${currentLevel} -> ${userLevel}*\n_semakin sering berinteraksi dengan bot semakin tinggi level kamu_`
try {
const profile = await mecha.profilePictureUrl(m.sender, 'image').catch((_) => 'https://telegra.ph/file/0a70ee52eb457fbcc2b92.jpg');
const result = `https://api.vreden.my.id/api/levelup?background=https://telegra.ph/file/d0fce5c840f366526bab7.jpg&name=${username}&level=${currentLevel}&levelup=${userLevel}&avatar=${profile}`;
mecha.sendMedia(m.chat, result, m, {
caption: text,
expiration: m.expiration
})
} catch (e) {
console.error(e);
await mecha.reply(m.chat, text, m, {
expiration: m.expiration
})
}
}
}
}
}