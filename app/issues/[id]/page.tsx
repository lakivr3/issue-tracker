import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { EditIssueButton } from "./EditIssueButton";
import IssueDetailts from "./IssueDetailts";

interface Props {
  params: { id: string };
}

export default async function IssueDetailPage({ params }: Props) {
  //   if (typeof parseInt(params.id) !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetailts issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
}
