import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import App from '../src/App';

describe('App', () => {
  const url = 'google.com';
  let component;

  beforeEach(() => moxios.install());

  beforeEach(() => {
    localStorage.clear();
    moxios.stubRequest('/proxy/aeio/stats', { status: 200, response: {} });
    component = mount(<App />);
  });

  afterEach(() => moxios.uninstall());

  describe('when typing in the input', () => {
    it('updates the url state', () => {
      component.find('input').simulate('change', { target: { value: url } });
      expect(component).to.have.state('url').equal(url);
    });
  });

  describe('when submit the form', () => {
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
        const storedLinks = JSON.parse(localStorage.getItem('shortenedLinks'));
        const expectedLinks = [{ longUrl: url, shortcode: 'aeio' }];
        expect(component).to.have.state('shortenedLinks').deep.equal(expectedLinks);
        expect(storedLinks).deep.equal(expectedLinks);
        expect(component).to.have.state('url').equal('');
        done();
      });
    });
  });

  describe('when mount component', () => {
    it('sets the shortenedLinks state from the localStorage', () => {
      const storedLinks = [{ longUrl: url, shortcode: 'aeio' }];
      localStorage.setItem('shortenedLinks', JSON.stringify(storedLinks));

      component = mount(<App />);
      expect(component).to.have.state('shortenedLinks').deep.equal(storedLinks);
    });
  });
});
