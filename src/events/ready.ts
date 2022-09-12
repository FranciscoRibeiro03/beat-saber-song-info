import type { Client } from "discord.js";

export function run(client: Client) {
    console.log(`Ready! Logged in as ${client.user?.tag ?? "unknown"}`);
}