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
    open: RR<void, DocInfo | null>;
};

type DocumentPermission =
    | "print"
    | "copy"
    | "edit"
    | "annotate"
    | "form"
    | "accessibility"
    | "assemble"
    | "print-hq";

type LinkDestType =
    | "Fit"
    | "FitB"
    | "FitH"
    | "FitBH"
    | "FitV"
    | "FitBV"
    | "FitR"
    | "XYZ";

interface DocMeta {
    format?: string;
    encryption?: string;
    author?: string;
    title?: string;
    subject?: string;
    keywords?: string;
    creator?: string;
    producer?: string;
    createDate?: string;
    modifyDate?: string;
    permission?: Record<DocumentPermission, boolean>;
}

interface DocInfo {
    name: string;
    path: string;
    meta: DocMeta;
}
