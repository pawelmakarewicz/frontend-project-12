import { useSelector } from 'react-redux/es/hooks/useSelector';

function Message({ text, username }) {
  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      :
      {' '}
      { text }
    </div>
  );
}

export default function MessagesBox() {
  const messages = useSelector((state) => {
    if (!state.chat.appData.messages || !state.chat.appData.currentChannelId) {
      return null;
    }
    return state.chat.appData.messages[state.chat.appData.currentChannelId];
  });
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      { messages
        ? messages.map(({ body, username, id }) => <Message text={body} username={username} key={id} />)
        : null}
    </div>
  );
}
