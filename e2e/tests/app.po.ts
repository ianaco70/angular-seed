import { browser, by, element } from 'protractor';

export class AppPage {
  public navigateTo() {
    return browser.get('/');
  }

  public getPageTitleText() {
    return element(by.css('.title')).getText();
  }
}
