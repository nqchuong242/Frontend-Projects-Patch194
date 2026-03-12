type Props = {
  tables: string[];
  selectedTable: string;
  onTableChange: (table: string) => void;
};

export const TableSelector = ({ tables, selectedTable, onTableChange }: Props) => (
  <div className="px-6 py-4 bg-linear-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/40 flex items-center gap-4">
    <label className="text-sm font-semibold text-slate-700">Chọn bàn</label>
    <select
      value={selectedTable}
      onChange={(e) => onTableChange(e.target.value)}
      className="ml-auto px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-medium shadow-sm hover:shadow-md hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all duration-200"
    >
      {tables.map((t) => (
        <option key={t}>{t}</option>
      ))}
    </select>
  </div>
);
