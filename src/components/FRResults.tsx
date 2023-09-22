import { FC } from 'react';

interface FRResultsProps {
  responses: any;
  refetch: ({ skipCache }: { skipCache?: boolean | undefined }) => any;
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

const FRResults: FC<FRResultsProps> = ({
  responses: { scores, totalScores },
  refetch,
}) => {
  if (!scores) return null;

  return (
    <div>
      <table>
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
              scores["1"],
              scores["2"],
              scores["3"],
              scores["4"],
              scores["5"],
              scores["6"],
            ]}
          />
        </tbody>
      </table>
      <table className="my-8">
        <thead>
          <tr>
            <td></td>
            <td className="w-12 h-12 text-center border border-black">I</td>
            <td className="w-12 h-12 text-center border border-black">C</td>
            <td className="w-12 h-12 text-center border border-black">A</td>
            <td className="w-12 h-12 text-center border border-black">Total</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w-12 h-12 text-center border border-black">E</td>
            <td className="w-12 h-12 text-center border border-black">
              {scores[1]}
            </td>
            <td className="w-12 h-12 text-center border border-black">
              {scores[6]}
            </td>
            <td className="w-12 h-12 text-center border border-black">
              {scores[3]}
            </td>
            <td className="w-12 h-12 text-center border border-black">
              {totalScores.row["1"]}
            </td>
          </tr>
          <tr>
            <td className="w-12 h-12 text-center border border-black">W</td>
            <td className="w-12 h-12 text-center border border-black">
              {scores[4]}
            </td>
            <td className="w-12 h-12 text-center border border-black">
              {scores[2]}
            </td>
            <td className="w-12 h-12 text-center border border-black">
              {scores[5]}
            </td>
            <td className="w-12 h-12 text-center border border-black">
              {totalScores.row["2"]}
            </td>
          </tr>
          <tr>
            <td className="w-12 h-12 text-center border border-black">Total</td>
            <td className="w-12 h-12 text-center border border-black">
              {totalScores.cols[1]}
            </td>
            <td className="w-12 h-12 text-center border border-black">
              {totalScores.cols[2]}
            </td>
            <td className="w-12 h-12 text-center border border-black">
              {totalScores.cols[3]}
            </td>
            <td className="w-12 h-12 text-center border border-black">
              {totalScores.grandTotal}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FRResults;
