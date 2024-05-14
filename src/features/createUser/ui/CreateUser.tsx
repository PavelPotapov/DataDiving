import Modal from '@/shared/ui/modal/ui/Modal'
import Input from '@/shared/ui/input/ui/Input'
import React, { RefObject, MouseEventHandler, ChangeEvent } from 'react'
import styles from './CreateUser.module.scss'
import { isImageFile } from '../lib/index'
import * as constants from '../config/constants'
import { useFormik, FormikHelpers } from 'formik'
import { basicSchema } from '../config/schemas'
import { TextArea } from '@/shared/ui/textArea'
import PenIcon from '@/shared/assets/icons/pen.svg'
import CloseIcon from '@/shared/assets/icons/close.svg'
import { loadImageAsBase64 } from '@/shared/lib'
import { toast } from 'react-toastify'
import { UserType } from '@/shared/types'
import { Loader } from '@/shared/ui/loader'
import { useAddUserMutation } from '@/shared/api/usersApi'

interface FormValues {
  email: string
  surname: string
  name: string
  middleName: string
  // avatar: string
  about: string
}

const CreateUser = () => {
  const [isActive, setIsActive] = React.useState(false)
  const [fileDataUrl, setFileDataUrl] = React.useState<string | null>(null)
  const [fileName, setFileName] = React.useState<string | null>(null)
  const [addUser, { isLoading, isError, error }] = useAddUserMutation()
  const inputFileHiddenRef: RefObject<HTMLInputElement> = React.useRef(null)
  const formRef: RefObject<HTMLFormElement> = React.useRef(null)

  const onClose = () => {
    setIsActive(false)
  }

  const onOpen = () => {
    setIsActive(true)
  }

  const createUser = () => {
    ;(async () => {
      try {
        if (fileDataUrl) {
          const newUser: UserType = {
            avatar: fileDataUrl,
            name: values.name,
            email: values.email,
            surname: values.surname,
            middlename: values.middleName,
            about: values.about
          }
          const { data, error } = await addUser(newUser)
          if (error) {
            toast.error(String(error), constants.defaultToastOptions)
            return
          }
          toast.success('Пользователь успешно создан', constants.defaultToastOptions)
          setFileDataUrl(null)
          onClose()
        }
      } catch (err) {
        toast.error('Ошибка создания пользователя', constants.defaultToastOptions)
      }
    })()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    formikSubmit(e)
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
      email: '',
      surname: '',
      name: '',
      middleName: '',
      // avatar: '',
      about: ''
    },
    validationSchema: basicSchema,
    validateOnBlur: true, // валидация при потере фокуса
    validateOnChange: false, // валидация только при отправке формы
    onSubmit: async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
      formikHelpers.setSubmitting(true)
      await createUser()
      //formikHelpers.resetForm()
      formRef.current?.reset()
    }
  })

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

  React.useEffect(() => {
    //аватар не выбран
    if (!fileDataUrl) {
      loadImageAsBase64(constants.URL_FOR_AVATARS.cats).then(res => {
        setFileDataUrl(res)
      })
    }
  }, [fileDataUrl])

  return (
    <>
      <div className={styles.createUserBtn}>
        <button className="btn" onClick={onOpen}>
          Создать пользователя
        </button>
      </div>
      <Modal isActive={isActive} onClose={onClose}>
        <button className={styles.closeBtn} onClick={onClose}>
          <CloseIcon width={'100%'} height={'100%'} color="black" />
        </button>
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
          />
          <Input
            name="middleName"
            type="text"
            label="Отчество"
            placeholder="Введите отчество"
            onBlur={handleBlur}
            onChange={handleChange}
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
          />
          <TextArea
            name="about"
            label="Расскажите о себе"
            placeholder="Расскажите о себе"
            onBlur={handleBlur}
            onChange={handleChange}
          ></TextArea>
          <button className="btn" type="submit">
            Создать 🚀
          </button>
        </form>
        {isLoading && <Loader label="Создание пользователя" />}
      </Modal>
    </>
  )
}

export default CreateUser
