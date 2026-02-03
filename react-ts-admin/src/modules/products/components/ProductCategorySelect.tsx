import { Select } from "antd"

export type Category = 'dimsum' | 'noodles' | 'rice' | 'drink';

const ProductCategorySelect = ({
    value,
    onChange,
}: {
    value: Category;
    onChange: (newValue: Category) => void;
}) => {

    return (
        <Select
            value={value}
            onChange={(onChange)}
            style={{ width: 160 }}
            options={[
                { value: 'dimsum', label: 'DIM SUM' },
                { value: 'noodles', label: 'MÌ TƯƠI' },
                { value: 'rice', label: 'CƠM' },
                { value: 'porridge', label: 'CHÁO' },
                { value: 'drink', label: 'NƯỚC UỐNG' },
            ]}
        />
    )
}

export default ProductCategorySelect