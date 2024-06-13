import {} from "react";
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  DragOutlined,
} from "@ant-design/icons";
import {
  shrinkWorkSpace,
  magnifyWorkSpace,
  resetWorkSpace,
} from "@/core/api/workspace";
const big = () => {
  magnifyWorkSpace();
};

const reset = () => {
  resetWorkSpace();
};

const small = () => {
  shrinkWorkSpace();
};
export default function Zoom() {
  return (
    <section className="absolute right-5 top-20 flex flex-col justify-between h-80px cursor-pointer">
      <ZoomInOutlined onClick={big} />
      <DragOutlined onClick={reset} />
      <ZoomOutOutlined onClick={small} />
    </section>
  );
}
