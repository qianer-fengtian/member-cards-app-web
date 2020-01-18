import { User } from '@/models/user/User'
import uuidv4 from 'uuid/v4'

export default {
  newInstance(): User {
    return User.getInstance({
      id: uuidv4(),
      code: '',
      name: '',
      role: '',
      password: '',
      deleted: false,
      registeredDate: 0,
      modifiedDate: 0,
    })
  },
}