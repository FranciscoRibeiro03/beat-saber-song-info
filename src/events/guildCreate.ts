import type { Client, Guild } from "discord.js";

export function run(_: Client, guild: Guild) {
    console.log(`Joined a new guild: ${guild.name}`);
}