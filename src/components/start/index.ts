import { getMainKeyboard } from "@utils/keyboards";
import logger from "@utils/logger";
import { BaseScene as Scene, Stage } from "telegraf";
import { AppContext } from "types/telegraf-context";

const { leave } = Stage;
const start = new Scene<AppContext>("start") 

start.enter(async (ctx: AppContext) => {
  const { mainKeyboard } = getMainKeyboard(ctx);

  await ctx.reply(ctx.i18n.t("scenes.start.game-description"), mainKeyboard);
});

// start.command(ctx.i18n.t("keyboards.main-keyboard.start-game"))

// start.leave(async (ctx: AppContext) => {
//   const { mainKeyboard } = getMainKeyboard(ctx);
// });

// start.command("saveme", async (ctx) => {
//   await ctx.reply(ctx.i18n.t("scenes.start.welcome_back"));
// });

export default start;
