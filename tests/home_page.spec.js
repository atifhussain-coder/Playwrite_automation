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

test("Verifiy that user is able to open file from file list by using Open in New Tab option", async () => {
  // Perform user login
  logger.info('Test case: Open with new tab option - Started');
  await loginPage.login(page1, page2, userData.URL, userData.email, userData.mailServer)
  logger.info('User has sucessfully login to application');
  // Goto home page
  await homePage.homeBtn.click();
  await page1.goto(userData.homePageUrl)
  await page1.waitForTimeout(5000);
  logger.info('User has sucessfully landed to dashboard page');
  // Click on action option
  const documentOptions = homePage.actionIcon;
  await documentOptions.waitFor({ state: 'visible' });
  await documentOptions.click();
  logger.info('User has clicked on action button');
  // Click on open new tab option
  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    homePage.openNewTabBtn.click()
  ]);
  logger.info('User has clicked on open in new tab option');
  // Wait for the new tab to load
  await newTab.waitForLoadState();
  // Assertion the valid document link 
  const newTabUrl = newTab.url();
  console.log(newTabUrl)
  expect(newTabUrl).toBe(userData.documentTabUrl);
  logger.info('New tab URL has been verified');
  // Wait for the new tab to load
  await newTab.waitForLoadState();
  // Wait for document to be loaded
  const spinningElement = newTab.locator('.animate-spin');
  await spinningElement.waitFor({ state: 'hidden' });
  await newTab.waitForTimeout(10000);
  logger.info('File has been opened in new tab');
  logger.info('Test case: Open with new tab option - Completed');
});

test("Verifiy that user is able to open file from file list by using preview option", async () => {
  logger.info('Test case: File Open with Preview - Started');
  // Perform user login
  await loginPage.login(page1, page2, userData.URL, userData.email, userData.mailServer);
  logger.info('User has sucessfully login to application');
  // Goto home page
  await homePage.homeBtn.click();
  await page1.goto(userData.homePageUrl)
  await page1.waitForTimeout(10000);
  logger.info('User has sucessfully landed to dashboard page');
  // Click on action option
  const documentOptions = homePage.actionIcon;
  await documentOptions.waitFor({ state: 'visible' });
  await documentOptions.click();
  logger.info('User has clicked on action button');
  // Click on preview option
  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    homePage.previewBtn.click()
  ]);
  logger.info('User has clicked on preview option');
  // Wait for the new tab to load
  await newTab.waitForLoadState();
  // Assertion the valid document link 
  const newTabUrl = newTab.url();
  console.log(newTabUrl)
  expect(newTabUrl).toBe(userData.documentTabUrl);
  logger.info('Preview URL has been verified');
  // Wait for the new tab to load
  await newTab.waitForLoadState();
  // Wait for document to be loaded
  const spinningElement = newTab.locator('.animate-spin');
  await spinningElement.waitFor({ state: 'hidden' });
  await newTab.waitForTimeout(5000);
  logger.info('File has been opened in new tab');
  logger.info('Test case: Open with preview option - Completed');
});

test("Verify that user is able to perform file search", async () => {
  logger.info('Test case: File search - Started');
  // Perform user login
  await loginPage.login(page1, page2, userData.URL, userData.email, userData.mailServer)
  logger.info('User has sucessfully login to application');
  // Goto home page
  await homePage.homeBtn.click();
  await page1.goto(userData.homePageUrl)
  await page1.waitForTimeout(5000);
  logger.info('User has sucessfully landed to dashboard page');
  // Search file
  await homePage.searchBox.fill(userData.searchText)
  // QA document file should be visible after search
  const qaDocFile = homePage.qaFileDocument;
  // Assert that the qaDocFile is visible
  await expect(qaDocFile).toBeVisible();
  // Doc file should not be visible
  const docFile = homePage.docFile
  // Assert that the qaDocFile is visible
  await expect(docFile).toBeHidden();
  logger.info('File searching operation is fine');
  logger.info('Test case: File search - Completed');
});
