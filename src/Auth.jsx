import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

// ponytail: fake auth — no backend, so the form data itself is the "session".
// Swap the body for a fetch() + real token when the API exists.
function AuthForm({ title, subtitle, action, altText, altLink, altTo, fields }) {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // password intentionally dropped — never store it client-side
    const { password: _password, ...user } = Object.fromEntries(
      new FormData(e.target),
    )
    sessionStorage.setItem('user', JSON.stringify(user))
    navigate('/dashboard')
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
        {
          name: 'mobile',
          label: 'Mobile number',
          type: 'tel',
          placeholder: '9876543210',
          autoComplete: 'tel',
          inputMode: 'numeric',
          pattern: '[6-9][0-9]{9}',
          title: '10-digit Indian mobile number',
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
