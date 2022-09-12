import type { CommandInteraction } from "discord.js";
import { Command } from "../Command";

export default class PingCommand extends Command {
    constructor() {
        super("ping", "Check the bot ping");
    }

    public async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.reply(`Pong! ${interaction.client.ws.ping}ms`);
    }
}