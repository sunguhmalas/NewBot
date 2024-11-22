/*
Scrape: Avosky
*/
const axios = require('axios');
const cleanResponse = (text) => {
return text
.replace(/\*\*(.*?)\*\*/g, '$1')
.replace(/__(.*?)__/g, '$1')
.replace(/\*(.*?)\*/g, '$1')
.replace(/_(.*?)_/g, '$1')
.replace(/`(.*?)`/g, '$1')
.replace(/\[(.*?)\]\(.*?\)/g, '$1')
.replace(/~~(.*?)~~/g, '$1')
.replace(/#+\s*(.*)/g, '$1')
.replace(/!\[.*?\]\(.*?\)/g, '')
.replace(/<[^>]+>/g, '')
.replace(/[ \t]+/g, ' ')
.replace(/\$@\$(.*?)\$@\$/g, '')
.trim();
};
const headers = {
"Content-Type": "application/json",
"User-Agent": "Mozilla/5.0 (Linux; Android 12; Infinix HOT 40 Pro Build/SKQ1.210929.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.45 Mobile Safari/537.36",
"Accept": "application/json", 
"Accept-Language": "en-US,en;q=0.9,id;q=0.8",
"Connection": "keep-alive",
"Host": "bagoodex.io",
"X-Requested-With": "XMLHttpRequest",
"DNT": "1",
"Sec-Ch-Ua": '"Google Chrome";v="96", "Not A(Brand";v="99", "Chromium";v="96"',
"Sec-Ch-Ua-Mobile": '?1',
"Sec-Ch-Ua-Platform": '"Android"',
"Referer": "https://bagoodex.io/",
"Origin": "https://bagoodex.io",
"Accept-Encoding": "gzip, deflate, br",
"Cache-Control": "no-cache"
};

exports.run = {
usage: ['ai'],
use: 'question', 
category: 'ai',
async: async (m, { func, mecha, users }) => {
const processRequest = async (input, name) => {
const payload = {
prompt: `kamu adalah Mecha, Bot WhatsApp dengan program kecerdasan buatan AI (artificial intelligence). jawab setiap pertanyaan dengan jawaban yang edukatif, lawan bicaramu adalah ${name}, kamu memiliki sifat dingin dan sedikit tsundere imut, kamu dirancang dan dikembangkan oleh SuryaDev sejak tahun 2021, SuryaDev memiliki nama lengkap Jabal Surya Ngalam, berasal dari Jepara, lahir pada 21 mei 2005, dia adalah seseorang yang kreatif dan berbakat dalam menciptakan berbagai hal.`,
messages: [{
content: "hai! aku siap membantu! apa yang bisa aku bantu? (*＾▽＾)／",
role: "system"
}],
input: input
};
const response = await axios.post('https://bagoodex.io/front-api/chat', payload, { headers });
const cleanedResponse = cleanResponse(response.data);
return cleanedResponse;
};
if (!m.text) return m.reply(func.example(m.cmd, 'apa itu coding?'));
mecha.sendReact(m.chat, '🕒', m.key);
const replyText = await processRequest(m.text, users.name);
mecha.sendReact(m.chat, '✅', m.key);
mecha.reply(m.chat, replyText, m, {
expiration: m.expiration
});
},
limit: true
}