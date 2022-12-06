import type { CommandInteraction } from "discord.js";
import BSSIEmbed from "../BSSIEmbed";
import { Command } from "../Command";
import CommandRegistry from "../CommandRegistry";

export default class StatsCommand extends Command {
    constructor() {
        super("stats", "Get statistics about the bot");
    }

    async execute(interaction: CommandInteraction) {
        const embed = new BSSIEmbed(interaction.client.user!, interaction.user)
            .setTitle("Statistics")
            .setFields(
                { name: "Guilds", value: interaction.client.guilds.cache.size.toString(), inline: true },
                { name: "Channels", value: interaction.client.channels.cache.size.toString(), inline: true },
                { name: "Cached Users", value: interaction.client.users.cache.size.toString(), inline: true },
                { name: "Commands", value: CommandRegistry.getCommands().size.toString(), inline: true },
                { name: "Uptime", value: millisecondsToDhms(interaction.client.uptime!), inline: true },
                { name: "Memory Usage", value: formatMemoryUsage(process.memoryUsage().heapUsed), inline: true },
            );

        await interaction.reply({ embeds: [embed] });
    }
}

function millisecondsToDhms(d: number) {
    const dSeconds = Number(d/1000);
    const D = Math.floor(dSeconds / (3600 * 24));
    const h = Math.floor(dSeconds % (3600 * 24) / 3600);
    const m = Math.floor(dSeconds % 3600 / 60);
    const s = Math.floor(dSeconds % 3600 % 60);

    const DDisplay = D > 0 ? D + (D == 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return (DDisplay + hDisplay + mDisplay + sDisplay) || "0 seconds";
}

const formatMemoryUsage = (data: number) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`