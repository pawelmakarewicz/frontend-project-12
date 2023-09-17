const socketMiddleware = (socketClient) => (params) => (next) => (action) => {
  const { dispatch, getState } = params;
  const { type } = action;
  switch (type) {
    case 'socket/connect': {
      socketClient.connect();
      socketClient.socket.on('connect', () => { console.log('connect'); });
      break;
    }
    case 'socket/disconnect':
      console.log('disconect');
      break;
    default:
      break;
  }
  return next(action);
};

export default socketMiddleware;
