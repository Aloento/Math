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
    ]
  },
  { component: "./404" },
] as MenuDataItem[];
