import React from 'react';

const CustomButton = ({
  onClick,
  color,
  padding_x,
  padding_smx,
  padding_mdx,
  padding_y,
  width,
  height,
  type = 'button',
  children,
}) => {
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  // Utilizamos el color seleccionado para formar las clases CSS
  const buttonClassName = `w-${width} h-${height} text-white inline-flex items-center justify-center gap-2 rounded border 
  ${color === 'indigo' ? 'border-indigo-600 bg-indigo-600 hover:text-indigo-600' :
      color === 'red' ? 'border-red-500 bg-red-500 hover:text-red-500' :
        color === 'yellow' ? 'border-yellow-400 bg-yellow-400 hover:text-yellow-400' :
          color === 'orange' ? 'border-orange-500 bg-orange-500 hover:text-orange-500' :
            'border-gray-600 bg-gray-600 hover:text-gray-600'

    } 
          
  px-${padding_x} sm:px-${padding_smx} md:px-${padding_mdx} py-${padding_y} text-sm font-medium hover:bg-transparent focus:outline-none focus:ring`;

  return (
    <button type={type} className={buttonClassName} onClick={handleClick}>
      {children}
    </button>
  );
};

export default CustomButton;
