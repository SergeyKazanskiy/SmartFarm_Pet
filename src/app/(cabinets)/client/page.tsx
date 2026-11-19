import { redirect } from "next/navigation";
import { DEFAULT_FLOW } from "@/settings/flows/client-flow-meta";

/*
  Роут /client/ → редирект на /client/initial
  (чтобы не было пустой страницы без вкладок)
*/

export default function ClientRootPage() {
  redirect(`/client/${DEFAULT_FLOW}`);
}