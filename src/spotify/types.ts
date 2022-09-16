export type ExternalUrls = {
    spotify: string;
}

export type Album = {
    album_type: string;
    artists: any[];
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: any[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export type Artist = {
    external_urls: any[];
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export type ExternalIds = {
    isrc: string;
}

export type ExternalUrls2 = {
    spotify: string;
}

export type Items = {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrls2;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url?: any;
    track_number: number;
    type: string;
    uri: string;
}

export type SpotfiyRes = {
    tracks: {
        href: string;
        items: Items[];
        limit: number;
        next: string;
        offset: number;
        previous?: any;
        total: number
    }
}