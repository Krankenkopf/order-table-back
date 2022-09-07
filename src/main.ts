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
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)
  app.enableCors(corsOptions)
  await app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
  })
}
bootstrap()
