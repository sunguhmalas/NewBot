exports.run = {
usage: ['listonline'],
category: 'group',
async: async (m, { func, mecha, store }) => {
try {
let id = m.args[0] && /\d+\-\d+@g.us/.test(m.args[0]) ? m.args[0] : m.chat;
let online = [...Object.keys(store.presences[id]), m.bot];
if (online.length > 0) {
mecha.reply(m.chat, 'Daftar peserta yang sedang online:\n\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join('\n'), m, {
expiration: m.expiration
})
} else mecha.reply(m.chat, 'Tidak ada peserta yang sedang online.', m, {
expiration: m.expiration
});
} catch (e) {
mecha.reply(m.chat, 'Tidak ada peserta yang sedang online.', m, {
expiration: m.expiration
});
}
},
group: true
}