import { JSX } from "react";

interface TableProps<T extends { id: string }> {
  renderItems: (item: T) => JSX.Element;
  data: T[];
  renderHeader?: () => JSX.Element;
}
export const Table = <T extends { id: string }>({
  renderItems,
  renderHeader,
  data,
}: TableProps<T>) => {
  return (
    <div className="w-full">
      {renderHeader?.()}
      {data.map((item) => renderItems(item))}
    </div>
  );
};
