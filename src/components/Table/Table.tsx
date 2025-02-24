import { JSX } from "react";

interface TableProps<T extends { id: string }> {
  renderItems: (item: T) => JSX.Element;
  data: T[];
  renderHeader?: () => JSX.Element;
  renderNotItems?: () => JSX.Element;
  keyTable?: string;
}
export const Table = <T extends { id: string }>({
  renderItems,
  renderNotItems,
  renderHeader,

  data,
}: TableProps<T>) => {
  return (
    <>
      {renderHeader?.()}
      {data.length <= 0
        ? renderNotItems?.()
        : data.map((item) => renderItems(item))}
    </>
  );
};
