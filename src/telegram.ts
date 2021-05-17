import telegramConfig from "@configs/telegram";
import { Telegram } from "telegraf";

const telegram = new Telegram(telegramConfig.BOT_TOKEN, {});
export default telegram;
