"use client"
import { FormEvent } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { login } from "./services/auth.service"
import { PATH } from "@/app/common/path"
import Image from "next/image"

const LoginPage: React.FC = () => {
  const router = useRouter()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const credentials: any = Object.fromEntries(formData.entries())
    const response = await login(credentials.phone, credentials.password)
    if (response?.error) {
      toast.error(response.error)
    } else {
      toast.success("Đăng nhập thành công")
      router.push(PATH.CATEGORIES)
    }
  }

  return (
    <div className="h-screen w-full bg-[url('/assets/wall_1.jpg')]">
      <div className="mx-auto pt-24 px-8 max-w-[500px] text-white">
        <div className="mx-auto w-[200px] h-[75px] relative">
          <Image fill priority alt="logo" src="/assets/logo.png" className="object-cover" />
        </div>
        <div className="mt-4 w-full rounded-lg login-body bg-[rgba(255,255,255,0.2)] px-4 py-8">
          <form onSubmit={handleLogin}>
            <div className="mt-6">
              <div className="">
                <span>Số điện thoại</span>
                <input type="text" name="phone" className="border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none" placeholder="Số điện thoại" autoComplete="on" />
              </div>
            </div>
            <div className="mt-6">
              <div className="">
                <span>Mật khẩu</span>
                <input type="password" name="password" className="border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none" placeholder="Mật khẩu" autoComplete="on" />
              </div>
            </div>
            <div className="mt-6 w-fit">
              <div className="bg-orange-400 px-12 py-2 rounded-md">
                <button>Log In</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage