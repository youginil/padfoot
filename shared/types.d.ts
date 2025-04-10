type RequestData<T> = {
    id: number;
    data: T;
};

type ResponseData<T> = {
    id: number;
    data?: T;
    err?: string;
};

type RR<Req, Res> = [Req, Res];

type IpcMessage = {
    hello: RR<void, string>;
};
