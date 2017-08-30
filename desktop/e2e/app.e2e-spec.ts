import { DesktopPage } from './app.po';

describe('desktop App', () => {
  let page: DesktopPage;

  beforeEach(() => {
    page = new DesktopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
