import { z } from 'zod';

const fullNameValidator = z
  .string()
  .trim()
  .min(1, { message: 'Please enter your full name' })
  .max(100);
const emailValidator = z.string().email({ message: 'Please enter a valid email' }).trim();
const passwordValidator = z
  .string()
  .trim()
  .min(6, { message: 'Password must be at least 6 characters long' })
  .max(32, { message: 'Password must be at most 32 characters long' });
const stringValidator = z.string().trim();

export { fullNameValidator, emailValidator, passwordValidator, stringValidator };
