import { PageContainer } from "@ant-design/pro-components";
import { Divider, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { math } from '@/global';
import { suppress } from "@/helpers";

export default function MachineNumber() {
  const [digits, setDigits] = useState(7);
  const [topExp, setTopExp] = useState(3);
  const [bottomExp, setBottomExp] = useState(-3);
  const [dec, setDec] = useState(math.fraction(-3.17));

  const [max, setMax] = useState(math.fraction(0));
  const [min, setMin] = useState(math.fraction(0));

  const [intBin, setIntBin] = useState("");
  const [radBin, setRadBin] = useState("");
  const [power, setPower] = useState(0);

  useEffect(function CheckRange() {
    const m = math.chain(1)
      .subtract(math.pow(2, -digits))
      .multiply(math.pow(2, topExp))
      .fraction().done();
    setMax(m);

    const n = math.chain(2).pow(bottomExp - 1).fraction().done();
    setMin(n);
  }, [digits, topExp, bottomExp]);

  useEffect(() => {
    setIntBin(Math.trunc(Number(`${math.number(dec)}`)).toString(2));
  }, [dec]);

  function ToBinary() {
    const radix = math.number(dec).toString().split('.')[1];
    const len = radix?.length;
    const num = parseInt(radix);
    const liter = [[NaN, num]];

    for (let i = 0; i < digits - 1; i++) {
      const last = liter[liter.length - 1];
      const next = last[1] * 2;
      const nextLen = next.toString().length;

      if (nextLen > len) {
        liter.push([parseInt(next.toString()[0]), parseInt(next.toString().substring(1))]);
      } else {
        liter.push([0, next]);
      }
    }

    setRadBin(
      liter.reduce((acc, cur, pos) =>
        pos === 0 ? "" : acc + cur[0], "")
    );

    return (
      <table style={{ border: "1px solid black" }}>
        {liter.map(([a, b], i) => (
          <tr key={i}>
            <td>{a}</td>
            <td>{b}</td>
          </tr>
        ))}
      </table>
    );
  }

  const [rad, setRad] = useState("");
  const [remain, setRemain] = useState("");

  function Move() {
    const int = parseInt(intBin);
    const abs = Math.abs(int);
    let num = `${intBin}.${radBin}`;

    if (abs > 0) {
      num = `${int > 0 ? "" : "-"}0.${abs}${radBin}`;
      setPower(`${abs}`.length);
    }

    let rad = num.split(".")[1];
    let remain = "";
    if (rad.length > digits) {
      const r = rad.substring(digits);
      setRemain(r);
      remain = " | " + r;
      rad = rad.substring(0, digits);
    }

    setRad(rad);
    return <>
      {`${num.split(".")[0]}.${rad}${remain} * 2^${power}`}
    </>;
  }

  const [resBin, setResBin] = useState("");
  function Round() {
    const r = parseInt(remain[0]) > 0 ? (parseInt(rad, 2) + 1).toString(2) : rad;
    setResBin(r);
    return <>{r}</>;
  }

  function getExp(bin: string) {
    const numers = bin.split("").reduce((acc, cur, pos) => {
      if (cur === "1")
        acc.push(pos + 1);
      return acc;
    }, [] as number[]);

    let exp = "(";

    for (let i = 0; i < numers.length; i++) {
      const base = Math.pow(2, numers[i]);
      exp += `1/${base}`;

      if (i < numers.length - 1)
        exp += " + ";
      else
        exp += ") * " + Math.pow(2, power);
    }

    return exp;
  }

  function Check() {
    const exp = getExp(resBin);
    const upper = (parseInt(resBin, 2) + 1).toString(2);
    const upperExp = getExp(upper);
    const lower = (parseInt(resBin, 2) - 1).toString(2);
    const lowerExp = getExp(lower);

    const toDec = suppress(() => math.number(math.evaluate(exp)));
    const toUpper = suppress(() => math.number(math.evaluate(upperExp)));
    const toLower = suppress(() => math.number(math.evaluate(lowerExp)));

    return <>
      转换回十进制：{exp} = {toDec}<br />
      Diff: {`${suppress(() => math.chain(toDec).subtract(math.abs(dec)).done())}`} <br />
      Upper: {upper} {"=>"} {upperExp} = {toUpper}<br />
      Upper Diff: {`${suppress(() => math.chain(toUpper).subtract(math.abs(dec)).done())}`} <br />
      Lower: {lower} {"=>"} {lowerExp} = {toLower}<br />
      Lower Diff: {`${suppress(() => math.chain(toLower).subtract(math.abs(dec)).done())}`}
    </>
  }

  return (
    <PageContainer breadcrumbRender={false}>
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexDirection: "column",
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}>
          M
          <InputNumber placeholder={`${digits}`} onChange={x => setDigits(Number(x))} />
          <InputNumber placeholder={`${bottomExp}`} onChange={x => setBottomExp(Number(x))} />
          <InputNumber placeholder={`${topExp}`} onChange={x => setTopExp(Number(x))} />
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}>
          fl
          <Input placeholder={`${math.number(dec)}`}
            onChange={x => suppress(() => setDec(math.fraction(x.currentTarget.value)))} />
        </div>

        <Divider style={{ margin: "unset" }} />

        <section>
          <p>
            1, 检查范围<br />
            M({digits}, {bottomExp}, {topExp}) 的 最大值是 {math.format(max)}<br />
            最小正数是 {math.format(min)}<br />

            {math.number(dec) >= 0 ? `${min} < ${dec} < ${max}` : `-${max} < ${dec} < -${min}`}<br />
            等式若不满足，则不在范围内，答案为 NaN
          </p>

          <p>
            2, 转二进制系统<br />
            整数位正常二进制：{intBin} <br />
            小数位二进制：{radBin}
            <ToBinary />
          </p>

          <p>
            3, 位移<br />
            {`${dec} (10)`} {"≈"} {`${intBin}.${radBin} (2)`} <br />
            {"=>"} <Move />
          </p>

          <p>
            4, 零舍一入出结果<br />
            {parseInt(intBin) > 0 ? "+" : "-"} [<Round /> | {power}]
          </p>

          <p>
            5, 检查<br />
            <Check />
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
