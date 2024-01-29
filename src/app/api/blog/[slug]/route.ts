import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _request: NextRequest,
  {
    params,
  }: {
    params: { slug: string };
  }
) => {
  try {
    connectToDb();
    const { slug } = params;
    const post = await Post.findOne({ slug });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post!");
  }
};
