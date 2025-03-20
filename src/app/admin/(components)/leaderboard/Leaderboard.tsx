import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { useCallback, useEffect, useState } from "react";
import { LeaderboardInterface } from "@/interfaces/cms_interface";
import { API_PATH_CONSTANT } from "@/constants/api_constant";
import { postData } from "@/lib/utils";
import { IMeta } from "@/interfaces/common";
import { DataTablePagination } from "@/components/pagination-datatable";
import { Flex, Grid } from "@radix-ui/themes";
import SkeletonGeneral from "@/components/skeleton";
import { Input } from "@/components/ui/input";
import _ from "lodash";
import { Search } from "lucide-react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardInterface[]>([]);
  const [filter, setFilter] = useState({
    page: 1,
    per_page: 12,
    search: "",
  });
  const [metadata, setMetadata] = useState<IMeta>();
  const [isLoading, setIsLoading] = useState(false);

  const getLeaderboard = async () => {
    setIsLoading(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.DASHBOARD.LEADERBOARD,
        filter
      );

      setLeaderboard(response.data.data);
      setMetadata(response.data.pagination);
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = useCallback(
    _.debounce((value: any) => {
      setFilter((prev) => ({ ...prev, search: value }));
    }, 500),
    []
  );

  useEffect(() => {
    getLeaderboard();
  }, [filter]);

  return (
    <Card>
      <CardHeader className="md:flex-row justify-between items-start md:items-center md:gap-0 gap-4">
        <CardTitle>Nilai Sementara</CardTitle>
        <Flex align={"center"}>
          <div className="border border-e-0 rounded-e-none rounded-md py-[5px] ps-2">
            <Search />
          </div>
          <Input
            placeholder="Cari berdasarkan no dada atau nama tim"
            className="w-full border-s-0 rounded-s-none"
            onChange={(e) => {
              setTimeout(() => {
                handleSearch(e.target.value);
              }, 100);
            }}
          />
        </Flex>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <SkeletonGeneral />
        ) : (
          <Grid gap={"3"}>
            <DataTable columns={columns({})} data={leaderboard} />
            <DataTablePagination
              metadata={metadata!}
              onPageChange={(e) => {
                setFilter({ ...filter, page: e });
              }}
            />
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}
