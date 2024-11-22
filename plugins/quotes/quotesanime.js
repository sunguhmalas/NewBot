const fetch = require('node-fetch');

exports.run = {
usage: ['quotesanime'],
hidden: ['qanime', 'katanime'],
category: 'quotes',
async: async (m, { mecha }) => {
let res = await (await fetch('https://katanime.vercel.app/api/getrandom?limit=1'))
if (!res.ok) return await m.reply(res.text())
let json = await res.json()
if (!json.result[0]) return m.reply(func.jsonFormat(json))
let { id, english, indo, character, anime } = json.result[0]
let caption = `_${indo}_\n`
caption += `\n_${character}_`
caption += `\n_${anime}_`
mecha.reply(m.chat, caption, m, {
expiration: m.expiration
})
},
limit: true
}