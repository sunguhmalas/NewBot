const fetch = require('node-fetch');

exports.run = {
usage: ['bucin'],
category: 'quotes',
async: async (m, { func, mecha }) => {
let bucin = await fetch('https://raw.githubusercontent.com/Jabalsurya2105/database/master/data/bucin.json').then(response => response.json())
let result = bucin.random();
mecha.reply(m.chat, result, m, {
expiration: m.expiration
})
},
limit: true
}