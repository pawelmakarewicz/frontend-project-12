import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCurrentMessage } from '../../slices/chatSlice';
import disableInputTemporary from '../../lib/disableInputTemporary';
import useFocus from '../../hooks/useFocus';

function IsStringEmpty(string) {
  return /^\s*$/.test(string);
}

export default function MessageInput() {
  const [inputState, setInputState] = useState(false);
  const dispatch = useDispatch();
  const currentText = useSelector((state) => state.chat.appData.currentMessage);
  const inputRef = useFocus();
  useEffect(() => { setInputState(false); }, [currentText]);
  return (
    <div className="mt-auto px-5 py-3">
      <form
        noValidate
        className="py-1 border rounded-2"
        onSubmit={((e) => {
          e.preventDefault();
          dispatch({ type: 'socket/sendNewMessage' });
          disableInputTemporary(setInputState);
        })}
      >
        <div className="input-group has-validation">
          <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value={currentText} onChange={(e) => { dispatch(setCurrentMessage(e.currentTarget.value)); }} disabled={inputState} ref={inputRef} />
          <button type="submit" className="btn btn-group-vertical border-0" disabled={IsStringEmpty(currentText)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </form>
    </div>
  );
}
