import { PageContainer } from "@ant-design/pro-components";
import { Divider, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { math } from "@/global";
import type { Fraction } from "mathjs";
import formula from "./formula.png";
import { suppress } from "@/helpers";
import MakeMatrix from "@/ShowMatrix";
import err from "./err.png";

export default function JacobiIteration() {
  const [squNum, setSquNum] = useState(3);
  const [tol, setTol] = useState<Fraction>(math.evaluate("10^-2"));

  const [AMatrix, setAMatrix] = useState([
    [5, 1, -2],
    [-1, 4, 2],
    [0, 3, 4]
  ]);

  const [BMatrix, setBMatrix] = useState([[2], [5], [1]]);

  function MakeAMatrix() {
    const matrix: JSX.Element[] = [];

    for (let r = 0; r < squNum; r++) {
      const row: JSX.Element[] = [];

      for (let c = 0; c < squNum; c++) {
        row.push(
          <td key={`${r}-${c}`}>
            <InputNumber value={AMatrix.at(r)?.at(c)}
              onChange={(e) => {
                const newMatrix = [...AMatrix];
                newMatrix[r][c] = Number(e);
                setAMatrix(newMatrix);
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

  function MakeBMatrix() {
    const matrix: JSX.Element[] = [];

    for (let c = 0; c < squNum; c++) {
      matrix.push(
        <tr key={c}>
          <InputNumber value={BMatrix.at(c)?.at(0)}
            onChange={(e) => {
              const newMatrix = [...BMatrix];
              newMatrix[c][0] = Number(e);
              setBMatrix(newMatrix);
            }} />
        </tr>
      );
    }

    return <table style={{
      width: "fit-content",
    }}>
      {matrix}
    </table>
  }

  const [LMatrix, setLMatrix] = useState<number[][]>([]);
  const [DMatrix, setDMatrix] = useState<number[][]>([]);
  const [UMatrix, setUMatrix] = useState<number[][]>([]);

  const [DIMatrix, setDIMatrix] = useState<number[][]>([]);
  const [LUMatrix, setLUMatrix] = useState<number[][]>([]);
  const [BjMatrix, setBjMatrix] = useState<number[][]>([]);
  const [CjMatrix, setCjMatrix] = useState<number[][]>([]);

  useEffect(() => {
    const lMatrix: number[][] = [];
    const dMatrix: number[][] = [];
    const uMatrix: number[][] = [];

    const dlMatrix: number[][] = [];
    const luMatrix: number[][] = [];

    for (let row = 0; row < squNum; row++) {
      lMatrix.push([]);
      dMatrix.push([]);
      uMatrix.push([]);

      dlMatrix.push([]);
      luMatrix.push([]);

      for (let col = 0; col < squNum; col++) {
        const n = AMatrix.at(row)?.at(col)!;

        if (row > col) {
          lMatrix[row][col] = luMatrix[row][col] = n;
          dMatrix[row][col] = dlMatrix[row][col] = uMatrix[row][col] = 0;
        } else if (row === col) {
          lMatrix[row][col] = uMatrix[row][col] = luMatrix[row][col] = 0;
          dMatrix[row][col] = n;
          dlMatrix[row][col] = suppress(() => math.chain(n).pow(-1).done());
        } else {
          lMatrix[row][col] = dMatrix[row][col] = dlMatrix[row][col] = 0;
          uMatrix[row][col] = luMatrix[row][col] = n;
        }
      }
    }

    setLMatrix(lMatrix);
    setDMatrix(dMatrix);
    setUMatrix(uMatrix);

    setDIMatrix(dlMatrix);
    setLUMatrix(luMatrix);

    setBjMatrix(suppress(() => math.chain(-1).multiply(dlMatrix).multiply(luMatrix).done()));
    setCjMatrix(suppress(() => math.chain(dlMatrix).multiply(BMatrix).done()));
  }, [AMatrix, BMatrix]);

  const [BjNorm, setBjNorm] = useState("");
  const [CjNorm, setCjNorm] = useState("");

  useEffect(() => {
    setBjNorm(suppress(() => math.format(math.fraction(math.norm(BjMatrix, 1)))));
    setCjNorm(suppress(() => math.format(math.fraction(math.norm(CjMatrix, 1)))));
  }, [BjMatrix, CjMatrix]);

  const [exp, setExp] = useState("");
  useEffect(() => {
    setExp(`(((${BjNorm}) ^ k) / (${suppress(() => math.format(math.subtract(1, math.fraction(BjNorm))))})) * ${CjNorm} ${"<"} ${math.format(tol)}`);
  }, [BjNorm, CjNorm, tol]);

  return (
    <PageContainer breadcrumbRender={false}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        <InputNumber value={squNum} onChange={x => {
          setAMatrix(math.matrix(AMatrix).resize([x, x]).toArray() as number[][]);
          setBMatrix(math.matrix(BMatrix).resize([x, 1]).toArray() as number[][]);
          return setSquNum(Number(x));
        }} />

        <Input placeholder={"10^-2"} onChange={x => setTol(suppress(() => math.evaluate(x.target.value)))} />

        <MakeAMatrix />
        <MakeBMatrix />

        ????????? X^(0) ??? R^3 ??????????????????<br />
        ??? X^(0) = 0 ???????????????????????????????????? {math.format(tol)} ????????????
        <Divider style={{ margin: "unset" }} />

        <section>
          <p>
            1, ??? A ????????? LDU <br />
            L: <MakeMatrix matrix={LMatrix} squ={squNum} /> <br />
            D: <MakeMatrix matrix={DMatrix} squ={squNum} />  <br />
            U: <MakeMatrix matrix={UMatrix} squ={squNum} />  <br />
          </p>

          <p>
            2, ??????<br />
            <img src={formula} style={{ width: "100%" }} />
          </p>

          <p>
            3, ?????? Bj cj <br />
            Bj = -D^-1 (L + U) =
            ---
            <MakeMatrix matrix={DIMatrix} squ={squNum} />
            *
            <MakeMatrix matrix={LUMatrix} squ={squNum} />
            =
            <MakeMatrix matrix={BjMatrix} squ={squNum} /> <br />

            cj = D^-1 * b =
            <MakeMatrix matrix={DIMatrix} squ={squNum} />
            *
            <MakeMatrix matrix={BMatrix} squ={squNum} />
            =
            <MakeMatrix matrix={CjMatrix} squ={squNum} /> <br />
          </p>

          <p>
            4, ?????????????????? <br />
            || Bj || {"<"} 1 ???????????? fixed point ???????????? <br />
            q = || Bj ||_1 = {BjNorm} <br />
            ???????????????????????? X^(0) ??? R^3 ???????????? <br />
          </p>

          <p>
            5, ???????????? <br />

            x^(0) = 0 <br />
            x^(1) = Bjx^(0) + cj = cj = <MakeMatrix matrix={CjMatrix} squ={squNum} /> <br />

            x(1) - x(0) = x^(1) = cj {"=>"} || x^(1) - x(0) ||_1 = || cj ||_1 = {CjNorm} <br />
            ??????????????? <br />
            <img src={err} /> <br />

            <a href={"https://www.wolframalpha.com/input?i=" + encodeURIComponent(`${exp}`)} children={exp} target={"_blank"} /> <br />
            Real solution ????????????????????????
          </p>
        </section>
      </div>
    </PageContainer>
  )
}
