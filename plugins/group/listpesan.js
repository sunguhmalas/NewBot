exports.run = {
usage: ['listpesan'],
hidden: ['listchat'],
category: 'group',
async: async (m, { func, mecha, groups }) => {
let members = groups.member.filter((v) => v.chat !== undefined && global.db.users[v.jid] !== undefined && v.chat > 0)
let data = members.filter(itemPertama => m.members.some(itemKedua => itemKedua.id === itemPertama.jid))
if (data.length == 0) return m.reply('Empty data.')
let listchat = data.sort((a, b) => b.chat - a.chat)
let member = listchat.map(v => v.jid);
let totalpesan = 0;
for (let x of listchat) totalpesan += x.chat;
let caption = `乂  *L I S T - P E S A N*\n`
caption += `\nGroup : ${m.groupName}`
caption += `\nTotal peserta : *${data.length}* peserta`
caption += `\nTotal pesan : *${func.rupiah(totalpesan)}* pesan\n`
caption += `\nKamu Top ${member.indexOf(m.sender) + 1} Chat dari ${m.members.length} Peserta\n`
caption += listchat.map((v, i) => `${i + 1}. ${(global.db.users[v.jid]?.name || mecha.getName(v.jid)).replaceAll('\n', '\t')} ~> ${v.chat} chat`).join('\n')
mecha.reply(m.chat, caption, m, {
expiration: m.expiration
})
},
group: true
}