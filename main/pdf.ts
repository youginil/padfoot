import path from "path";
import * as mupdf from "mupdf";
import logger from "./logger";

interface WorkingFile {
    info: DocInfo;
    doc: mupdf.Document;
}

let wfile: WorkingFile | null = null;

export function openPDFFile(filepath: string): DocInfo {
    const name = path.basename(filepath);
    let doc: mupdf.Document;
    try {
        doc = mupdf.PDFDocument.openDocument(filepath);
    } catch (e) {
        logger.error(`fail to open "${filepath}". ${e}`);
        throw new Error(`fail to open ${name}`);
    }
    const info: DocInfo = {
        name,
        path: filepath,
        meta: getMetaData(doc)!,
    };
    wfile = { info, doc };
    return wfile.info;
}

function getMetaData(document?: mupdf.Document): DocMeta | null {
    const doc = wfile?.doc ?? document;
    if (doc === undefined) {
        return null;
    }
    const D = mupdf.PDFDocument;
    return {
        format: doc.getMetaData(D.META_FORMAT),
        encryption: doc.getMetaData(D.META_ENCRYPTION),
        author: doc.getMetaData(D.META_INFO_AUTHOR),
        title: doc.getMetaData(D.META_INFO_TITLE),
        subject: doc.getMetaData(D.META_INFO_SUBJECT),
        keywords: doc.getMetaData(D.META_INFO_KEYWORDS),
        creator: doc.getMetaData(D.META_INFO_CREATOR),
        producer: doc.getMetaData(D.META_INFO_PRODUCER),
        createDate: doc.getMetaData(D.META_INFO_CREATIONDATE),
        modifyDate: doc.getMetaData(D.META_INFO_MODIFICATIONDATE),
        permission: {
            print: doc.hasPermission("print"),
            copy: doc.hasPermission("copy"),
            edit: doc.hasPermission("edit"),
            annotate: doc.hasPermission("annotate"),
            form: doc.hasPermission("form"),
            accessibility: doc.hasPermission("accessibility"),
            assemble: doc.hasPermission("assemble"),
            "print-hq": doc.hasPermission("print-hq"),
        },
    };
}
