import '../../assets/css/MainSection.css'
import BoxKeeperDetailTable from './BoxKeeperDetailTable'

const BoxKeeperDetail = () => {
    return (
        <main className="main-container">
            <div className="main-title">
                <p className="font-weight-bold"><strong>Box Keepers List</strong></p>
            </div>
            <BoxKeeperDetailTable />
        </main>
    )
}

export default BoxKeeperDetail