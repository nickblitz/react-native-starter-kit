import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../../../components/base/UI/Loading';

it('<Loading /> renders correctly', () => {
  const Component = <Loading />;

  // Matches snapshot
  expect(renderer.create(Component).toJSON()).toMatchSnapshot();
});
