'use client';
import { db } from '@/firebase';
import { PlusIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NewChat() {
  const { data: session } = useSession();
  const router = useRouter();

  // const createNewChat = async () => {
  //   const doc = await addDoc(
  //     collection(db, 'users', session?.user?.email!, 'chats'),
  //     {
  //       userId: session?.user?.email!,
  //       createdAt: serverTimestamp(),
  //     }
  //   );

  //   router.push(`/chat/${doc.id}`);
  // };

  try {
    // Get a reference to the user's chats subcollection
    const userChatsRef = collection(db, 'users', session?.user?.email!, 'chats');

    // Create a new chat document inside the user's chats subcollection
    const chatDocRef = await addDoc(userChatsRef, {
      // Add chat data here
      createdAt: serverTimestamp(),
      participants: [session.user.email], // Include the current user as a participant
    });

    // Redirect to the newly created chat using its document ID
    router.push(`/chat/${chatDocRef.id}`);
  } catch (error) {
    console.error('Error creating new chat:', error);
  }
};

  return (
    <div onClick={createNewChat} className="border border-gray-200 chatRow">
      <PlusIcon className="h-4 w-4" />
      <p>New Chat</p>
    </div>
  );
}
