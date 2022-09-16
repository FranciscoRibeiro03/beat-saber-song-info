import BeatSaverAPI, { Errors } from "../BeatSaverAPI";
import type { CommandInteraction } from "discord.js";
import BSSIEmbed from "../BSSIEmbed";
import { Command } from "../Command";
import RateLimitManager from "../RateLimitManager";

export default class BSRCommand extends Command {
    constructor() {
        super("bsr", "Get info about a song on BeatSaver using the song key.");
    }

    async execute(interaction: CommandInteraction) {
        if (RateLimitManager.rateLimited) {
            interaction.reply({ content: "The bot is currently rate limited. Please try again later.", ephemeral: true });
            return;
        }

        const key = interaction.options.get("key", true).value as string;
        let map;

        try {
            map = await BeatSaverAPI.getMapByID(key);
        } catch(e) {
            if (e instanceof Errors.SongNotFoundError) {
                interaction.reply({ content: "Invalid song key.", ephemeral: true });
            } else if (e instanceof Errors.RateLimitError) {
                interaction.reply({ content: "Rate limit exceeded. Please try again later.", ephemeral: true });
                RateLimitManager.rateLimited = true;
                setTimeout(() => RateLimitManager.rateLimited = false, 10 * 1000);
            } else {
                interaction.reply({ content: "An error occurred.", ephemeral: true });
            }
            return;
        }

        const embed = await BSSIEmbed.getMapEmbed(interaction.client.user!, interaction.user, map);

        await interaction.reply({
            embeds: [embed],
        });
    }
}