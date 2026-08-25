import { Navigate, useNavigate } from 'react-router-dom'
import './Dashboard.css'

const user = () => JSON.parse(sessionStorage.getItem('user') || 'null')

export default function Dashboard() {
  const navigate = useNavigate()
  const me = user()

  if (!me) return <Navigate to="/" replace />

  function logout() {
    sessionStorage.removeItem('user')
    navigate('/', { replace: true })
  }

  return (
    <>
      <header className="dash-bar">
        <span className="dash-brand">🐳 Docker Composer</span>
        <button type="button" onClick={logout}>
          Log out
        </button>
      </header>

      <main className="dash">
        <h1>Hey {me.name || me.email.split('@')[0]} 👋</h1>
        <p>You are logged in. Nothing to compose yet.</p>

        <dl className="dash-card">
          {Object.entries(me).map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </main>
    </>
  )
}
