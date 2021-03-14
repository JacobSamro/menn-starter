import { dbConnect } from '../config'

export class UserController {
  static getUsers(req, res) {
    dbConnect.query('SELECT * FROM Users', (error, result) => {
      if (error) {
        console.error(error)
        return res.json({
          success: false,
          message: 'Unable to get users',
        })
      }

      return res.json({
        success: true,
        users: result,
      })
    })
  }
}
