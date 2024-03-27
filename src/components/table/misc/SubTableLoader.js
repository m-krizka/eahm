import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = (props) => {
  return (
    <ContentLoader
      height={20}
      width={1060}
      speed={1}
      primaryColor="#d9d9d9"
      secondaryColor="#ecebeb"
      {...props}
    >
      {/* <rect x="0" y="15" rx="4" ry="4" width="6" height="6.4" /> */}
      <rect x="24" y="5" rx="3" ry="3" width={160} height="10" />
      <rect x="253" y="5" rx="3" ry="3" width={78 * 0.8} height="10" />
      <rect x="330" y="5" rx="3" ry="3" width={23 * 0.8} height="10" />
      <rect x="355" y="5" rx="3" ry="3" width={117 * 0.8} height="10" />
      <rect x="538" y="5" rx="3" ry="3" width={83 * 0.8} height="10" />

      <rect x="0" y="39" rx="3" ry="3" width="1060" height=".3" />
    </ContentLoader>
  );
};

const MyLoader = () => (
  <div 
    className="loader-fix-down"
    style={{
      border: 'solid 1px #f1f1f1',
      borderRadius: '3px',
      paddingTop: '7px',
      paddingBottom: '2px',
    }}
  >
    {Array(2)
      .fill('')
      .map((e, i) => (
        <Loader
          key={i} // eslint-disable-line react/no-array-index-key
          style={{ opacity: Number(1.3 / i).toFixed(1) }}
        />
      ))}
  </div>
);

export default MyLoader;
