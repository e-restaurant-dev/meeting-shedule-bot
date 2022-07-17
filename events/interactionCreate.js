const path = require('path');
const fs = require('fs');
const { Collection } = require('discord.js');

const commands = new Collection();
const commandsDir = '../commands';
const commandFiles = fs.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsDir, file);
	const command = require(filePath);
	commands.set(command.data.name, command);
}

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;

		const command = commands.get(interaction.commandName);

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
		}
	},
};