import { auth, storage } from "@/app/firebase";
import { prisma } from "@/prisma/prisma";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "../../util/schema";
import { FirebaseError } from "firebase/app";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  let isValid, result;
  try {
    isValid = signUpSchema.parse(body);
  } catch (error) {
    return NextResponse.json(
      { message: "There is validation error." },
      { status: 409 }
    );
  }

  try {
    result = await createUserWithEmailAndPassword(
      auth,
      isValid.email,
      isValid.password
    );
  } catch (error) {
    if (error instanceof FirebaseError) {
      const text = error.code.split("/")[1].replaceAll("-", " ");
      return NextResponse.json({ message: text }, { status: 409 });
    }
  }

  const storageRef = ref(storage, isValid.imageRef);
  const imageURL = await getDownloadURL(storageRef);

  if (!result)
    return NextResponse.json(
      { message: "There is validation error." },
      { status: 400 }
    );

  const token = await result.user.getIdToken();

  const user = await prisma.user.create({
    data: {
      name: isValid.name,
      email: isValid.email,
      fireBaseId: result.user.uid,
      providerId: result.providerId || "",
      image: imageURL,
      imageRef: isValid.imageRef,
    },
  });

  console.log(user);

  return NextResponse.json(
    {
      name: user.name,
      email: user.email,
      image: user.image,
      id: user.id,
      token,
      // cart: user.cart,
      provider: user.providerId,
    },
    { status: 201 }
  );
};
