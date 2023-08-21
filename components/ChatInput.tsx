'use client';
import { db } from '@/firebase';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import ModelSelection from './ModelSelection';

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState('');

  // use swr to get model
  const { data: model } = useSWR('model', {
    fallbackData: 'text-davinci-003',
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt('');

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages'
      ),
      message
    );

    //toast notification for loading..
    const notification = toast.loading('chatGPT is thinking...');

    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // toast Notification for success
      toast.success('chatGpt has replied!', {
        id: notification,
      });
    });

    // toaster Notification
  };
  return (
    <div className="rounded-lg text-gray-800 bg-slate-200 text-sm border border-stone-500">
      <form onSubmit={sendMessage} className="flex p-3 space-x-4">
        <input
          disabled={!session}
          className="flex-1 bg-transparent focus: outline-none disabled:cursor-not-allowed disabled:text-gray-400"
          value={prompt}
          type="text"
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="type message here"
        />
        <button
          disabled={!prompt || !session}
          type="submit"
          className="bg-green-200 rounded font-bold px-5 py-2 hover:bg-green-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h4 w-4 -rotate-45" />
        </button>
      </form>

      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
