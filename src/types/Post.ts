import { JSX } from "react/jsx-runtime";

export interface Post {
  map(arg0: (post: Post) => JSX.Element): import("react").ReactNode;
  id: number;
  userId: number;
  title: string;
  body: string;
}
