import dotenv from "dotenv";
import { BeatSaberSongInfo } from "./BeatSaberSongInfo";

dotenv.config();

const bot = new BeatSaberSongInfo();
bot.run(process.env["TOKEN"]!);