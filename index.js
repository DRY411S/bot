// Require the discord module
const Discord = require('discord.js');

// Get the configuration
const config = require('./config.json');

// Create a discord client
const client = new Discord.Client();

// Call this function every time this bot is started
client.on('ready', readyDiscord);

client.on('message', message => {
	console.log(message.content);
	if (message.content === '!ping') {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('Pong.');
	}
});

// Log the client in (need to hide ths token)
client.login(config.token);

// Logging function
function readyDiscord() {
	console.log('Logged in');
}