export const AUTH_NAME = 'access_token';

export interface AppConfig {
  PORT: number;

  MONGODB_SCRAPER_URI: string;

  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_SCHEMA: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;

  TELEGRAM_TOKEN: string;
  TELEGRAM_CHANNEL_ID: string;
  TELEGRAM_ENABLED: boolean;
}
