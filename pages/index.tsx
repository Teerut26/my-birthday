import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Index: React.FC = () => {
    const wish_message = useRef<HTMLTextAreaElement>(null);
    const [sendSuccess, setsendSuccess] = useState<boolean>(false);

    const [Size, setSize] = useState<number | undefined>();

    const getData = async () => {
        let { data } = await axios.get("/api/info");
        setSize(data.size);
    };

    useEffect(() => {
        getData();
    }, []);

    const onSubmit = async () => {
        if (wish_message.current?.value !== "") {
            let { data } = await axios.post("/api/add", {
                message: wish_message.current?.value,
            });
            clearForm();
            getData();
            setsendSuccess(true);
            setTimeout(() => {
                setsendSuccess(false);
            }, 3000);
        }
    };

    const clearForm = () => {
        if (wish_message.current) {
            wish_message.current.value = "";
        }
    };

    return (
        <div className="absolute top-0 bottom-0 right-0 left-0 flex flex-col justify-center">
            <div className="max-w-[30rem] mx-auto gap-3 flex flex-col items-center p-3 w-full">
                <div className="flex flex-col gap-2 items-center">
                    <div className="font-bold text-co1 text-xl">
                        ส่งคำอวยพรให้เจ้าของวันเกิดกันเถอะ!
                    </div>
                    <div className="font-bold text-co1 text-md">
                        มีผู้เขียนคำอวยพร {Size} ครั้ง
                    </div>
                </div>
                {sendSuccess && (
                    <div className="alert alert-success rounded-xl">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current flex-shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>ขอบคุณสำหรับคำอวยพรค้าบบ</span>
                        </div>
                    </div>
                )}

                <div className="w-full">
                    <textarea
                        ref={wish_message}
                        placeholder="อยากจะบอกอะไรกับเจ้าของวันเกิด?"
                        className="placeholder-slate-400 p-3 border-dashed border-4 border-co2 rounded-xl focus:outline-none w-full"
                        rows={10}
                    ></textarea>
                </div>
                <div className="flex flex-col items-center w-full">
                    <div
                        onClick={() => onSubmit()}
                        className="p-3 w-full bg-co2 hover:bg-co2/90 text-co-white text-xl rounded-xl flex justify-center cursor-pointer select-none"
                    >
                        ส่งคำอวยพร
                    </div>
                </div>
                <div className="w-full flex flex-col items-center">
                    <Link href="/wishs">
                        <a
                            href="/wishs"
                            className="text-co-gray cursor-pointer select-none"
                        >
                            ดูคำอวยพรทั้งหมด
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Index;
