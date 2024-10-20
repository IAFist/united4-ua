import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { getTelegramConfig } from './telegram.config';
import { Telegraf } from 'telegraf';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { Telegram } from './telegram.interface';
import { DistributorService } from 'src/distributor/distributor.service';
import axios from 'axios';
import {message} from 'telegraf/filters';

@Injectable()
export class TelegramService {
  bot: Telegraf;
  options: Telegram;

  constructor(
    @Inject(forwardRef(() => DistributorService))
    private readonly distributorService: DistributorService,
  ) {
    this.options = getTelegramConfig();
    this.bot = new Telegraf(this.options.token);

    this.bot.on('callback_query', async (ctx) => {
      const callbackQuery = ctx.callbackQuery;

      if (callbackQuery && 'data' in callbackQuery) {
        const callbackData = callbackQuery.data;
        const [action, userId] = callbackData.split('_');

        console.log(`Callback data: ${callbackData}, Action: ${action}, UserId: ${userId}`);

        const message = callbackQuery.message;

        if (message && 'text' in message) {
          const distributorData = this.parseMessage(message.text);

          try {
            if (action === 'confirmdistributor') {
              await this.distributorService.handleConfirmation(distributorData, userId);
              await ctx.answerCbQuery("Дистриб'ютора підтверджено!");
            } else if (action === 'canceldistributor') {
              await ctx.answerCbQuery('Дію скасовано.');
            } else {
              console.error('Unknown action:', action);
              await ctx.answerCbQuery('Невідома дія.');
            }
          } catch (error) {
            console.error('Error handling distributor action:', error);
            await ctx.answerCbQuery('Виникла помилка.');
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

    this.bot.launch();
  }

  async sendMessage(
    msg: string,
    options?: ExtraReplyMessage,
    chatId: string = this.options.chatId,
  ) {
    await this.bot.telegram.sendMessage(chatId, msg, {
      parse_mode: 'HTML',
      ...options,
    });
  }

  async sendPhoto(photoUrl: string, msg?: string, chatId: string = this.options.chatId) {
    try {
      const response = await axios.get(photoUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');

      await this.bot.telegram.sendPhoto(chatId, { source: buffer }, {caption: msg});
    } catch (error) {
      console.error('Error sending photo:', error);
    }
  }

  parseMessage(message: string) {
    const lines = message.split('\n');
    
    const edrpouLine = lines.find((line) => line.includes('EDRPOU'));
    const nameLine = lines.find((line) => line.includes('Distributor Name'));
  
    if (!edrpouLine || !nameLine) {
      throw new Error('Не вдалося знайти необхідні поля у повідомленні');
    }
  
    const edrpou = edrpouLine.split(': ')[1];
    const name = nameLine.split(': ')[1];
  
    if (!edrpou || !name) {
      throw new Error('Невірний формат даних у повідомленні');
    }
  
    return { edrpou, name };
  }
}
