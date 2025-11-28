import React from 'react';
import styles from './Logo.module.css';

const Logo: React.FC = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.logo}
    >
      <g clipPath="url(#logo-path-194)">
        <path
          d="M14.1614 13.665L4.14081 9.57812L0.00185698 19.4726L10.0225 23.5594L14.1614 13.665Z"
          fill="currentColor"
        ></path>
        <path
          d="M20.1251 -0.000459911L10.0622 4.11523L18.3986 23.9876L28.4615 19.8719L20.1251 -0.000459911Z"
          fill="currentColor"
        ></path>
      </g>
      <defs>
        <clipPath id="logo-path-194">
          <rect width="114.113" height="24" fill="currentColor"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

export default Logo;

