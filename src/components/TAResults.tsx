import React, { FC } from 'react';

interface TAResultsProps {
  responses: { data: any[]; sums: Record<string, number> };
}

const TAResults: FC<TAResultsProps> = ({ responses: { data, sums } }) => {
  const letters = ["A", "B", "C", "D", "E", "F"];
  if (!data || !sums) return null;
  return (
    <div className="my-4">
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="p-2 border">Question No.</th>
            {letters.map((letter) => (
              <th key={letter} className="p-2 border">
                {letter}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((question, index) => (
            <tr key={index + 1} className="text-center">
              <td className="p-2 border">{index + 1}</td>
              {[1, 2, 3, 4, 5, 6].map((optionNum) => (
                <td key={optionNum} className="p-2 border">
                  <span
                    className={
                      question[optionNum] || question[optionNum] == 0
                        ? "font-bold"
                        : ""
                    }
                  >
                    {question[optionNum] == 0
                      ? "0"
                      : question[optionNum]
                      ? question[optionNum]
                      : ""}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="p-2 font-bold text-center border">Total Count</td>
            {[1, 2, 3, 4, 5, 6].map((optionNum) => (
              <td key={optionNum} className="p-2 text-center border">
                <span className="font-semibold">
                  {letters[optionNum - 1]} - {sums[letters[optionNum - 1]]}
                </span>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TAResults;
