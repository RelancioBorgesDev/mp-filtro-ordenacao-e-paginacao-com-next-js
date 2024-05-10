"use client";
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { setUrlParams } from "@/utils/setUrlParams";
import { link } from "fs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  from: number;
  lastPage: number;
}

export default function Pagination({ links, from, lastPage }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChangePage = (page: number) => {
    const params = setUrlParams("page", page.toString(), searchParams);

    if (page >= 1) {
      if (page > lastPage) {
        params.set("page", "30");
      } else {
        params.set("page", page.toString());
      }
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()} `, { scroll: false });
  };

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem
          className={`${
            links[0].url
              ? "cursor-pointer"
              : "cursor-not-allowed text-slate-300"
          }`}
          onClick={() =>
            handleChangePage(Number(searchParams.get("page") || 1) - 1)
          }
        >
          <PaginationPrevious />
        </PaginationItem>
        {links.map((link, idx) => {
          if (link.label.includes("Previous") || link.label.includes("Next")) {
            return null;
          }
          return (
            <PaginationItem
              key={idx}
              className="hidden md:inline-flex cursor-pointer"
            >
              <PaginationLink
                isActive={link.active}
                onClick={() => handleChangePage(Number.parseInt(link.label))}
              >
                {link.label}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem
          className={`${
            links[links.length - 1].url
              ? "cursor-pointer"
              : "cursor-not-allowed text-slate-300"
          }`}
          onClick={() =>
            handleChangePage(Number(searchParams.get("page") || 1) + 1)
          }
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
