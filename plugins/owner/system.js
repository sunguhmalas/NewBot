exports.run = {
usage: ['verify', 'gconly', 'fakereply', 'maintenance', 'autosticker', 'autoread', 'autoblockcmd', 'anticall', 'antispam', 'autolevelup'],
use: 'on / off',
category: 'owner',
async: async (m, { func, mecha, setting }) => {
if (!m.args || !m.args[0]) return m.reply(`*Current status* : ${setting[m.command] ? 'active' : 'non-active'}\n\n${func.example(m.cmd, 'on / off')}`)
let option = m.args[0].toLowerCase()
let optionList = ['on', 'off'];
if (!optionList.includes(option)) return m.reply(`${func.example(m.cmd, 'on / off')}`)
let status = option === 'on' ? true : false;
if (setting[m.command] == status) return mecha.reply(m.chat, `${func.ucword(m.command)} has been ${option == 'on' ? 'activated' : 'inactivated'} previously.`, m)
setting[m.command] = status
mecha.reply(m.chat, `${func.ucword(m.command)} has been ${option == 'on' ? 'activated' : 'inactivated'} successfully.`, m, {
expiration: m.expiration
})
},
owner: true
}