type Props = {
  categories: string[];
  active: string;
  onChange: (c: string) => void;
};

export const CategoryTabs = ({ categories, active, onChange }: Props) => (
  <div className="px-6 py-5 bg-linear-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/40 overflow-x-auto flex gap-3 scrollbar-hide">
    {categories.map((c: string) => (
      <button
        key={c}
        onClick={() => onChange(c)}
        className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
          active === c 
            ? "bg-slate-900 text-white shadow-md" 
            : "bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:shadow-sm"
        }`}
      >
        {c}
      </button>
    ))}
  </div>
);