'use client';
import { db } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';
import NewChat from './NewChat';

export default function Sidebar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session?.user?.email!, 'chats'),
        orderBy('createdAt', 'asc')
      )
  );

  return (
    <div className="h-screen flex flex-col p-3">
      <div className="flex-1">
        <div>
          <NewChat />

          <div className="hidden sm:inline">
            {/* select chat model here */}
            <ModelSelection />
          </div>

          {/* map throup chats here */}
          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="anime-pulse text-center text-gray-600">
                <p>Loading Chats...</p>
              </div>
            )}

            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>

      {/* map through chats here */}

      {/* use image here, click it to sign out */}
      {session && (
        // eslint-disable-next-line @next/next/no-img-element

        <div
          className="flex flex-col justify-center items-center cursor-pointer hover:opacity-60"
          onClick={() => signOut()}
        >
          <Image
            width={100}
            height={100}
            src={session.user?.image!}
            alt="profile pic"
            className="h-11 w-11 rounded-full mx-auto mb-2 "
          />
          <p className="text-xs"> Log Out</p>
        </div>
      )}
    </div>
  );
}
