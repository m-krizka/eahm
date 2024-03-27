import React from 'react';
import ContentLoader from 'react-content-loader';
import { Panel } from 'react-bootstrap';

const Loader = (props) => {
  return (
    <ContentLoader
      height={40}
      width={1060}
      speed={1}
      primaryColor="#d9d9d9"
      secondaryColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="15" rx="4" ry="4" width="6" height="6.4" />
      <rect x="34" y="13" rx="6" ry="6" width={160} height="10" />
      <rect x="630" y="13" rx="6" ry="6" width={23 * 0.8} height="10" />
      <rect x="653" y="13" rx="6" ry="6" width={78 * 0.8} height="10" />
      <rect x="755" y="13" rx="6" ry="6" width={117 * 0.8} height="10" />
      <rect x="938" y="13" rx="6" ry="6" width={83 * 0.8} height="10" />

      <rect x="0" y="39" rx="6" ry="6" width="1060" height=".3" />
    </ContentLoader>
  );
};

const FormLoader = () => (
  <Panel>
    <Panel.Heading></Panel.Heading>
    <Panel.Body>
      <React.Fragment>
        {Array(6)
          .fill('')
          .map((e, i) => (
            <Loader key={i} style={{ opacity: Number(1.6 / i).toFixed(1) }} />
          ))}
      </React.Fragment>
    </Panel.Body>
  </Panel>
);

export default FormLoader;
