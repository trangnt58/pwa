import { LearningPage } from './pages/learning.po';
import { browser, element, by } from 'protractor';

describe('topic page', function() {
  let page: LearningPage;

  beforeEach(() => {
    page = new LearningPage();
   	browser.get('#/topic');
	  browser.waitForAngular();
  });

  it('should be topic page', function() {
	  browser.getCurrentUrl().then(function(url: string) {
	    expect(url.endsWith('/topic')).toBe(true);
	  });
	});

	it('should be display ui topic', function() {
	  var topicElement = element(by.className('game-box'));
	  expect(topicElement.isDisplayed()).toBe(true);
	});

	it('should be display at least a topic', function() {
		setTimeout(() => {
			var topicFirst = element.all(by.repeater('item in topics')).get(1);
		  expect(topicFirst.isDisplayed()).toBe(true);
		}, 2000);
	});
});