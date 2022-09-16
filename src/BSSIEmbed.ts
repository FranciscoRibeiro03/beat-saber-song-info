import type { MapDetail } from "beatsaver-api/lib/models/MapDetail";
import { EmbedBuilder, User } from "discord.js";
import { GetSpotifyLink } from "./spotify/Spotify";

export default class BSSIEmbed extends EmbedBuilder {
    constructor(botUser: User, requestedBy?: User) {
        super();
        this.setColor("#00CC00");
        this.setAuthor({ name: `${botUser.tag}`, iconURL: botUser.displayAvatarURL() });
        this.setTimestamp();
        if (requestedBy) this.setFooter({ text: `Requested by: ${requestedBy.tag} | v${process.env["npm_package_version"] ?? "Unknown"}`, iconURL: requestedBy.displayAvatarURL() });
    }

    public static async getMapEmbed(botUser: User, requestedBy: User, map: MapDetail): Promise<BSSIEmbed> {
        const mods: string[] = [];
        for (const diff of map.versions[0]!.diffs) {
            if (diff.chroma && !mods.includes("Chroma")) mods.push("Chroma");
            if (diff.ne && !mods.includes("Noodle Extensions")) mods.push("Noodle Extensions");
            if (diff.me && !mods.includes("Mapping Extensions")) mods.push("Mapping Extensions");
            if (diff.cinema && !mods.includes("Cinema")) mods.push("Cinema");
        }

        let links = `[ZIP Download](${map.versions[0]!.downloadURL}) / [OneClick](https://stormpacer.me/beatsaver?id=${map.id})`
            + `\n[Web Preview](https://skystudioapps.com/bs-viewer/?id=${map.id})`;

        const spotifyLink = await GetSpotifyLink(map.metadata.songAuthorName, map.metadata.songName);

        if (spotifyLink && spotifyLink.tracks.items.length > 0) links += ` / [Song on Spotify](${spotifyLink.tracks.items[0]?.external_urls.spotify})`;

        const embed = new BSSIEmbed(botUser, requestedBy)
            .setTitle(map.name)
            .setDescription(map.description)
            .addFields(
                { name: "Key", value: map.id, inline: true },
                { name: "Uploader", value: `[${map.uploader.name}](https://beatsaver.com/profile/${map.uploader.id.toString()})`, inline: true },
                { name: "Uploaded At", value: new Date(map.uploaded).toUTCString(), inline: true },
                { name: "Upvotes", value: map.stats.upvotes.toString(), inline: true },
                { name: "Downvotes", value: map.stats.downvotes.toString(), inline: true },
                { name: "Rating", value: (map.stats.score * 100).toString() + "%", inline: true },
                { name: "Hash", value: `\`${map.versions[0]!.hash}\``, inline: false },
                { name: "Links", value: links, inline: true },
                { name: "Suggested/Required Mods", value: mods.length > 0 ? mods.join(", ") : "None", inline: true },
            )
            .setThumbnail(map.versions[0]!.coverURL)
            .setURL(`https://beatsaver.com/maps/${map.id}`)
            .setAuthor({ name: `Uploaded by ${map.uploader.name}`, iconURL: map.uploader.avatar });

        return embed;
    }
}