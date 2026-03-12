import type { MenuItem } from "../../types";

export const ProductCard = ({ item, onAdd }: { item: MenuItem; onAdd: () => void }) => (
  <div className="group bg-white rounded-xl shadow-md hover:shadow-xl border border-slate-200/50 transition-all duration-300 cursor-pointer overflow-hidden">
    <div className="relative h-40 overflow-hidden bg-slate-100">
      <img 
        src={item.thumbnail} 
        alt={item.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent" />
    </div>
    <div className="p-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-3 line-clamp-2">{item.name}</h3>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-slate-900">{item.price.toLocaleString()}đ</span>
        <button 
          onClick={onAdd} 
          className="w-9 h-9 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold shadow-md hover:shadow-lg hover:bg-slate-800 active:scale-95 transition-all duration-200"
        >
          +
        </button>
      </div>
    </div>
  </div>
);