import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCatalogues } from '../slices/chatSlice';

export default function ChatPage() {
  const channels = useSelector((state) => state.chat.channels);
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCatalogues());
  }, []);
  return (
    <div>
      To do ChatPage
      {JSON.stringify(channels)}
      {currentChannelId}
      {JSON.stringify(messages)}
    </div>
  );
}
