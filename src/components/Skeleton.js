/* @jsx createElement */
import { createElement } from 'react';

const Skeleton = () => {
  return (
    <div className="animated-background">
      <div className="skel-mask-container">
        <div className="skel-mask"></div>
      </div>
    </div>
  );
};

export default Skeleton;
