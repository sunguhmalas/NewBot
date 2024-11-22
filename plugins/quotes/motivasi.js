const fetch = require('node-fetch');

exports.run = {
usage: ['motivasi'],
category: 'quotes',
async: async (m, { func, mecha }) => {
let result = await fetch('https://raw.githubusercontent.com/Jabalsurya2105/database/master/data/motivasi.json').then(response => response.json())
let caption = result.random()
mecha.reply(m.chat, caption, m, {
expiration: m.expiration
})
},
limit: true
}