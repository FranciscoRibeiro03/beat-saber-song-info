import type { CommandInteraction } from "discord.js";

export abstract class Command {
    public readonly name: string;
    public readonly description: string;
    public abstract execute(interaction: CommandInteraction): Promise<void>;

    constructor (name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}