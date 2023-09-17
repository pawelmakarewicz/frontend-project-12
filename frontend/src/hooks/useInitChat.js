import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeApp } from '../slices/chatSlice';

export default function useInitChat() {
  const loadingStatus = useSelector((state) => state.chat.loadingStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeApp());
    return () => {
      console.log('return');
      dispatch({ type: 'socket/disconnect' });
    };
  }, []);
  useEffect(() => {
    if (loadingStatus === 'loaded') { dispatch({ type: 'socket/connect' }); }
  }, [loadingStatus]);
}
