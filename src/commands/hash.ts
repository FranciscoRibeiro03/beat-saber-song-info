import BeatSaverAPI from "beatsaver-api";
import type { CommandInteraction } from "discord.js";
import BSSIEmbed from "../BSSIEmbed";
import { Command } from "../Command";
import RateLimitManager from "../RateLimitManager";

export default class HashCommand extends Command {
    private bsapi = new BeatSaverAPI({
        AppName: "Beat Saber Song Info",
        Version: "2.0.0",
    })

    constructor() {
        super("hash", "Get info about a song on BeatSaver using the song hash.");
    }

    async execute(interaction: CommandInteraction) {
        if (RateLimitManager.rateLimited) {
            interaction.reply({ content: "The bot is currently rate limited. Please try again later.", ephemeral: true });
            return;
        }

        const hash = interaction.options.get("hash", true).value as string;
        let map;

        try {
            map = await this.bsapi.getMapByHash(hash);
        } catch(e) {
            if (e instanceof BeatSaverAPI.Errors.SongNotFoundError) {
                interaction.reply({ content: "Invalid song hash.", ephemeral: true });
            } else if (e instanceof BeatSaverAPI.Errors.RateLimitError) {
                interaction.reply({ content: "Rate limit exceeded. Please try again later.", ephemeral: true });
                RateLimitManager.rateLimited = true;
                setTimeout(() => RateLimitManager.rateLimited = false, 10 * 1000);
            } else {
                interaction.reply({ content: "An error occurred.", ephemeral: true });
            }
            return;
        }

        const embed = BSSIEmbed.getMapEmbed(interaction.client.user!, interaction.user, map);

        await interaction.reply({
            embeds: [embed],
        });
    }
}