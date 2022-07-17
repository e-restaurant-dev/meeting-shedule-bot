const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong is answer'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};