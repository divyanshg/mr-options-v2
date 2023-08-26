import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const employee = await db.employee.create({
      data: body,
    });

    return new Response(
      JSON.stringify({ message: "Success", data: employee.id }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: err }), { status: 500 });
  }
}
