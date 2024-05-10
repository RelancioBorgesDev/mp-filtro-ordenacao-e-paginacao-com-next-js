"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { ChevronDown, ChevronsUpDown, ChevronUp, Info } from "lucide-react";
import type { Order } from "@/types/OrdersType";
import { centsToBrl } from "@/utils/centsToBrl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { formatDate } from "@/utils/formatDate";

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilterByField = (sortField: string): void => {
    const params = new URLSearchParams(searchParams);
    const sort = params.get("sort");

    if (sort === sortField) {
      params.set("sort", `-${sortField}`);
    } else if (sort === `-${sortField}`) {
      params.delete("sort");
    } else if (sortField) {
      params.set("sort", sortField);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const renderIcon = (sortField: string) => {
    const sort = searchParams.get("sort");
    if (sortField === sort) {
      return <ChevronDown className="w-4" />;
    } else if (sort === `-${sortField}`) {
      return <ChevronUp className="w-4" />;
    }

    return <ChevronsUpDown className="w-4" />;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead className="table-cell cursor-pointer justify-end items-center gap-1">
            <div
              className="flex items-center gap-1"
              onClick={() => handleFilterByField("order_date")}
            >
              Data
              {renderIcon("order_date")}
            </div>
          </TableHead>
          <TableHead
            className="text-right cursor-pointer flex justify-end items-center gap-1"
            onClick={() => handleFilterByField("amount_in_cents")}
          >
            Valor
            {renderIcon("amount_in_cents")}
          </TableHead>
          <TableHead className="table-cell text-right justify-end items-end gap-1">
            Informações
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(
          ({
            id,
            customer_name,
            customer_email,
            order_date,
            status,
            amount_in_cents,
            created_at,
            updated_at,
          }) => (
            <TableRow key={id}>
              <TableCell>
                <div className="font-medium">{customer_name}</div>
                <div className="hidden md:inline text-sm text-muted-foreground">
                  {customer_email}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`text-xs`} variant="outline">
                  {status === "pending" ? "Pendente" : "Completo"}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {order_date.toString()}
              </TableCell>
              <TableCell className="text-right">
                {centsToBrl(amount_in_cents)}
              </TableCell>
              <TableCell className="text-right ">
                <span className="w-full flex items-center justify-end">
                  <HoverCard>
                    <HoverCardTrigger>
                      <Info />
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <ul className="flex flex-col items-center">
                        <li>Criado em: {formatDate(created_at)}</li>
                        <li>Atualizado em: {formatDate(updated_at)}</li>
                      </ul>
                    </HoverCardContent>
                  </HoverCard>
                </span>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
