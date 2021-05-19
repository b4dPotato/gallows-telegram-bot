import { AppContext } from 'types/telegraf-context'

async function сyrillicRequired(ctx: AppContext, text: string) {
  let сyrillicRegExp = /[\u0400-\u04FF]+/
  if (!сyrillicRegExp.test(text)) {
    await ctx.reply(ctx.i18n.t('validation.сyrillic-required'))
  }
}

async function onlyOneLetter(ctx: AppContext, text: string) {
  if (text.length > 1) {
    await ctx.reply(ctx.i18n.t('validation.one-letter'))
  }
}

export { сyrillicRequired, onlyOneLetter }
