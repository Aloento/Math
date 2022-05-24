import { PageContainer } from "@ant-design/pro-components";
import { Divider, InputNumber } from "antd";
import { useEffect, useState } from "react";
import poly from './poly.png'
import MakeMatrix from "@/ShowMatrix";

export default function Interpolates() {
  const [Row, setRow] = useState(5);
  const [PMatrix, setPMatrix] = useState([
    [-2, -39],
    [-1, -5],
    [0, 1],
    [1, 3],
    [2, 25]
  ]);

  const [DQMatrix, setDQMatrix] = useState<number[][]>([]);

  useEffect(() => {
    const dqMatrix = [...PMatrix] as any[][];

    for (let row = 1; row < Row; row++) {
      for (let col = 2; col < row + 2; col++) {
        const x0 = (row - 1) - (col - 2);
        const xn = row;
        const q = dqMatrix[x0][0] - dqMatrix[xn][0];

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

    for (let r = 0; r < Row; r++) {
      const row: JSX.Element[] = [];

      for (let c = 0; c < 2; c++) {
        row.push(
          <td key={`${r}-${c}`}>
            <InputNumber placeholder={PMatrix.at(r)?.at(c)}
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

        <InputNumber value={Row} onChange={x => {
          const newMatrix: number[][] = [];
          for (let i = 0; i < x; i++) {
            newMatrix.push(PMatrix[i] || [0, 0]);
          }

          setPMatrix(newMatrix);
          return setRow(Number(x));
        }} />

        <MakeInputMatrix />

        Give the polynomial of minimal degree what is interpolates the points
        Newton-way
        <Divider style={{ margin: "unset" }} />

        <section>
          <p>
            差商表 <br />
            <MakeMatrix matrix={DQMatrix} squ={Row + 1} />
          </p>

          <p>
            Newton form of the interpolation polynomia <br />

            N_{Row - 1} (x) =
            <img src={poly} />
          </p>
        </section>

      </div>
    </PageContainer>
  )
}
