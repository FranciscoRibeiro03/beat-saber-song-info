import type { CommandInteraction } from "discord.js";

import SuggestionsManager from "../SuggestionsManager";
import { Command } from "../Command";
import BSSIEmbed from "../BSSIEmbed";

export default class SearchCommand extends Command {
    constructor() {
        super("suggest", "Suggest a feature for the bot");
    }

    public async execute(interaction: CommandInteraction) {
        if (!SuggestionsManager.Enabled) {
            await interaction.reply({ content: "Suggestions are not enabled. If you think this is an error, please contact the bot developer.", ephemeral: true });
            return;
        }

        await interaction.deferReply({ ephemeral: true });

        const suggestion = interaction.options.get("suggestion", true).value as string;

        const embed = new BSSIEmbed(interaction.client.user!, interaction.user)
            .setTitle("New Suggestion")
            .setDescription(`\`\`\`\n${suggestion}\n\`\`\``)
            .setColor("#00aaff")
            .setAuthor({ name: `${interaction.user.tag} (${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL() })
            .setFooter({ text: `Suggestion ID: ${interaction.id}` });

        const message = await SuggestionsManager.Channel.send({ embeds: [embed] });
        await message.react("✅");
        await message.react("❌");

        await interaction.editReply({ content: "Your suggestion has been sent! Thank you for your feedback!" });
    }
}