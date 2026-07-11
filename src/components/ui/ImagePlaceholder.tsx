import { ImageIcon } from "lucide-react";

type Props = {
  label: string;
  ratio?: "16/9" | "4/3" | "1/1";
};

const ratioClasses: Record<string, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

export function ImagePlaceholder({ label, ratio = "16/9" }: Props) {
  return (
    <div
      className={`${ratioClasses[ratio]} w-full bg-[#F0F0EE] border border-dashed border-[#D0D0CC] flex flex-col items-center justify-center gap-3`}
    >
      <ImageIcon className="w-8 h-8 text-fg-muted/40" strokeWidth={1.5} />
      <p className="text-sm text-fg-muted font-sans px-4 text-center">
        {label}
      </p>
    </div>
  );
}
