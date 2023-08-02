import { FC } from 'react';

import { calculateScores } from '../constants/firo';

interface FRResultsProps {
  responses: any;
}

const Td = ({ item, _key }: { item: string | number; _key?: string }) => (
  <td className="w-[160px] divide-x divide-black space-x-4 flex items-center justify-center">
    <span className="w-[80px] text-center">{item}</span>
    <span className="pl-2 w-[80px] text-center">{_key}</span>
  </td>
);

const Tr = ({
  items,
  _keys,
}: {
  _keys: string[] | any;
  items: string[] | number[];
}) => (
  <tr className="flex flex-row space-x-6 ">
    {items.map((it, idx) => (
      <Td key={idx} item={it} _key={_keys[idx]} />
    ))}
  </tr>
);

const FRResults: FC<FRResultsProps> = ({ responses }) => {
  function getQuestionSet(questionNumbers: number[]) {
    const result: { [key: string]: any } = {};

    questionNumbers.forEach((questionNumber) => {
      const questionKey = `question_${questionNumber}`;
      if (questionKey in responses) {
        result[questionKey] = responses[questionKey];
      }
    });

    return result;
  }
  return (
    <div>
      <table>
        {/* <thead>
          <tr className="flex flex-row space-x-4 w-[160px]">
            <td className="text-center">
              Expressed
              <br />
              Inclusion
            </td>
            <td className="w-[160px] text-center">
              Expressed
              <br />
              Inclusion
            </td>
            <td className="w-[160px] text-center">
              Expressed
              <br />
              Inclusion
            </td>
            <td className="w-[160px] text-center">
              Expressed
              <br />
              Inclusion
            </td>
            <td className="w-[160px] text-center">
              Expressed
              <br />
              Inclusion
            </td>
            <td className="w-[160px] text-center">
              Expressed
              <br />
              Inclusion
            </td>
          </tr>
        </thead> */}
        <thead className="flex flex-row space-x-6 border-t border-b border-black">
          <tr className="flex flex-row space-x-4 w-[160px]">
            <td className="w-[80px] text-center">Item</td>
            <td className="w-[80px] text-center">Key</td>
          </tr>
          <tr className="flex flex-row space-x-4 w-[160px]">
            <td className="w-[80px] text-center">Item</td>
            <td className="w-[80px] text-center">Key</td>
          </tr>
          <tr className="flex flex-row space-x-4 w-[160px]">
            <td className="w-[80px] text-center">Item</td>
            <td className="w-[80px] text-center">Key</td>
          </tr>

          <tr className="flex flex-row space-x-4 w-[160px]">
            <td className="w-[80px] text-center">Item</td>
            <td className="w-[80px] text-center">Key</td>
          </tr>
          <tr className="flex flex-row space-x-4 w-[160px]">
            <td className="w-[80px] text-center">Item</td>
            <td className="w-[80px] text-center">Key</td>
          </tr>
          <tr className="flex flex-row space-x-4 w-[160px]">
            <td className="w-[80px] text-center">Item</td>
            <td className="w-[80px] text-center">Key</td>
          </tr>
        </thead>
        <tbody>
          <Tr
            items={[1, 28, 30, 2, 4, 29]}
            _keys={["1-2-3", "1-2", "1-2-3", "1-2-3-4", "1-2", "1-2"]}
          />
          <Tr
            items={[3, 31, 33, 6, 8, 32]}
            _keys={["1-2-3-4", "1-2", "1-2-3", "1-2-3-4", "1-2", "1-2"]}
          />
          <Tr
            items={[5, 34, 36, 10, 12, 35]}
            _keys={["1-2-3-4", "1-2", "1-2", "1-2-3", "1", "5-6"]}
          />
          <Tr
            items={[7, 37, 41, 14, 17, 38]}
            _keys={["1-2-3", "1", "1-2-3-4", "1-2-3", "1-2", "1-2"]}
          />
          <Tr
            items={[9, 39, 44, 18, 19, 40]}
            _keys={["1-2", "1", "1-2-3", "1-2-3", "4-5-6", "5-6"]}
          />
          <Tr
            items={[11, 42, 47, 20, 21, 43]}
            _keys={["1-2", "1-2", "1-2-3", "1-2-3", "1-2", "1"]}
          />
          <Tr
            items={[13, 45, 50, 22, 23, 46]}
            _keys={["1-2", "1-2", "1-2", "1-2-3-4", "1-2", "5-6"]}
          />
          <Tr
            items={[15, 48, 53, 24, 25, 49]}
            _keys={["1", "1-2", "1-2", "1-2-3", "4-5-6", "1-2"]}
          />
          <Tr
            items={[16, 51, 54, 26, 27, 52]}
            _keys={["1", "1-2", "1-2", "1-2-3", "1-2", "5-6"]}
          />
          <Tr
            items={["Score", "Score", "Score", "Score", "Score", "Score"]}
            _keys={[
              calculateScores(getQuestionSet([1, 3, 5, 7, 9, 11, 13, 15, 16])),
              calculateScores(
                getQuestionSet([28, 31, 34, 37, 39, 42, 45, 48, 51])
              ),
              calculateScores(
                getQuestionSet([30, 33, 36, 41, 44, 47, 50, 53, 54])
              ),
              calculateScores(
                getQuestionSet([2, 6, 10, 14, 18, 20, 22, 24, 26])
              ),
              calculateScores(
                getQuestionSet([4, 8, 12, 17, 19, 21, 23, 25, 27])
              ),
              calculateScores(
                getQuestionSet([29, 32, 35, 38, 40, 43, 46, 49, 52])
              ),
            ]}
          />
        </tbody>
      </table>
    </div>
  );
};

export default FRResults;
