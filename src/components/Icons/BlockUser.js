export const BlockUser = ({onClickMethod, visible}) => (
    visible && (
      <div onClick={onClickMethod} style={{padding: 0.5 + 'em'}}>
        <img
          src="https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/block-user-icon.png"
          width="20em"
          height="20em"
        >
        </img>
      </div>
    )
  );