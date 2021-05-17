import { Context, Extra, Markup } from "telegraf";
import { AppContext } from "types/telegraf-context";
import { createLanguageChange } from "./actions";

export function getLanguageKeyboard() {
  return Extra.HTML().markup((m: Markup) =>
    m.inlineKeyboard(
      [
        m.callbackButton(`English`, createLanguageChange("en"), false),
        m.callbackButton(`Русский`, createLanguageChange("ru"), false),
      ],
      {}
    )
  );
}

export function getAccountConfirmKeyboard(ctx: AppContext) {
  return Extra.HTML().markup((m: Markup) =>
    m.inlineKeyboard(
      [
        m.callbackButton(
          ctx.i18n.t("scenes.start.lets_go"),
          JSON.stringify({ a: "confirmAccount" }),
          false
        ),
      ],
      {}
    )
  );
}
