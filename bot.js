const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'KaDat-MC.aternos.me', 
        port: 60102,                 
        username: 'KADAT_BOT_AFK',   
        version: false // Tự động nhận diện phiên bản 1.20, 1.21...
    });

    bot.on('spawn', () => {
        console.log('--- Bot KADATMC đã kết nối thành công! ---');
        // Nếu có mật khẩu, hãy bỏ dấu // ở dòng dưới và sửa mật khẩu của bạn
        // bot.chat('/login matkhau123'); 
    });

    // Hành động chống AFK: Cứ 30 giây nhảy 1 cái và xoay người
    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
            
            const yaw = Math.random() * Math.PI * 2;
            bot.look(yaw, 0, false);
        }
    }, 30000);

    // Tự động kết nối lại nếu bị server đóng hoặc lỗi mạng
    bot.on('end', () => {
        console.log('Mất kết nối! Đang thử lại sau 30 giây...');
        setTimeout(createBot, 30000);
    });

    bot.on('error', (err) => {
        console.log('Lỗi: ' + err.message);
    });

    bot.on('kicked', (reason) => {
        console.log('Bị kick vì lý do: ' + reason);
    });
}

createBot();
