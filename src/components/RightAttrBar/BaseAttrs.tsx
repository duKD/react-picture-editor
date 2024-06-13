import useHandleELAttr from "@/hooks/useHandleELAttr";
import { Button, ColorPicker, Divider, Radio, RadioChangeEvent } from "antd";
import { changeAttr } from "@/core/api/text";
const options = [
  { label: "左对齐", value: "left" },
  { label: "居中对齐", value: "center" },
  { label: "右对齐", value: "right" },
];

function BaseAttrs({ isText }: { isText: boolean }) {
  const { fontAttr, updateAttr } = useHandleELAttr();
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    changeAttr("textAlign", value);
    updateAttr();
  };

  const toChangeFontWeight = () => {
    const value = fontAttr.fontWeight === "normal" ? "bold" : "normal";
    changeAttr("fontWeight", value);
    updateAttr();
  };

  const toChangeFontStyle = () => {
    const value = fontAttr.fontStyle === "normal" ? "italic" : "normal";
    changeAttr("fontStyle", value);
    updateAttr();
  };

  const toSetLineThrough = () => {
    const value = !fontAttr.linethrough;
    changeAttr("linethrough", value);
    updateAttr();
  };

  const toSetUnderline = () => {
    const value = !fontAttr.underline;
    changeAttr("underline", value);
    updateAttr();
  };

  const toSetColor = (value: string) => {
    changeAttr("fill", value);
    updateAttr();
  };
  return (
    <div className="mt-30px mx-30px">
      <div className={!isText ? "hidden" : ""}>
        <Divider orientation="left" plain>
          字体属性
        </Divider>
        <div className="py-10px">文字排列方向：</div>
        <div className="flex flex-wrap justify-around">
          <Radio.Group
            options={options}
            onChange={onChange}
            value={fontAttr.textAlign}
            optionType="button"
          />
        </div>
        <div className="py-10px">字体相关设置：</div>
        <div className="flex flex-wrap justify-around">
          <Button
            type={fontAttr.fontWeight === "bold" ? "primary" : "default"}
            className="w-60px"
            onClick={toChangeFontWeight}
          >
            加粗
          </Button>
          <Button
            type={fontAttr.fontStyle === "italic" ? "primary" : "default"}
            className="w-60px"
            onClick={toChangeFontStyle}
          >
            斜体
          </Button>
          <Button
            type={fontAttr.linethrough ? "primary" : "default"}
            className="w-60px"
            onClick={toSetLineThrough}
          >
            中划线
          </Button>
          <Button
            type={fontAttr.underline ? "primary" : "default"}
            className="w-60px"
            onClick={toSetUnderline}
          >
            下划线
          </Button>
        </div>
        <div className="py-10px">
          颜色：
          <ColorPicker
            value={fontAttr.fill}
            onChange={(c) => {
              toSetColor(c.toHexString());
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BaseAttrs;
