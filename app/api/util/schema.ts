import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email({ message: "please provide valid email." }),
  password: z.string().min(8, { message: "please provide valid password." }),
  imageRef: z
    .string()
    .min(5, { message: "please add image for your profile." }),
  name: z.string().min(3, { message: "please give your name" }),
});

export const googleSchema = z.object({
  name: z.string().min(3, { message: "please provide your name." }),
  email: z.string().email({ message: "please provide your email." }),
  image: z.string().min(3, { message: "please provide your image." }),
  provider: z.string().min(3, { message: "please provide your providerId" }),
  id: z.string().min(3, { message: "please provide your firebase id." }),
});
