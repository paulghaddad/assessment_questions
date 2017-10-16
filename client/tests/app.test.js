import React from 'react';
import App from '../jsx/app.jsx';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const app = renderer.create(
          <App>Questions</App>
        );
    expect(app).toMatchSnapshot();
});
