import { PageContainer } from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { math } from '@/global'
import { Divider, Input, InputNumber } from "antd";
import { suppress } from "@/helpers";
import type { Fraction } from "mathjs";

export default function BolzanoMethod() {
  const [Pow, setPow] = useState(3);
  const [Base, setBase] = useState(10);
  const [Acc, setAcc] = useState(math.fraction(1 / 20));

  const [Inter, setInter] = useState<number[]>([]);
  const [Step, setStep] = useState(0);

  useEffect(() => {
    const base = Math.pow(Base, Math.pow(Pow, -1));
    const left = Math.floor(base);
    const right = Math.ceil(base);

    setInter([left, right]);
    setStep(suppress(() => Math.ceil(math.divide(math.log10(math.pow(Acc, -1).valueOf() as number), math.log10(2)))));
  }, [Base, Pow, Acc]);

  function cal(x: number) {
    return suppress(() => math.chain(x).pow(Pow).subtract(Base).fraction().done()) as Fraction;
  }


  function MakeIteration() {
    const refMatrix = useRef<HTMLTableElement>(null);
    useEffect(() => {
      refMatrix.current?.setAttribute("border", "1");
    }, [refMatrix]);

    const tmp: JSX.Element[] = [];
    let x = Inter[0];
    let y = Inter[1];
    let z = () => (x + y) / 2;

    for (let r = 0; r < Step; r++) {
      const row: JSX.Element[] = [];

      for (let c = 0; c < 4; c++) {
        switch (c) {
          case 0:
            row.push(
              <td key={`${r}-${c}`}>
                x{r} = {x}
              </td>
            );
            break;

          case 1:
            row.push(
              <td key={`${r}-${c}`}>
                y{r} = {y}
              </td>
            );
            break;

          case 2:
            row.push(
              <td key={`${r}-${c}`}>
                z{r} = {z()}
              </td>
            );
            break;

          case 3:
            const p = suppress(() => math.number(cal(z())));

            if (p > 0) {
              y = z();
            } else {
              x = z();
            }

            row.push(
              <td key={`${r}-${c}`}>
                P(z{r}) = {p}
              </td>
            );
            break;
        }
      }

      tmp.push(<tr key={r}>{row}</tr>);
    }

    return <table ref={refMatrix}>
      {tmp}
    </table>
  }

  return (
    <PageContainer breadcrumbRender={false}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>

        <InputNumber placeholder={Pow} onChange={x => setPow(x)} />
        <InputNumber placeholder={Base} onChange={x => setBase(x)} />
        <Input placeholder={suppress(() => math.format(Acc))} onChange={x => setAcc(suppress(() => math.fraction(x.target.value)))} />

        求一个精度为 {suppress(() => math.format(Acc))}，接近 {Pow}√{Base} 的序列

        <Divider style={{ margin: "unset" }} />

        <section>
          <p>
            1, 分析 <br />
            P(x) = x^{Pow} - {Base} 的根是 x^* = {Pow}√{Base} <br />
            用 bisection method, 定义一个区间 [a, b] 包含 x^* 且 P(a) * P(b) {"<"} 0 <br />
            [a, b] = [{Inter[0]}, {Inter[1]}] <br />

            P({Inter[0]}) = {math.format(cal(Inter[0]))} {"<"} 0<br />
            P({Inter[1]}) = {math.format(cal(Inter[1]))} {">"} 0 <br />

            所以 x^* ∈ [{Inter[0]}, {Inter[1]}] <br />
          </p>

          <p>
            2, Error estimation <br />

            |xk - x^*| 与 |yk - y^*| {"<="} 1 / 2^k {"<"} {suppress(() => math.format(Acc))} <br />
            即 2^k {">"} {suppress(() => math.format(math.pow(Acc, -1)))} <br />
            所以我们需要 k = {Step} <br />
          </p>

          <p>
            3, Iteration <br />
            <MakeIteration />
            最后一个 Z 就是 x^* 的大致值 <br />
          </p>
        </section>
      </div>
    </PageContainer>
  )
}
