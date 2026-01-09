// Empty stub for Node.js fs module (not available in browser)
export default {};
export const readFileSync = () => {
  throw new Error("fs.readFileSync is not available in the browser");
};
export const writeFileSync = () => {
  throw new Error("fs.writeFileSync is not available in the browser");
};
export const existsSync = () => false;
export const mkdirSync = () => {};
export const readdirSync = () => [];
export const statSync = () => ({});
export const unlinkSync = () => {};
export const rmdirSync = () => {};
export const promises = {
  readFile: () => Promise.reject(new Error("fs.promises.readFile is not available in the browser")),
  writeFile: () => Promise.reject(new Error("fs.promises.writeFile is not available in the browser")),
};
