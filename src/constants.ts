export function getInviteLink(clientId: string = process.env["CLIENT_ID"]!, permissions: string = process.env["PERMISSIONS"] ?? "0") {
    return `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot%20applications.commands`;
}

export function getCreatorInfo() {
    return {
        id: process.env["CREATOR_ID"] ?? "456794789656920065",
        name: process.env["CREATOR_NAME"] ?? "rui2015",
        tag: process.env["CREATOR_TAG"] ?? "rui2015#0303",
        website: process.env["CREATOR_WEBSITE"] ?? "https://rui2015.me",
        patreon: "https://patreon.com/" + (process.env["CREATOR_PATREON_USERNAME"] ?? "rui2015"),
        kofi: "https://ko-fi.com/" + (process.env["CREATOR_KOFI_USERNAME"] ?? "rui2015"),
        paypal: "https://paypal.me/" + (process.env["CREATOR_PAYPAL_USERNAME"] ?? "rui2015"),
        supportServer: process.env["SUPPORT_SERVER"] ?? "https://discord.gg/qjKhqA3",
    };
}