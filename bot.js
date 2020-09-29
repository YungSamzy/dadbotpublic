const request = require('request');

function init(client) {
	client.on('ready', function () {
		console.log(`Logged in as: ${client.user.username} - (${client.user.id})`);
client.user.setPresence({
        status: "online",  // You can show online, idle... Do not disturb is dnd
        game: {
            name: "The Kids",  // The message shown
            type: "WATCHING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });
	});


	// The command list
	let commands = {
		help: (message, str) => {
			message.channel.send("There is no help for the helpless...");
		},
		dadjoke: (message, str) => {
			getRandomDadJoke(joke => message.channel.send(joke));
		}
	}


	/**
	 * Attempts to run a command from the command list.
	 * @param {String} cmd The command to be executed
	 * @param {*} message The message object received from Discord
	 * @param {*} str The message string (with any pre-processing you've performed on it).
	 */
	function runCommand(cmd, message, str) {
		if (typeof commands[cmd] !== "undefined") {
			return commands[cmd](message, str)
		}
		else {
			// unknown command
		}
	}

	function getRandomDadJoke(joke) {
		var options = {
			url: 'https://icanhazdadjoke.com/',
			headers: {
				'Accept': 'application/json'
			}
		};
		request(options, function (err, response, body) {
			if (!err && response.statusCode === 200) {
				body = JSON.parse(body);
				return joke(body.joke);
			}
		});
	}

	// When chat messages are received
	client.on("message", message => {
		if (message.author.bot) return;
		let str = message.content;
		if (str.includes("made you")){
		message.channel.send(`<@642891240529985539> made me! Check out my guts at https://github.com/YungSamzy/dadbotpublic !`);
		}
		if (str.includes("are you")){
		message.channel.send(`I'm a Discord bot made by <@642891240529985539>! I'm pretty much just a joke! If you want to see how I run check out my guts athttps://github.com/YungSamzy/dadbotpublic !`);
		}
		if (str.includes("tell") && str.includes("joke")){
		var options = {
			url: 'https://icanhazdadjoke.com/',
			headers: {
				'Accept': 'application/json'
			}
		};
		request(options, function (err, response, body) {
			if (!err && response.statusCode === 200) {
				body = JSON.parse(body);
				message.channel.send(body.joke);
			}
		});
		}
		//replies dank to any image link, needs to be confined to a channel...
		let modified = str
			.toLowerCase()
			.replace(/i am/g, 'im')
			.replace(/[^a-z\.\?\! ]/g, '')
			.split(/\.|\?|\!/)
			.map(i => {
				i = ' ' + i
				let start = i.indexOf(' im ')
				if (start === -1) {
					return
				}
				return i.substr(start)
			})
			.filter(i => i)
			.join(' and ')

		let start
		if (modified) {
			message.channel.send(`I'm sure you are.`);
		}

		// if message starts with "!"
		if (str.startsWith("!")) {
			// store the command for cleaner code/reading
			let command = str.substring(1);
			runCommand(command, message, str);
		}

	});
}

module.exports = init
