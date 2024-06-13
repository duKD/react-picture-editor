import { Tooltip, Button } from "antd";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { getEditor } from "@/core";
import { EditorEventName } from "@/core/api/event";
import { fabric } from "fabric";
import { setLock } from "@/core/api/common";
import { useEffect, useRef, useState } from "react";

function SetLock({ isSingle }: { isSingle: boolean }) {
  const [isLock, setIsLock] = useState(false);

  const selectActive = useRef<fabric.Object | null>(null);

  const handle = () => {
    if (selectActive) {
      setLock(selectActive.current!, isLock);
      setIsLock(!isLock);
    }
  };

  useEffect(() => {
    const editor = getEditor();
    const handleSelected = (items: any) => {
      setIsLock(!items[0].hasControls);
      selectActive.current = items[0];
    };
    editor.on(EditorEventName.ONE, handleSelected);
    return () => {
      editor.off(EditorEventName.ONE, handleSelected);
    };
  }, [isLock]);

  return (
    <div className={`w-1/4 ${!isSingle && "hidden"}`}>
      <Tooltip title={isLock ? "解锁" : "锁定"}>
        <Button
          icon={isLock ? <UnlockOutlined /> : <LockOutlined />}
          onClick={handle}
        ></Button>
      </Tooltip>
    </div>
  );
}

export default SetLock;
