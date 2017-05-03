import { browser, element, by } from 'protractor';

describe('login page', function() {

  beforeEach(() => {
   	browser.get('#/login');
	  browser.waitForAngular();
  });

  it('should be login page', function() {
	  browser.getCurrentUrl().then(function(url: string) {
	    expect(url.endsWith('/login')).toBe(true);
	  });
	});

	it('should have google button', function() {
	 var googleBtn = element(by.className('buttonText'));
	 expect(googleBtn.getText()).toEqual('Sign in with Google');
	});


});