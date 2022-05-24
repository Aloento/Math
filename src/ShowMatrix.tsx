import { useRef, useEffect } from "react";
import { fractionMatrix } from "./helpers";

export default function MakeMatrix({ matrix, squ, raw }: { matrix: any[][], squ: number, raw?: boolean }) {
  const refMatrix = useRef<HTMLTableElement>(null);

  useEffect(() => {
    refMatrix.current?.setAttribute("border", "1");
  }, [refMatrix]);

  const tmp: JSX.Element[] = [];

  for (let row = 0; row < squ; row++) {
    const rowData: JSX.Element[] = [];

    for (let col = 0; col < squ; col++) {
      rowData.push(
        <td key={`${row}-${col}`}>
          {raw ? matrix?.at(row)?.at(col) : fractionMatrix(matrix)?.at(row)?.at(col)}
        </td>
      );
    }

    tmp.push(<tr key={row}>{rowData}</tr>);
  }

  return <table ref={refMatrix}>
    {tmp}
  </table>
}

