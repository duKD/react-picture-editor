import { Editor, getEditor } from "@/core";
import { EditorEventName } from "@/core/api/event";
import { SelectMode } from "@/core/type";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";

type SelectInfo = {
  mode: SelectMode;
  selectOneType: string;
  selectIds: string[];
};

/**
 * 处理 画布选中元素的信息的hook
 */

export default function useEditorSelect() {
  const [selectInfo, setSelectInfo] = useState<SelectInfo>({
    mode: SelectMode.EMPTY,
    selectOneType: "",
    selectIds: [], // 选择ids
  });

  useEffect(() => {
    const editor = getEditor();

    const selectOne = (e: [fabric.Object]) => {
      const temp = {
        ...selectInfo,
      };
      temp.mode = SelectMode.ONE;
      if (e.length) {
        temp.selectOneType = e[0].type || "";
        temp.selectIds = e.map((item) => item.id || "");
      }
      setSelectInfo(temp);
    };

    const selectMulti = (e: fabric.Object[]) => {
      setSelectInfo({
        mode: SelectMode.MULTI,
        selectOneType: "",
        selectIds: e.map((item) => item.id || ""),
      });
    };

    const selectCancel = () => {
      setSelectInfo({
        mode: SelectMode.EMPTY,
        selectOneType: "",
        selectIds: [],
      });
    };
    editor.on(EditorEventName.ONE, selectOne);
    editor.on(EditorEventName.MULTI, selectMulti);
    editor.on(EditorEventName.CANCEL, selectCancel);

    return () => {
      editor.off(EditorEventName.ONE, selectOne);
      editor.off(EditorEventName.MULTI, selectMulti);
      editor.off(EditorEventName.CANCEL, selectCancel);
    };
  }, []);

  return selectInfo;
}
