import { JSX } from "react";

interface TableProps<T extends { id: string }> {
  renderItems: (item: T) => JSX.Element;
  data: T[];
}
export const Table = <T extends { id: string }>({
  renderItems,
  data,
}: TableProps<T>) => {
  return <div className="w-full">{data.map((item) => renderItems(item))}</div>;
};
