class MailinatorPage {
  constructor(page) {
    this.page = page;
    this.emailSubjectElement = page.locator('[class="ng-binding"]');
  }

  async getEmailSubjectText() {
    return await this.emailSubjectElement.nth(2).textContent();
  }
}

module.exports = { MailinatorPage };