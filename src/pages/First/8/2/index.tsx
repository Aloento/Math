import { PageContainer } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { math } from '@/global'
import type { MathNode } from "mathjs";
import { suppress } from "@/helpers";
import { Divider, Input, InputNumber } from "antd";
import exp from './exp.png';

export default function Contraction() {
  const [RawFunc, setRawFunc] = useState(math.parse("(x^3 - 2)/4"));
  const [Inter, setInter] = useState<number[]>([-1, 0]);

  const [derFunc, setDerFunc] = useState<MathNode>(null!);

  useEffect(() => {
    setDerFunc(suppress(() => math.derivative(RawFunc, "x")));
  }, [RawFunc]);

  return (
    <PageContainer breadcrumbRender={false}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>

        <Input placeholder={`${RawFunc}`} onChange={x => setRawFunc(suppress(() => math.parse(x.target.value)))} />
        <InputNumber placeholder={`${Inter[0]}`} onChange={x => setInter([x as number, Inter[1]])} />
        <InputNumber placeholder={`${Inter[1]}`} onChange={x => setInter([Inter[0], x as number])} />

        判断函数 {`${RawFunc}`} 是否在 {Inter[0]} 和 {Inter[1]} 之间收敛

        <Divider style={{ margin: "unset" }} />

        <section>
          <p>
            1, 判断前置条件 <br />
            f'(x) = {math.format(derFunc)} <br />
            判断函数一阶导在范围内： {">"} 0 单增， {"<"} 0 单减 <br />

            如果满足条件则: <br />
            R(f) = [f({Inter[0]}), f({Inter[1]})] = [
            {suppress(() => math.format(RawFunc.evaluate({ x: Inter[0] })))}, {suppress(() => math.format(RawFunc.evaluate({ x: Inter[1] })))}] ⊆ [{Inter[0]}, {Inter[1]}] <br />
          </p>

          <p>
            2, 进一步检查 <br />
            <img src={exp} style={{ width: "100%" }} />
          </p>
        </section>

      </div>
    </PageContainer>
  )
}
