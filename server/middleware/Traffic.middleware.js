let counter = 0

export class TrafficMiddleware {
  static requestCounter(req, res, next) {
    counter++
    console.log('hits', counter)
    next()
  }
}
