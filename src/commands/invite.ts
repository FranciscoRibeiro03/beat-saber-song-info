import type { CommandInteraction } from "discord.js";
import BSSIEmbed from "../BSSIEmbed";
import { Command } from "../Command";
import { getInviteLink } from "../constants";

export default class InviteCommand extends Command {
    constructor() {
        super("invite", "Get the invite link for the bot");
    }
    
    public async execute(interaction: CommandInteraction) {
        const embed = new BSSIEmbed(interaction.client.user!, interaction.user)
            .setTitle("Invite me!")
            .setDescription(`Click [here](${getInviteLink()}) to invite me to your server!`);

        await interaction.reply({ embeds: [embed] });
    }
}