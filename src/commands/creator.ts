import type { CommandInteraction } from "discord.js";
import BSSIEmbed from "../BSSIEmbed";
import { Command } from "../Command";
import { getCreatorInfo } from "../constants";

export default class CreatorCommand extends Command {
    private creatorInfo = getCreatorInfo();

    constructor() {
        super("creator", "Get info about the creator of the bot");
    }
    
    public async execute(interaction: CommandInteraction) {
        let contactInfo = `This bot's creator is \`${this.creatorInfo.tag}\`.`;
        if (this.creatorInfo.id) contactInfo += ` Discord: <@${this.creatorInfo.id}>.`;
        if (this.creatorInfo.website) contactInfo += `\nYou can also visit their website at ${this.creatorInfo.website}.`;
        if (this.creatorInfo.patreon || this.creatorInfo.paypal || this.creatorInfo.kofi) {
            contactInfo += "\n\nYou can support them by donating to them at:";
            if (this.creatorInfo.patreon) contactInfo += `\n- Patreon: ${this.creatorInfo.patreon}`;
            if (this.creatorInfo.kofi) contactInfo += `\n- Ko-fi: ${this.creatorInfo.kofi}`;
            if (this.creatorInfo.paypal) contactInfo += `\n- PayPal: ${this.creatorInfo.paypal}`;
        }
        if (this.creatorInfo.supportServer) contactInfo += `\n\nSupport server: ${this.creatorInfo.supportServer}.`;

        const embed = new BSSIEmbed(interaction.client.user!, interaction.user)
            .setTitle("Bot Creator")
            .setDescription(contactInfo);
    
        await interaction.reply({ embeds: [embed] });
    }
}