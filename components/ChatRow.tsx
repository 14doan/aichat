import { db } from '@/firebase';
import {
  ChatBubbleLeftRightIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const router = useRouter();

  const [messages] = useCollection(
    collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
  );

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname, id]);

  const deleteChat = async () => {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
    router.replace('/');
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && 'bg-slate-100'}`}
    >
      <ChatBubbleLeftRightIcon className="h-4 w-4" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {messages?.docs[messages?.docs.length - 1]?.data().text || 'New Chat'}
      </p>
      <XCircleIcon
        onClick={deleteChat}
        className="h-4 w-4 text-green-800 hover:text-red-800"
      />
    </Link>
  );
}

export default ChatRow;
