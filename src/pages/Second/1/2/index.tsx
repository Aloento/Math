import MakeMatrix from "@/ShowMatrix";
import { PageContainer } from "@ant-design/pro-components";
import { Divider, InputNumber } from "antd";
import { useEffect, useState } from "react";
import formula from './formula.png';
import h from './h.png';
import { math } from '@/global'

export default function Hermite() {
  const [squNum, setSquNum] = useState(6);
  const [PMatrix, setPMatrix] = useState([
    [0, 1],
    [0, 1, 0],
    [0, 1, 0, -2],
    [1, 0],
    [1, 0, 0],
    [-2, 9]
  ]);

  const [DQMatrix, setDQMatrix] = useState<number[][]>([]);

  useEffect(() => {
    const dqMatrix = math.matrix().resize([squNum, squNum]).toArray() as number[][];

    for (let r = 0; r < squNum; r++) {
      for (let c = 0; c < squNum; c++) {
        dqMatrix[r][c] = PMatrix?.at(r)?.at(c)!;
      }
    }

    for (let row = 1; row < squNum; row++) {
      for (let col = 2; col < row + 2; col++) {
        const x0 = (row - 1) - (col - 2);
        const xn = row;
        const q = dqMatrix[x0][0] - dqMatrix[xn][0];

        const r = dqMatrix[row][col];

        if (r !== undefined) {
          dqMatrix[row][col] = r;
          continue;
        }

        if (col !== 2) {
          dqMatrix[row][col] = (dqMatrix[row - 1][col - 1] - dqMatrix[row][col - 1]) / q;
        } else {
          dqMatrix[row][col] = (dqMatrix[x0][1] - dqMatrix[xn][1]) / q;
        }
      }
    }

    setDQMatrix(dqMatrix);
  }, [PMatrix]);

  function MakeInputMatrix() {
    const matrix: JSX.Element[] = [];

    for (let r = 0; r < squNum; r++) {
      const row: JSX.Element[] = [];

      for (let c = 0; c < squNum; c++) {
        row.push(
          <td key={`${r}-${c}`}>
            <InputNumber value={PMatrix.at(r)?.at(c)}
              onChange={(e) => {
                const newMatrix = [...PMatrix];
                newMatrix[r][c] = Number(e);
                setPMatrix(newMatrix);
              }} />
          </td>
        );
      }

      matrix.push(<tr key={r}>{row}</tr>);
    }

    return <table style={{
      width: "fit-content",
    }}>
      {matrix}
    </table>
  }

  return (
    <PageContainer breadcrumbRender={false}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        <InputNumber value={squNum} onChange={x => {
          const newMatrix: number[][] = [];
          for (let i = 0; i < x; i++)
            newMatrix.push(PMatrix[i]);

          setPMatrix(newMatrix);
          return setSquNum(Number(x));
        }} />

        <table>
          <tr>
            <td> xi </td>
            <td> yi </td>
            <td> f' </td>
            <td> f'' </td>
            <td> f''' </td>
            <td> f'''' </td>
          </tr>
        </table>

        <MakeInputMatrix />

        <img src={formula} style={{ width: '100%' }} />
        <Divider style={{ margin: "unset" }} />

        <section>
          <p>
            差商表 <br />
            <MakeMatrix matrix={DQMatrix} squ={squNum + 1} />
          </p>

          <img src={h} style={{ width: '100%' }} />
        </section>

      </div>
    </PageContainer>
  )
}
