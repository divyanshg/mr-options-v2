import React, { FC } from 'react';

interface TAResultsProps {
  data: any[];
  sums: Record<string, number>;
}

const _data = [
        {
            "3": 3
        },
        {
            "6": 4
        },
        {
            "1": 2
        },
        {
            "3": 4
        },
        {
            "6": 4
        },
        {
            "6": 4
        },
        {
            "5": 2
        },
        {
            "4": 4
        },
        {
            "2": 4
        },
        {
            "4": 2
        },
        {
            "1": 2
        },
        {
            "4": 2
        },
        {
            "5": 4
        },
        {
            "3": 3
        },
        {
            "5": 4
        },
        {
            "3": 2
        },
        {
            "2": 2
        },
        {
            "4": 3
        },
        {
            "1": 3
        },
        {
            "5": 1
        },
        {
            "3": 2
        },
        {
            "2": 2
        },
        {
            "6": 1
        },
        {
            "1": 2
        },
        {
            "4": 4
        },
        {
            "6": 2
        },
        {
            "2": 2
        },
        {
            "3": 1
        },
        {
            "4": 2
        },
        {
            "5": 4
        },
        {
            "2": 2
        },
        {
            "2": 4
        },
        {
            "6": 3
        },
        {
            "5": 1
        },
        {
            "1": 1
        },
        {
            "1": 3
        }
    ]

const _sums = {
        "C": 15,
        "F": 18,
        "A": 13,
        "E": 16,
        "D": 17,
        "B": 16
    }

const TAResults: FC = ({data}: {data: any[]}) => {
  const letters = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="my-4">
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="p-2 border">Key</th>
            {letters.map((letter) => (
              <th key={letter} className="p-2 border">
                {letter}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(_sums).map(([key, sum]) => (
            <tr key={key} className="text-center">
              <td className="p-2 border">{key}</td>
              {letters.map((letter) => (
                <td key={letter} className="p-2 border">
                  {key === letter ? sum : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TAResults;
