import { Divider, Form, InputNumber, Space, Button } from "antd";
import { setSize } from "@/core/api/workspace";
export default function SetSize() {
  const [form] = Form.useForm();

  const submit = (values: any) => {
    setSize(values.width, values.height);
  };

  return (
    <div className="w-full p-40px pb-0">
      <Divider orientation="left" plain>
        尺寸
      </Divider>
      <Form
        form={form}
        initialValues={{
          width: 900,
          height: 1200,
        }}
        name="validateOnly"
        layout="horizontal"
        onFinish={submit}
      >
        <Form.Item<{
          width?: number;
        }>
          name="width"
          label="宽"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item<{
          height?: number;
        }>
          name="height"
          label="高"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              设置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
