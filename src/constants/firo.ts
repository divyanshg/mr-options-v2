type PossibleResponses = {
  [key: number]: string;
};
const possibleResponses: PossibleResponses = {
  "1": "1-2-3",
  "2": "1-2-3-4",
  "3": "1-2-3-4",
  "4": "1-2",
  "5": "1-2-3-4",
  "6": "1-2-3-4",
  "7": "1-2-3",
  "8": "1-2",
  "9": "1-2",
  "10": "1-2-3",
  "11": "1-2",
  "12": "1",
  "13": "1-2",
  "14": "1-2-3",
  "15": "1",
  "16": "1",
  "17": "1-2",
  "18": "1-2-3",
  "19": "4-5-6",
  "20": "1-2-3",
  "21": "1-2",
  "22": "1-2-3-4",
  "23": "1-2",
  "24": "1-2-3",
  "25": "4-5-6",
  "26": "1-2-3",
  "27": "1-2",
  "28": "1-2",
  "29": "1-2",
  "30": "1-2-3",
  "31": "1-2",
  "32": "1-2",
  "33": "1-2-3",
  "34": "1-2",
  "35": "5-6",
  "36": "1-2",
  "37": "1",
  "38": "1-2",
  "39": "1",
  "40": "5-6",
  "41": "1-2-3-4",
  "42": "1-2",
  "43": "1",
  "44": "1-2-3",
  "45": "1-2",
  "46": "5-6",
  "47": "1-2-3",
  "48": "1-2",
  "49": "1-2",
  "50": "1-2",
  "51": "1-2",
  "52": "5-6",
  "53": "1-2",
  "54": "1-2",
};

export default possibleResponses;

export function calculateScores(responses: any) {
  let score: number = 0;
  Object.keys(responses).forEach((question: any) => {
    const _question = question.split("_")[1];
    const responsesPossible = possibleResponses[_question]
      ?.split("-")
      .map(Number);

    if (responsesPossible?.includes(Number(responses[question]))) {
      score++;
    }
  });

  return score;
}
