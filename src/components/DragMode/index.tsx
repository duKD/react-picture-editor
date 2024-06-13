import { Tooltip, Switch } from "antd";
import { useState } from "react";
import { startDrag, endDrag } from "@/core/api/drag";

export default function DragMode() {
  const [dragMode, setDragMode] = useState(false);

  const change = (value: boolean) => {
    if (value) {
      startDrag();
    } else {
      endDrag();
    }
    setDragMode(value);
  };
  return (
    <section className="absolute right-5 top-5 select-none">
      <Tooltip title="画布拖拽开关">
        <Switch
          checked={dragMode}
          checkedChildren="drag"
          unCheckedChildren="off"
          onChange={change}
        />
      </Tooltip>
    </section>
  );
}
