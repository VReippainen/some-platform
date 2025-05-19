import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useRegister } from '../hooks/useAuth';
import { LabeledInput } from './LabeledInput/LabeledInput';
import { ErrorMessage } from './ErrorMessage';
import Button from './Button';

type Gender = 'male' | 'female' | 'other';

function SignUpForm() {
  const register = useRegister();

  const [username, setUsername] = useState<string>('');
  const [gender, setGender] = useState<Gender>('female');
  const [genderOther, setGenderOther] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLocalError(null);

    // Basic validation
    if (
      username.length &&
      email.length &&
      password.length &&
      confirmPassword.length &&
      gender.length
    ) {
      setLocalError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (password.length < 10) {
      setLocalError('Password must be at least 10 characters long');
      return;
    }

    try {
      // The register mutation handles navigation on success
      await register.mutateAsync({ username, email, password, gender, genderOther, bio });
    } catch (err) {
      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={(e) => void handleSubmit(e)}>
      <div className="space-y-4 rounded-md shadow-sm">
        <LabeledInput
          label="Username"
          id="username"
          type="text"
          autoComplete="username"
          required
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
        />
        <LabeledInput
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          placeholder="Email address"
        />
        <div>
          <label htmlFor="gender" className="sr-only">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            required
            value={gender}
            onChange={(e) => {
              setGender(e.target.value as Gender);
            }}
            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        {gender === 'other' && (
          <LabeledInput
            label="Gender Other"
            id="genderOther"
            type="text"
            required
            value={genderOther}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setGenderOther(e.target.value);
            }}
            placeholder="Gender Other"
          />
        )}
        <LabeledInput
          label="Bio"
          id="bio"
          type="text"
          required
          value={bio}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setBio(e.target.value);
          }}
          placeholder="Tell us about yourself"
        />
        <div>
          <LabeledInput
            label="Password"
            id="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
        </div>
        <div>
          <LabeledInput
            label="Confirm Password"
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Confirm Password"
          />
        </div>
      </div>

      {(register.error ?? localError) && (
        <ErrorMessage
          message={
            localError ??
            (register.error instanceof Error ? register.error.message : 'Registration failed')
          }
        />
      )}

      <div>
        <Button type="submit" disabled={register.isPending}>
          {register.isPending ? 'Creating account...' : 'Create account'}
        </Button>
      </div>
    </form>
  );
}

export default SignUpForm;
