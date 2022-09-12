import type { Client, Interaction } from "discord.js";
import CommandRegistry from "../CommandRegistry";

export function run(_: Client, interaction: Interaction) {
    // If the interaction is not a command, return
    if (!interaction.isCommand()) return;

    // Get the command from the collection
    const command = CommandRegistry.getCommand(interaction.commandName);

    // If the command does not exist, return
    if (!command) return;

    // Try to run the command
    try {
        command.execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
}