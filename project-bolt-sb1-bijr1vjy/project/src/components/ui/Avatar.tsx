import React from 'react';
import { getInitials } from '../../utils/helpers';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  firstName?: string;
  lastName?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  firstName,
  lastName,
  className = ''
}) => {
  const sizeStyles = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl'
  };

  const initials = firstName && lastName 
    ? getInitials(firstName, lastName)
    : alt.substring(0, 2).toUpperCase();

  return (
    <div className={`relative rounded-full overflow-hidden ${sizeStyles[size]} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-blue-600 text-white font-medium">
          {initials}
        </div>
      )}
    </div>
  );
};

export default Avatar;