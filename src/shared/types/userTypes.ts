export type UserType = {
  id?: string //так как работаю с firebase, для создания пользователя мне id не нужен, он будет генерироваться на стороне firebase, но нужен при получении данных
  avatar: string
  surname: string
  name: string
  middlename?: string
  email: string
  about?: string
}
