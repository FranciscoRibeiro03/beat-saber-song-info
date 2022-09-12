import { readdirSync } from "fs";
import { Collection } from "discord.js";
import { Command } from "./Command";

class CommandRegistry {
    private commands: Collection<string, Command> = new Collection();

    public registerCommands() {
        // Read all files in the commands folder
        // Each file has a run function that takes in the interaction
        readdirSync(__dirname + "/commands").forEach((file) => {
            const commandFile = require(__dirname + `/commands/${file}`);
            const command = new commandFile.default();
            if (command instanceof Command) {
                const commandName = file.split(".")[0]!;
                this.setCommand(commandName, command);
            }
        });
    }

    private setCommand(commandName: string, command: Command): void {
        this.commands.set(commandName, command);
    }

    public getCommand(name: string): Command | undefined {
        const command = this.commands.get(name);
        return command;
    }
}

export default new CommandRegistry();