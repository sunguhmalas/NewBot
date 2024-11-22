/*
*[ GMAIL PROFILE CHECKER ]*

🧑‍💻 Script Code by Daffa
*/
const axios = require('axios');
const cheerio = require('cheerio');
const checkGmail = async (email) => {
return new Promise(async (resolve, reject) => {
try {
const username = email.split('@')[0];
const { data } = await axios.post(
'https://gmail-osint.activetk.jp/',
new URLSearchParams({
q: username,
domain: 'gmail.com'
}),
{
headers: {
'Content-Type': 'application/x-www-form-urlencoded',
'User-Agent': 'Postify/1.0.0'
}
}
);
const $ = cheerio.load(data);
const text = $('pre').text();
const extract = (regex, defaultValue = 'Tidak ada', checkNotFound = false) => {
const result = (text.match(regex) || [null, defaultValue])[1].trim();
return checkNotFound && result === 'Not found.' ? 'Tidak ada' : result;
};
resolve({
status: 200,
result: {
email: email,
photoProfile: extract(/Custom profile picture !\s*=>\s*(.*)/, 'Tidak ada'),
lastEditProfile: extract(/Last profile edit : (.*)/),
googleID: extract(/Gaia ID : (.*)/),
userTypes: extract(/User types : (.*)/),
googleChat: {
entityType: extract(/Entity Type : (.*)/),
customerID: extract(/Customer ID : (.*)/, 'Tidak ada', true)
},
googlePlus: {
enterpriseUser: extract(/Entreprise User : (.*)/)
},
mapsData: {
profilePage: extract(/Profile page : (.*)/)
},
ipAddress: text.includes('Your IP has been blocked by Google') ? 'Di blokir oleh Google' : 'Aman',
calendar: text.includes('No public Google Calendar') ? 'Tidak ada' : 'Ada'
}
});
} catch (error) {
resolve({
status: 404,
msg: 'Email tidak ditemukan atau terjadi kesalahan!'
});
}
});
};
exports.run = {
usage: ['gmailstalk'],
hidden: [],
use: 'email@gmail.com',
category: 'searching',
async: async (m, { func, mecha }) => {
if (!m.args[0]) return m.reply(func.example(m.cmd, 'example@gmail.com'))
if (!m.args[0].endsWith('@gmail.com')) return m.reply('Masukkan email Gmail yang valid!')
await checkGmail(m.args[0]).then(data => {
if (data.status == 404) return m.reply(data.msg)
let txt = `乂  *GMAIL CHECKER*\n`
txt += `\n◦  *Email:* ${data.result.email}`
txt += `\n◦  *Photo Profile:* ${data.result.photoProfile}`
txt += `\n◦  *Last Edit:* ${data.result.lastEditProfile}`
txt += `\n◦  *Google ID:* ${data.result.googleID}`
txt += `\n◦  *User Types:* ${data.result.userTypes}`
txt += `\n◦  *Entity Type:* ${data.result.googleChat.entityType}`
txt += `\n◦  *Customer ID:* ${data.result.googleChat.customerID}`
txt += `\n◦  *Enterprise User:* ${data.result.googlePlus.enterpriseUser}`
txt += `\n◦  *Profile Page:* ${data.result.mapsData.profilePage}`
txt += `\n◦  *IP Status:* ${data.result.ipAddress}`
txt += `\n◦  *Calendar:* ${data.result.calendar}`
mecha.reply(m.chat, txt, m)
})
},
limit: true
}