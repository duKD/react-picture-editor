import { DeleteOutlined } from "@ant-design/icons";
import { Tooltip, Button } from "antd";
import { del } from "@/core/api/common";
const handle = () => {
  del();
};

const ToDel = () => {
  return (
    <div className="w-1/4">
      <Tooltip title="删除">
        <Button icon={<DeleteOutlined />} onClick={handle}></Button>
      </Tooltip>
    </div>
  );
};

export default ToDel;
