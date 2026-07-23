import HomeClient from "@/components/HomeClient";
import { DeploymentCatalog } from "@/components/DeploymentCatalog";
import { getProjects } from "@/actions/project.actions";

export default async function Page() {
  const projects = await getProjects();
  return <HomeClient productsSection={<DeploymentCatalog projects={projects} />} />;
}
