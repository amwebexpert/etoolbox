echo "______________________________________________"
echo "Clearing coverage folders"
rm -rf .nyc_output
rm -rf coverage
rm -rf coverage-all
rm -rf coverage-cypress
rm -rf coverage-reports-temp

echo "______________________________________________"
echo "Run the unit tests (Jest)"
npm run test:ci

echo "______________________________________________"
echo "Run the e2e tests (Cypress)"
npm run e2e:run

echo "______________________________________________"
echo "Combine both reports into a merged report"
npm run coverage:report:all

echo "______________________________________________"
echo "Copying [all-tests-report] folder to [docs] folder"
cp -R coverage-all/lcov-report docs/all-tests-report/
echo "\t --> [all-tests-report sections] copied"

echo "End of the process. Content of the [docs] folder:"
ls -al docs/

echo "______________________________________________"
echo "adding new ./docs file changes to current branch"
git add .
git commit -m"docs: new online code coverage report"

echo "______________________________________________"
echo "Pushing to Github"
git push
