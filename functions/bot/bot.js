const { Telegraf } = require("telegraf");
const startAction = require("./actions/start");
const aboutAction = require("./actions/about");
const supportAction = require("./actions/support");
const billMiddleware = require("./actions/billMiddleware");

const newBillAction = require("./actions/newBill");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  return startAction(ctx);
});

bot.command("about", (ctx) => {
  return aboutAction(ctx);
});

bot.command("support", (ctx) => {
  return supportAction(ctx);
});

bot.use(async (ctx, next) => {
  return billMiddleware(ctx, next);
});

bot.command("newbill", (ctx) => {
  return newBillAction(ctx);
});

exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.log(e);
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication!" };
  }
};
