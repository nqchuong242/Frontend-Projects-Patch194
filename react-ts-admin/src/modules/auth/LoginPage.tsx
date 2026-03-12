import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../../store/useAuthStore';

 
const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore((state) => state);

  const onFinish = (values: any) => {
    console.log("Đã nhận giá trị từ form: ", values);
    //GỌI API để login
    login(values.username, values.password, ()=>{ 
      console.log('Đăng nhập thành công, chuyển trang dashboard');
      navigate('/dashboard');
    });
  };
  return (
    <main style={{ backgroundColor: '#f0f2f5', height: '100vh' }}>
      <Flex justify='center' align='center' style={{ height: '100vh' }}>
        <div className="login-form" style={{ padding: 24, backgroundColor: 'white', borderRadius: 4 }}>
          <Form
            name="login"
            initialValues={{ 
              remember: true,
              username: 'admin',
              password: 'Admin@123'
            }}
            style={{ maxWidth: 360 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button disabled={isLoading} block type="primary" htmlType="submit">
                {isLoading ? 'Signing in...' : 'Log in'}
              </Button>
              {/* Khi isLoading === true → disabled={true} → nút bị khóa → không thể bấm */}
            </Form.Item>
          </Form>

        </div>
      </Flex>
      <title>Login</title>
    </main>
  )
}

export default LoginPage