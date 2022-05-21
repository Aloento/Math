import type { MenuDataItem } from "@umijs/route-utils";

export default [
  {
    path: "/First", name: "First", routes: [
      { path: "/First/1/1", name: "1.1 机器数", component: "./First/1/1" },
    ]
  },
  { component: "./404" },
] as MenuDataItem[];
