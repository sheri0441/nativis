import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  blogId: string;
  userId: string;
};

export const POST = async (
  request: NextRequest,
  context: { params: Params }
) => {
  const { blogId, userId } = context.params;
  const body = await request.json();
  const comment: string = body.comment;

  let isBlogExist, isUserExist;

  try {
    isBlogExist = await prisma.blog.count({ where: { id: blogId } });
    isUserExist = await prisma.user.count({ where: { id: userId } });

    if (isBlogExist && isUserExist) {
      await prisma.comment.create({
        data: {
          blogId: blogId,
          userId: userId,
          content: comment,
        },
      });
    } else {
      return NextResponse.json({
        message: "Such user of blog doesn't exist",
        status: 404,
      });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.error();
  }

  return NextResponse.json({ message: "Done!" });
};

// export const DELETE = async (
//   request: NextRequest,
//   context: { params: Params }
// ) => {
//   const { blogId, userId } = context.params;
//   const body = await request.json();
//   const comment: string = body.comment;

//   let isBlogExist, isUserExist;

//   try {
//     isBlogExist = await prisma.blog.count({ where: { id: blogId } });
//     isUserExist = await prisma.user.count({ where: { id: userId } });

//     if (isBlogExist && isUserExist) {
//       await prisma.comment.create({
//         data: {
//           blogId: blogId,
//           userId: userId,
//           content: comment,
//         },
//       });
//     } else {
//       return NextResponse.json({
//         message: "Such user of blog doesn't exist",
//         status: 404,
//       });
//     }
//   } catch (error) {
//     console.log(error);

//     return NextResponse.error();
//   }

//   return NextResponse.json({ message: "Done!" });
// };
//  Create better delete api
