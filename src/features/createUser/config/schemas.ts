import * as yup from 'yup'
import * as constants from './constants'

export const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email(constants.STATUS_MESSAGES.emptyInput)
    .required(constants.STATUS_MESSAGES.emptyInput),
  surname: yup.string().required(constants.STATUS_MESSAGES.emptyInput),
  name: yup.string().required(constants.STATUS_MESSAGES.emptyInput),
  middleName: yup.string(),
  about: yup.string()
})
