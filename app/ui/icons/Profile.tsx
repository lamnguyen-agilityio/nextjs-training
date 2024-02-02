import { SVGProps } from 'react';

export const ProfileIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.77791 22.916L12.5006 19.1009L18.2232 22.916C18.5828 23.1558 19.0567 22.8571 18.9955 22.4293L18.0309 15.6768L22.8541 10.8536C23.1455 10.5622 22.9791 10.0633 22.5713 10.005L15.8494 9.04476L12.9601 2.30304C12.787 1.89899 12.2141 1.89899 12.041 2.30304L9.15167 9.04476L2.42984 10.005C2.02196 10.0633 1.85566 10.5622 2.147 10.8536L6.97023 15.6768L6.00558 22.4293C5.94446 22.8571 6.4183 23.1558 6.77791 22.916ZM12.7779 18.084C12.61 17.972 12.3912 17.972 12.2232 18.084L7.15368 21.4637L7.99553 15.5707C8.01779 15.4149 7.96539 15.2577 7.85411 15.1464L3.56122 10.8536L9.57127 9.99498C9.74401 9.9703 9.89139 9.85735 9.96013 9.69696L12.5006 3.7693L15.041 9.69696C15.1097 9.85735 15.2571 9.9703 15.4298 9.99498L21.4399 10.8536L17.147 15.1464C17.0357 15.2577 16.9833 15.4149 17.0056 15.5707L17.8474 21.4637L12.7779 18.084Z"
      />
    </svg>
  );
};