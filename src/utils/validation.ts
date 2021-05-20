import { AppContext } from 'types/telegraf-context'

async function сyrillicRequired(ctx: AppContext, text: string) {
  let сyrillicRegExp = /[\u0400-\u04FF]+/
  let valid = сyrillicRegExp.test(text)
  if (!valid) {
    await ctx.reply(ctx.i18n.t('validation.сyrillic-required'))
  }
  return valid
}

async function onlyOneLetter(ctx: AppContext, text: string) {
  let valid = text.length === 1
  if (!valid) {
    await ctx.reply(ctx.i18n.t('validation.one-letter'))
  }
  return valid
}

export { сyrillicRequired, onlyOneLetter }
