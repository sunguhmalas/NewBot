exports.run = {
usage: ['cekpremium'],
hidden: ['cekprem'],
category: 'user',
async: async (m, { func, mecha, users }) => {
if (!users.premium) return m.reply(`Kamu bukan pengguna premium. kirim ${m.prefix}buyprem untuk melihat list harga premium.`)
let caption = '乂  *C E K - P R E M I U M*\n\n'
caption += `◦  *ID* : @${m.sender.split('@')[0]}\n`
caption += `◦  *Name* : ${users.name}\n`
caption += `◦  *Expire* : ${users.expired.premium != 'PERMANENT' ? func.expireTime(users.expired.premium) : 'PERMANENT'}`
mecha.reply(m.chat, caption, m, {
expiration: m.expiration
})
}
}