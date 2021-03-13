// Require the discord module
const Discord = require('discord.js');
const fs = require('fs');

// Get the configuration
const { prefix, token } = require('./config.json');

// Create a discord client and get the commands
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

	// Get each command
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);

		// set a new item in the Collection
		// with the key as the command name and the value as the exported module
		client.commands.set(command.name, command);
	}
}

// Call this function every time this bot is started
client.once('ready', readyDiscord);

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	// the rest of your code
	console.log(message.content);

	if (!client.commands.has(commandName)) 	return message.reply('I don\'t recognise that, sorry');

	const command = client.commands.get(commandName);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});

// Log the client in (need to hide ths token)
client.login(token);

// Logging function
function readyDiscord() {
	console.log('Logged in');
}