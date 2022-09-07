import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

require('dotenv').config()

const corsOptions = {
  origin: (origin: any, callback: any) => {
    callback(null, true)
  },
  allowedHeaders: 'Content-Type, Accept, Observe, API-KEY, Authorization',
  methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  credentials: true,
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors(corsOptions)
  await app.listen(3000)
}
bootstrap()
