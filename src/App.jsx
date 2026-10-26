import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data.");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="container">
      <header>
        <p className="subtitle">PRAKTIK REACT JS</p>
        <h1>Di suruh di ubah sama alip</h1>
        <p>
          Data pengguna yang diambil secara langsung
          dari REST API.
        </p>
      </header>

      <section className="content">
        <div className="section-header">
          <h2>Data Pengguna</h2>

          <button
            onClick={fetchUsers}
            disabled={loading}
          >
            {loading ? "Memuat..." : "Muat Ulang"}
          </button>
        </div>

        {loading && (
          <p className="message">
            Sedang mengambil data...
          </p>
        )}

        {!loading && error && (
          <div className="error">
            <p>{error}</p>
            <button onClick={fetchUsers}>
              Coba Lagi
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="summary">
              Total pengguna: {users.length}
            </p>

            <div className="user-grid">
              {users.map((user) => (
                <article
                  className="user-card"
                  key={user.id}
                >
                  <div className="avatar">
                    {user.name.charAt(0)}
                  </div>

                  <h3>{user.name}</h3>
                  <p>@{user.username}</p>

                  <div className="details">
                    <p>
                      <strong>Email</strong>
                      <span>{user.email}</span>
                    </p>

                    <p>
                      <strong>Perusahaan</strong>
                      <span>{user.company.name}</span>
                    </p>

                    <p>
                      <strong>Kota</strong>
                      <span>{user.address.city}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      <footer>Jobsheet CSR — Kelompok 1</footer>
    </main>
  );
}

export default App;
