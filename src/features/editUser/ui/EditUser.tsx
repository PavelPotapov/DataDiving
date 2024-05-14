import Modal from '@/shared/ui/modal/ui/Modal'
import React, { RefObject, MouseEventHandler, ChangeEvent } from 'react'
import { UserType } from '@/shared/types'
import { Tooltip } from '@/shared/ui/tooltip'
import { useUpdateUserMutation } from '@/shared/api/usersApi'
import styles from './EditUser.module.scss'
import CloseIcon from '@/shared/assets/icons/close.svg'
import { toast } from 'react-toastify'
import * as constants from '../config/constants'
import { Loader } from '@/shared/ui/loader'
import { useFormik, FormikHelpers } from 'formik'
import { basicSchema } from '../config/schemas'
import Input from '@/shared/ui/input/ui/Input'
import { TextArea } from '@/shared/ui/textArea'
import PenIcon from '@/shared/assets/icons/pen.svg'
import { loadImageAsBase64, loadImageFromBase64 } from '@/shared/lib'
import { isImageFile } from '../lib/index'

interface IUpdateUserProps {
  user: UserType
}

interface FormValues {
  email: string
  surname: string
  name: string
  middleName: string
  avatar: string
  about: string
}

export const EditUser = ({ user }: IUpdateUserProps) => {
  const [isActive, setIsActive] = React.useState(false)
  const [fileDataUrl, setFileDataUrl] = React.useState<string | null>(null)
  const [fileName, setFileName] = React.useState<string | null>(null)
  const [avatarImage, setAvatarImage] = React.useState<HTMLImageElement | null>(null)
  const inputFileHiddenRef: RefObject<HTMLInputElement> = React.useRef(null)
  const formRef: RefObject<HTMLFormElement> = React.useRef(null)
  const [updateUser, { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate }] =
    useUpdateUserMutation()

  const onClose = () => {
    setIsActive(false)
    setFileDataUrl(null)
    setFileName(null) //При закрытии модалки редактирования без сохранения убираем заполненный аватар и имя файла
  }

  const onOpen = () => {
    setIsActive(true)
  }

  const handleUpdateUser = async (userId: string, newUserData: UserType) => {
    try {
      const { data, error } = await updateUser({ userId, ...newUserData })
      if (error) {
        toast.error(String(error), constants.defaultToastOptions)
      } else {
        toast.success('Данные успешно обновлены', constants.defaultToastOptions)
        onClose()
      }
    } catch (e) {
      toast.error(e, constants.defaultToastOptions)
    }
  }

  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputFileHiddenRef.current) {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFile = e.target.files[0]
        if (isImageFile(selectedFile.name)) {
          const reader = new FileReader()
          reader.onload = () => {
            const dataUrl = reader.result as string
            setFileDataUrl(dataUrl)
            setFileName(selectedFile.name)
          }
          reader.onerror = e => {
            if (e.target) {
              const error = e.target.error
              const errorMessage = error instanceof DOMException ? error.message : String(error)
              setFileName(errorMessage)
            } else {
              setFileName(constants.STATUS_MESSAGES.errorUpload)
            }
          }
          reader.readAsDataURL(selectedFile)
        } else {
          setFileName(constants.STATUS_MESSAGES.errorFormat)
        }
      }
    }
  }

  const onUploadAvatar: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()
    if (inputFileHiddenRef.current) {
      inputFileHiddenRef.current?.click()
    }
  }

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    handleSubmit: formikSubmit
  } = useFormik<FormValues>({
    initialValues: {
      email: user.email,
      surname: user.surname,
      name: user.name,
      middleName: user.middlename ? user.middlename : '',
      avatar: user.avatar,
      about: user.about ? user.about : ''
    },
    validationSchema: basicSchema,
    validateOnBlur: true, // валидация при потере фокуса
    validateOnChange: false, // валидация только при отправке формы
    onSubmit: (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
      formikHelpers.setSubmitting(true) //блокируем submit
      if (user.id && fileDataUrl) {
        handleUpdateUser(user.id, {
          name: values.name,
          surname: values.surname,
          middlename: values.middleName,
          email: values.email,
          avatar: fileDataUrl,
          about: values.about
        })
      }
    }
  })

  React.useEffect(() => {
    //аватар не выбран
    if (!fileDataUrl) {
      setFileDataUrl(user.avatar)
    }
  }, [fileDataUrl])

  return (
    <>
      <div className={styles.updateBtn}>
        <Tooltip text="Изменить данные пользователя" title="Я заголовок" delay={750}>
          <button className="btn" onClick={onOpen}>
            Редактировать
          </button>
        </Tooltip>
      </div>
      <Modal isActive={isActive} onClose={onClose}>
        <form ref={formRef} onSubmit={formikSubmit} className={styles.content} autoComplete="off">
          <input ref={inputFileHiddenRef} type="file" onChange={onChangeAvatar} hidden></input>
          <div className={styles.avatar}>
            <img
              src={fileDataUrl ? fileDataUrl : constants.URL_FOR_AVATARS.cats}
              alt="Default Avatar"
            />
            <button className={styles.uploadAvatarBtn} onClick={onUploadAvatar}>
              <PenIcon width={'100%'} height={'100%'} color="black"></PenIcon>
            </button>
          </div>
          <span className={styles.fileName}>{fileName}</span>
          <Input
            type="text"
            placeholder="Введите фамилию"
            label="Фамилия"
            name="surname"
            customClass={errors.surname && touched.surname ? styles.errorValidate : ''}
            onBlur={handleBlur}
            onChange={handleChange}
            errorMsg={errors.surname && touched.surname ? errors.surname : ''}
            value={values.surname}
          />
          <Input
            type="text"
            placeholder="Введите имя"
            label="Имя"
            name="name"
            customClass={errors.name && touched.name ? styles.errorValidate : ''}
            onBlur={handleBlur}
            onChange={handleChange}
            errorMsg={errors.name && touched.name ? errors.name : ''}
            value={values.name}
          />
          <Input
            name="middleName"
            type="text"
            label="Отчество"
            placeholder="Введите отчество"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.middleName}
          />
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="Введите email"
            customClass={errors.email && touched.email ? styles.errorValidate : ''}
            onBlur={handleBlur}
            onChange={handleChange}
            errorMsg={errors.email && touched.email ? errors.email : ''}
            value={values.email}
          />
          <TextArea
            name="about"
            label="Расскажите о себе"
            placeholder="Расскажите о себе"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.about}
          ></TextArea>
          <button className="btn" type="submit">
            Обновить 🚀
          </button>
        </form>
        {isLoadingUpdate && <Loader label="Обновление данных..." />}
      </Modal>
    </>
  )
}
