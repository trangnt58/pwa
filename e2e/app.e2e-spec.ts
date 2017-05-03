import { DemoPage } from './app.po';
import { browser, element, by } from 'protractor'

describe('demo App', function() {
  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    browser.get('index.html');
	  browser.waitForAngular();
  });

  it('should redirect `index.html` to `index.html#!/menugame', function() {
	  browser.getCurrentUrl().then(function(url: string) {
	    expect(url.endsWith('/menugame')).toBe(true);
	  });
	});

	it('should redirect `learning`', function() {
		element(by.id('learning')).click();
		browser.getCurrentUrl().then(function(url: string) {
	    expect(url.endsWith('/topic')).toBe(true);
	  });
	});

	it('should not redirect `playing` when a user don`t login', function() {
		element(by.id('playword')).click();
		browser.getCurrentUrl().then(function(url: string) {
	    expect(url.endsWith('/menugame')).toBe(true);
	  });
	});

});
