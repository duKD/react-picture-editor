import { CopyOutlined } from "@ant-design/icons";
import { Tooltip, Button } from "antd";
import { clone } from "@/core/api/common";
const handle = () => {
  clone();
};
const ToDel = () => {
  return (
    <div className="w-1/4">
      <Tooltip title="复制">
        <Button icon={<CopyOutlined />} onClick={handle}></Button>
      </Tooltip>
    </div>
  );
};

export default ToDel;
