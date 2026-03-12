import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { authStorageKey } from '../commons/config'
import apiClient from '../libs/axiosClient'
import { notification } from 'antd'

interface IUser {
    username: string
    password: string
}

type TAuthStore = {
    user: null | IUser //lưu trữ thông tin user đã đăng nhập
    isAuthenticated: boolean // xác thực đã login chưa
    setUser: (user: IUser | null) => void
    isLoading: boolean
    login: (username: string, password: string, callback: () => void) => void
    logout: () => void
}

export const useAuthStore = create<TAuthStore>()(
    devtools(
        persist( //lưu trữ state vào localStorage
            (s) => ({
                user: null,
                isAuthenticated: false,
                setUser: (user: IUser | null) => {
                    s({ user })
                },
                isLoading: false,
                login: async (username: string, password: string, callback: () => void) => {
                    try {
                        s({ isLoading: true })
                        // gọi API lấy danh sách user
                        const res = await apiClient.get('/user')
                        const foundUser = res.data.find(
                            (u: IUser) =>
                                u.username === username &&
                                u.password === password
                        )
                        if (foundUser) {
                            s({
                                user: foundUser,
                                isAuthenticated: true,
                                isLoading: false
                            })
                            notification.success({
                                message: 'Thành công',
                                description: 'Đăng nhập thành công',
                                placement: 'top',
                                style: {
                                    width: 350,
                                    left: '50%',
                                    transform: 'translateX(0)',
                                    top: 150,
                                },
                            });
                            //chuyen trang
                            callback()
                        } else {
                            s({ isLoading: false })
                            notification.error({
                                message: 'Đăng nhập thất bại',
                                description: 'Sai username hoặc password',
                                placement: 'top',
                                style: {
                                    width: 350,
                                    left: '50%',
                                    transform: 'translateX(0)',
                                    top: 150,
                                },
                            });
                        }

                    } catch (error) {
                        s({ isLoading: false })
                        console.log('Login error:', error)
                    }
                },

                logout: () => {
                    s({ user: null, isAuthenticated: false })
                    //remove accessToken from localStorage
                    localStorage.removeItem(authStorageKey)
                }
            }),
            {
                name: authStorageKey, // unique name
                storage: createJSONStorage(() => localStorage), // use local storage
            }
        )
    )
)