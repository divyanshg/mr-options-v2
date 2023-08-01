// import { db } from '@/lib/db';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     if (body.user.type === "student") {
//       for (const responseItem of body.responses) {
//         const questionId = parseInt(responseItem.id, 10);
//         const responseValue = parseInt(responseItem.response, 10);

//         await db.responses.create({
//           data: {
//             survey: {
//               connect: {
//                 id: body.survey_id,
//               },
//             },
//             question: {
//               connect: {
//                 question_id: questionId,
//               },
//             },
//             option: {
//               connect: {
//                 option_id: responseValue, // Assuming response value corresponds to option_id
//               },
//             },
//             student: {
//               connect: {
//                 id: body.user.id,
//               },
//             },
//           },
//         });
//       }
//     } else if (body.user.type === "employee") {
//       for (const responseItem of body.responses) {
//         const questionId = parseInt(responseItem.id, 10);
//         const responseValue = parseInt(responseItem.response, 10);

//         await db.responses.create({
//           data: {
//             survey: {
//               connect: {
//                 id: body.survey_id,
//               },
//             },
//             question: {
//               connect: {
//                 question_id: questionId,
//               },
//             },
//             option: {
//               connect: {
//                 option_id: responseValue, // Assuming response value corresponds to option_id
//               },
//             },
//             employee: {
//               create: {
//                 name: body.user.name,
//                 age: parseInt(body.user.age, 10),
//                 workExperience: body.user.workExperience,
//                 orgName: body.user.orgName,
//                 gender: body.user.gender,
//               },
//             },
//           },
//         });
//       }
//     }

//     return new Response(JSON.stringify({ message: "Success" }), {
//       status: 200,
//     });
//   } catch (e) {
//     console.log(e);
//     return new Response(
//       JSON.stringify({ error: "Something went wrong. Please try again" }),
//       {
//         status: 500,
//       }
//     );
//   }
// }
import { db } from '@/lib/db';

type ResponseItem = {
  survey: {
    connect: {
      id: number;
    };
  };
  question: {
    connect: {
      question_id: number;
    };
  };
  option: {
    connect: {
      option_id: number;
    };
  };
  student?: {
    connect: {
      id: number;
    };
  };
  employee?: {
    create: {
      name: string;
      age: number;
      workExperience: string;
      orgName: string;
      gender: string;
    };
  };
};

type CreateManyInput = {
  data: ResponseItem[];
  skipDuplicates?: boolean;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const responsesData = [];

    for (const responseItem of body.responses) {
      const questionId = parseInt(responseItem.id, 10);
      const responseValue = parseInt(responseItem.response, 10);

      const responseData: ResponseItem = {
        survey: {
          connect: {
            id: body.survey_id,
          },
        },
        question: {
          connect: {
            question_id: questionId,
          },
        },
        option: {
          connect: {
            option_id: responseValue,
          },
        },
      };

      if (body.user.type === "student") {
        responseData["student"] = {
          connect: {
            id: body.user.id,
          },
        };
      } else if (body.user.type === "employee") {
        responseData["employee"] = {
          create: {
            name: body.user.name,
            age: parseInt(body.user.age, 10),
            workExperience: body.user.workExperience,
            orgName: body.user.orgName,
            gender: body.user.gender,
          },
        };
      }

      responsesData.push(responseData);
    }

    await (db.responses as any).createMany({
      // Type cast to 'any' to bypass TypeScript type checking for createMany
      data: responsesData,
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
