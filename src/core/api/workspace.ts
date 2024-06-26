import { fabric } from "fabric";
import { throttle } from "lodash-es";
import { getEditor, getEditorCanvas, getEditorWorkspaceEl } from "..";

export const workspaceKey = "workspace";

let _worker: fabric.Rect;

export const getWorker = () => {
  if (!_worker) {
    throw new Error("worker is not init");
  }
  return _worker;
};

// 设置对应的 比例 并且让画布居中显示
const setZoom = (scale: number) => {
  const _workspaceEl = getEditorWorkspaceEl();
  const canvas = getEditorCanvas();

  const width = _workspaceEl.offsetWidth;
  const height = _workspaceEl.offsetHeight;
  canvas.setWidth(width);
  canvas.setHeight(height);
  const center = canvas.getCenter();
  // 以中心点缩放
  canvas.zoomToPoint(new fabric.Point(center.left, center.top), scale);

  const objCenter = _worker.getCenterPoint();

  const viewportTransform = canvas.viewportTransform;
  if (!viewportTransform) return;
  if (!canvas.width || !canvas.height) return;
  viewportTransform[4] = canvas.width / 2 - objCenter.x * viewportTransform[0];
  viewportTransform[5] = canvas.height / 2 - objCenter.y * viewportTransform[3];
  _worker.clone((clone: fabric.Rect) => {
    canvas.clipPath = clone;
    canvas.renderAll();
  });
  canvas.setViewportTransform(viewportTransform);
  canvas.renderAll();
};

const auto = () => {
  const scale = getScale();
  setZoom(scale - 0.08);
};

const getScale = () => {
  const editor = getEditor();
  const options = editor.opt.options;
  const _workspaceEl = getEditorWorkspaceEl();
  if (!_workspaceEl) return 0.8;
  const viewPortWidth = _workspaceEl.offsetWidth;
  const viewPortHeight = _workspaceEl.offsetHeight;

  // 按照宽度
  if (viewPortWidth / viewPortHeight < options.width / options.height) {
    return viewPortWidth / options.width;
  }

  // 按照宽度缩放
  return viewPortHeight / options.height;
};

export const resetWorkSpace = () => {
  const canvas = getEditorCanvas();
  const editor = getEditor();
  const options = editor.opt.options;
  _worker = canvas
    .getObjects()
    .find((item) => item.id === workspaceKey) as fabric.Rect;

  // 重置画布大小
  _worker.set({
    width: options.width,
    height: options.height,
  });
  canvas.renderAll();
  auto();
};

export const magnifyWorkSpace = () => {
  const canvas = getEditorCanvas();
  let zoomRatio = canvas.getZoom();
  zoomRatio += 0.05;
  const center = canvas.getCenter();
  canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio);
};

export const shrinkWorkSpace = () => {
  const canvas = getEditorCanvas();
  let zoomRatio = canvas.getZoom();
  zoomRatio -= 0.05;
  const center = canvas.getCenter();
  canvas.zoomToPoint(
    new fabric.Point(center.left, center.top),
    zoomRatio < 0 ? 0.01 : zoomRatio
  );
};

export const setSize = (width: number, height: number) => {
  const editor = getEditor();
  const options = editor.opt.options;
  options.width = width;
  options.height = height;
  resetWorkSpace();
};

// 设置画布工作区
export default function initWorkSpace(opt: { width: number; height: number }) {
  const options = opt;
  const canvas = getEditorCanvas();
  const _workspaceEl = getEditorWorkspaceEl();

  const { width, height } = options;
  const { offsetWidth, offsetHeight } = _workspaceEl;

  canvas.setWidth(offsetWidth);
  canvas.setHeight(offsetHeight);
  canvas.renderAll();
  //setWorkSpace 设置工作区
  _worker = new fabric.Rect({
    id: workspaceKey,
    fill: "white",
    width: width,
    height: height,
  });
  // 禁止框选
  _worker.set("selectable", false);
  // 不允许进行 形状交互 放大缩小
  _worker.set("hasControls", false);
  _worker.hoverCursor = "default";

  canvas.add(_worker);
  canvas.renderAll();

  // 监听 画布容器的尺寸变化
  const initResizeObserver = () => {
    const resizeObserver = new ResizeObserver(
      throttle(() => {
        auto();
      }, 100)
    );
    resizeObserver.observe(_workspaceEl);
  };

  // 开启
  initResizeObserver();
}

export const getDefaultSize = () => {
  //   return _initViewPort;
};
