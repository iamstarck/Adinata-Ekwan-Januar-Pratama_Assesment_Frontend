import { createDataService } from "@/api/createData.service";
import { deleteDataService } from "@/api/deleteData.service";
import { getAllDataService } from "@/api/getAllData.service";
import {
  updateDataService,
  type updateDataPayload,
} from "@/api/updateData.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePackages = () => {
  const queryClient = useQueryClient();

  const packagesQuery = useQuery({
    queryKey: ["packages"],
    queryFn: getAllDataService,
    staleTime: 1000 * 60,
  });

  const createMutation = useMutation({
    mutationFn: createDataService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: updateDataPayload }) =>
      updateDataService(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteDataService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });

  return { packagesQuery, createMutation, updateMutation, deleteMutation };
};
