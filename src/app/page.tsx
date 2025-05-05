'use client';

import LoginLayout from './components/login/LoginLayout';
import LogoHeader from './components/login/LogoHeader';
import LoginForm from './components/login/LoginForm';

export default function HomePage() {
  return (
    <LoginLayout>
      <LogoHeader />
      <LoginForm />
    </LoginLayout>
  );
}
