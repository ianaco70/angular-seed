import { AppPage } from './app.po';

describe('app page test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getPageTitleText()).toEqual('hello angular!'.toUpperCase());
  });
});
