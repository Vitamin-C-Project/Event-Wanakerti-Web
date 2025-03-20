import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid, Text } from "@radix-ui/themes";
import Leaderboard from "../leaderboard/Leaderboard";
import { useEffect, useState } from "react";
import { CountingInterface } from "@/interfaces/cms_interface";
import { postData } from "@/lib/utils";
import { API_PATH_CONSTANT } from "@/constants/api_constant";
import { Skeleton } from "@/components/ui/skeleton";

export default function Counting() {
  const [counting, setCounting] = useState<CountingInterface>();
  const [isLoading, setIsLoading] = useState(false);

  const getCounting = async () => {
    setIsLoading(true);
    try {
      const response = await postData(API_PATH_CONSTANT.DASHBOARD.COUNTING, {});
      setCounting(response.data.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCounting();
  }, []);

  return (
    <>
      <Grid className="auto-rows-min gap-4" columns={{ md: "4", sm: "2" }}>
        {isLoading ? (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Total Pangkalan</CardTitle>
              </CardHeader>
              <CardContent>
                <Text className="font-bold text-2xl">
                  {counting?.total_school}
                </Text>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Pleton LKBBT</CardTitle>
              </CardHeader>
              <CardContent>
                <Text className="font-bold text-2xl">
                  {counting?.total_lkbbt}
                </Text>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Tim Hiking</CardTitle>
              </CardHeader>
              <CardContent>
                <Text className="font-bold text-2xl">
                  {counting?.total_hiking}
                </Text>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Peserta</CardTitle>
              </CardHeader>
              <CardContent>
                <Text className="font-bold text-2xl">
                  {counting?.total_member}
                </Text>
              </CardContent>
            </Card>
          </>
        )}
      </Grid>
      <Leaderboard />
    </>
  );
}
