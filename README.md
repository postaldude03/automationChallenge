# automationChallenge
This README provides instructions on how to run the tests in this project.
## Prerequisites
For running the Playwright test, make sure to have the following prerequisites installed on your system:
1. **Node.js and npm**: you can download and install Node.js from https://nodejs.org/.
2. **Playwright**: you can install Playwright as a development dependency in your project by running the following command in your project's directory:       
   ```    npm install playwright    ```
## Running the testsTo run the tests, follow these steps:
1. **Clone the Repository**:
    1. Navigate to your project's directory   
       ```   cd /path/to/your/project   ```
    2. Clone the project from github   
       ```   git clone https://github.com/postaldude03/automationChallenge.git   ```
2. **Install Dependencies**:
   run the following command to install/update the project dependencies    
   ```    npm install     ```
3. **Run the tests**: run the tests using the following commands in the terminal:
 
   ```    npx playwright test --reporter=html   ```
4. **Review the results**: if any of the tests are failed - the html report will be automatically opened. To view the latest report run the following command:
   
    ```npx playwright show-report```
5. ## Troubleshooting
If you encounter any issues while running the test or have questions about Playwright, please refer to the Playwright documentation at https://playwright.dev/docs/intro.