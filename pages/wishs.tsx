import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

interface Props {
    name?: string;
}

interface Response {
    message: string;
    createTime: string;
}

const Wishs: React.FC<Props> = ({}) => {
    const [Data, setData] = useState<Response[]>([]);

    const getData = async () => {
        let { data } = await axios.get<Response[]>("/api/list");
        setData(data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="flex flex-col gap-2 py-2 items-center sticky top-0 bg-co2 w-full ">
                <div className="relative w-full flex justify-center">
                    <div className="font-bold text-co-white text-3xl ">
                        คำอวยพรล่าสุด
                    </div>
                    {/* <div className="absolute mx-auto max-w-md top-0 left-0 w-full">
                        x
                    </div> */}
                </div>
            </div>
            <div className="max-w-[30rem]  mx-auto gap-3 flex flex-col items-center p-3 w-full">
                <div className="w-full flex flex-col gap-3">
                    {Data.map((item, idx) => (
                        <Wish {...item} />
                    ))}
                    {/* {[...Array(10)].map((item) => (
                        <Wish />
                    ))} */}
                </div>
            </div>
        </>
    );
};

const Wish = (props: Response) => {
    const [Expand, setExpand] = useState(false);
    return (
        <div
            className={`flex flex-col w-full justify-between border border-co-gray px-3 rounded-xl h-[8rem]`}
        >
            <div className="font-bold mt-3 overflow-y-auto">
               {props.message}
            </div>
            <div className="flex justify-between">
                <div className="mt-3 text-co-gray">{moment(props.createTime).fromNow()}</div>
               
            </div>
        </div>
    );
};

export default Wishs;
