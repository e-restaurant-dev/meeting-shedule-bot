const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { getScheduleTime, getDateWithTimeZone, getFormatDateString, acceptedTimeZones } = require('../utils/time.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meet')
		.setDescription('Назначить новую встречу с выбранными участниками и временем')
		.addStringOption(option =>
			option.setName('participants')
				.setDescription('Укажите участников встречи')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('time')
				.setDescription('Укажите время в формате YYYY/MM/DD HH:MM')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('zone')
				.setDescription('Укажите часовой пояс: "pl" для GMT+2 или "vl" для GMT+10')
				.setRequired(true),
		),

	execute(interaction) {
		const { data } = interaction.options;

		const names = data[0].value.split(' ');
		const dateString = data[1].value;
		const location = data[2].value;

		if (!Object.prototype.hasOwnProperty.call(acceptedTimeZones, location)) {
			interaction.reply(`Часовой пояс "${location}" не поддерживается`);
			return;
		}

		const memberCollection = Array.from(new Set(names)).map(item => `${item}`);
		const currentTime = Date.now();
		const dateOfMeeting = getDateWithTimeZone(dateString, acceptedTimeZones[location].zone);

		const msUntilMeeting = dateOfMeeting.getTime() - currentTime;

		if (msUntilMeeting < 0) {
			interaction.reply('This time is gone');
		}
		else {
			const meetingTimeEntries = getScheduleTime(dateOfMeeting);
			interaction.reply(`Встреча назначена на:${
				meetingTimeEntries.reduce((date, info) => (
					`${date}\n${info.location.toUpperCase()}(${info.zone}): ${getFormatDateString(info.date)}`
				), '')
			}\nСписок участников: ${memberCollection}`);

			setTimeout(() => {
				const embed = new MessageEmbed()
					.setColor('GOLD')
					.setTitle('Встреча начинается')
					.setDescription(`Участники: ${memberCollection}`);
				interaction.followUp({ embeds: [embed] });
			}, msUntilMeeting);
		}
	},
};