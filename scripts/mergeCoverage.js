/**
 * This script merges the coverage reports from Cypress and Jest into a single one,
 * inside the "coverage" folder
 *
 * @see https://rafaelalmeidatk.com/blog/merging-coverage-reports-from-jest-and-cypress
 */

const { execSync } = require('child_process');
const fs = require('fs-extra');

const REPORTS_FOLDER = 'coverage-reports-temp';
const FINAL_OUTPUT_FOLDER = 'coverage-all';

const run = commands => {
  commands.forEach(command => execSync(command, { stdio: 'inherit' }));
};

// Create the reports folder and move the reports from cypress and jest inside it
fs.emptyDirSync(REPORTS_FOLDER);
fs.copyFileSync('coverage-cypress/coverage-final.json', `${REPORTS_FOLDER}/from-cypress.json`);
fs.copyFileSync('coverage/coverage-final.json', `${REPORTS_FOLDER}/from-jest.json`);

fs.emptyDirSync('.nyc_output');
fs.emptyDirSync(FINAL_OUTPUT_FOLDER);

// Run "nyc merge" inside the reports folder, merging the two coverage files into one,
// then generate the final report on the coverage folder
run([
  // "nyc merge" will create a "coverage.json" file on the root, we move it to .nyc_output
  `nyc merge ${REPORTS_FOLDER} && mv coverage.json .nyc_output/out.json`,
  `nyc report --reporter lcov --report-dir ${FINAL_OUTPUT_FOLDER}`,
]);
