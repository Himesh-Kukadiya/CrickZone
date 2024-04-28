import '../../assets/css/MainSection.css'
import BoxDetailTable from './BoxDetailTable'

const BoxDetail = () => {
    return (
        <main className="main-container">
            <div className="main-title">
                <p className="font-weight-bold">Box List</p>
            </div>
            <BoxDetailTable />
        </main>
    )
}

export default BoxDetail