export type Sublink = {
  name: string;
  path: string;
};

export type Route = {
  name: string;
  path?: string; // Opcional cuando hay sublinks
  sublink?: Sublink[];
};