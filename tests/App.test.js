import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App';

describe('App', () => {
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });

  describe('when typing in the input', () => {
    it('updates the url state', () => {
      // asdads
      // asdads
      // asdasd
      expect(component).to.contain(<asdad />);
    });
  });
});
