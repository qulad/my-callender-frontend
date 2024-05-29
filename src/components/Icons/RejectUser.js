export const RejectUser = ({onClickMethod, visible}) => (
  visible && (
    <div onClick={onClickMethod} style={{padding: 0.5 + 'em'}}>
      <img
        src="https://cdn4.iconfinder.com/data/icons/request-1/500/yul1101_7_reject_friend_request-64.png"
        width="20em"
        height="20em"
      >
      </img>
    </div>
  )
);