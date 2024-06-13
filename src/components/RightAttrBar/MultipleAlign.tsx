import { Divider, Button } from "antd";
import {
  multiMoveToLeft,
  multiMoveToBottom,
  multiMoveToTop,
  multiMoveToRight,
  multiMoveToHorizontalCenter,
  multiMoveToVerticalCenter,
} from "@/core/api/position";

function MultipleAlign() {
  return (
    <div className="mx-40px">
      <Divider orientation="left" plain>
        多选框内位移
      </Divider>
      <div className="flex flex-wrap justify-around">
        <Button className="w-60px" onClick={multiMoveToTop}>
          上对齐
        </Button>
        <Button className="w-60px" onClick={multiMoveToBottom}>
          下对齐
        </Button>
        <Button className="w-60px" onClick={multiMoveToLeft}>
          左对齐
        </Button>
        <Button className="w-60px" onClick={multiMoveToRight}>
          右对齐
        </Button>
        <div className="w-full h-20px" />
        <Button className="w-120px" onClick={multiMoveToHorizontalCenter}>
          水平居中对齐
        </Button>
        <Button className="w-120px" onClick={multiMoveToVerticalCenter}>
          垂直居中对齐
        </Button>
      </div>
    </div>
  );
}

export default MultipleAlign;
