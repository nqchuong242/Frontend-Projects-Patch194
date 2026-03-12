import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { tableStorageKey } from '../commons/config';

interface ITableCount {
    tableCount: number;
    setTableCount: (value: number) => void
}

//Global State để thay đổi số bàn
export const useTableCount = create<ITableCount>()(
    persist(
        (set) => ({
            tableCount: 20, //mặc định là 20 bàn
            setTableCount: (value) => set({ tableCount: value })
        }),
        {
            name: tableStorageKey, //Muốn không bị reset khi reload ⇒ phải persist (lưu ra storage).
        }
    )
)

