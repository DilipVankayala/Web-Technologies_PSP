import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState([]);       // Fetched data
  const [loading, setLoading] = useState(true); // Loader state
  const [error, setError] = useState(null);     // Error state

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users") // sample API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">User Data</h2>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p>Loading data...</p>
        </div>
      )}

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        {data.map((user) => (
          <div key={user.id} className="col-md-4 mb-4">
            <div className="card shadow-lg h-100">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {user.email}
                  <br />
                  <strong>Phone:</strong> {user.phone}
                  <br />
                  <strong>Company:</strong> {user.company.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;