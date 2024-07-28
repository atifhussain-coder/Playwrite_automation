const { MailinatorPage } = require("../page-objects/MailinatorPage");
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator('[type="email"]');
    this.emailBtn = page.locator('[id="email-btn"]');
    this.continueBtn = page.locator('[name="submit"]');
    this.otpEmail = page.locator('[class="ng-binding"]');
    this.otpField = page.locator('[name="vcode"]');
  }
  async login(page1, page2, appUrl, email, mailinatorUrl) {
    // Create mailinator page instance
    const mailinatorPage = new MailinatorPage(page2);
    // Focus on first tab
    await page1.bringToFront();
    // Open application URL
    await page1.goto(appUrl);
    // // Enter email address 
    await this.emailField.fill(email)
    // Click on continue with email button
    await this.emailBtn.click()
    // Click on continue button
    await this.continueBtn.click()
    // Focus on second tab
    await page2.bringToFront();
    // Open mailinator URL
    await page2.goto(mailinatorUrl);
    // Wait for recent email to be loaded
    await page2.waitForTimeout(10000);
    // Get email subject text
    const emailSubjectText = await mailinatorPage.getEmailSubjectText();
    // Retrieve OTP text
    const otp = emailSubjectText.slice(-23);
    // Close the mailinator instance
    await page2.close()
    // Enter OTP
    await this.otpField.fill(otp);
    // Click on continue button
    await this.continueBtn.click();
    // Wait after contunue button
    await page1.waitForTimeout(5000);
  }
}

module.exports = { LoginPage };
