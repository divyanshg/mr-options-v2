"use client";
import { FC } from 'react';

import PdfViewer from './PdfViewer';

interface WTResultsProps {
  responses: any;
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

const WTResults: FC<WTResultsProps> = ({
  responses: { counts, maxes, sets, responses },
}: {
  responses: {
    counts: number[][];
    maxes: number[];
    sets: string[][];
    responses: Record<string, number>[];
  };
}) => {
  if (!sets || sets.length == 0) return null;

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
            <p className="text-lg font-bold">{question.split("_")[1]}</p>
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
                correctAnswer={Number(responses[question])}
              />
            );
          })}
        </tr>
      );
    });
  }

  const bottoms = [
    ["E", "I"],
    ["S", "N"],
    ["T", "F"],
    ["J", "P"],
  ];

  let result = "";
  for (let i = 0; i < 4; i++) {
    result += bottoms[i][maxes[i]];
  }

  return (
    <div className="flex flex-col items-center justify-center  ml-[600px] lg:ml-0">
      <div className="flex flex-row justify-center px-4">
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
              {[1, 2, 3, 4].map((_, i) => (
                <td
                  key={i}
                  className="flex flex-row items-center justify-center space-x-2"
                >
                  <Box noBorder />
                  <Box>
                    <p className="text-lg font-bold">{counts[i][0] ?? 0}</p>
                  </Box>
                  <Box>
                    <p className="text-lg font-bold">{counts[i][1] ?? 0}</p>
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
                    <p className="font-bold">{bottoms[set - 1][0]}</p>
                  </Box>
                  <Box noBorder>
                    <p className="font-bold">{bottoms[set - 1][1]}</p>
                  </Box>
                </td>
              ))}
            </tr>
            <tr className="flex flex-row mb-4 space-x-10">
              {[1, 2, 3, 4].map((set, i) => (
                <td
                  key={set}
                  className="flex flex-row items-center justify-center mb-4 space-x-2"
                >
                  <Box noBorder />
                  <Box fullWidth>
                    <p className="text-lg font-bold">{bottoms[i][maxes[i]]}</p>
                  </Box>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="max-w-[840px] min-w-[840px] md:mx-auto">
        <div className="relative overflow-hidden">
          <PdfViewer report={result} />
        </div>
      </div>
    </div>
  );
};

export default WTResults;
