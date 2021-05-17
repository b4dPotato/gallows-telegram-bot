import EventEmitter from "events";
import { AppContext } from "types/telegraf-context";

export const createMessageEmitter = () => {
  const emitter = new EventEmitter();

  return {
    // removeMessageListener: (event: string, listener: (...args: any[]) => any) => emitter.removeListener(event, listener),
    emitMessage: (message: AppContext): void =>
      void emitter.emit("message", message),
    onMessage: (ctx: AppContext, cb: (ctx: AppContext) => void) => {
      const userId = ctx.from!.id;
      emitter.on("message", function func(ctx: AppContext) {
        if (userId === ctx.from?.id) {
          cb(ctx);
          emitter.removeListener("message", func);
        }
      });
    },
  };
};
