import { Dictionary } from "lodash";
import { Context } from "telegraf";
import { I18n } from "telegraf-i18n";
interface AppContext extends Context {
  i18n: I18n;
  scene: any;
  session: {
    language: "ru";
  } & Dictionary<any>;
  webhookReply: boolean;
}
