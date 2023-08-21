import { adminDb } from '@/firebaseAdmin';
import query from '@/lib/queryApi';
import admin from 'firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: 'Please give prompt!' });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: 'Please give valid chat Id!' });
  }

  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response || 'ChatGPT was unable to find an answer',
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'chatGPT',
      avatar: '/chatgptLogo.png',
    },
  };

  await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message);

  res.status(200).json({ answer: message.text });
}
