import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 letter long." }),
  email: z
    .string()
    .email("Please add valid email.")
    .min(3, { message: "Please enter email" }),
  password: z
    .string()
    .min(8, { message: "Your password should be 8 letter long." })
    .max(12, { message: "your password can only range from 8-12 letters." }),
  confirm: z
    .string()
    .min(8, { message: "Please add enter password again to confirm." })
    .max(12, { message: "Please add enter password again to confirm." }),
  image: z
    .string({ message: "Please add your profile image." })
    .url("Please add valid image url"),
});

export const signInSchema = z.object({
  email: z.string().email("Please add valid email"),
  password: z.string().min(8, { message: "Your password should be 8" }),
});
