import { math } from "@/global";
import { suppress } from "@/helpers";
import luDecomposition from "@/LU";
import MakeMatrix from "@/ShowMatrix";
import { PageContainer } from "@ant-design/pro-components";
import { Divider, InputNumber } from "antd";
import { useEffect, useRef, useState } from "react";

export default function LUDecomposition() {
  const [squNum, setSquNum] = useState(3);
  const [rawMatrix, setRawMatrix] = useState([
    [2, 5, 5],
    [-4, -8, -9],
    [6, 25, 23]
  ]);

  const [UMatrix, setUMatrix] = useState<number[][]>([]);
  const [LMatrix, setLMatrix] = useState<number[][]>([]);
  const [ResMatrix, setResMatrix] = useState<{
    lower: number[][];
    upper: number[][];
  }>({} as any);

  useEffect(() => {
    const lnums: number[] = [];
    const unums: number[] = [];
    for (let i = 0; i < squNum * squNum; i++) {
      lnums.push(i + 1);
      unums.push(i + 1);
    }

    const lMatrix: number[][] = [];

    for (let row = 0; row < squNum; row++) {
      lMatrix.push([]);
      for (let col = 0; col < squNum; col++) {
        if (row === col) {
          lMatrix[row].push(1);
        } else if (row < col) {
          lMatrix[row].push(0);
        } else {
          lMatrix[row].push(`L${lnums.shift()}` as any);
        }
      }
    }

    setLMatrix(lMatrix);

    const uMatrix: number[][] = [rawMatrix[0]];

    for (let row = 1; row < squNum; row++) {
      uMatrix.push([]);
      for (let col = 0; col < squNum; col++) {
        if (row > col) {
          uMatrix[row].push(0);
        } else {
          uMatrix[row].push(`U${unums.shift()}` as any);
        }
      }
    }

    setUMatrix(uMatrix);

    setResMatrix(luDecomposition(rawMatrix, squNum));
  }, [rawMatrix]);

  function MakeInputMatrix() {
    const matrix: JSX.Element[] = [];

    for (let r = 0; r < squNum; r++) {
      const row: JSX.Element[] = [];

      for (let c = 0; c < squNum; c++) {
        row.push(
          <td key={`${r}-${c}`}>
            <InputNumber value={rawMatrix.at(r)?.at(c)}
              onChange={(e) => {
                const newMatrix = [...rawMatrix];
                newMatrix[r][c] = Number(e);
                setRawMatrix(newMatrix);
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

  function MakeRawMatrix() {
    const refRawMatrix = useRef<HTMLTableElement>(null);

    useEffect(() => {
      refRawMatrix.current?.setAttribute("border", "1");
    }, [refRawMatrix]);

    const matrix: JSX.Element[] = [];
    const nums: number[] = [];

    for (let i = 0; i < squNum * squNum; i++)
      nums.push(i + 1);

    for (let row = 0; row < squNum; row++) {
      const rowData: JSX.Element[] = [];

      for (let col = 0; col < squNum; col++) {
        rowData.push(
          <td key={`${row}-${col}`}>
            {rawMatrix?.at(row)?.at(col)}
          </td>
        );
      }

      matrix.push(<tr key={row}>{rowData}</tr>);
    }

    return <table ref={refRawMatrix}>
      {matrix}
    </table>
  }

  function MakeExpMatrix() {
    const refExpMatrix = useRef<HTMLTableElement>(null);

    useEffect(() => {
      refExpMatrix.current?.setAttribute("border", "1");
    }, [refExpMatrix]);

    const matrix: JSX.Element[] = [];

    for (let row = 1; row < squNum; row++) {
      const rowData: JSX.Element[] = [];

      for (let col = 0; col < squNum; col++) {
        rowData.push(
          <td key={`${row}-${col}`}>
            {function () {
              let exp = "";

              for (let i = 0; i < squNum; i++) {
                const l = LMatrix?.at(row)?.at(i);
                const u = UMatrix?.at(i)?.at(col);

                if (l !== 0 && u !== 0) {
                  exp += `${l} * `
                  exp += `${u}`

                  if (i < squNum - 1)
                    exp += " + ";
                }

                if (i >= squNum - 1)
                  exp += " = " + rawMatrix[row][col];
              }

              return exp;
            }()}
          </td>
        );
      }

      matrix.push(<tr key={row}>{rowData}</tr>);
    }

    return <table ref={refExpMatrix}>
      {matrix}
    </table>
  }

  function MakeResLMatrix() {
    const refResLMatrix = useRef<HTMLTableElement>(null);

    useEffect(() => {
      refResLMatrix.current?.setAttribute("border", "1");
    }, [refResLMatrix]);

    const matrix: JSX.Element[] = [];

    for (let row = 0; row < squNum; row++) {
      const rowData: JSX.Element[] = [];

      for (let col = 0; col < squNum; col++) {
        rowData.push(
          <td key={`${row}-${col}`}>
            {function () {
              const n = ResMatrix?.lower?.at(row)?.at(col) ?? null!;
              if (n % 1 === 0)
                return n;

              return suppress(() => math.format(math.fraction(n)));
            }()}
          </td>
        );
      }

      matrix.push(<tr key={row}>{rowData}</tr>);
    }

    return <table ref={refResLMatrix}>
      {matrix}
    </table>
  }

  function MakeResUMatrix() {
    const refResUMatrix = useRef<HTMLTableElement>(null);

    useEffect(() => {
      refResUMatrix.current?.setAttribute("border", "1");
    }, [refResUMatrix]);

    const matrix: JSX.Element[] = [];

    for (let row = 0; row < squNum; row++) {
      const rowData: JSX.Element[] = [];

      for (let col = 0; col < squNum; col++) {
        rowData.push(
          <td key={`${row}-${col}`}>
            {function () {
              const n = ResMatrix?.upper?.at(row)?.at(col) ?? null!;
              if (n % 1 === 0)
                return n;

              return suppress(() => math.format(math.fraction(n)));
            }()}
          </td>
        );
      }

      matrix.push(<tr key={row}>{rowData}</tr>);
    }

    return <table ref={refResUMatrix}>
      {matrix}
    </table>
  }

  return (
    <PageContainer breadcrumbRender={false}>
      <div style={{
        display: 'flex',
        gap: '12px',
        flexDirection: 'column',
      }}>
        <InputNumber value={squNum} onChange={x => {
          setRawMatrix(math.matrix(rawMatrix).resize([x, x]).toArray() as number[][]);
          return setSquNum(Number(x));
        }} />

        <MakeInputMatrix />

        <Divider style={{ margin: "unset" }} />

        <section>
          <p>
            1, 列出 L U 和原始矩阵<br />

            <MakeMatrix matrix={LMatrix} squ={squNum} /> <br />
            <div style={{
              display: "flex",
              gap: "10px",
            }}>
              <MakeRawMatrix />
              <MakeMatrix matrix={UMatrix} squ={squNum} />
            </div>
          </p>

          <p>
            2, 列方程计算<br />
            <MakeExpMatrix />
          </p>

          <p>
            3, 解方程组<br />
            L: <MakeResLMatrix /> <br />
            U: <MakeResUMatrix />
          </p>

          <p>
            4, 计算determinanant<br />
            det L = 1<br />
            det A = det L * det U = {suppress(() => math.det(ResMatrix.upper))}<br />
          </p>
        </section>
      </div>
    </PageContainer>
  )
}
