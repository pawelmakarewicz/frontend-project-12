import { updateAppDataMessages, updateAppDataAfterSendingMessage } from './chatSlice';

const socketMiddleware = (socketClient) => (params) => (next) => (action) => {
  const { dispatch, getState } = params;
  const { type } = action;
  const appData = getState();
  const { currentMessage, currentChannelId } = appData.chat.appData;
  switch (type) {
    case 'socket/connect': {
      socketClient.connect();
      socketClient.socket.on('newMessage', (payload) => {
        dispatch(updateAppDataMessages(payload));
      });
      break;
    }
    case 'socket/sendNewMessage':
      socketClient.socket.emit('newMessage', { body: currentMessage, channelId: currentChannelId, username: 'admin' }, () => { dispatch(updateAppDataAfterSendingMessage()); });
      break;
    case 'socket/disconnect':
      socketClient.disconnect();
      break;
    default:
      break;
  }
  return next(action);
};

export default socketMiddleware;
