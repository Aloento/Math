import { PageContainer } from "@ant-design/pro-components";
import { math } from '@/global'
import { useEffect, useState } from "react";
import type { MathNode } from "mathjs";
import { suppress } from "@/helpers";
import { Divider, Input, InputNumber } from "antd";
import k1 from './k1.png';
import k3 from './3.png';

export default function NewtonRaphson() {
  const [RawFunc, setRawFunc] = useState(math.parse("cos(x) - 4 * x + 2"));
  const [DerFunc, setDerFunc] = useState<MathNode>(null!);
  const [Der2Func, setDer2Func] = useState<MathNode>(null!);

  const [Root, setRoot] = useState(0.692425);
  const [Upper, setUpper] = useState<MathNode>(null!);
  const [Lower, setLower] = useState<MathNode>(null!);

  useEffect(() => {
    const d = suppress(() => math.derivative(RawFunc, "x"));
    setDerFunc(d);
    setDer2Func(suppress(() => math.derivative(d, "x")));
  }, [RawFunc]);

  useEffect(() => {
    setUpper(suppress(() => math.resolve(RawFunc, ({ x: Math.floor(Root) }))));
    setLower(suppress(() => math.resolve(RawFunc, ({ x: Math.ceil(Root) }))));
  }, [Root]);

  return (
    <PageContainer breadcrumbRender={false}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        <Input placeholder={`${RawFunc}`} onChange={x => setRawFunc(suppress(() => math.parse(x.target.value)))} />

        用 NewtonRaphson 法求f(x) = {`${RawFunc}`} 的根, x0 为多少时函数收敛？
        <Divider style={{ margin: "unset" }} />

        <section>
          <p>
            1, 求导 <br />
            f'(x) = {math.format(DerFunc)} <br />

            <img src={k1} /> <br />
            {`(${RawFunc})`} / {`(${DerFunc})`}
          </p>

          <p>
            2, 为了找到合适的起始元素x0, 使用单调收敛定理。<br />
          </p>

          <p>
            1) 存在 x^* ∈ [a, b] <br />
            <a href={"https://www.wolframalpha.com/input?i=" + encodeURIComponent(`roots ${RawFunc}`)} target="_blank" children={`先求 ${RawFunc} 的根`} /> <br />
            <InputNumber value={`${Root}`} onChange={x => setRoot(Number(x))} /> <br />
            f({Math.floor(Root)}) = {suppress(() => `${Upper}`)} = {suppress(() => Upper.evaluate())} <br />
            f({Math.ceil(Root)}) = {suppress(() => `${Lower}`)} = {suppress(() => Lower.evaluate())} <br />

            {"=>"} x^* ∈ [{Math.floor(Root)}, {Math.ceil(Root)}] <br />
          </p>

          <p>
            2, 判断一二阶导符号 <br />

            f'(x) = <a href={"https://www.wolframalpha.com/input?i=" + encodeURIComponent(`maximize ${math.format(DerFunc)}`)} target="_blank" children={math.format(DerFunc)} /> <br />
            f''(x) = <a href={"https://www.wolframalpha.com/input?i=" + encodeURIComponent(`maximize ${math.format(Der2Func)} ${`x ∈ [${Math.floor(Root)}, ${Math.ceil(Root)}] `}`)} target="_blank" children={math.format(Der2Func)} /> 在 x ∈ [{Math.floor(Root)}, {Math.ceil(Root)}] 中 <br />
          </p>

          <img src={k3} style={{ width: "100%" }} /> <br />
        </section>

      </div>
    </PageContainer>
  )
}
