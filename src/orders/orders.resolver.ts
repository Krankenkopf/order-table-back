import { Args, Query, Resolver } from '@nestjs/graphql'
import { RetailService } from '../retail_api/retail.service'
import { OrdersResponse } from '../graphql'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/common/auth.guard'

@Resolver('Orders')
@UseGuards(AuthGuard)
export class OrdersResolver {
  constructor(private retailService: RetailService) {}

  @Query()
  async getOrders(@Args('page') page: number) {
    return this.retailService.orders({page})
  }

  @Query()
  async order(@Args('number') id: string) {
    return this.retailService.findOrder(id)
  }
}
