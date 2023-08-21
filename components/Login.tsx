'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

function Login() {
  return (
    <div className=" h-screen flex flex-col bg-green-200 justify-center items-center text-center space-y-4">
      <div
        className=" animate-pulse flex flex-col justify-center items-center cursor-pointer"
        onClick={() => signIn('google')}
      >
        <Image src="/chatgptLogo.png" height={100} width={100} alt="gpt logo" />
        <p>Click Here To Sign in</p>
      </div>
    </div>
  );
}

export default Login;
