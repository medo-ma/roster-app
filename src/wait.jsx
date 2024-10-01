import React, { useState } from 'react';


const wait = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    return (
      <LoadingOverlay
        active={isLoading}
        spinner={<BounceLoader />}
        text='Loading your content...'
      >
        <WrappedComponent
          {...props}
          showLoading={showLoading}
          hideLoading={hideLoading}
        />
      </LoadingOverlay>
    );
  };
};

export default wait;
