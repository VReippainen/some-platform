import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLogin } from '../hooks/useAuth';
import { LabeledInput } from './LabeledInput/LabeledInput';
import Button from './Button';
import { ErrorMessage } from './ErrorMessage';

function LoginForm() {
  const login = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!username || !password) {
      setLocalError('Please fill in all fields');
      return;
    }
    try {
      await login.mutateAsync({ username, password });
    } catch (err) {
      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError('Login failed. Please try again.');
      }
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={(e) => void handleSubmit(e)}>
      <div className="space-y-4 rounded-md shadow-sm">
        <LabeledInput
          label="Username"
          id="username"
          type="username"
          autoComplete="username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
        />
        <LabeledInput
          label="Password"
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
      </div>
      {(login.error ?? localError) && (
        <ErrorMessage
          message={
            localError ?? (login.error instanceof Error ? login.error.message : 'Login failed')
          }
        />
      )}
      <div>
        <Button type="submit" disabled={login.isPending}>
          {login.isPending ? 'Signing in...' : 'Sign in'}
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
