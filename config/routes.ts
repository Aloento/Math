import type { MenuDataItem } from "@umijs/route-utils";

export default [
  {
    path: "/First", name: "First", routes: [
      { path: "/First/1/1", name: "1.1 机器数", component: "./First/1/1" },
      { path: "/First/2/1", name: "2.1 Cholesky分解", component: "./First/2/1" },
      { path: "/First/2/2", name: "2.2 LU分解", component: "./First/2/2" },
      { path: "/First/7/1", name: "7.1 Jacobi解Ax=b", component: "./First/7/1" },
      { path: "/First/7/2", name: "7.2 GaussSeidel解Ax=b", component: "./First/7/2" },
      { path: "/First/8/1", name: "8.1 二分法求接近根的序列", component: "./First/8/1" },
      { path: "/First/8/2", name: "8.2 函数收敛判断", component: "./First/8/2" },
      { path: "/First/8/3", name: "8.3 牛顿法解方程", component: "./First/8/3" },
    ]
  },
  {
    path: "/Second", name: "Second", routes: [
      { path: "/Second/1/1", name: "1.1 多项式插值", component: "./Second/1/1" },
      { path: "/Second/1/2", name: "1.2 Hermite插值", component: "./Second/1/2" },
      { path: "/Second/5", name: "5 最小二乘法", component: "./Second/5" },
      { path: "/Second/7", name: "7 近似计算误差估计", component: "./Second/7" },
    ]
  },
  { component: "./404" },
] as MenuDataItem[];
