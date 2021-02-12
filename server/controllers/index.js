export class Controller {
  static sendFruits(req, res) {
    const fruits = ['apple', 'mango', 'pineapple']
    return res.json({
      fruits,
    })
  }
}
