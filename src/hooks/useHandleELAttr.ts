import { getEditor, getEditorCanvas } from "@/core";
import { EditorEventName } from "@/core/api/event";
import { isText } from "@/core/api/text";
import { useCallback, useEffect, useState } from "react";

type FontAttrType = {
  fontSize: number | undefined;
  fontFamily: string | undefined;
  lineHeight: number | undefined;
  fill: string;
  fontWeight: string | number | undefined;
  textBackgroundColor: string | undefined;
  textAlign: string | undefined;
  fontStyle: string | undefined;
  underline: boolean | undefined;
  linethrough: boolean | undefined;
};

export default function useHandleELAttr() {
  const [fontAttr, setFontAttr] = useState<FontAttrType>({
    fontSize: 0, // 字号
    fontFamily: "", // 字体
    lineHeight: 0, // 行高
    fontWeight: "normal", // 字体粗细
    textBackgroundColor: "#fff", //背景
    textAlign: "", // 字体对齐方式
    fontStyle: "", // 斜体
    fill: "", // 字体颜色
    underline: false, // 下划线
    linethrough: false, // 删除划线
  });

  const updateAttr = useCallback(
    (e?: fabric.IEvent<Event>) => {
      const canvas = getEditorCanvas();
      const activeObject = canvas.getActiveObject();

      if (!activeObject) return;
      // 不是当前obj，跳过
      if (e && e.target && e.target !== activeObject) return;

      // 处理字体相关属性
      if (isText(activeObject)) {
        setFontAttr({
          ...fontAttr,
          fontSize: activeObject.fontSize,
          fontFamily: activeObject.fontFamily,
          lineHeight: activeObject.lineHeight,
          fontWeight: activeObject.fontWeight,
          textBackgroundColor: activeObject.textBackgroundColor,
          textAlign: activeObject.textAlign,
          fill: (activeObject.fill as string) || "",
          fontStyle: activeObject.fontStyle,
          underline: !!activeObject.underline,
          linethrough: !!activeObject.linethrough,
        });
      }
    },
    [fontAttr]
  );

  useEffect(() => {
    const editor = getEditor();
    editor.on(EditorEventName.UPDATE, updateAttr);
    editor.on(EditorEventName.ONE, updateAttr);
    return () => {
      editor.off(EditorEventName.UPDATE, updateAttr);
      editor.off(EditorEventName.ONE, updateAttr);
    };
  }, [updateAttr]);

  return {
    fontAttr,
    updateAttr,
  };
}
