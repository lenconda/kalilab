import { IRouterContext } from 'koa-router'
import { KoaMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'after' })
export class ResponseHandler implements KoaMiddlewareInterface {

  async use (ctx: IRouterContext, next: (err?: any) => Promise<any>) {
    if (!(/download/g.test(ctx.req.url))) {
      ctx.body = {
        message: 'OK',
        status: 200,
        data: !!ctx.body ? ctx.body : {}
      }
      ctx.res.setHeader('Access-Control-Allow-Origin', 'https://kalilabs.lenconda.top')
      ctx.res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS')
      ctx.res.setHeader('Access-Control-Allow-Headers', 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization')
      ctx.status = 200
      next()
    }
  }

}
