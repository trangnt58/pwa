import { browser, element, by } from 'protractor';

export class LearningPage {
  navigateTo() {
    return browser.get('#/topic');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
