import axios from 'axios';

import { db } from './db';

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

export async function modify(body: any) {
  const responsesFinal: ResponseItem[] = []; // Initialize as an empty array
  let createdEmplyee = false;
  let employee_id = "";

  for (let i = 0; i < body.responses.length; i++) {
    const responseItem = body.responses[i];

    const questionId = responseItem.id; // No need for parseInt, it's already a number
    const responseValue = responseItem.response; // No need for parseInt, it's already a number

    const responseData: ResponseItem = {
      survey_id: body.survey_id,
      question_id: Number(questionId),
      option_id: Number(responseValue),
    };

    if (body.user.type === "student") {
      responseData["student_id"] = body.user.id;
    } else if (body.user.type === "employee") {
      // let employee = await (db.employee as any).create({
      //   data: {
      //     name: body.user.name,
      //     age: Number(body.user.age),
      //     workExperience: body.user.workExperience,
      //     orgName: body.user.orgName,
      //     gender: body.user.gender,
      //   },
      // });

      if (!createdEmplyee) {
        const payload = {
          name: body.user.name,
          age: Number(body.user.age),
          workExperience: body.user.workExperience,
          orgName: body.user.orgName,
          gender: body.user.gender,
        };

        const { data } = await axios.post("/api/employee/create", payload);

        responseData["employee_id"] = data.data;
        createdEmplyee = true;
        employee_id = data.data;
      } else {
        responseData["employee_id"] = employee_id;
      }
    }
    responsesFinal.push(responseData);
  }
  return responsesFinal;
}
