import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Fragment } from 'react';

// eslint-disable-next-line react/prop-types
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
        ? messages.map(({ body, username, id }) => (
          <Fragment key={id}>
            <Message text={body} username={username} />
          </Fragment>
        ))
        : null}
    </div>
  );
}
