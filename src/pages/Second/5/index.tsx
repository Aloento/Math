import { PageContainer } from "@ant-design/pro-components";
import { Divider, InputNumber } from "antd";
import { useEffect, useRef, useState } from "react";
import normal from './normal.png'

export default function LeastSquares() {
  const [Len, setLen] = useState(5);
  const [X, setX] = useState([-2, -1, 0, 1, 2]);
  const [Y, setY] = useState([-4, -2, 1, 2, 4]);

  const [xi, setXi] = useState(0);
  const [xi2, setXi2] = useState(0);
  const [yi, setYi] = useState(0);
  const [xyi, setXYi] = useState(0);

  useEffect(() => {
    setXi(X.reduce((a, b) => a + b, 0));
    setXi2(X.reduce((a, b) => a + Math.pow(b, 2), 0));
    setYi(Y.reduce((a, b) => a + b, 0));
    setXYi(X.reduce((a, b, i) => a + b * Y[i], 0));
  }, [X, Y]);

  function MakeInputMatrix() {
    const matrix: JSX.Element[] = [];

    for (let r = 0; r < 2; r++) {
      const row: JSX.Element[] = [];

      for (let c = 0; c < Len; c++) {
        const M = r === 0 ? X : Y;

        row.push(
          <td key={`${r}-${c}`}>
            <InputNumber value={M.at(c)}
              onChange={(e) => {
                const newMatrix = [...M];
                newMatrix[c] = Number(e);
                r === 0 ? setX(newMatrix) : setY(newMatrix);
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

  function MakeLES() {
    const refMatrix = useRef<HTMLTableElement>(null);

    useEffect(() => {
      refMatrix.current?.setAttribute("border", "1");
    }, [refMatrix]);

    const tmp: JSX.Element[] = [];

    for (let row = 0; row < Len; row++) {
      const rowData: JSX.Element[] = [];

      rowData.push(
        <td key={`${row}-${0}`}>
          1
        </td>
      );

      rowData.push(
        <td key={`${row}-${1}`}>
          {X[row]}
        </td>
      );

      tmp.push(<tr key={row}>{rowData}</tr>);
    }

    return <table ref={refMatrix}>
      {tmp}
    </table>
  }

  function MakeP() {
    const refMatrix = useRef<HTMLTableElement>(null);

    useEffect(() => {
      refMatrix.current?.setAttribute("border", "1");
    }, [refMatrix]);

    return <table ref={refMatrix}>
      <tr>
        <td>
          p0
        </td>
      </tr>
      <tr>
        <td>
          p1
        </td>
      </tr>
    </table>
  }

  function MakeY() {
    const refMatrix = useRef<HTMLTableElement>(null);

    useEffect(() => {
      refMatrix.current?.setAttribute("border", "1");
    }, [refMatrix]);

    const tmp: JSX.Element[] = [];

    for (let row = 0; row < Len; row++) {
      const rowData: JSX.Element[] = [];

      rowData.push(
        <td key={`${row}-${0}`}>
          {Y[row]}
        </td>
      );

      tmp.push(<tr key={row}>{rowData}</tr>);
    }

    return <table ref={refMatrix}>
      {tmp}
    </table>
  }

  function MakeG() {
    const refMatrix = useRef<HTMLTableElement>(null);
    const refYMatrix = useRef<HTMLTableElement>(null);

    useEffect(() => {
      refMatrix.current?.setAttribute("border", "1");
      refYMatrix.current?.setAttribute("border", "1");
    }, [refMatrix]);

    return <div style={{
      display: 'flex',
      alignItems: 'center',
    }}>
      <table ref={refMatrix}>
        <tr>
          <td>
            {Len}
          </td>
          <td>
            {xi}
          </td>
        </tr>
        <tr>
          <td>
            {xi}
          </td>
          <td>
            {xi2}
          </td>
        </tr>
      </table>
      *
      <MakeP />
      =
      <table ref={refYMatrix}>
        <tr>
          <td>
            {yi}
          </td>
        </tr>
        <tr>
          <td>
            {xyi}
          </td>
        </tr>
      </table>
    </div>
  }

  return (
    <PageContainer breadcrumbRender={false}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>

        <InputNumber value={Len} onChange={x => {
          return setLen(Number(x));
        }} />

        <MakeInputMatrix />

        给这些点找一个一阶多项式（过拟合状态，一阶只需要两个点）
        <Divider style={{ margin: "unset" }} />

        <section>
          <p>
            1, overdetermined LES <br />
            <div style={{
              display: 'flex',
              alignItems: 'center',
            }}>
              <MakeLES />
              *
              <MakeP />
              =
              <MakeY />
            </div>
          </p>

          <p>
            2, <img src={normal} style={{ width: "100%" }} />

            N = {Len} <br />
            ∑ xi = {X.reduce((a, b) => a + `(${b}) + `, "")} =  {xi} <br />
            ∑ xi^2 = {X.reduce((a, b) => a + `(${b})^2 + `, "")} = {xi2} <br />
            ∑ yi = {Y.reduce((a, b) => a + `(${b}) + `, "")} = {yi} <br />
            ∑ xi*yi = {X.reduce((a, b, i) => a + `(${b}) * (${Y[i]}) + `, "")} = {xyi} <br />
          </p>

          <p>
            3, <br />
            <MakeG />
          </p>

          <p>
            4, <a href={"https://www.wolframalpha.com/input?i=" + encodeURIComponent(`${Len} * p0 + ${xi} * p1 = ${yi} and ${xi} * p0 + ${xi2} * p1 = ${xyi}`)} target={"_blank"} children="解方程" /> <br />
            {Len} * p0 + {xi} * p1 = {yi} <br />
            {xi} * p0 + {xi2} * p1 = {xyi} <br />

            P_1(x) = p1 * x + p0 <br />
          </p>
        </section>
      </div>
    </PageContainer>
  )
}
