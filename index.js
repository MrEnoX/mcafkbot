const mineflayer = require('mineflayer')
const antiafk = require("mineflayer-antiafk-noblockbreak");

const botArgs = {
  host: 'play.elmaadam.ga',
  username: 'AFK',
};


const reBot = () => {
	const bot = mineflayer.createBot(botArgs)
	bot.on('login', () => {
        let botSocket = bot._client.socket;
        console.log(`\x1b[32mLogged in to \x1b[0m${botSocket.server ? botSocket.server : botSocket._host}`);
    });
	
	bot.on('end', () => {
		console.log("\x1b[31mDisconnected\x1b[0m")
        setTimeout(reBot, 5000);
    });
	
	bot.on('error', (err) => {
        if (err.code === `ECONNREFUSED`) {
            console.log(`Failed to connect to ${err.address}:${err.port}`)
        }
        else {
            console.log(`Unhandled error: ${err}`);
        }
    });
	
	bot.loadPlugin(antiafk);

	bot.on('spawn', () => {
	  bot.afk.start();
	})

	bot.on('message', (message) => {
	  console.log(message.toAnsi())
	})

	bot.on('kicked', console.log)
	bot.on('error', console.log)
};
reBot();