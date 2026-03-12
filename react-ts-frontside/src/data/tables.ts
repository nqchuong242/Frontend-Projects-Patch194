import type { ITable } from "../types";

export const tablesData: ITable[] = Array.from({ length: 40 }, (_, i) => {
  const tableNum = i + 1;
  return {
    id: String(tableNum),
    name: `Bàn ${tableNum}`
  };
});
