class RateLimitManager {
    private _rateLimited: boolean = false;

    public get rateLimited(): boolean {
        return this._rateLimited;
    }

    public set rateLimited(value: boolean) {
        this._rateLimited = value;
    }
}

export default new RateLimitManager();