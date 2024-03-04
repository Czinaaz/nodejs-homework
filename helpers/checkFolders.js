import fs from "fs/promises";

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const setupFolder = async (path) => {
  if (!(await isAccessible(path))) {
    await fs.mkdir(path);
  }
};

export { isAccessible, setupFolder };