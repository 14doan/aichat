import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isChatGPT = message.user.name === 'chatGPT';
  return (
    <div className={`py-3 ${isChatGPT && ' bg-slate-100'}`}>
      <div className="flex space-x-4 px-10 max-w-2xl mx-auto">
        <Image
          className="h-8 w-8"
          src={message.user.avatar}
          height={100}
          width={100}
          alt="avatar"
        />
        <p className="text-sm pt-1">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;

//translate:

// grab the rules-object from firestore
// called DocumentData,
// inside it is an index signature,
// a way of addressing future properties,
// one where names must be string
// but value can be any
// hence {[fields:string]:any;}

// grab Image element to use later

// specify the structure of props expected
// must be the same as DocumentData
// call this Props

// now build the actions of message itself
// destructure, specifically grab message
// from Props to be used inside this code
