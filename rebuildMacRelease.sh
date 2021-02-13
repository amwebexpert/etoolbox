echo "Building the Mac release"
rm -rf dist
npm run electron:build

echo "End of the build. Content of the [dist] folder:"
echo "______________________________________________"
ls -al dist/
