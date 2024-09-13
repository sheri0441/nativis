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

export const shippingInfoSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 word long." }),
  email: z.string().email("Please add valid email"),
  phone: z
    .string()
    .min(10, { message: "Phone number must be added for contact purpose." }),
  address: z.string().min(10, { message: "Address must be added. " }),
  city: z.string().min(3, { message: "Please add you city." }),
  zip: z.string().min(3, { message: "Please add you zip." }),
  instructions: z.string().optional(),
  delivery: z.union([z.literal("standard"), z.literal("express")]),
  list: z.array(
    z.object({
      id: z.string(),
      quantity: z.number(),
      size: z.string().optional().nullable(),
    })
  ),
});

export const contactForm = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 word long" }),
  email: z.string().email("Please add valid email"),
  message: z
    .string()
    .min(50, { message: "Message should be 50 word long." })
    .max(300, { message: "message should be between 50 to 300 length." }),
});
