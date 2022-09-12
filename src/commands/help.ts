import type { CommandInteraction } from "discord.js";
import BSSIEmbed from "../BSSIEmbed";
import { Command } from "../Command";
import CommandRegistry from "../CommandRegistry";

export default class HelpCommand extends Command {
    constructor() {
        super("help", "Get help on how to use the bot");
    }

    public async execute(interaction: CommandInteraction) {
        const embed = new BSSIEmbed(interaction.client.user!, interaction.user)
            .setTitle("Available Commands");

        let description = "";
        CommandRegistry.getCommands().forEach((command) => {
           description += `**/${command.name}** - ${command.description}\n`;
        });
        embed.setDescription(description);

        await interaction.reply({ embeds: [embed] });
    }
}