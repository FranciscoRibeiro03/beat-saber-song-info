import { ActivityType, Client } from "discord.js";
import SuggestionsManager from "../SuggestionsManager";

export async function run(client: Client) {
    client.user?.setPresence({ activities: [{ name: "Beat Saber", type: ActivityType.Playing }] });

    const envSugChannel = process.env["SUGGESTIONS_CHANNEL_ID"];
    if (envSugChannel) {
        const channel = await client.channels.fetch(envSugChannel).catch(() => undefined);
        if (channel && channel.isTextBased()) {
            SuggestionsManager.Channel = channel;
            console.log(`Suggestions channel set to ${channel.isDMBased() ? 
                `DMs with ${channel.recipient!.tag}` :
                `${channel.name} in ${channel.guild.name}`}`);
        }
    }

    console.log(`Ready! Logged in as ${client.user?.tag ?? "unknown"}`);
}