import bcrypt from 'bcryptjs';

const hashPassword = async function (password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const validatePassword = function (password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
};

export { hashPassword, validatePassword };
