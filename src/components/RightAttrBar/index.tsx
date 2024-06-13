import { isTextType, isImageType, isGroupType } from "@/core/utils";
import { SelectMode } from "@/core/type";
import useEditorSelect from "@/hooks/useEditorSelect";
import SetSize from "./SetSize";
import SetBg from "./SetBg";
import HandelGroup from "./HandleGroup";
import ReplaceImg from "./ReplaceImg";
import SetLock from "./SetLock";
import ToDel from "./ToDel";
import ToClone from "./ToClone";
import SetAlign from "./SetAlign";
import MultipleAlign from "./MultipleAlign";
import { useMemo } from "react";
import BaseAttrs from "./BaseAttrs";

export default function RightAttrBar() {
  const selectInfo = useEditorSelect();

  // 单选且等于组元素
  const isGroup = useMemo(() => {
    return (
      selectInfo.mode === SelectMode.ONE &&
      isGroupType(selectInfo.selectOneType)
    );
  }, [selectInfo]);

  // 是否为多选
  const isMultiple = useMemo(() => {
    return selectInfo.mode === SelectMode.MULTI;
  }, [selectInfo]);

  // 是否为单选
  const isSingle = useMemo(
    () => selectInfo.mode === SelectMode.ONE,
    [selectInfo]
  );

  const isImg = useMemo(
    () =>
      selectInfo.mode === SelectMode.ONE &&
      isImageType(selectInfo.selectOneType),
    [selectInfo]
  );

  const isText = useMemo(
    () =>
      selectInfo.mode === SelectMode.ONE &&
      isTextType(selectInfo.selectOneType),
    [selectInfo]
  );

  return (
    <>
      {!selectInfo.mode && <SetSize />}
      {!selectInfo.mode && <SetBg />}
      {(isMultiple || isGroup) && (
        <HandelGroup isMultiple={isMultiple} isGroup={isGroup} />
      )}
      {isImg && <ReplaceImg />}
      <div className="flex justify-around px-40px py-20px">
        <SetLock isSingle={isSingle} />
        {selectInfo.mode && <ToDel />}
        {selectInfo.mode && <ToClone />}
      </div>
      {/* 单个元素对齐方式 */}
      {isSingle && <SetAlign />}
      {/* 多个元素对齐方式 */}
      {isMultiple && <MultipleAlign />}
      <BaseAttrs isText={isText} />
    </>
  );
}
