// Require the discord module
const Discord = require('discord.js');

// Get the configuration
const { prefix, token } = require('./config.json');

// Create a discord client
const client = new Discord.Client();

// Call this function every time this bot is started
client.on('ready', readyDiscord);

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	// the rest of your code
	console.log(message.content);
	if (message.content === `${prefix}ping`) {
		message.channel.send('Pong.');
	} else if (message.content === `${prefix}beep`) {
		message.channel.send('Boop.');
	} else if (message.content === `${prefix}server`) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	} else if (message.content === `${prefix}user-info`) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	}
	// using the new `command` variable, this makes it easier to manage!
	// you can switch your other commands to this format as well
	else if (command === 'args-info') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		} 	else if (args[0] === 'foo') {
				return message.channel.send('bar');
		}
	
		message.channel.send(`First argument: ${args[0]}`);
	

		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}
});

// Log the client in (need to hide ths token)
client.login(token);

// Logging function
function readyDiscord() {
	console.log('Logged in');
}