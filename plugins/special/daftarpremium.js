exports.run = {
usage: ['daftarpremium'],
hidden: ['daftarprem'],
category: 'special',
async: async (m, { func, mecha }) => {
let body = `Jika kamu ingin menjadi Pengguna Premium, kamu cukup membayar Rp5.000 untuk 1 minggu, Rp10.000 untuk 15 hari, Rp20.000 untuk 1 bulan dan Rp.30.000 untuk 2 bulan.`
//body += '\n\nPembayaran bisa melalui Pulsa/Dana/Ovo/Gopay/QRIS (all payment)'
let txt = 'Jika berminat silahkan klik tombol dibawah'
let button = [
['button', 'Buy Premium', `${m.prefix}buyprem`]
]
mecha.sendButton(m.chat, '', body, txt, button, m, {
expiration: m.expiration
})
}
}