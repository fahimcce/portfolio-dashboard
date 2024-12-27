export type Tuser = {
  email: string;
  role: "OWNER";
};

export type ProductCardProps = {
  id?: string;
  name: string;
  photo?: string;
  category?: string;
  description: string;
  github?: string;
  live?: string;
};

export type TupdateProduct = {
  id?: string;
  name?: string;
  photo?: string;
  category?: string;
  description?: string;
  github?: string;
  live?: string;
};
