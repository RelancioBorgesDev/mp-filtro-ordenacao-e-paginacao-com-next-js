"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setUrlParams } from "@/utils/setUrlParams";
import { useDebouncedCallback } from "use-debounce";
import { useRef } from "react";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = useDebouncedCallback(() => {
    if (inputRef.current) {
      const searchString = inputRef.current.value;
      const params = setUrlParams("search", searchString, searchParams);
      replace(`${pathname}?${params.toString()} `);
    }
  }, 300);

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Busque por nome..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        onChange={handleChange}
        ref={inputRef}
      />
    </div>
  );
}
