# UI Tests Using Playwright

Playwright enables reliable end-to-end testing for modern web apps.

## Getting Started

Clone the code from repository,
### Prerequisites

- NodeJS
- Npm

### Installation

In root folder,enter the following command . It will Install all the dependencies present in `package.json`

```
npm install
```

```
npx playwright install
```

## Running the tests

Run UI tests on CLI, use following command,

```
npx playwright test
```

## Author

- **Syed Umair Hassan**

## Framework Capablities

- Framework: This framework has been built on Playwright https://playwright.dev/
- Use Page Object Model (POM): All the page object locator organised in page-object folder
- Reporting: HTML Playwright report exist in playwright-report folder
- Logging: Test execution log present in test-logs folder
- Screenshots: Playwright maintains test execution screenshots in test-results folder

## Test Cases 
1. Verify that user is able to login - Automated
2. Verifiy that user is able to open file from file list by using Open in New Tab option - Automated
3. Verifiy that user is able to open file from file list by using preview option - Automated
4. Verify that user is able to perform file search - Automated
