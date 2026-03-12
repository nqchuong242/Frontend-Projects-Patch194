type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: Props) => (
  <div className="sticky top-0 z-40 bg-linear-to-b from-slate-50 to-transparent px-6 py-4 backdrop-blur-sm">
    <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-sm border border-slate-200/50 hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-slate-300">
      <span className="text-lg text-slate-400">🔍</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm món ăn..."
        className="flex-1 bg-transparent outline-none text-sm placeholder-slate-400 text-slate-700 font-medium"
      />
    </div>
  </div>
);
