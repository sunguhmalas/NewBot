exports.run = {
usage: ['tanggal', 'date'],
category: 'group',
async: async (m, { func, mecha }) => {
const today = new Date();
const date = new Date(today.toLocaleString("en-US", {timeZone: "Asia/Jakarta"}));
const hours = date.getHours();
const minutes = date.getMinutes();
const day = today.getDate();
const month = today.getMonth() + 1; // perhatikan bahwa bulan dimulai dari 0, maka ditambahkan 1.
const year = today.getFullYear();
// mengambil nama hari dalam bahasa Inggris.
const dayOfWeek = today.toLocaleDateString("id-ID", { weekday: "long" });
const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
const getTodayDate = `Hari ini adalah ${dayOfWeek}, ${day}/${month}/${year} pukul ${timeNow} WIB`;

// mengirimkan hasil ke grup atau pengguna
mecha.reply(m.chat, getTodayDate, m, {
expiration: m.expiration
});
},
limit: true
}