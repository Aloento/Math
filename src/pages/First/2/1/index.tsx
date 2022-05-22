import Cholesky from "@/Cholesky";
import { math } from "@/global";
import { suppress } from "@/helpers";
import { PageContainer } from "@ant-design/pro-components";
import { Divider, InputNumber } from "antd";
import { useEffect } from "react";
import { useRef, useState } from "react";

export default function CholeskyDecomposition() {
  const [rawMatrix, setRawMatrix] = useState<number[][]>([
    [4, 2, -2, 4],
    [2, 10, 5, -1],
    [-2, 5, 9, 0],
    [4, -1, 0, 10]
  ]);
  const [squNum, setSquNum] = useState(4);

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

  const lvarMatrix = useRef<HTMLTableElement>(null);
  const rowVarMatrix = useRef<HTMLTableElement>(null);
  const compLMatrix = useRef<HTMLTableElement>(null);
  const expComMatrix = useRef<HTMLTableElement>(null);
  useEffect(() => {
    lvarMatrix.current?.setAttribute("border", "1");
    rowVarMatrix.current?.setAttribute("border", "1");
    compLMatrix.current?.setAttribute("border", "1");
    expComMatrix.current?.setAttribute("border", "1");
  }, [rawMatrix, rowVarMatrix]);

  function MakeLVarMatrix() {
    const matrix: JSX.Element[] = [];

    for (let r = 0; r < squNum; r++) {
      const row: JSX.Element[] = [];

      for (let c = 0; c < squNum; c++) {
        row.push(
          <td key={`${r}-${c}`}>
            {c <= r ? `L${r + 1}${c + 1}` : 0}
          </td>
        );
      }

      matrix.push(<tr key={r}>{row}</tr>);
    }

    return <table ref={lvarMatrix}>
      {matrix}
    </table>
  }

  function MakeRowVarMatrix() {
    const matrix: JSX.Element[] = [];

    for (let r = 0; r < squNum; r++) {
      const row: JSX.Element[] = [];

      for (let c = 0; c < squNum; c++) {
        row.push(
          <td key={`${r}-${c}`}>
            {rawMatrix.at(r)?.at(c) || 0}
          </td>
        );
      }

      matrix.push(<tr key={r}>{row}</tr>);
    }

    return <table ref={rowVarMatrix}>
      {matrix}
    </table>
  }

  function MakeExpComMatrix() {
    const matrix: JSX.Element[] = [];

    for (let r = 0; r < squNum; r++) {
      const row: JSX.Element[] = [];

      for (let c = 0; c < squNum; c++) {
        row.push(
          <td key={`${r}-${c}`}>
            {function () {
              let exp = "";
              for (let i = 0; i < squNum; i++) {
                if (c > r) {
                  exp = "0";
                  continue;
                }

                let L = `L${r + 1}${i + 1}`;
                if (i > r)
                  L = `0`;

                exp += `${L} * ${L}`;
                if (i < squNum - 1)
                  exp += " + ";
                else
                  exp += " = " + rawMatrix.at(r)?.at(c);
              }

              return exp;
            }()}
          </td>
        );
      }

      matrix.push(<tr key={r}>{row}</tr>);
    }

    return <table ref={expComMatrix}>
      {matrix}
    </table>
  }

  function MakeCompLMatrix() {
    const comp: number[][] = suppress(() => Cholesky(rawMatrix));
    const matrix: JSX.Element[] = [];

    for (let r = 0; r < squNum; r++) {
      const row: JSX.Element[] = [];

      for (let c = 0; c < squNum; c++) {
        row.push(
          <td key={`${r}-${c}`}>
            {function () {
              const num = comp?.at(r)?.at(c) || 0;
              if (num % 1 === 0)
                return num;
              return suppress(() => math.format(math.fraction(num)))
            }()}
          </td>
        );
      }

      matrix.push(<tr key={r}>{row}</tr>);
    }

    return <table ref={compLMatrix}>
      {matrix}
    </table>
  }

  return (
    <PageContainer breadcrumbRender={false}>
      <div style={{
        display: "flex",
        gap: "12px",
        flexDirection: "column"
      }}>
        <div style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}>
          <InputNumber value={squNum} onChange={x => {
            const newMatrix: number[][] = [];
            for (let r = 0; r <= squNum; r++) {
              newMatrix[r] = [];
              for (let c = 0; c <= squNum; c++)
                newMatrix[r][c] = 1;
            }

            setRawMatrix(newMatrix);
            return setSquNum(Number(x));
          }} />
        </div>

        <MakeInputMatrix />

        <Divider style={{ margin: "unset" }} />

        <section>
          <p>
            1, 列出L下三角矩阵与原始方阵<br />

            <div style={{
              display: "flex",
              gap: "10px",
            }}>
              <MakeLVarMatrix />
              <MakeRowVarMatrix />
            </div>
          </p>

          <p>
            2, 计算L变量<br />
            <MakeExpComMatrix />
            <MakeCompLMatrix />
          </p>
        </section>
      </div>
    </PageContainer>
  )
}
