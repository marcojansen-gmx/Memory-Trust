import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container">&copy;{(new Date().getFullYear())} by Yi-Tsun Chen and Kishan Gosrani</div>
    </footer>
  );
};

export default Footer;
