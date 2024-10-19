import { Injectable } from '@nestjs/common';
import { getTelegramConfig } from './telegram.config';
import { Telegraf } from 'telegraf';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { Telegram } from './telegram.interface';
import { DistributorService } from 'src/distributor/distributor.service';

@Injectable()
export class TelegramService {
  bot: Telegraf;
  options: Telegram;

  constructor(
    private readonly distributorService: DistributorService,
  ) {
    this.options = getTelegramConfig();
    this.bot = new Telegraf(this.options.token);

    this.bot.on('callback_query', async (ctx) => {
        const callbackQuery = ctx.callbackQuery;
      
        if (callbackQuery && 'data' in callbackQuery) {
          const callbackData = callbackQuery.data;
      
          const message = callbackQuery.message;
      
          if (message && 'text' in message) {
            const distributorData = this.parseMessage(message.text);
            const userId = 'userId_from_context';
      
            if (callbackData === 'confirm_distributor') {
              await this.distributorService.handleConfirmation(distributorData, userId);
              await ctx.answerCbQuery('Дистриб\'ютора підтверджено!');
            } else if (callbackData === 'cancel_distributor') {
              await ctx.answerCbQuery('Дію скасовано.');
            }
          } else {
            console.error('Message does not contain text field');
            await ctx.answerCbQuery('Неможливо обробити повідомлення.');
          }
        } else {
          console.error('Callback query does not contain data field');
          await ctx.answerCbQuery('Невідома дія.');
        }
      });
    
  }

  async sendMessage(
    msg: string,
    options?: ExtraReplyMessage,
    chatId: string = this.options.chatId
  ) {
    await this.bot.telegram.sendMessage(chatId, msg, {
      parse_mode: 'HTML',
      ...options,
    });
  }

  async sendPhoto(
    photo: string,
    msg?: string,
    chatId: string = this.options.chatId
  ) {
    await this.bot.telegram.sendPhoto(chatId, photo, {
      caption: msg,
    });
  }

  parseMessage(message: string) {
    const lines = message.split('\n');
    const edrpou = lines.find(line => line.includes('EDRPOU')).split(': ')[1];
    const name = lines.find(line => line.includes('Distributor Name')).split(': ')[1];

    return { edrpou, name };
  }
}
