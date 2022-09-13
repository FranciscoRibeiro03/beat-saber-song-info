import { readdirSync } from "fs";
import { Collection } from "discord.js";
import { Command } from "./Command";

class CommandRegistry {
    private commands: Collection<string, Command> = new Collection();

    public registerCommands() {
        // Read all files in the commands folder
        // Each file has a run function that takes in the interaction
        const registeredCommands: string[] = [];
        readdirSync(__dirname + "/commands").forEach((file) => {
            const commandFile = require(__dirname + `/commands/${file}`);
            if (!commandFile.default) return;
            const command = new commandFile.default();
            if (command instanceof Command) {
                const commandName = file.split(".")[0]!;
                registeredCommands.push(commandName);
                this.setCommand(commandName, command);
            }
        });
        console.log(`Registered ${registeredCommands.length} commands: ${registeredCommands.join(", ")}`);
    }

    private setCommand(commandName: string, command: Command): void {
        this.commands.set(commandName, command);
    }

    public getCommand(name: string): Command | undefined {
        const command = this.commands.get(name);
        return command;
    }

    public getCommands(): Collection<string, Command> {
        return this.commands;
    }
}

export default new CommandRegistry();