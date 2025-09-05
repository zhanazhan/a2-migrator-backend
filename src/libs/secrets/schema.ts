import * as Joi from 'joi';
import ms, { StringValue } from 'ms';

export const SecretsValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),

  MONGODB_SCRAPER_URI: Joi.string().uri().required(),
  POSTGRES_TARGET_URI: Joi.string().uri().required(),

  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),

  TELEGRAM_TOKEN: Joi.string().description('Telegram Bot Token').required(),
  TELEGRAM_CHANNEL_ID: Joi.string()
    .description('Channel ID that will be used to send message to')
    .required(),
  TELEGRAM_ENABLED: Joi.boolean().truthy('true').falsy('false').default(false),
});
