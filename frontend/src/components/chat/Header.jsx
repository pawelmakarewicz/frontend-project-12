import { useSelector } from 'react-redux';

function describeAmount(number) {
  if (number === 0) {
    return 'сообщейний';
  }
  if (number === 1) {
    return 'сообщейние';
  }
  if (number >= 2 && number <= 4) {
    return 'сообщейния';
  }
  return 'сообщейний';
}

export default function Header() {
  const messagesNumber = useSelector((state) => {
    if (!state.chat.appData.messages || !state.chat.appData.currentChannelId) {
      return 0;
    }
    return state.chat.appData.messages[state.chat.appData.currentChannelId].length;
  });
  const chanelName = useSelector((state) => {
    if (!state.chat.appData.messages || !state.chat.appData.currentChannelId) {
      return null;
    }
    return state.chat.appData.channels
      .find((chanel) => chanel.id === state.chat.appData.currentChannelId)
      .name;
  });
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {' '}
          {chanelName}
        </b>
      </p>
      <span className="text-muted">
        {messagesNumber}
        {' '}
        {describeAmount(messagesNumber)}
      </span>
    </div>
  );
}
