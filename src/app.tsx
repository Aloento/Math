import { ProBreadcrumb } from "@ant-design/pro-components";
import type { RunTimeLayoutConfig } from "umi";

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: false,
    headerContentRender: () => <ProBreadcrumb />,
    disableContentMargin: false,
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};
