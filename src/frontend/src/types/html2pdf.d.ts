declare module "html2pdf.js" {
  interface Html2PdfOptions {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: Record<string, unknown>;
    jsPDF?: { unit?: string; format?: string | number[]; orientation?: string };
    pagebreak?: {
      mode?: string | string[];
      before?: string;
      after?: string;
      avoid?: string;
    };
  }
  interface Html2PdfInstance {
    set(options: Html2PdfOptions): Html2PdfInstance;
    from(element: HTMLElement): Html2PdfInstance;
    toPdf(): Html2PdfInstance;
    get(type: string): Promise<{ save: (filename: string) => void }>;
    save(): Promise<void>;
    outputPdf(type: string): Promise<Blob>;
  }
  function html2pdf(): Html2PdfInstance;
  export = html2pdf;
}
