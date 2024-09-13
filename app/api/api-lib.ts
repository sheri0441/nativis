import { FirebaseAuthError } from "firebase-admin/auth";
import { firebaseAdmin } from "./user/firebase_admin";
import { prisma } from "@/prisma/prisma";
import {
  BlogCommentsDetail,
  CartItemFetchType,
  CartItemType,
  CommentListAfterUserDetail,
  CommentListBeforeUserDetail,
  OrderCard,
  OrderDetail,
  PrismaCartItemType,
  VerifyTokenResult,
} from "../utils/Interfaces";
import { Client, Environment } from "square";
import generateUniqueId from "generate-unique-id";
import nodemailer from "nodemailer";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { deleteUser } from "firebase/auth";
import firebase from "firebase/compat/app";

export const extractedToken = (token: string) => {
  return token.split(" ")[1];
};

// Take token as argument and return object {
//   validUser: { uid: string }
//   error: { hasError: boolean; text: string }
// }
export const getUserFromFirebase = async (
  token: string | null
): Promise<VerifyTokenResult> => {
  if (token === null || token === "") {
    return {
      validUser: { uid: "" },
      error: {
        hasError: true,
        text: "Token is null or empty",
      },
    };
  }

  try {
    const validUser = await firebaseAdmin
      .auth()
      .verifyIdToken(extractedToken(token));

    return {
      validUser,
      error: {
        hasError: false,
        text: "",
      },
    };
  } catch (error) {
    if (error instanceof FirebaseAuthError) {
      const message = error.code.split("/")[1].replaceAll("-", " ");
      return {
        validUser: { uid: "" },
        error: {
          hasError: true,
          text: `Unauthorized Access. Due to ${message}.`,
        },
      };
    } else {
      return {
        validUser: { uid: "" },
        error: {
          hasError: true,
          text: "Unauthorized Access. Due to token expiration.",
        },
      };
    }
  }
};

// Take blogId as argument and return boolean base of exist or not
export const checkBlogExist = async (id: string): Promise<boolean> => {
  let blog;
  try {
    blog = prisma.blog.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return false;
  }

  if (!blog) {
    return false;
  }

  return true;
};

// Take userId and blogId as argument and return object { like:{id:string}, hasError:boolean}
export const getLike = async (id: {
  userId: string;
  blogId: string;
}): Promise<{ like: { id: string }; hasError: boolean }> => {
  let like;
  try {
    like = await prisma.likes.findFirst({
      where: {
        userId: id.userId,
        blogId: id.blogId,
      },
    });
  } catch (error) {
    return { like: { id: "" }, hasError: true };
  }
  if (!like) {
    return { like: { id: "" }, hasError: true };
  }
  return { like: { id: like.id }, hasError: false };
};

// Take blogId as argument to return {count:number , error: boolean}
export const countBlogComments = async (
  blogId: string
): Promise<{ count: number; countError: boolean }> => {
  try {
    const count = await prisma.comment.count({
      where: {
        blogId: blogId,
      },
    });

    return { count, countError: false };
  } catch (error) {
    return { count: 0, countError: true };
  }
};

// Take blogId and currentPair, and return {list:commentsList, commentError:boolean}
export const getFiveComments = async (
  blogId: string,
  current: number
): Promise<{
  list: [] | CommentListBeforeUserDetail[];
  commentError: boolean;
}> => {
  try {
    const commentList = await prisma.comment.findMany({
      where: {
        blogId: blogId,
      },
      take: 5,
      skip: current === 1 ? 0 : 5 * (current - 1),
      select: {
        content: true,
        createdAt: true,
        userId: true,
        id: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { list: commentList, commentError: false };
  } catch (error) {
    return { list: [], commentError: true };
  }
};

// commentList and return {detailCommentList: list of comment with user detail, detailCommentError: boolean}
export const getCommentListWithUserDetail = async (
  commentList: CommentListBeforeUserDetail[]
): Promise<{
  detailCommentList: CommentListAfterUserDetail[];
  detailCommentError: boolean;
}> => {
  let userList;
  const userIdFromCommentList = commentList.map((comment) => comment.userId);

  try {
    userList = await prisma.user.findMany({
      where: {
        id: {
          in: userIdFromCommentList,
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });
  } catch (error) {
    return { detailCommentList: [], detailCommentError: true };
  }

  const updatedCommentList = commentList.map((comment) => {
    const user = userList.find((user) => user.id === comment.userId);
    return {
      content: comment.content,
      createdAt: comment.createdAt,
      userId: comment.userId,
      id: comment.id,
      user: {
        name: user!.name,
        image: user!.image,
      },
    };
  });

  return { detailCommentList: updatedCommentList, detailCommentError: false };
};

//  Provide all the necessary data related to blog comment like commentList, totalComment, currentPair, totalPair
export const getBlogCommentsDetail = async (
  blogId: string,
  current: number
): Promise<{
  BlogCommentsDetail: BlogCommentsDetail | {};
  BlogCommentsError: boolean;
}> => {
  const { list, commentError } = await getFiveComments(blogId, current);

  if (commentError) {
    return { BlogCommentsDetail: {}, BlogCommentsError: true };
  }

  if (list.length === 0) {
    return {
      BlogCommentsDetail: {
        commentList: [],
        totalPairNumber: 1,
        current: 1,
        totalComments: 0,
      },
      BlogCommentsError: false,
    };
  }

  const { count, countError } = await countBlogComments(blogId);

  if (countError) {
    return { BlogCommentsDetail: {}, BlogCommentsError: true };
  }

  const { detailCommentList, detailCommentError } =
    await getCommentListWithUserDetail(list);

  if (detailCommentError) {
    return { BlogCommentsDetail: {}, BlogCommentsError: true };
  }

  const totalPairNumber = Math.ceil(count / 5);

  return {
    BlogCommentsDetail: {
      commentList: detailCommentList,
      totalPairNumber: totalPairNumber,
      current: current,
      totalComments: count,
    },
    BlogCommentsError: false,
  };
};

export const getUserPrismaId = async (
  fireBaseId: string
): Promise<{ id: string; email: string; userPrismaError: boolean }> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        fireBaseId: fireBaseId,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      return { id: "", email: "", userPrismaError: true };
    }

    return { id: user.id, email: user.email, userPrismaError: false };
  } catch (error) {
    return { id: "", email: "", userPrismaError: true };
  }
};

export const extractIdFromCartList = (cartList: CartItemType[]) => {
  return cartList.map((item: CartItemType) => item.id);
};

export const fetchCartItemFromPrismaById = async (
  cartListIdArray: string[]
): Promise<{ cart: PrismaCartItemType[] | []; prismaCartError: boolean }> => {
  try {
    const cart = await prisma.product.findMany({
      where: {
        id: { in: cartListIdArray },
      },
      select: {
        id: true,
        name: true,
        price: true,
        thumbnail: true,
      },
    });

    return { cart: cart || [], prismaCartError: false };
  } catch (error) {
    return { cart: [], prismaCartError: true };
  }
};

export const addQuantityAndSizeInCartItems = ({
  prismaCartList,
  cartList,
}: {
  prismaCartList: PrismaCartItemType[];
  cartList: CartItemType[];
}): CartItemFetchType[] => {
  type Price = {
    [key: string]: number;
  };
  let modifyCartList = [];
  for (let i = 0; i < cartList.length; i++) {
    for (let e = 0; e < prismaCartList.length; e++) {
      if (
        cartList[i].id === prismaCartList[e].id &&
        typeof prismaCartList[e].price == "object"
      ) {
        const size = cartList[i].size;
        if (size) {
          const price = (prismaCartList[e].price as Price)[size];
          modifyCartList.push({
            id: prismaCartList[e].id,
            name: prismaCartList[e].name + " (" + size + ")",
            price: price,
            quantity: cartList[i].quantity,
            thumbnail: prismaCartList[e].thumbnail,
            size: size,
          });
        } else {
          const price = Object.values(prismaCartList[e].price as Price)[0];
          modifyCartList.push({
            id: prismaCartList[e].id,
            name: prismaCartList[e].name,
            price: price,
            quantity: cartList[i].quantity,
            thumbnail: prismaCartList[e].thumbnail,
            size: null,
          });
        }
      }
    }
  }

  return modifyCartList;
};

export const createPayment = async ({
  token,
  totalPrice,
}: {
  token: string;
  totalPrice: number;
}): Promise<{ paymentId: string; paymentError: boolean }> => {
  const client = new Client({
    bearerAuthCredentials: {
      accessToken: process.env.SQUARE_ACCESS_TOKEN || "",
    },
    environment: Environment.Sandbox,
  });
  const { paymentsApi } = client;
  try {
    const response = await paymentsApi.createPayment({
      idempotencyKey: generateUniqueId({
        length: 32,
      }),
      sourceId: extractedToken(token),
      amountMoney: {
        currency: "USD",
        amount: BigInt(Number(totalPrice.toFixed(2)) * 100),
      },
    });

    return {
      paymentId: response.result.payment!.id || "",
      paymentError: false,
    };
  } catch (error) {
    return { paymentId: "", paymentError: true };
  }
};

export const createOrder = async ({
  orderDetail,
  totalPrice,
  paymentId,
}: {
  orderDetail: OrderDetail;
  totalPrice: number;
  paymentId: string;
}): Promise<{ orderId: string; orderError: boolean }> => {
  try {
    const order = await prisma.order.create({
      data: {
        address: orderDetail.address,
        city: orderDetail.city,
        delivery: orderDetail.delivery,
        email: orderDetail.email,
        instructions: orderDetail.instructions || "",
        list: JSON.stringify(orderDetail.list),
        orderId: generateUniqueId({ length: 9 }),
        phone: orderDetail.phone,
        totalPrice: totalPrice.toFixed(2),
        zip: orderDetail.zip,
        name: orderDetail.name,
        paymentId: paymentId,
      },
      select: {
        orderId: true,
      },
    });
    return { orderId: order.orderId, orderError: false };
  } catch (error) {
    return { orderId: "", orderError: true };
  }
};

export const sendEmail = async ({
  subject,
  to,
  body,
}: {
  subject: string;
  to: string;
  body: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILDER_HOST,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.NODEMAILDER_USER,
      pass: process.env.NODEMAILDER_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Nativis" <sheharyarali689@gmail.com>', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      html: body, // html body
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const getUserOrderList = async (
  email: string
): Promise<{ orderList: OrderCard[]; orderListError: boolean }> => {
  try {
    const list = await prisma.order.findMany({
      where: {
        email: email,
      },
      select: {
        date: true,
        orderId: true,
        status: true,
        totalPrice: true,
      },
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    return { orderList: list, orderListError: false };
  } catch (error) {
    return { orderList: [], orderListError: true };
  }
};

export const getUserFromPrisma = async (
  fireBaseId: string
): Promise<{
  user: {
    email: string;
    fireBaseId: string;
    id: string;
    image: string;
    imageRef: string | null;
    name: string;
    providerId: string;
  } | null;
  prismaUserError: boolean;
}> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        fireBaseId,
      },
    });

    return { user, prismaUserError: false };
  } catch (error) {
    return { user: null, prismaUserError: true };
  }
};

export const deleteImageFromFirebaseStorage = async (
  imageRef: string
): Promise<boolean> => {
  const storage = getStorage();
  const desertRef = ref(storage, imageRef);
  try {
    await deleteObject(desertRef);
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteUserFromFirebase = async (uid: string): Promise<boolean> => {
  try {
    await firebaseAdmin.auth().deleteUser(uid);
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteUserCartItems = async (
  prismaId: string
): Promise<boolean> => {
  try {
    await prisma.cartItem.deleteMany({
      where: {
        userId: prismaId,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const deleteUserFromPrisma = async (id: string): Promise<boolean> => {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};
