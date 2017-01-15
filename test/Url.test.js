import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Url from '../src/Url';

describe('Url', () => {
  let component;
  const link = {
    longUrl: 'google.com',
    shortcode: 'a716',
  };
  const stats = {
    startDate: '2015-12-17T16:05:00.020Z',
    lastSeenDate: '2017-01-12T23:43:46.338Z',
    redirectCount: 9,
  };

  beforeEach(() => moxios.install());

  beforeEach(() => {
    const urlApi = `/proxy/${link.shortcode}/stats`;
    moxios.stubRequest(urlApi, {
      status: 200,
      response: stats,
    });

    component = mount(<Url link={link} />);
  });

  afterEach(() => moxios.uninstall());

  describe('when starting component', () => {
    it('renders the state', () => {
      expect(component.find('a.link')).to.have.text('shooooort.com/a716Click to copy this link');
    });

    it('GET stats from server and fill state', (done) => {
      moxios.wait(() => {
        const expectedLink = Object.assign({}, link, stats);
        expect(component).to.have.state('link').deep.equal(expectedLink);
        done();
      });
    });
  });
});
