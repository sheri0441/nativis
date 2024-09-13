import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  deleteImageFromFirebaseStorage,
  deleteUserCartItems,
  deleteUserFromFirebase,
  deleteUserFromPrisma,
  getUserFromFirebase,
  getUserFromPrisma,
} from "../api-lib";

export const DELETE = async (request: NextRequest) => {
  const token = headers().get("Authorization");

  const { error, validUser } = await getUserFromFirebase(token);

  if (error.hasError) {
    return NextResponse.json(
      { message: "Authorization failed" },
      { status: 401 }
    );
  }

  const { prismaUserError, user } = await getUserFromPrisma(validUser.uid);

  if (prismaUserError) {
    return NextResponse.json(
      { message: "Authorization failed" },
      { status: 401 }
    );
  }

  if (user?.imageRef) {
    const deleteImage = await deleteImageFromFirebaseStorage(user.imageRef);

    if (!deleteImage) {
      console.log(
        `Unable to delete image from storage. Image reference ${user.imageRef}`
      );
    }
  }

  const deleteUser = await deleteUserFromFirebase(validUser.uid);

  if (!deleteUser) {
    console.log(
      `Unable to delete user from the firebase. Reference Id ${validUser.uid}`
    );
  }

  const deleteUserCart = await deleteUserCartItems(user!.id);

  if (!deleteUserCart) {
    console.log(
      `Unable to delete user cartItems, Reference User Id ${user!.id}`
    );
  }

  const deleteUserFromDatabase = await deleteUserFromPrisma(user!.id);

  if (!deleteUserFromDatabase) {
    console.log(
      `Unable to delete user from database. Reference User Id ${user!.id}`
    );
  }

  return NextResponse.json({ status: 200 });
};
