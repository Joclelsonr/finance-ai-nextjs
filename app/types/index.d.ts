export interface IPdfOptions {
  method: "open" | "save" | "build" | undefined;
  filename: string;
  page: {
    margin: number;
    format: string;
    orientation: "portrait" | "p" | "l" | "landscape";
  };
}
