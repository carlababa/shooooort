import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import App from '../src/App';

describe('App', () => {
  const url = 'google.com';
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });

  describe('when typing in the input', () => {
    it('updates the url state', () => {
      component.find('input').simulate('change', { target: { value: url } });
      expect(component).to.have.state('url').equal(url);
    });
  });

  describe('when submit the form', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('posts to the server and add updates state', (done) => {
      moxios.stubRequest('/proxy/shorten', {
        status: 200,
        response: {
          shortcode: 'aeio',
        },
      });

      component.setState({ url });
      component.find('form').simulate('submit', { preventDefault: () => {} });

      moxios.wait(() => {
        const expectedLinks = [{ longUrl: url, shortcode: 'aeio' }];
        expect(component).to.have.state('shortenedLinks').deep.equal(expectedLinks);
        expect(component).to.have.state('url').equal('');
        done();
      });
    });
  });
});
