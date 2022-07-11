const path = require('path')
const fs = require('fs')
const {Collection} = require('discord.js')

const commands = new Collection()
const commandsPath = './commands'
const commandFiles = fs.readdirSync(commandsPath)
                        .filter(file => file.endsWith('.js'))

for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    let filePathR = '../' + filePath
    const command = require(filePathR)
    commands.set(command.data.name, command)
}

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if(!interaction.isCommand()) return
        
        const command = commands.get(interaction.commandName)

        try {
            await command.execute(interaction)
        } catch(error) {
            console.error(error)
            await interaction.reply({content: 'There was an error while executing this command', ephemeral: true})
        }
    }
}