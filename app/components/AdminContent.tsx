'use client'
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const AdminContent = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    useEffect(() => {
        const requestNotificationPermission = () => {
            if (('Notification' in window) == false) {
                toast.error('This browser does not support notifications.')
            } else {
                if (Notification.permission !== "granted") {
                    Notification.requestPermission().then((result) => {
                        console.log(`Notification permission: ${result}`)
                    }).catch((err) => {
                        console.error('Permission request failed:', err)
                    })
                }
            }
        }

        requestNotificationPermission()
    }, [])

    return (
        <main className="bg-[#f6f6f6] h-full overflow-y-auto">
            <div className="w-full mx-auto">
                {children}
            </div>
        </main>
    )
}

export default AdminContent