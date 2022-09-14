import type { CommandInteraction } from "discord.js";
import BSSIEmbed from "../BSSIEmbed";
import { Command } from "../Command";
import { getCreatorInfo } from "../constants";

export default class CreatorCommand extends Command {
    private creatorInfo = getCreatorInfo();

    constructor() {
        super("info", "Get info about the bot");
    }
    
    public async execute(interaction: CommandInteraction) {
        let contactInfo = `This bot's creator is \`${this.creatorInfo.tag}\`.`;
        if (this.creatorInfo.id) contactInfo += ` Discord: <@${this.creatorInfo.id}>.`;
        if (this.creatorInfo.website) contactInfo += `\nYou can visit their website at ${this.creatorInfo.website}.`;
        if (this.creatorInfo.patreon || this.creatorInfo.paypal || this.creatorInfo.kofi) {
            contactInfo += "\n\nYou can support them by donating to them on:";
            if (this.creatorInfo.patreon) contactInfo += `\n- [Patreon](${this.creatorInfo.patreon})`;
            if (this.creatorInfo.kofi) contactInfo += `\n- [Ko-fi](${this.creatorInfo.kofi})`;
            if (this.creatorInfo.paypal) contactInfo += `\n- [PayPal](${this.creatorInfo.paypal})`;
        }
        contactInfo += `\n\n[GitHub Repository](https://github.com/FranciscoRibeiro03/beat-saber-song-info)`;
        if (this.creatorInfo.supportServer) contactInfo += `\n[Go to Support Server](${this.creatorInfo.supportServer})`;

        const embed = new BSSIEmbed(interaction.client.user!, interaction.user)
            .setTitle("Info")
            .setDescription(contactInfo);
    
        await interaction.reply({ embeds: [embed] });
    }
}