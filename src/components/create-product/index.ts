import { getMainKeyboard } from "@utils/keyboards";
import { createMessageEmitter } from "@utils/message";
import async from "async";
import { BaseScene as Scene, Stage } from "telegraf";
import { match } from "telegraf-i18n";
import { AppContext } from "types/telegraf-context";

import { createProduct } from "@services/product-service";
import asyncWrapper from "@utils/error-handler";
import { IncomingMessage } from "telegraf/typings/telegram-types";
import { getCreateProductKeyboard } from "./keyboards";
import { LANGUAGE_CURRENCIES } from "@constants/index";

const { leave } = Stage;
const createProductScene = new Scene<AppContext>("create_product");

const { emitMessage, onMessage } = createMessageEmitter();

createProductScene.enter(async (ctx: AppContext) => {
  const userId = ctx.from!.id;
  ctx.session.creatingProduct = true;
  await ctx.reply(ctx.i18n.t("scenes.create_product.enter_name"));
  onMessage(ctx, async (productNameCtx) => {
    await ctx.reply(ctx.i18n.t("scenes.create_product.enter_price"));
    onMessage(ctx, async (priceCtx) => {
      await ctx.reply(
        ctx.i18n.t("scenes.create_product.enter_product"),
        getCreateProductKeyboard(ctx).createProductKeyboard
      );
      const messages: IncomingMessage[] = [];
      async.doWhilst<AppContext>(
        (next) => {
          onMessage(ctx, (productDataCtx) => {
            if (productDataCtx.session.creatingProduct) {
              messages.push(productDataCtx.message!);
            }
            next(undefined, productDataCtx);
          });
        },
        (productDataCtx: AppContext, test: any): any => {
          test(undefined, productDataCtx.session.creatingProduct);
        },
        async (err) => {
          if (err) {
            console.error(err);
          }
          await createProduct({
            userId: userId.toString(),
            name: productNameCtx.message!.text!,
            price: +priceCtx.message!.text!,
            currency: LANGUAGE_CURRENCIES[ctx.session.language],
            messages: messages,
          });
        }
      );
    });
  });
});

createProductScene.leave(async (ctx: AppContext) => {
  const { mainKeyboard } = getMainKeyboard(ctx);
  await ctx.reply(ctx.i18n.t("shared.what_next"), mainKeyboard);
});

createProductScene.hears(
  match("keyboards.create_product_keyboard.done"),
  asyncWrapper(async (ctx: AppContext) => {
    ctx.session.creatingProduct = false;
    emitMessage(ctx);
    await ctx.reply(ctx.i18n.t("scenes.create_product.created"));
  }),
  leave()
);

createProductScene.on("message", emitMessage);

export default createProductScene;
