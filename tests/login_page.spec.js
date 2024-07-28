const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../page-objects/LoginPage");
const { HomePage } = require("../page-objects/HomePage");
const { chromium } = require('playwright');
const logger = require('../logger');
const { MailinatorPage } = require("../page-objects/MailinatorPage");
const userData = JSON.parse(
  JSON.stringify(require("../test-data/userTestData.json"))
);

let loginPage;
let mailinatorPage;
let homePage;
let context;
let browser;
let page1
let page2

test.setTimeout(600000); // Increase timeout to 60 seconds

test.beforeEach(async () => {
  // Launch the browser
  browser = await chromium.launch({ headless: false });
  // Create a new browser context
  context = await browser.newContext();
  // Open the first tab (page)
  page1 = await context.newPage();
  // Second tab instance
  page2 = await context.newPage();
  // Create login page objects instance
  loginPage = new LoginPage(page1);
  // Create dashbord page instance
  homePage = new HomePage(page1)
  // Create mailinator page instance
  mailinatorPage = new MailinatorPage(page2);
});

// Close the page after each test
test.afterEach(async () => {
  await context.close();
  await browser.close();
});

test("Verify that user is able to login", async () => {
  logger.info('Test case: User Login - Started');
  // Perform user login
  await loginPage.login(page1, page2, userData.URL, userData.email, userData.mailServer)
  logger.info('User has sucessfully login to application');
  // Click on home page
  await homePage.homeBtn.click();
  await page1.goto(userData.homePageUrl)
  await page1.waitForTimeout(5000);
  logger.info('User has sucessfully landed to dashboard page');
  // Assert that user is landing to dashboard page
  await expect(homePage.userEmailText).toHaveText(userData.email);
  logger.info('User email is verified on dashboard');
  logger.info('Test case: User Login - Completed');
});
