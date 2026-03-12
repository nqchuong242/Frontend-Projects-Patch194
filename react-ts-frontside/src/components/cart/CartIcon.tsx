type Props = {
  count: number;
  onClick: () => void;
};

export const CartIcon = ({ count, onClick }: Props) => (
  <button
    onClick={onClick}
    className="fixed bottom-8 right-8 z-40 bg-slate-900 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:bg-slate-800 active:scale-95 transition-all duration-200 text-2xl"
  >
    🛒
    {count > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-lg animate-pulse">
        {count}
      </span>
    )}
  </button>
);