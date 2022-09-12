import { EmbedBuilder, User } from "discord.js";

export default class BSSIEmbed extends EmbedBuilder {
    constructor(botUser: User, requestedBy?: User) {
        super();
        this.setColor("#00CC00");
        this.setAuthor({ name: botUser.tag, iconURL: botUser.displayAvatarURL() });
        this.setTimestamp();
        if (requestedBy) this.setFooter({ text: `Requested by: ${requestedBy.tag}`, iconURL: requestedBy.displayAvatarURL() });
    }
}