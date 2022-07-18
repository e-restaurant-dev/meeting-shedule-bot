const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Info about server!'),
	async execute(interaction) {
		await interaction.reply(`Server: ${interaction.guild.name}\nTotal members count: ${interaction.guild.memberCount}`);
	},
};