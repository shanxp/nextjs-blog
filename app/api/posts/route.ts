import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/db';
import { createPostSchema } from "@/app/posts/schema";

export async function POST(request: NextRequest){
    
    try{
        const reqBody = await request.json();
        const reqValidation = createPostSchema.safeParse(reqBody);

        if(!reqValidation.success) {
            return NextResponse.json( reqValidation.error.issues, {status: 400})
        }

        const newIssue = await prisma.post.create({
            data: {
                title: reqBody.title,
                content: reqBody.content,
            }
        });

        return NextResponse.json(newIssue, {status: 201});
    }
    catch(e){
        console.log(e);
        return NextResponse.json( { 'error': true, 'message': 'Error occurred'}, {status: 400});
    }

}

export async function GET(){
    return NextResponse.json({title: 'Hello' }, {status: 200});
}