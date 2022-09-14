import type { TextBasedChannel } from "discord.js";

class SuggestionsManager {
    private _enabled = false;
    private _suggChannel?: TextBasedChannel;

    public get Enabled() {
        return this._enabled;
    }

    public get Channel() {
        return this._suggChannel as TextBasedChannel;
    }

    public set Channel(channel: TextBasedChannel) {
        this._suggChannel = channel;
        this._enabled = true;
    }
}

export default new SuggestionsManager();