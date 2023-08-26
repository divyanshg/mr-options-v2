import { db } from '@/lib/db';

type ResponseItem = {
  survey_id: string;
  question_id: number;
  option_id: number;
  student_id?: string;
  employee_id?: string;
};

type CreateManyInput = {
  data: ResponseItem[];
  skipDuplicates?: boolean;
};

export async function POST(req: Request) {
  try {
    const body: ResponseItem[] = await req.json();
    const responsesData: ResponseItem[] = []; // Initialize as an empty array

    // for (const responseItem of body.responses) {
    //   const questionId = responseItem.id; // No need for parseInt, it's already a number
    //   const responseValue = responseItem.response; // No need for parseInt, it's already a number

    //   const responseData: ResponseItem = {
    //     survey_id: body.survey_id,
    //     question_id: Number(questionId),
    //     option_id: Number(responseValue),
    //   };

    //   if (body.user.type === "student") {
    //     responseData["student_id"] = body.user.id;
    //   } else if (body.user.type === "employee") {
    //     let employee = await(db.employee as any).create({
    //       data: {
    //         name: body.user.name,
    //         age: Number(body.user.age),
    //         workExperience: body.user.workExperience,
    //         orgName: body.user.orgName,
    //         gender: body.user.gender,
    //       },
    //     });
    //     responseData["employee_id"] = employee.id;
    //   }

    //   responsesData.push(responseData);
    // }

    await (db.responses as any).createMany({
      // Type cast to 'any' to bypass TypeScript type checking for createMany
      data: body,
      skipDuplicates: true,
    });

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again" }),
      {
        status: 500,
      }
    );
  }
}
