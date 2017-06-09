import { RBookPage } from './app.po';

describe('r-book App', () => {
  let page: RBookPage;

  beforeEach(() => {
    page = new RBookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
