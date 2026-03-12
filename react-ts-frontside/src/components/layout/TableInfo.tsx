type Props = {
  tables: string[];
  selectedTable: string;
  onTableChange: (table: string) => void;
};

export const TableInfo = ({ tables, selectedTable, onTableChange }: Props) => (
  <div className="px-4 py-3 flex items-center gap-2">
    <p className="text-sm">Chọn bàn</p>
    <select
      value={selectedTable}
      onChange={(e) => onTableChange(e.target.value)}
      className="ml-auto border rounded px-3 py-2 text-sm bg-white"
    >
      {tables.map((t) => (
        <option key={t}>{t}</option>
      ))}
    </select>
  </div>
);