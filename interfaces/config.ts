export interface IAppConfig {
  APP_LOG_DIR: string
}

export interface IMongoConfig {
  DB_HOST: string
  DB_PORT: number
  DB_USER: string | null
  DB_PASSWORD: string | null
  DB_NAME: string
}

export interface IRedisConfig {
  REDIS_HOST: string
  REDIS_PORT: number
}

export interface IConfig extends IAppConfig, IMongoConfig, IRedisConfig {
  relativeFilePath: (filePath: string) => string
}
