const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
require("dotenv").config();

const token = process.env["TOKEN"];
const clientId = process.env["CLIENT_ID"];
const guildId = "";

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Check the bot ping'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data: any) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);