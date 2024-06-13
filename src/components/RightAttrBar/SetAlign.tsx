import { Button } from "antd";
import {
  moveToCenterX,
  moveToCenter,
  moveToCenterY,
} from "@/core/api/position";
const handle = (type: number) => {
  if (type === 1) {
    moveToCenterX();
  } else if (type === 2) {
    moveToCenter();
  } else {
    moveToCenterY();
  }
};

function SetAlign() {
  return (
    <div className="flex justify-between px-30px">
      <Button className="w-80px" onClick={() => handle(1)}>
        水平居中
      </Button>
      <Button className="w-120px" onClick={() => handle(2)}>
        水平垂直居中
      </Button>
      <Button className="w-80px" onClick={() => handle(3)}>
        垂直居中
      </Button>
    </div>
  );
}

export default SetAlign;
