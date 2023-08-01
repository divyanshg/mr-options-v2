type ResponseItem = {
  survey: {
    connect: {
      id: string;
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
      id: string;
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

export async function modify(body: any) {
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

    await responsesData.push(responseData);
  }

  return responsesData;
}
