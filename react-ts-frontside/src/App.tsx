import { ConfigProvider } from "antd";
import OrderPage from "./pages/OrderPage";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

const theme = {
  token: {
    colorPrimary: "#D4A574",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorInfo: "#1890ff",
    colorTextBase: "#262626",
    borderRadius: 8,
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    fontSize: 14,
    lineHeight: 1.5714285714,
  },
  components: {
    Button: {
      controlHeight: 40,
      borderRadius: 8,
    },
    Card: {
      borderRadius: 12,
    },
    Input: {
      controlHeight: 40,
      borderRadius: 8,
    },
    Select: {
      controlHeight: 40,
      borderRadius: 8,
    },
  },
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme}>
        <OrderPage />
      </ConfigProvider>
    </QueryClientProvider>
  );
}