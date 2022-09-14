import type { MapDetail } from "beatsaver-api/lib/models/MapDetail";
import { EmbedBuilder, User } from "discord.js";

export default class BSSIEmbed extends EmbedBuilder {
    constructor(botUser: User, requestedBy?: User) {
        super();
        this.setColor("#00CC00");
        this.setAuthor({ name: botUser.tag, iconURL: botUser.displayAvatarURL() });
        this.setTimestamp();
        if (requestedBy) this.setFooter({ text: `Requested by: ${requestedBy.tag}`, iconURL: requestedBy.displayAvatarURL() });
    }

    public static getMapEmbed(botUser: User, requestedBy: User, map: MapDetail): BSSIEmbed {
        const mods: string[] = [];
        for (const diff of map.versions[0]!.diffs) {
            if (diff.chroma && !mods.includes("Chroma")) mods.push("Chroma");
            if (diff.ne && !mods.includes("Noodle Extensions")) mods.push("Noodle Extensions");
            if (diff.me && !mods.includes("Mapping Extensions")) mods.push("Mapping Extensions");
            if (diff.cinema && !mods.includes("Cinema")) mods.push("Cinema");
        }

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
                { name: "Links", value: `[ZIP Download](${map.versions[0]!.downloadURL}) / [Preview](https://skystudioapps.com/bs-viewer/?id=${map.id})`, inline: true },
                { name: "Suggested/Required Mods", value: mods.length > 0 ? mods.join(", ") : "None", inline: true },
            )
            .setThumbnail(map.versions[0]!.coverURL)
            .setURL(`https://beatsaver.com/maps/${map.id}`);

        return embed;
    }
}