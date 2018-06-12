import { TokenAppPage } from './app.po';

describe('token-app App', function() {
  let page: TokenAppPage;

  beforeEach(() => {
    page = new TokenAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
