const { SlashCommandBuilder } = require('@discordjs/builders')
const wait = require('node:timers/promises').setTimeout

module.exports = {
    data: new SlashCommandBuilder()
            .setName('user')
            .setDescription('Info about user'),
    async execute(interaction) {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`)
        await wait(4000)
        await interaction.editReply('This message was edit')
    }
}