import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { Fragment } from 'react';
import { setCurrentChanelId } from '../../slices/chatSlice';
import { showModal } from '../../slices/modalSlice';

function Channel({ chanelId, currentId, channelName }) {
  const dispatch = useDispatch();
  const btnClass = cn('btn w-100 rounded-0 text-start', {
    'btn-secondary': currentId === chanelId,
  });
  return (
    <li className="nav-item w-100">
      <button type="button" className={btnClass} onClick={() => dispatch(setCurrentChanelId(chanelId))}>
        <span className="me-1">#</span>
        {channelName}
      </button>
    </li>
  );
}

export default function Sidebar() {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.chat.appData.channels);
  const currentChannelId = useSelector((state) => state.chat.appData.currentChannelId);
  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(showModal({ type: 'adding' }))}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </div>
      <ul id="channels-box" className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
        { channels ? channels
          .map(({ id, name }) => (
            <Fragment key={id}>
              <Channel chanelId={id} currentId={currentChannelId} channelName={name} />
            </Fragment>
          ))
          : null}
      </ul>
    </>
  );
}
