import { readdirSync } from "fs";
import { Client, ClientOptions } from "discord.js";
import CommandRegistry from "./CommandRegistry";

export class BeatSaberSongInfo {
    private client: Client;

    constructor(clientOptions: ClientOptions = { intents: ["Guilds"] }) {
        this.client = new Client(clientOptions);
    }

    public async run(token: string) {
        this.registerEvents();
        CommandRegistry.registerCommands();
        this.login(token);
    }

    private registerEvents() {
        readdirSync(__dirname + "/events").forEach((file) => {
            const event = require(__dirname + `/events/${file}`);
            this.client.on(file.split(".")[0]!, (...args) => event.run(this.client, ...args));
        });
    }

    private login(token: string) {
        this.client.login(token);
    }
}