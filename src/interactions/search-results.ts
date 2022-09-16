import type { SelectMenuInteraction } from "discord.js";
import BeatSaverAPI from "../BeatSaverAPI";
import BSSIEmbed from "../BSSIEmbed";

export default class SearchResultsInteraction {
    public async run(interaction: SelectMenuInteraction) {
        await interaction.deferUpdate();

        const originalUserId = interaction.customId.split("-")[2];

        if (interaction.user.id !== originalUserId) {
            await interaction.followUp({ content: "You can't use this interaction.", ephemeral: true });
            return;
        }

        const value = interaction.values[0]!;

        const map = await BeatSaverAPI.getMapByID(value)!;

        const embed = await BSSIEmbed.getMapEmbed(interaction.client.user!, interaction.user, map);

        await interaction.editReply({ content: "", embeds: [embed] });
    }
}