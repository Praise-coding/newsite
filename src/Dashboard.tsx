import {useEffect, useState} from 'react'
import DashboardTable from './DashboardTable'
import "./bombo.css"
import {toast} from 'react-toastify'

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
        !allow ? <div style={{
            height: "100%",
            position: "absolute",
            top: "0px",
            left: "0px",
            backgroundColor: "black",
            width: "100%",
            display: "flex",
            paddingTop:"50px"
        }}>
            <form style={{width:"100%"}} onSubmit={(e) => submit(e)}>
                <div className="form-container">
                    <input className='input' placeholder="Enter password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <button className='butttt'>Submit</button>
                </div>
            </form>
        </div> : <DashboardTable/>

    )
}

export default Dashboard