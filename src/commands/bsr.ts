import BeatSaverAPI from "beatsaver-api";
import type { CommandInteraction } from "discord.js";
import BSSIEmbed from "../BSSIEmbed";
import { Command } from "../Command";
import RateLimitManager from "../RateLimitManager";

export default class BSRCommand extends Command {
    private bsapi = new BeatSaverAPI({
        AppName: "Beat Saber Song Info",
        Version: "2.0.0",
    })

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
            map = await this.bsapi.getMapByID(key);
        } catch(e) {
            if (e instanceof BeatSaverAPI.Errors.SongNotFoundError) {
                interaction.reply({ content: "Invalid song key.", ephemeral: true });
            } else if (e instanceof BeatSaverAPI.Errors.RateLimitError) {
                interaction.reply({ content: "Rate limit exceeded. Please try again later.", ephemeral: true });
                RateLimitManager.rateLimited = true;
                setTimeout(() => RateLimitManager.rateLimited = false, 10 * 1000);
            } else {
                interaction.reply({ content: "An error occurred.", ephemeral: true });
            }
            return;
        }

        const mods: string[] = [];
        for (const diff of map.versions[0]!.diffs) {
            if (diff.chroma && !mods.includes("Chroma")) mods.push("Chroma");
            if (diff.ne && !mods.includes("Noodle Extensions")) mods.push("Noodle Extensions");
            if (diff.me && !mods.includes("Mapping Extensions")) mods.push("Mapping Extensions");
            if (diff.cinema && !mods.includes("Cinema")) mods.push("Cinema");
        }

        const embed = new BSSIEmbed(interaction.client.user!, interaction.user)
            .setTitle(map.name)
            .setDescription(map.description)
            .addFields(
                { name: "Key", value: map.id, inline: true },
                { name: "Uploader", value: `[${map.uploader.name}](https://beatsaver.com/profile/${map.uploader.id.toString()})`, inline: true },
                { name: "Uploaded At", value: new Date(map.uploaded).toUTCString(), inline: true },
                { name: "Upvotes", value: map.stats.upvotes.toString(), inline: true },
                { name: "Downvotes", value: map.stats.downvotes.toString(), inline: true },
                { name: "Rating", value: (map.stats.score * 100).toString() + "%", inline: true },
                { name: "Links", value: `[ZIP Download](${map.versions[0]!.downloadURL}) / [Preview](https://skystudioapps.com/bs-viewer/?id=${map.id})`, inline: true },
                { name: "Suggested/Required Mods", value: mods.length > 0 ? mods.join(", ") : "None", inline: true },
            )
            .setThumbnail(map.versions[0]!.coverURL)
            .setURL(`https://beatsaver.com/maps/${map.id}`);

        await interaction.reply({
            embeds: [embed],
        });
    }
}