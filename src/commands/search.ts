import BeatSaverAPI, { Errors } from "../BeatSaverAPI";
import type { SearchOptions } from "beatsaver-api/lib/api/search";
import { ActionRowBuilder, CommandInteraction, SelectMenuBuilder } from "discord.js";
import { Command } from "../Command";
import RateLimitManager from "../RateLimitManager";

export default class SearchCommand extends Command {
    constructor() {
        super("search", "Search for a song on BeatSaver with the specified parameters.");
    }

    public async execute(interaction: CommandInteraction) {
        if (RateLimitManager.rateLimited) {
            interaction.reply({ content: "The bot is currently rate limited. Please try again later.", ephemeral: true });
            return;
        }

        await interaction.deferReply();

        const query = interaction.options.get("query");
        const ranked = interaction.options.get("ranked");
        const curated = interaction.options.get("curated");
        const cinema = interaction.options.get("cinema");
        const chroma = interaction.options.get("chroma");
        const noodle = interaction.options.get("noodle");
        const mapping = interaction.options.get("mapping");
        const sort = interaction.options.get("sort");

        const sortValue = sort?.value as "Rating" | "Relevance" | "Latest" | undefined;

        const options: SearchOptions = {
            sortOrder: sortValue ?? "Relevance",
        };

        if (query) options.q = query.value as string;
        if (ranked) options.ranked = ranked.value as boolean;
        if (curated) options.curated = curated.value as boolean;
        if (cinema) options.cinema = cinema.value as boolean;
        if (chroma) options.chroma = chroma.value as boolean;
        if (noodle) options.noodle = noodle.value as boolean;
        if (mapping) options.me = mapping.value as boolean;

        let searchResult;

        try {
            searchResult = await BeatSaverAPI.searchMaps(options);
        } catch(e) {
            if (e instanceof Errors.RateLimitError) {
                interaction.editReply({ content: "Rate limit exceeded. Please try again later." });
                RateLimitManager.rateLimited = true;
                setTimeout(() => RateLimitManager.rateLimited = false, 10 * 1000);
            } else {
                interaction.editReply({ content: "An unknown error occurred." });
            }
            return;
        }

        if (searchResult.docs.length === 0) {
            await interaction.editReply("No results found.");
            return;
        }

        const results = searchResult.docs.slice(0, 10);

        const row = new ActionRowBuilder<SelectMenuBuilder>()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId(`search-results-${interaction.user.id}`)
                    .setPlaceholder("Select a result")
                    .setOptions(
                        results.map(result => ({
                            label: result.name,
                            value: result.id,
                            description: `Key: ${result.id}`,
                        }))
                    )
                    .setMinValues(1)
                    .setMaxValues(1),
            );

        await interaction.editReply({ content: "Select a result", components: [row] });
    }
}