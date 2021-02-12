let counter = 0

export class Middleware {
  static reqType(req, res, next) {
    counter++
    console.log('hits', counter)
    next()
  }
}
