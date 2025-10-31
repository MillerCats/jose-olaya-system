import { db } from "@/data";
import { roles } from "@/data/schema";

export async function getAllRoles() {
  const data = db.select().from(roles);
  return data;
}