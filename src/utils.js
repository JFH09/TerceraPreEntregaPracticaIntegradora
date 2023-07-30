import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

const __filname = fileURLToPath(import.meta.url);
const __dirname = dirname(__filname);

export default __dirname;
