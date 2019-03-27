import 'reflect-metadata'
import kcors from 'kcors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import { useKoaServer, useContainer, Action } from 'routing-controllers'
import { Container } from 'typedi'
import { validateToken, getUserIDByToken } from './utils/authorization'
import MongoDBConfig from '../config/mongodb'
import MongoDBConnection from './database/connection'

const app = new Koa()

app.use(async(ctx, next): Promise<any> => {
  try { await next() } catch (e) {
    ctx.status = e.status || e.httpCode || 403
    ctx.body = {
      status: ctx.status || 403,
      message: e.message,
      data: e.errors ? e.errors : {}
    }
  }
})

app.use(kcors())

app.use(bodyParser())

if (process.env.NODE_ENV.toLowerCase() === 'development') app.use(logger())

let port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000

new MongoDBConnection(MongoDBConfig).connect()

useContainer(Container)
useKoaServer(app, {
  routePrefix: '/api',
  controllers: [__dirname + '/controllers/*.{ts,js}'],
  middlewares: [__dirname + '/middlewares/*.{ts,js}'],
  authorizationChecker: async (action: Action) => validateToken(action.request.headers['authorization']),
  currentUserChecker: async (action: Action) => getUserIDByToken(action.request.headers['authorization']),
  defaults: {
    paramOptions: { required: true }
  },
  defaultErrorHandler: false,
  classTransformer: false,
}).listen(port)

export default app
