import { useMemo } from "react";
import { Button } from "antd";
import { group, unGroup } from "@/core/api/group";

function HandelGroup({
  isMultiple,
  isGroup,
}: {
  isMultiple: boolean;
  isGroup: boolean;
}) {
  const btnText = useMemo(() => {
    return isMultiple ? "组合" : isGroup ? "拆分组" : "";
  }, [isMultiple, isGroup]);

  const handle = () => {
    if (isMultiple) {
      // 组合
      group();
    } else if (isGroup) {
      // 拆分
      unGroup();
    }
  };

  return (
    <div className="mx-40px mt-40px">
      <Button className="w-full" onClick={handle}>
        {btnText}
      </Button>
    </div>
  );
}

export default HandelGroup;
