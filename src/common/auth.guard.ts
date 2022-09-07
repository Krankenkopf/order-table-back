import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import config from '../config'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const headers = ctx.getContext().req.headers

    try {
      const apiKey = headers['api-key']
      const configApiKey = config().apiKey

      if (!apiKey) throw new Error('API key is not provided')  
      if (configApiKey !== apiKey) throw new Error('API key is invalid')

      return true
    } catch (error) {
      throw new ForbiddenException({ message: error.message })
    }
  }
}
