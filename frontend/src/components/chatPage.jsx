import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCatalogues } from '../slices/chatSlice';
import socket from '../socket';

export default function ChatPage() {
  const channels = useSelector((state) => state.chat.channels);
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);
  console.log('state123');

  useEffect(() => {
    // dispatch(getCatalogues);
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div>
      To do ChatPage
    </div>
  );
}
