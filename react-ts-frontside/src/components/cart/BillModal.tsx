import type { CartItem } from "../../types";

type Props = {
  open: boolean;
  cart: CartItem[];
  total: number;
  onQty: (id: string, delta: number) => void;
  onClose: () => void;
  onSend: () => void;
};

export const BillModal = ({ open, cart, total, onQty, onClose, onSend }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center z-50 transition-all duration-200">
      <div className="bg-white w-full md:max-w-md rounded-t-2xl md:rounded-2xl shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="px-6 py-5 border-b border-slate-200/50">
          <h2 className="text-xl font-bold text-slate-900">Hóa Đơn Tạm Tính</h2>
          <p className="text-xs text-slate-500 mt-1">Chi tiết đơn hàng của bạn</p>
        </div>

        <div className="max-h-72 overflow-y-auto px-6 py-4 space-y-3">
          {cart.length === 0 && (
            <p className="text-center py-8 text-slate-500 font-medium">Giỏ hàng trống</p>
          )}

          {cart.map((i: CartItem) => (
            <div key={i.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200/50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-slate-900">{i.name}</p>
                  <p className="text-xs text-slate-600 mt-1">{i.price.toLocaleString()}đ / món</p>
                </div>
                <span className="font-bold text-slate-900">{(i.price * i.qty).toLocaleString()}đ</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-white rounded-lg border border-slate-200 px-2 py-1 ml-auto">
                  <button
                    onClick={() => onQty(i.id, -1)}
                    className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-slate-900">{i.qty}</span>
                  <button
                    onClick={() => onQty(i.id, 1)}
                    className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-slate-200/50">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold text-slate-900">Tổng Cộng</span>
            <span className="text-2xl font-bold text-slate-900">{total.toLocaleString()}đ</span>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={onClose} 
              className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-300 text-slate-900 font-semibold hover:bg-slate-50 transition-colors duration-200"
            >
              Hủy
            </button>
            <button
              onClick={onSend}
              className="flex-1 px-4 py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 active:scale-95 shadow-md hover:shadow-lg transition-all duration-200"
            >
              Gửi Bếp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};