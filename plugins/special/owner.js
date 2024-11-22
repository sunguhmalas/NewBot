exports.run = {
usage: ['owner'],
hidden: ['creator', 'developer', 'dev'],
category: 'special',
async: async (m, { mecha }) => {
mecha.sendkontak(m.chat, global.owner, global.ownerName, m)
}
}