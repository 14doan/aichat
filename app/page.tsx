import {
  CogIcon,
  ExclamationCircleIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-green-950 h-screen">
      <h1 className=" text-5xl font-bold mb-16">Ai Chat</h1>
      <div className="flex space-x-2 px-2">
        <div>
          <div className="flex flex-col justify-center items-center mb-6 space-y-2">
            <LightBulbIcon className="h-6 w-6" />
            <h5 className=" text-sm">Examples</h5>
          </div>
          <div className="space-y-2">
            <p className="introText"> "Explain what nextJs is "</p>
            <p className="introText">
              "What's the difference between coriander and parsley?"
            </p>
            <p className="introText">"How loud is the roar of a lion?"</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col justify-center items-center mb-6 space-y-2">
            <CogIcon className="h-6 w-6" />
            <h5 className=" text-sm">Capabilities</h5>
          </div>
          <div className="space-y-2">
            <p className="introText"> Choose ChatGpt Model to use</p>
            <p className="introText">
              All messages from chats are stored via FireBase
            </p>
            <p className="introText">Notified when Ai is thinking</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col justify-center items-center mb-6 space-y-2">
            <ExclamationCircleIcon className="h-6 w-6" />
            <h5 className=" text-sm">Limitations</h5>
          </div>
          <div className="space-y-2">
            <p className="introText"> Not all information are correct</p>
            <p className="introText">
              May include harmful instructions and biased content
            </p>
            <p className="introText">Limited knowledge of world after 2021</p>
          </div>
        </div>
      </div>
    </div>
  );
}
