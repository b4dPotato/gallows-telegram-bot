import { getMainKeyboard } from "@utils/keyboards";
import { BaseScene as Scene } from "telegraf";
import { AppContext } from "types/telegraf-context";
import { getProductsKeyboard } from "./keyboards";
import { getProducts } from "@services/product-service";
import { Markup } from "telegraf";

const getProductsScene = new Scene<AppContext>("get_products");

getProductsScene.enter(async (ctx: AppContext) => {
  ctx.session.creatingProduct = true;

  const userId = ctx.from!.id;
  const productsCollection = await getProducts(userId);

  await ctx.reply(
    ctx.i18n.t("scenes.get_products.your_products"),
    getProductsKeyboard(ctx, productsCollection).createGetProductsInlineHeaderKeyboard
  );

  await ctx.reply(
    ctx.i18n.t("scenes.get_products.lbl_description"),
    getProductsKeyboard(ctx, productsCollection).createGetProductsInlineBodyKeyboard
  );
});

getProductsScene.leave(async (ctx: AppContext) => {
  const { mainKeyboard } = getMainKeyboard(ctx);

  await ctx.reply(ctx.i18n.t("shared.what_next"), mainKeyboard);
});

export default getProductsScene;
