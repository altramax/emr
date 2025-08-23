'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useUserStore } from '@/src/store/user-store';
import SunImage from '@/src/components/assets/image/day.jpg';
import MoonImage from '@/src/components/assets/image/moon.jpg';

export default function WelcomeModal() {
  const [fadeOut, setFadeOut] = useState(false);
  const state = useUserStore((state) => state);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    if (state.isLoggedIn) return;
    const timer = setTimeout(() => {
      setFadeOut(true); //
      setTimeout(() => state.setIsLoggedIn(true), 1000);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (state.isLoggedIn || state.user === null) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 
        bg-gradient-to-b from-blue-100/60 to-blue-400/40 backdrop-blur-sm 
        transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <Image
        src={getGreeting() !== 'Good Evening' ? SunImage : MoonImage}
        alt="Cloud"
        width={700}
        height={700}
        priority
        className="drop-shadow-2xl rounded-lg"
      />

      <div
        className={`mt-[70px] absolute h-full inset-0 flex flex-col items-center justify-center px-8 ${getGreeting() !== 'Good Evening' ? 'text-gray-900' : 'text-white ml-10'} tracking-wide`}
      >
        <h2 className="text-4xl font-bold mb-3">{getGreeting()}</h2>

        <p className="text-4xl font-bold ">
          {`${state.user?.role?.toUpperCase()} ${state.user?.first_name} ${state.user?.last_name}`}
        </p>

        <p className="text-lg italic mt-[100px]">“Caring for patients, one step at a time.”</p>
      </div>
    </div>
  );
}
