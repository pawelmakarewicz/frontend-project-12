import Header from './Header';
import MessagesBox from './MessagesBox';
import MessageInput from './MessageInput';

export default function Chat() {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <MessagesBox />
      <MessageInput />
    </div>
  );
}
