import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

// ponytail: no backend — submit just logs and returns to the login page.
// Swap the handler body for a fetch() when the API exists.
function AuthForm({ title, subtitle, action, altText, altLink, altTo, fields }) {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    console.log(title, Object.fromEntries(new FormData(e.target)))
    navigate('/')
  }

  return (
    <main className="auth">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-mark" aria-hidden="true">
          🐳
        </div>
        <h1>{title}</h1>
        <p className="auth-sub">{subtitle}</p>

        {fields.map(({ name, label, ...props }) => (
          <label key={name}>
            <span>{label}</span>
            <input name={name} {...props} />
          </label>
        ))}

        <button type="submit">{action}</button>

        <p className="auth-alt">
          {altText} <Link to={altTo}>{altLink}</Link>
        </p>
      </form>
    </main>
  )
}

const email = {
  name: 'email',
  label: 'Email',
  type: 'email',
  placeholder: 'you@example.com',
  autoComplete: 'email',
  required: true,
}

const password = {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: '••••••••',
  minLength: 8,
  required: true,
}

export function Login() {
  return (
    <AuthForm
      title="Welcome back"
      subtitle="Log in to your Docker Composer account"
      action="Log in"
      fields={[email, { ...password, autoComplete: 'current-password' }]}
      altText="New here?"
      altLink="Create an account"
      altTo="/register"
    />
  )
}

export function Register() {
  return (
    <AuthForm
      title="Create account"
      subtitle="Start composing your stacks in seconds"
      action="Create account"
      fields={[
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          placeholder: 'Harshit Gaur',
          autoComplete: 'name',
          required: true,
        },
        email,
        { ...password, autoComplete: 'new-password' },
      ]}
      altText="Already have an account?"
      altLink="Log in"
      altTo="/"
    />
  )
}
