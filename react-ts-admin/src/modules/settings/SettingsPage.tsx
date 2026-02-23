import { Card, Form, InputNumber, Button, notification } from "antd"
import { useTableCount } from "../../store/useTableCount";

const SettingsPage = () => {

  const { tableCount, setTableCount } = useTableCount()

  return (
    <Card
      title={
        <span style={{ fontSize: 20, fontWeight: 700 }}>Cài đặt</span>}
    >
      <title>Cài đặt</title>

      <Form layout="inline">
        <Form.Item label="Số bàn">
          <InputNumber
            min={10}
            value={tableCount}
            onChange={(value) => { //dữ liệu thay đổi phải hợp lệ thì mới thực thi setTableCount
              if (value) setTableCount(value);
            }}
          />
        </Form.Item>

        <Button
          type="primary"
          onClick={() => {
            notification.success({
              message: 'Thành công',
              description: `Số bàn hiện tại: ${tableCount}`,
              placement: 'top',
              style: {
                width: 250,
                left: '50%',
                transform: 'translateX(0)',
                top: 150,
              },
            });
          }}
        >
          Lưu
        </Button>
      </Form>

    </Card>
  )
}

export default SettingsPage