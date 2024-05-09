export type Order = {
  id: number;
  customer_name: string;
  customer_email: string;
  order_date: Date;
  amount_in_cents: number;
  status: string;
  created_at: Date;
  updated_at: Date;
};

export type OrderData = {
  data: {
    data: Order[];
  };
};

export type LinkType = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type MetaType = {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type ResponseType = {
  data: Order[];
  links: LinkType;
  meta: MetaType;
};
