import type { RunTimeLayoutConfig } from "umi";

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: false,
    headerContentRender: false,
    disableContentMargin: false,
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};
