import { PageContainer } from "@ant-design/pro-components";
import { Divider, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { math } from "@/global";
import type { Fraction } from "mathjs";
import formula from "./formula.png";
import { suppress } from "@/helpers";
import MakeMatrix from "@/ShowMatrix";
import err from "./err.png";

export default function GaussSeidel() {
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

  const [LDMatrix, setLDMatrix] = useState<number[][]>([]);
  const [LD1Matrix, setLD1Matrix] = useState<number[][]>([]);

  const [BsMatrix, setBsMatrix] = useState<number[][]>([]);
  const [CsMatrix, setCsMatrix] = useState<number[][]>([]);

  useEffect(() => {
    const lMatrix: number[][] = [];
    const dMatrix: number[][] = [];
    const uMatrix: number[][] = [];

    const ldMatrix: number[][] = [];


    for (let row = 0; row < squNum; row++) {
      lMatrix.push([]);
      dMatrix.push([]);
      uMatrix.push([]);

      ldMatrix.push([]);

      for (let col = 0; col < squNum; col++) {
        const n = AMatrix.at(row)?.at(col)!;

        if (row > col) {
          lMatrix[row][col] = ldMatrix[row][col] = n;
          dMatrix[row][col] = uMatrix[row][col] = 0;
        } else if (row === col) {
          lMatrix[row][col] = uMatrix[row][col] = 0;
          dMatrix[row][col] = ldMatrix[row][col] = n;
        } else {
          lMatrix[row][col] = dMatrix[row][col] = ldMatrix[row][col] = 0;
          uMatrix[row][col] = n;
        }
      }
    }

    setLMatrix(lMatrix);
    setDMatrix(dMatrix);
    setUMatrix(uMatrix);

    setLDMatrix(ldMatrix);

    const ld1Matrix: number[][] = suppress(() => math.inv(ldMatrix));
    setLD1Matrix(ld1Matrix);

    setBsMatrix(suppress(() => math.chain(-1).multiply(ld1Matrix).multiply(uMatrix).done()));
    setCsMatrix(suppress(() => math.chain(ld1Matrix).multiply(BMatrix).done()));
  }, [AMatrix, BMatrix]);

  const [BsNorm, setBsNorm] = useState("");
  const [CsNorm, setCsNorm] = useState("");

  useEffect(() => {
    setBsNorm(suppress(() => math.format(math.fraction(math.norm(BsMatrix, Infinity)))));
    setCsNorm(suppress(() => math.format(math.fraction(math.norm(CsMatrix, Infinity)))));
  }, [BsMatrix, CsMatrix]);

  const [exp, setExp] = useState("");
  useEffect(() => {
    setExp(`(((${BsNorm}) ^ k) / (${suppress(() => math.format(math.subtract(1, math.fraction(BsNorm))))})) * ${CsNorm} ${"<"} ${math.format(tol)}`);
  }, [BsNorm, CsNorm, tol]);

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

        它对于 X^(0) ∈ R^3 是收敛的吗？<br />
        从 X^(0) = 0 开始，需要多少步才能达到 {math.format(tol)} 的精度？
        <Divider style={{ margin: "unset" }} />

        <section>
          <p>
            1, 将 A 拆分成 LDU <br />
            L: <MakeMatrix matrix={LMatrix} squ={squNum} /> <br />
            D: <MakeMatrix matrix={DMatrix} squ={squNum} />  <br />
            U: <MakeMatrix matrix={UMatrix} squ={squNum} />  <br />
          </p>

          <p>
            2, 用Gaussian elimination 计算 L + D 的 invertate<br />
            <a href={`https://www.wolframalpha.com/input?i=Inverse matrix ${suppress(() => math.format(LDMatrix))}`}
              target="_blank" children={`Inverse matrix ${suppress(() => math.format(LDMatrix))}`} />
            <MakeMatrix matrix={LD1Matrix} squ={squNum} />
            <img src={formula} style={{ width: "100%" }} />
          </p>

          <p>
            3, 计算 Bj cj <br />
            Bs = -(L + D)^-1 * U =
            ---
            <MakeMatrix matrix={LD1Matrix} squ={squNum} />
            *
            <MakeMatrix matrix={UMatrix} squ={squNum} />
            =
            <MakeMatrix matrix={BsMatrix} squ={squNum} /> <br />

            cs = (L + D)^-1 * b =
            <MakeMatrix matrix={LD1Matrix} squ={squNum} />
            *
            <MakeMatrix matrix={BMatrix} squ={squNum} />
            =
            <MakeMatrix matrix={CsMatrix} squ={squNum} /> <br />
          </p>

          <p>
            4, 检查收敛条件 <br />
            || Bs || {"<"} 1 则不动点 fixed point 规则适用 <br />
            q = || Bs ||_∞ = {BsNorm} <br />
            若小于一则它对于 X^(0) ∈ R^3 是收敛的 <br />
          </p>

          <p>
            5, 计算步数 <br />

            x^(0) = 0 <br />
            x^(1) = Bsx^(0) + cj = cj = <MakeMatrix matrix={CsMatrix} squ={squNum} /> <br />

            x(1) - x(0) = x^(1) = cs {"=>"} || x^(1) - x(0) ||_1 = || cs ||_1 = {CsNorm} <br />
            不动点规则 <br />
            <img src={err} /> <br />

            <a href={`https://www.wolframalpha.com/input?i=${exp}`} children={exp} target={"_blank"} /> <br />
            Real solution 向上取整就是步数
          </p>
        </section>
      </div>
    </PageContainer>
  )
}
