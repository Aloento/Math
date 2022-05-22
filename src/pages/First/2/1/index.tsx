import { PageContainer } from "@ant-design/pro-components";
import { Divider, InputNumber } from "antd";
import { useEffect } from "react";
import { useRef, useState } from "react";

export default function CholeskyDecomposition() {
  const [rawMatrix, setRawMatrix] = useState<number[][]>([]);
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

    return <>{matrix}</>
  }

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

    return <>{matrix}</>
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

    return <>{matrix}</>
  }

  const lvarMatrix = useRef<HTMLTableElement>(null);
  const rowVarMatrix = useRef<HTMLTableElement>(null);
  useEffect(() => {
    lvarMatrix.current?.setAttribute("border", "1");
    rowVarMatrix.current?.setAttribute("border", "1");
  }, [rawMatrix, rowVarMatrix]);

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
          <InputNumber placeholder={`${squNum}`} onChange={x => {
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

        <table style={{
          width: "fit-content",
        }}>
          <MakeInputMatrix />
        </table>

        <Divider style={{ margin: "unset" }} />

        <section>
          <p>
            1, 列出L下三角矩阵与原始方阵<br />

            <div style={{
              display: "flex",
              gap: "10px",
            }}>
              <table ref={lvarMatrix}>
                <MakeLVarMatrix />
              </table>

              <table ref={rowVarMatrix}>
                <MakeRowVarMatrix />
              </table>
            </div>
          </p>

          <p>
            2, 计算L变量<br />

          </p>
        </section>
      </div>
    </PageContainer>
  )
}
