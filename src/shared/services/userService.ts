import { app } from '../firebase/config'
import { getDatabase, ref, set, push, get, remove } from 'firebase/database'
import { UserType } from '../types'
import * as constants from '../config/constants'

class UserDataService {
  private static db = getDatabase(app)

  static async getUsers(): Promise<UserType[]> {
    try {
      const usersRef = ref(UserDataService.db, 'users')
      const dataSnapshot = await get(usersRef)
      const users: UserType[] = []

      if (dataSnapshot.exists()) {
        dataSnapshot.forEach(childSnapshot => {
          users.push({ id: childSnapshot.key, ...childSnapshot.val() } as UserType)
        })
        return users
      } else {
        throw new Error('No data')
      }
    } catch (error) {
      throw new Error('Error fetching users')
    }
  }

  static async createUser(user: UserType) {
    const newUserRef = push(ref(UserDataService.db, 'users'))
    return set(newUserRef, {
      ...user
    })
  }

  static async checkEmailUniqueness(email: string): Promise<boolean> {
    try {
      const usersRef = ref(UserDataService.db, 'users')
      const dataSnapshot = await get(usersRef)

      if (dataSnapshot.exists()) {
        // Проверяем каждого пользователя на уникальность email
        let isUnique = true
        dataSnapshot.forEach(childSnapshot => {
          const userData = childSnapshot.val()
          if (userData.email === email) {
            isUnique = false
          }
        })
        return isUnique
      } else {
        return true // Если база данных пуста, email считается уникальным
      }
    } catch (error) {
      console.error('Error checking email uniqueness:', error)
      throw new Error('Error checking email uniqueness')
    }
  }

  static async checkEmailUniquenessWithId(email: string, id: string): Promise<boolean> {
    try {
      const usersRef = ref(UserDataService.db, 'users')
      const dataSnapshot = await get(usersRef)

      if (dataSnapshot.exists()) {
        let isUnique = true
        dataSnapshot.forEach(childSnapshot => {
          const userData = childSnapshot.val()
          if (userData.email === email && childSnapshot.key !== id) {
            isUnique = false
          }
        })
        return isUnique
      } else {
        return true // Если база данных пуста, email считается уникальным
      }
    } catch (error) {
      console.error('Error checking email uniqueness:', error)
      throw new Error('Error checking email uniqueness')
    }
  }

  static async deleteUser(userId: string) {
    try {
      const userRef = ref(UserDataService.db, `users/${userId}`)
      await remove(userRef)
    } catch (error) {
      console.error('Error deleting user:', error)
      throw new Error('Error deleting user')
    }
  }

  static async deleteUsers(userIds: string[]) {
    try {
      const deletePromises: Promise<void>[] = []

      userIds.forEach(userId => {
        const userRef = ref(UserDataService.db, `users/${userId}`)
        deletePromises.push(remove(userRef))
      })

      await Promise.all(deletePromises)
    } catch (error) {
      console.error('Error deleting users:', error)
      throw new Error('Error deleting users')
    }
  }

  static async getUserById(userId: string): Promise<UserType | null> {
    try {
      const userRef = ref(UserDataService.db, `users/${userId}`)
      const dataSnapshot = await get(userRef)

      if (dataSnapshot.exists()) {
        const userData = dataSnapshot.val()
        return { id: userId, ...userData } as UserType
      } else {
        return null // Пользователь с таким id не найден
      }
    } catch (error) {
      console.error('Error fetching user by id:', error)
      throw new Error('Error fetching user by id')
    }
  }

  static async updateUserById(userId: string, newData: Partial<UserType>): Promise<void> {
    try {
      const userRef = ref(UserDataService.db, `users/${userId}`)
      await set(userRef, newData)
    } catch (error) {
      if (error?.message && error.message.includes('string greater than 10485760 utf8')) {
        throw new Error(constants.ERRORS_MSG.largeImageFile)
      }
      throw new Error(`Error updating user ${error?.message}`)
    }
  }
}

export default UserDataService
