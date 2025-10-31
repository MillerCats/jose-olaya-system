import { getAllRoles } from "@/app/actions/roles/rol.action";
import { Modal } from "@/components/dashboard/Modal";

export default async function DireccionPage() {
  
  const roles = await getAllRoles();
  console.log(roles);
  
  return (
    <div>
      <Modal roles={roles}/>
    </div>
  );
}