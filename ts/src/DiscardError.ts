
import { Context } from './Context'


class DiscardError extends Error {

  isDiscardError = true

  sdk = 'Discard'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  DiscardError
}

