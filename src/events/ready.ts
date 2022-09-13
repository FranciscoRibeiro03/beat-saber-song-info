import { ActivityType, Client } from "discord.js";

export function run(client: Client) {
    client.user?.setPresence({ activities: [{ name: "Beat Saber", type: ActivityType.Playing }] })
    console.log(`Ready! Logged in as ${client.user?.tag ?? "unknown"}`);
}