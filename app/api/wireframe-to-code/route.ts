import { db } from "@/configs/db";
import { usersTable, WireframetoCode } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { description, imageUrl, model, uid, email } = await req.json();
    console.log(uid)

    const creditResult = await db.select().from(usersTable)
        .where(eq(usersTable.email, email));

    if (creditResult[0]?.credits && creditResult[0]?.credits > 0) {

        const result = await db.insert(WireframetoCode).values({
            userId: uid.toString(),
            description: description,
            imageUrl: imageUrl,
            model: model,
            createdBy: email
        }).returning({ id: WireframetoCode.id });

        // Update user credits
        const data = await db.update(usersTable).set({
            credits: creditResult[0]?.credits - 1
        }).where(eq(usersTable.email, email));

        return NextResponse.json(result);
    }
    else {
        return NextResponse.json({ 'error': 'Not enough credits' })
    }
}

export async function GET(req: Request) {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const uid = searchParams?.get('uid');
    const email = searchParams?.get('email');
    if (uid) {
        const result = await db.select()
            .from(WireframetoCode)
            .where(eq(WireframetoCode.userId, uid));
        return NextResponse.json(result[0]);
    }
    else if (email) {
        const result = await db.select()
            .from(WireframetoCode)
            .where(eq(WireframetoCode.createdBy, email))
            .orderBy(desc(WireframetoCode.id))
            ;
        return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'No Record Found' })

}

export async function PUT(req: NextRequest) {
    const { uid, codeResp } = await req.json();

    const result = await db.update(WireframetoCode)
        .set({
            code: codeResp
        }).where(eq(WireframetoCode.userId, uid))
        .returning({ uid: WireframetoCode.userId })

    return NextResponse.json(result);

}