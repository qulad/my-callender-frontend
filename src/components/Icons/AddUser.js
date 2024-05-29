export const AddUser = ({onClickMethod, visible}) => (
  visible && (
    <div onClick={onClickMethod} style={{padding: 0.5 + 'em'}} >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 14 14"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5m1.5 7h-6v-.542a4.51 4.51 0 0 1 6.5-4m3.5-.458v6m-3-3h6"
        ></path>
      </svg>
    </div>
  )
);