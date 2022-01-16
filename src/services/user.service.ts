import axios from '@/libs/axios'

export class userService {
  /**
   * GET all users.
   */
  static async getAll() {
    const res = await axios.get('/users')
    if (res) return res.data

    return void 0
  }

  /**
   * GET user by uid.
   *
   * @param {number} uid
   */
  static async getById(uid: number) {
    const res = await axios.get(`/users/${uid}`)
    if (res) return res.data

    return void 0
  }
}
