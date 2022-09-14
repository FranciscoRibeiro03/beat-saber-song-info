import type { CommandInteraction } from "discord.js";
import BSSIEmbed from "../BSSIEmbed";
import { Command } from "../Command";

const copyrightInfo = "All song info and the icon were taken from [BeatSaver](https://beatsaver.com).\n"
                    + "BeatSaver is licensed under the [GNU General Public License v3.0](https://github.com/beatmaps-io/beatsaver-main/blob/master/LICENSE).\n\n"
                    + "This bot's source code is licensed under the [GNU General Public License v3.0](https://github.com/FranciscoRibeiro03/beat-saber-song-info/blob/master/LICENSE).";

export default class CopyrightCommand extends Command {
    constructor() {
        super("copyright", "Get the copyright notice for this bot.");
    }

    async execute(interaction: CommandInteraction) {
        const embed = new BSSIEmbed(interaction.client.user!, interaction.user)
            .setTitle("Beat Saber Song Info")
            .setDescription(copyrightInfo);

        await interaction.reply({ embeds: [embed] });
    }
}