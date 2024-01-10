import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.scoped.css";

function Admin() {
  const [issues, setIssues] = useState([]);
  const getdata = () => {
    axios
      .post("http://localhost:3200/adminsupport")
      .then((res) => {
        setIssues(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  getdata();
  useEffect(() => {
    getdata();
  }, []);
  const handleStatusChange = (event, id, newStatus) => {
    event.preventDefault();
    const updatedIssues = issues.map((issue) =>
      // issue.id === id ? { ...issue, status: newStatus } : issue
      {
        if (issue.id === id) {
          axios.post("http://localhost:3200/changestatus", {
            status: newStatus,
            id: id,
          });
        }
      }
    );
    getdata();
  };

  return (
    <div className="admin-container">
      <h2>Administrator</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Problem</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue?.id}>
              <td>{issue?.id}</td>
              <td>{issue?.Sender}</td>
              <td>{issue?.Contact}</td>
              <td>{issue?.Problem}</td>
              <td>
                <select
                  value={issue?.Status}
                  onChange={(e) =>
                    handleStatusChange(e, issue?.id, e.target.value)
                  }
                >
                  <option value="Finish">Finish</option>
                  <option value="Not Finish">Not Finish</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
