import { PageContainer } from "@ant-design/pro-components";
import { Alert, Card } from "antd";

export default function Welcome() {
  return (
    <PageContainer>
      <Card>
        <Alert type="success" showIcon banner />
      </Card>
    </PageContainer>
  );
}
