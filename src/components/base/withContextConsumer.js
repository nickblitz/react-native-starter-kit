import React from 'react';

function withContextProps(WrappedComponent, ContextProvider) {
  return (props) => (
    <ContextProvider>
      {(contextValues) => <WrappedComponent {...contextValues} {...props} />}
    </ContextProvider>
  );
}

export default withContextProps;
