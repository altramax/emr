import React, { HTMLProps } from 'react';

export interface AvatarProps extends HTMLProps<HTMLElement> {
  firstname: string;
  lastname?: string;
  size?: number;
}

const Avatar = ({ firstname, lastname, size }: AvatarProps): React.ReactElement => {
  return (
    <>
      <img
        src={`https://ui-avatars.com/api/?name=${firstname}+${lastname ?? ''}&background=BFDBFE&color=1E40AF&${size ? 'size=' + size : 'size=40'}&rounded=true`}
        alt="avatar"
        className={`w-${size} h-${size}`}
      />
    </>
  );
};

export default Avatar;
