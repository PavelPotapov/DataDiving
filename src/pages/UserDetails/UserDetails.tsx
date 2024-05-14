import { UserProfile } from '@/entities/userProfile'
import { DeleteUsers } from '@/features/deleteUsers'
import { EditUser } from '@/features/editUser'
import { useGetUserByIdQuery } from '@/shared/api/usersApi'
import { Loader } from '@/shared/ui/loader'
import { useParams, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const container = <div></div>

function UserDetails() {
  const navigate = useNavigate()
  const { id } = useParams()

  if (!id) {
    navigate('/')
    return
  }

  const { data: userData, error: userError, isLoading } = useGetUserByIdQuery(id)
  if (userError) {
    navigate('/')
  }
  return (
    <div>
      {isLoading ? (
        <Loader label="Загрузка данных пользователя" />
      ) : (
        userData && (
          <UserProfile
            user={userData}
            deleteUsersSlot={
              userData && (
                <DeleteUsers
                  label={'Вы уверены, что хотите удалить пользователя?'}
                  text={'Удалить пользователя'}
                  users={[userData]}
                  usersId={userData.id ? [userData.id] : []}
                  onDelete={() => {
                    navigate('/')
                  }}
                />
              )
            }
            editUsersSlot={userData && <EditUser user={userData} />}
          />
        )
      )}
    </div>
  )
}

export default UserDetails
