import { setWorkspaceBg } from "@/core/api/common";
import { Divider, ColorPicker } from "antd";
import { useEffect, useState } from "react";

export default function SetBg() {
  const [color, setColor] = useState<string>("#fff");

  useEffect(() => {
    setWorkspaceBg(color as string);
  }, [color]);
  return (
    <div className="w-full p-40px pb-0">
      <Divider orientation="left" plain>
        背景颜色
      </Divider>
      <ColorPicker
        value={color}
        onChange={(c) => {
          setColor(c.toHexString());
        }}
      />
    </div>
  );
}
