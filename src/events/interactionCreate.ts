import type { Client, Interaction } from "discord.js";
import CommandRegistry from "../CommandRegistry";
import SearchResultsInteraction from "../interactions/search-results";

export function run(_: Client, interaction: Interaction) {
    if (interaction.isSelectMenu() && interaction.customId.startsWith("search-results")) {
        new SearchResultsInteraction().run(interaction);
    }

    // If the interaction is not a command, return
    if (!interaction.isCommand()) return;

    // Get the command from the collection
    const command = CommandRegistry.getCommand(interaction.commandName);

    // If the command does not exist, return
    if (!command) {
        interaction.reply({ content: "Command not found.", ephemeral: true });
        return;
    }

    // Try to run the command
    try {
        command.execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
}