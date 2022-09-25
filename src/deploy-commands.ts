import { Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest"
require("dotenv").config();

const token = process.env["TOKEN"];
const clientId = process.env["CLIENT_ID"];
const guildId = process.env["COMMANDS_GUILD_ID"];

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Check the bot ping'),

	new SlashCommandBuilder().setName('invite').setDescription('Get the invite link for the bot'),

	new SlashCommandBuilder().setName('info').setDescription('Get info about the bot'),

	new SlashCommandBuilder().setName('help').setDescription('Get help on how to use the bot'),

	new SlashCommandBuilder().setName('copyright').setDescription('Get the copyright notice for this bot'),

	new SlashCommandBuilder().setName('bsr').setDescription('Get info about a song on BeatSaver using the song key')
		.addStringOption(option => option.setName('key').setDescription('The song key').setRequired(true)),

	new SlashCommandBuilder().setName('hash').setDescription('Get info about a song on BeatSaver using the song hash')
		.addStringOption(option => option.setName('hash').setDescription('The song hash').setRequired(true)),

	new SlashCommandBuilder().setName('suggest').setDescription('Suggest a feature for the bot.')
		.addStringOption(option => option.setName('suggestion').setDescription('The suggestion').setRequired(true)),

	new SlashCommandBuilder().setName('search').setDescription('Search for a song on BeatSaver with the specified parameters')
		.addStringOption(option => option.setName('query').setDescription('The search query'))
		.addBooleanOption(option => option.setName('ranked').setDescription('Is the map ranked? (don\'t include this to disable this filtering parameter)'))
		.addBooleanOption(option => option.setName('curated').setDescription('Is the map curated? (don\'t include this to disable this filtering parameter)'))
		.addBooleanOption(option => option.setName('cinema').setDescription('Does the map suggest Cinema? (don\'t include this to disable this filtering parameter)'))
		.addBooleanOption(option => option.setName('chroma').setDescription('Does the map suggest/require Chroma? (don\'t include this to disable this filtering parameter)'))
		.addBooleanOption(option => option.setName('noodle').setDescription('Does the map require Noodle Extensions? (don\'t include this to disable this filtering parameter)'))
		.addBooleanOption(option => option.setName('mapping').setDescription('Does the map require Mapping Extensions? (don\'t include this to disable this filtering parameter)'))
		.addStringOption(option => 
			option.setName('sort').setDescription('The sort order of the results')
				.addChoices(
					{ name: 'Latest', value: 'Latest' },
					{ name: 'Relevance', value: 'Relevance' },
					{ name: 'Rating', value: 'Rating' },
				)
		),

	new SlashCommandBuilder().setName('stats').setDescription('Get statistics about the bot'),

].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token!);

if (guildId) {
	rest.put(Routes.applicationGuildCommands(clientId!, guildId), { body: commands })
		.then((data: any) => console.log(`Successfully registered ${data.length} application commands on guild ${guildId}.`))
		.catch(console.error);
} else {
	rest.put(Routes.applicationCommands(clientId!), { body: commands })
		.then((data: any) => console.log(`Successfully registered ${data.length} global application commands.`))
		.catch(console.error);
}