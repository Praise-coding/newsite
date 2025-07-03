import { useEffect, useState } from 'react'
import DashboardTable from './DashboardTable'
import "./bombo.css"
import { toast } from 'react-toastify'
function Dashboard() {
    const [allow, setAllow] = useState(false)
    const [password, setPassword] = useState("")
    useEffect(() => {
        const status = localStorage.getItem("status")
        if (status == "Allow") {
            setAllow(true)
        }
    }, [])

    function submit(e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault()
        if (password == "password") {
            localStorage.setItem("status", "Allow")
            window.location.reload()
            return;
        }
        toast.error("Incorrect password")
    }
    return (
        !allow ? <form onSubmit={(e) => submit(e)}>
            <div className="form-container">
                <input className='input' placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='butttt'>Submit</button>
            </div>
        </form> : <DashboardTable />

    )
}

export default Dashboard