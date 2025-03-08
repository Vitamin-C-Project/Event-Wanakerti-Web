import { Skeleton } from "@/components/ui/skeleton";
import { Flex, Grid } from "@radix-ui/themes";

export default function SkeletonGeneral() {
  return (
    <Flex direction={"column"} className="space-y-3">
      <Grid columns={"12"} className="space-x-3 space-y-3">
        <Skeleton className="h-9 col-span-12 w-full" />
        <Skeleton className="h-9 col-span-3" />
        <Skeleton className="h-9 col-span-3" />
        <Skeleton className="h-9 col-span-3" />
        <Skeleton className="h-9 col-span-3 w-full" />
        <Skeleton className="h-9 col-span-3" />
        <Skeleton className="h-9 col-span-3" />
        <Skeleton className="h-9 col-span-3" />
        <Skeleton className="h-9 col-span-3 w-full" />
        <Skeleton className="h-9 col-span-3" />
        <Skeleton className="h-9 col-span-3" />
        <Skeleton className="h-9 col-span-3" />
        <Skeleton className="h-9 col-span-3 w-full" />
      </Grid>
    </Flex>
  );
}
