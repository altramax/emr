import React, { HTMLProps } from 'react';

export interface AvatarProps extends HTMLProps<HTMLElement> {
  firstname: string;
  lastname: string;
}

const Avatar = ({ firstname, lastname }: AvatarProps): React.ReactElement => {
  return (
    <>
      <img
        src={`https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=BFDBFE&color=1E40AF&size=40&rounded=true`}
        alt="avatar"
      />
    </>
  );
};

export default Avatar;
