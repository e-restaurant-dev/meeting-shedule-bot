const { SlashCommandBuilder } = require('@discordjs/builders')
const wait = require('node:timers/promises').setTimeout

module.exports = {
    data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Pong is answer'),
    async execute(interaction) {
        await interaction.reply('Pong!')
    }
}