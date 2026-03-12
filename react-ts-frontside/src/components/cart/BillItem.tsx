import type { CartItem } from "../../types";

type Props = {
  item: CartItem;
  onQty: (id: string, delta: number) => void;
  onNote: (id: string, note: string) => void;
};

export const BillItem = ({ item, onQty, onNote }: Props) => (
<div className="border rounded-xl p-3">
<div className="flex justify-between">
<span>{item.name}</span>
<span>{(item.price * item.qty).toLocaleString()}đ</span>
</div>
<div className="flex items-center gap-2 mt-2">
<button onClick={() => onQty(item.id, -1)}>➖</button>
<span>{item.qty}</span>
<button onClick={() => onQty(item.id, 1)}>➕</button>
</div>
<input value={item.note || ""} onChange={(e) => onNote(item.id, e.target.value)} placeholder="Ghi chú món" className="mt-2 w-full border rounded px-2 py-1 text-sm" />
</div>
);