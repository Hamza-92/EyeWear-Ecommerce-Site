import { storeConfig } from "@/config/store";

export function Wordmark() {
  return (
    <span className="text-sm font-bold tracking-[0.24em] text-action uppercase">
      {storeConfig.name}
    </span>
  );
}
