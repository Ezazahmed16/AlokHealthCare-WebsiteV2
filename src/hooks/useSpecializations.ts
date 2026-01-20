import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Specialization {
  id: string;
  name: string;
  name_bn: string | null;
  created_at: string;
}

// 1. Fetch Hook (The one we fixed earlier)
export const useSpecializations = () => {
  return useQuery({
    queryKey: ["specializations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("specializations")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      return data as Specialization[];
    },
  });
};

// 2. Create Hook (Restored)
export const useCreateSpecialization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; name_bn?: string }) => {
      const { data: newSpec, error } = await supabase
        .from("specializations")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return newSpec;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specializations"] });
      toast.success("বিশেষত্ব সফলভাবে যোগ করা হয়েছে");
    },
    onError: (error: Error) => {
      if (error.message.includes("duplicate")) {
        toast.error("এই বিশেষত্ব ইতিমধ্যে আছে");
      } else {
        toast.error("বিশেষত্ব যোগ করতে সমস্যা হয়েছে: " + error.message);
      }
    },
  });
};

// 3. Update Hook (Restored)
export const useUpdateSpecialization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: {
      id: string;
      name: string;
      name_bn?: string;
    }) => {
      const { data: updated, error } = await supabase
        .from("specializations")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specializations"] });
      toast.success("বিশেষত্ব সফলভাবে আপডেট করা হয়েছে");
    },
    onError: (error: Error) => {
      toast.error("বিশেষত্ব আপডেট করতে সমস্যা হয়েছে: " + error.message);
    },
  });
};

// 4. Delete Hook (Restored)
export const useDeleteSpecialization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("specializations")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specializations"] });
      toast.success("বিশেষত্ব সফলভাবে মুছে ফেলা হয়েছে");
    },
    onError: (error: Error) => {
      toast.error("বিশেষত্ব মুছে ফেলতে সমস্যা হয়েছে: " + error.message);
    },
  });
};