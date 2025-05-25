import React, { HTMLProps } from 'react';

export interface AvatarProps extends HTMLProps<HTMLElement> {
  firstname: string;
  lastname: string;
  size?: number;
}

const Avatar = ({ firstname, lastname, size }: AvatarProps): React.ReactElement => {
  return (
    <>
      <img
        src={`https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=BFDBFE&color=1E40AF&size=${size}&rounded=true`}
        alt="avatar"
      />
    </>
  );
};

export default Avatar;
