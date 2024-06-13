import { Button } from "antd";
import {
  getStatus,
  redo,
  undo,
  HistoryEditorEventName,
} from "@/core/api/history";
import { getEditor } from "@/core";
import { useEffect, useState } from "react";

function HistoryBtn() {
  const [status, setStatus] = useState({
    canUndo: false,
    canRedo: false,
  });

  const handle = async (type = 1) => {
    if (type === 1) {
      await undo();
    } else {
      await redo();
    }
  };

  useEffect(() => {
    const change = () => {
      const res = getStatus();
      setStatus({
        canUndo: res.canUndo,
        canRedo: res.canRedo,
      });
    };
    const editor = getEditor();
    editor.on(HistoryEditorEventName.STATUS_CHANGE, change);
    return () => {
      editor.off(HistoryEditorEventName.STATUS_CHANGE, change);
    };
  }, [status]);
  return (
    <div className="w-200px px-30px">
      <Button
        type={status.canUndo ? "primary" : "default"}
        onClick={() => handle(1)}
      >
        撤销
      </Button>
      <Button
        type={status.canRedo ? "primary" : "default"}
        onClick={() => handle(2)}
      >
        重做
      </Button>
    </div>
  );
}

export default HistoryBtn;
