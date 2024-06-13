import templatePre from "@/assets/images/template/1.png";
import data from "@/assets/images/template/1.json";
import { insertSvgFile } from "@/core/api/server";
import { Divider, Tooltip } from "antd";
import { useEffect } from "react";

export default function DefaultTemplate() {
  const createTemplate = () => {
    insertSvgFile(JSON.stringify(data));
  };

  return (
    <div>
      <Divider orientation="left" plain>
        默认模版
      </Divider>
      <Tooltip title="酒店模版">
        <img src={templatePre} onClick={createTemplate} />
      </Tooltip>
    </div>
  );
}
