import { NextRequest, NextResponse } from "next/server";
import { firebaseAdmin } from "../firebase_admin";
import { FirebaseAuthError } from "firebase-admin/auth";
import { prisma } from "@/prisma/prisma";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/app/firebase";

export const DELETE = async (request: NextRequest) => {
  const token = request.headers.get("authorization");
  if (token === null || token === "") {
    return NextResponse.json(
      { message: "Unauthorized Access." },
      { status: 401 }
    );
  }

  let isTokenValid;

  try {
    isTokenValid = await firebaseAdmin.auth().verifyIdToken(token);
  } catch (error) {
    if (error instanceof FirebaseAuthError) {
      const message = error.code.split("/")[1].replaceAll("-", " ");
      return NextResponse.json(
        { message: `Unauthorized Access. Due to ${message}.` },
        { status: 401 }
      );
    } else {
      return NextResponse.json(
        { message: "Unauthorized Access. Due to token expiration." },
        { status: 401 }
      );
    }
  }

  let user;
  try {
    user = await prisma.user.findFirst({
      where: {
        fireBaseId: isTokenValid.uid,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server internal issue. Please try again." },
      { status: 500 }
    );
  }

  if (!user) {
    return NextResponse.json(
      { message: "Some back end error. Please try again." },
      { status: 500 }
    );
  }

  if (user.providerId !== "google.com" && user.imageRef !== null) {
    const deleteRef = ref(storage, user.imageRef);
    try {
      await deleteObject(deleteRef);
    } catch (error) {
      console.log(`Unable to delete file ${user.imageRef} from the storage`);
    }
  }

  try {
    await prisma.user.delete({
      where: { fireBaseId: isTokenValid.uid },
    });
  } catch (error) {
    console.log("unable to delete this firebase id user form mongodb");
  }

  try {
    await firebaseAdmin.auth().deleteUser(isTokenValid.uid);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Operation shut down un-expectedly. Please reach out to customer support.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json("Your account deleted success fully.");
};
