import '../../assets/css/MainSection.css'
import UserDetailTable from './UserDetailTable'
import PropType from 'prop-types';

const UsersDetails = (props) => {
    return (
        <main className="main-container">
            <div className="main-title">
                <p className="font-weight-bold"><strong>User List</strong></p>
            </div>
            <UserDetailTable BK_id={props.BK_id} />
        </main>
    )
}

UsersDetails.propTypes = {
    BK_id: PropType.string
}

export default UsersDetails