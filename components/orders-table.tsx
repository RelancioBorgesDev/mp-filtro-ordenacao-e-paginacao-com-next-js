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
import { ChevronsUpDown } from "lucide-react";
import type { Order } from "@/types/OrdersType";
import { stat } from "fs";
import { centsToBrl } from "@/utils/centsToBrl";
import { setUrlParams } from "@/utils/setUrlParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [ordType, setOrdType] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleOrdTypeChange = () => {
    if (ordType === "") {
      setOrdType("-");
    } else {
      setOrdType("");
    }
  };
  const handleFilterByField = (sortField: string): void => {
    handleOrdTypeChange();
    const sortedField = ordType === "-" ? `-${sortField}` : sortField;
    const params = setUrlParams("sort", sortedField, searchParams);
    replace(`${pathname}?${params.toString()}`);
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
              <ChevronsUpDown className="w-4" />
            </div>
          </TableHead>
          <TableHead
            className="text-right cursor-pointer flex justify-end items-center gap-1"
            onClick={() => handleFilterByField("amount_in_cents")}
          >
            Valor
            <ChevronsUpDown className="w-4" />
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
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
