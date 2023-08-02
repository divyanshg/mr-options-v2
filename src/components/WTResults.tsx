"use client";
import { FC } from 'react';

interface WTResultsProps {
  responses: any;
}

function divideArrayIntoSetsOfFour(responses: any) {
  const sortedResponses = Object.fromEntries(
    Object.entries(responses).sort(([keyA], [keyB]) => {
      const numA = parseInt(keyA.split("_")[1]);
      const numB = parseInt(keyB.split("_")[1]);
      return numA - numB;
    })
  );

  const arr = Object.keys(sortedResponses);

  const sets = [];
  for (let i = 0; i < arr.length; i += 4) {
    sets.push(arr.slice(i, i + 4));
  }
  return sets;
}

const Box = ({
  children,
  noBorder = false,
  fullWidth = false,
}: {
  children?: any;
  noBorder?: boolean;
  fullWidth?: boolean;
}) => {
  return (
    <div
      className={`p-2 ${
        !noBorder ? "border-2 border-gray-400" : ""
      } h-[50px] w-[${
        fullWidth ? "160px" : "80px"
      }] flex flex-row items-center justify-center rounded-lg`}
    >
      {children}
    </div>
  );
};

const WTResults: FC<WTResultsProps> = ({ responses }: { responses: any }) => {
  if (!responses) return null;

  function Td({
    question,
    correctAnswer,
  }: {
    question: any;
    correctAnswer: number;
  }) {
    return (
      <td
        key={question}
        className="flex flex-row items-center justify-center mb-4 space-x-2"
      >
        <div className="flex flex-row space-x-2">
          <Box>
            <p>{question.split("_")[1]}</p>
          </Box>
          <Box>
            <p className="text-center">
              {parseInt(correctAnswer as unknown as string) === 1 ? "✅" : ""}
            </p>
          </Box>
          <Box>
            <p className="text-center">
              {parseInt(correctAnswer as unknown as string) === 2 ? "✅" : ""}
            </p>
          </Box>
        </div>
      </td>
    );
  }

  function generateRows(sets: any) {
    return sets.map((set: any, index: number) => {
      return (
        <tr key={index} className="flex flex-row space-x-8">
          {set.map((question: any) => {
            return (
              <Td
                key={question}
                question={question}
                correctAnswer={responses[question]}
              />
            );
          })}
        </tr>
      );
    });
  }

  const sets = divideArrayIntoSetsOfFour(responses);
  const transposedArray = sets[0].map((col, i) =>
    sets.map((row: any) => responses[row[i]])
  );

  const calculateOccurencesInRow = (row: any) => {
    const occurences = row.reduce((acc: any, curr: any) => {
      acc[curr] ? acc[curr]++ : (acc[curr] = 1);
      return acc;
    }, {});

    return occurences;
  };

  const bottoms = [
    ["E", "I"],
    ["S", "N"],
    ["T", "F"],
    ["J", "P"],
  ];

  const getMax = (v1: number, v2: number) => {
    const max = Math.max(v1, v2);
    return max === v1 ? 1 : 2;
  };

  return (
    <div className="flex flex-row justify-center">
      <table>
        <thead>
          <tr className="flex flex-row mb-4 space-x-8">
            <th>
              <div className="flex flex-row space-x-2">
                <Box>Item</Box>
                <Box>
                  <p className="text-center">A</p>
                </Box>
                <Box>
                  <p className="text-center">B</p>
                </Box>
              </div>
            </th>
            <th>
              <div className="flex flex-row space-x-2">
                <Box>Item</Box>
                <Box>
                  <p className="text-center">A</p>
                </Box>
                <Box>
                  <p className="text-center">B</p>
                </Box>
              </div>
            </th>
            <th>
              <div className="flex flex-row space-x-2">
                <Box>Item</Box>
                <Box>
                  <p className="text-center">A</p>
                </Box>
                <Box>
                  <p className="text-center">B</p>
                </Box>
              </div>
            </th>
            <th>
              <div className="flex flex-row space-x-2">
                <Box>Item</Box>
                <Box>
                  <p className="text-center">A</p>
                </Box>
                <Box>
                  <p className="text-center">B</p>
                </Box>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {generateRows(sets)}
          <tr className="flex flex-row mb-4 space-x-8">
            <td>
              <p className="text-lg font-semibold">Total</p>
            </td>
          </tr>
          <tr className="flex flex-row space-x-8">
            {[1, 2, 3, 4].map((set) => (
              <td
                key={set}
                className="flex flex-row items-center justify-center space-x-2"
              >
                <Box noBorder />
                <Box>
                  <p>
                    {calculateOccurencesInRow(transposedArray[set - 1])[1] ?? 0}
                  </p>
                </Box>
                <Box>
                  <p>
                    {calculateOccurencesInRow(transposedArray[set - 1])[2] ?? 0}
                  </p>
                </Box>
              </td>
            ))}
          </tr>
          <tr className="flex flex-row space-x-8">
            {[1, 2, 3, 4].map((set) => (
              <td
                key={set}
                className="flex flex-row items-center justify-center space-x-2"
              >
                <Box noBorder />
                <Box noBorder>
                  <p>{bottoms[set - 1][0]}</p>
                </Box>
                <Box noBorder>
                  <p>{bottoms[set - 1][1]}</p>
                </Box>
              </td>
            ))}
          </tr>
          <tr className="flex flex-row mb-4 space-x-10">
            {[1, 2, 3, 4].map((set) => (
              <td
                key={set}
                className="flex flex-row items-center justify-center mb-4 space-x-2"
              >
                <Box noBorder />
                <Box fullWidth>
                  <p>
                    {getMax(
                      calculateOccurencesInRow(transposedArray[set - 1])[1],
                      calculateOccurencesInRow(transposedArray[set - 1])[2]
                    ) === 1
                      ? bottoms[set - 1][0]
                      : bottoms[set - 1][1]}
                  </p>
                </Box>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WTResults;
