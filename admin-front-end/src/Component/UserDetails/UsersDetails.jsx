import '../../assets/css/MainSection.css'
import UserDetailTable from './UserDetailTable'

const UsersDetails = () => {
    return (
        <main className="main-container">
            <div className="main-title">
                <p className="font-weight-bold">User List</p>
            </div>
            <UserDetailTable />
        </main>
    )
}

export default UsersDetails