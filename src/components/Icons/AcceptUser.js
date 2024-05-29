export const AcceptUser = ({onClickMethod, visible}) => (
    visible && (
      <div onClick={onClickMethod} style={{padding: 0.5 + 'em'}}>
        <img
          src="https://cdn3.iconfinder.com/data/icons/social-media-outline-13/24/accept_friend_request_add_social_media-64.png"
          width="20em"
          height="20em"
        >
        </img>
      </div>
    )
  );