const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { getTimeInterval, getScheduleTime } = require('../utils/time.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meet')
		.setDescription('Назначить новую встречу с выбранными участниками и временем')
		.addStringOption(option =>
			option.setName('user')
				.setDescription('Укажите участников встречи')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('time')
				.setDescription('Укажите время в формате DD/HH:MM')
				.setRequired(true)),

	async execute(interaction) {
		const names = interaction.options.data[0].value.split(' ');
		const time = interaction.options.data[1].value;
		const memberCollection = [...new Set(names)].map(item => `${item}`);
		const interval = getTimeInterval(time);

		if (Math.sign(getTimeInterval(time)) === -1) {
			await interaction.reply('This time is gone');
		}
		else {
			const embed = new MessageEmbed()
				.setColor('GOLD')
				.setTitle('Встреча начинается')
				.setDescription(`Участники: ${[...memberCollection]}.\nIn time ${getScheduleTime(time)}`);

			await interaction.reply(`Встреча назначена на ${getScheduleTime(time)}\nСписок участников: ${[...memberCollection]}`);
			await wait(interval);
			await interaction.followUp({ embeds: [embed] });
		}
	},
};