import React from 'react';

const Header = ({ children, ...rest }) => {
  return (
    <div className={rest.className}>
      <span>{children}</span>
    </div>
  );
};

export default Header;
