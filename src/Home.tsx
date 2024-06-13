import "./Home.css";
import { Layout, Button } from "antd";
import logoUrl from "@/assets/logo.svg";
import { createEditor } from "@/core";
import { download } from "@/core/api/server";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HddOutlined, WalletOutlined } from "@ant-design/icons";
import DefaultTemplate from "@/components/DefaultTemplate";
import DragMode from "@/components/DragMode";
import Zoom from "@/components/Zoom";
import RightAttrBar from "@/components/RightAttrBar";
import HistoryBtn from "./components/HistoryBtn";

const { Header, Footer, Content } = Layout;

type menuListType = "HddOutlined" | "WalletOutlined";

const componentList = (key: menuListType) => {
  const obj = {
    HddOutlined: HddOutlined,
    WalletOutlined: WalletOutlined,
  };
  const Component = obj[key] || HddOutlined;
  return <Component />;
};

const menuList: Array<{
  key: string;
  name: string;
  icon: menuListType;
}> = [
  {
    key: "1",
    name: "模版",
    icon: "HddOutlined",
  },
  {
    key: "2",
    name: "其他",
    icon: "WalletOutlined",
  },
];

function Home() {
  const [allPageState, setAllPageState] = useState<{
    selectKey: string;
    toolsBarShow: boolean;
    attrBarShow: boolean;
  }>({
    selectKey: menuList[0].key,
    toolsBarShow: true,
    attrBarShow: true,
  });

  const chooseMenu = (key: string) => {
    setAllPageState({
      ...allPageState,
      selectKey: key,
    });
  };

  // 隐藏工具条
  const hideToolsBar = () => {
    setAllPageState({
      ...allPageState,
      toolsBarShow: !allPageState.toolsBarShow,
    });
  };

  const switchAttrBar = () => {
    setAllPageState({
      ...allPageState,
      attrBarShow: !allPageState.attrBarShow,
    });
  };

  const workspaceEl = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // 创建 编辑器实例 必须放在根组件中进行
    const editor = createEditor({
      id: "canvas",
      options: {
        width: 900,
        height: 1200,
      },
    });
    editor.init(workspaceEl.current!);
  }, []);

  return (
    <div className="home">
      <Layout className="h-full w-full">
        <Header className="bg-light-50 h-64px border-b-1px flex items-center justify-between px-20px">
          <div className="w-1/4">
            <div className="h-40px w-40px">
              <img src={logoUrl} alt="logo" />
            </div>
          </div>
          <div className="w-1/4 flex items-center">
            <Button onClick={download}>下载</Button>
            {/* 记录操作 */}
            <HistoryBtn />
          </div>
        </Header>
        <Content className="relative flex">
          {/* 左侧菜单 */}
          <section
            className={`bg-light-50 flex relative flex-shrink-0 flex-grow-0 ${
              allPageState.toolsBarShow && "w-420px"
            }`}
          >
            <section className="w-60px border-r-1px">
              {menuList.map((item) => {
                return (
                  <div
                    className={`flex flex-col items-center justify-around h-70px py-10px cursor-pointer ${
                      item.key === allPageState.selectKey && "bg-gray-100"
                    }`}
                    key={item.key}
                    onClick={() => chooseMenu(item.key)}
                  >
                    {componentList(item.icon)}
                    <div>{item.name}</div>
                  </div>
                );
              })}
            </section>
            {/* 菜单内容 */}
            {allPageState.toolsBarShow && (
              <section className="h-full flex-1 p-20px">
                {/* 模板 */}
                {allPageState.selectKey === menuList[0].key && (
                  <DefaultTemplate />
                )}
              </section>
            )}
            {/* 关闭按钮 */}
            <div
              className={`close-btn left-btn ${
                allPageState.toolsBarShow && "left-btn-open"
              }`}
              onClick={hideToolsBar}
            ></div>
          </section>
          {/* 画布工作区 */}
          <div className="workspace" ref={workspaceEl}>
            <canvas id="canvas"></canvas>
            <DragMode />
            <Zoom />
          </div>
          {/* 右侧菜单 */}
          {allPageState.attrBarShow && (
            <section
              className={`bg-light-50 h-full relative flex-shrink-0 flex-grow-0 ${
                allPageState.attrBarShow && "w-360px"
              }`}
            >
              <RightAttrBar />
            </section>
          )}
          <div
            className={`close-btn right-btn ${
              allPageState.attrBarShow && "right-btn-open"
            }`}
            onClick={switchAttrBar}
          ></div>
        </Content>
      </Layout>
    </div>
  );
}

export default Home;
