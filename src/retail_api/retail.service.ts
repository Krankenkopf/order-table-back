import { Injectable } from '@nestjs/common'
import { CrmType, Order, OrdersFilter, RetailPagination } from './types'
import axios, { AxiosInstance } from 'axios'
import { ConcurrencyManager } from 'axios-concurrency'
import { serialize } from '../tools'
import { plainToClass } from 'class-transformer'

@Injectable()
export class RetailService {
  private readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: `${process.env.RETAIL_URL}/api/v5`,
      timeout: 10000,
      headers: {},
    })

    this.axios.interceptors.request.use((config) => {
      config.url = config.url + `&apiKey=${process.env.RETAIL_KEY}`
      return config
    })
    this.axios.interceptors.response.use(
      (r) => {
        console.log("Result:", r.data)
        return r
      },
      (r) => {
        console.log("Error:", r.response.data)
        return r
      },
    )
  }

  async orders(filter?: OrdersFilter): Promise<{ orders: Order[], pagination: RetailPagination}> {
    const params = serialize(filter, '')
    const resp = await this.axios.get('/orders?' + params)
    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const orders = plainToClass(Order, resp.data.orders as Array<any>)
    const pagination: RetailPagination = resp.data.pagination
    
    return {orders, pagination}
  }

  async findOrder(id: string): Promise<Order | null> {
    const filter = {filter:{ids:[id]}}
    const params = serialize(filter, '')
    console.log(params)
    const resp = await this.axios.get('/orders?' + params)

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const orders = plainToClass(Order, resp.data.orders as Array<any>)

    return orders[0]
  }

  async orderStatuses(): Promise<CrmType[]> {
    return
  }

  async productStatuses(): Promise<CrmType[]> {
    return
  }

  async deliveryTypes(): Promise<CrmType[]> {
    return
  }
}
