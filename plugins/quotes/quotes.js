const fetch = require('node-fetch');

exports.run = {
usage: ['quotes'],
hidden: ['quote'],
category: 'quotes',
async: async (m, { func, mecha }) => {
let quotes = await fetch('https://raw.githubusercontent.com/Jabalsurya2105/database/master/data/quotes.json').then(response => response.json())
let result = quotes.random()
let caption = `_${result.quotes}_\n`
caption += `\n_${result.author}_`
mecha.reply(m.chat, caption, m, {
expiration: m.expiration
})
},
limit: true
}