import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
export interface TestCategory {
    id: string;
    name: string;
    icon_name: string;
    bg_color: string;
    icon_color: string;
    sort_order: number;
    created_at: string;
}
export interface Test {
    id: string;
    category_id: string;
    name: string;
    price: string;
    preparation: string;
    report_time: string;
    sort_order: number;
    created_at: string;
}
export const useTestCategories = () => {
    return useQuery({
        queryKey: ["test_categories"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("test_categories")
                .select("*")
                .order("sort_order", { ascending: true });
            if (error) throw error;
            return data as TestCategory[];
        },
    });
};
export const useTests = (categoryId?: string) => {
    return useQuery({
        queryKey: ["tests", categoryId],
        queryFn: async () => {
            let query = supabase.from("tests").select("*").order("sort_order", { ascending: true });
            if (categoryId) query = query.eq("category_id", categoryId);
            const { data, error } = await query;
            if (error) throw error;
            return data as Test[];
        },
    });
};
export const useAllTests = () => {
    return useQuery({
        queryKey: ["tests", "all"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("tests")
                .select("*")
                .order("sort_order", { ascending: true });
            if (error) throw error;
            return data as Test[];
        },
    });
};
export const useCreateTestCategory = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (data: Omit<TestCategory, "id" | "created_at">) => {
            const { data: res, error } = await supabase.from("test_categories").insert(data).select().single();
            if (error) throw error;
            return res;
        },
        onSuccess: () => { qc.invalidateQueries({ queryKey: ["test_categories"] }); toast.success("বিভাগ যোগ করা হয়েছে"); },
        onError: () => { toast.error("বিভাগ যোগ করতে সমস্যা হয়েছে"); },
    });
};
export const useUpdateTestCategory = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...data }: Partial<TestCategory> & { id: string }) => {
            const { data: res, error } = await supabase.from("test_categories").update(data).eq("id", id).select().single();
            if (error) throw error;
            return res;
        },
        onSuccess: () => { qc.invalidateQueries({ queryKey: ["test_categories"] }); toast.success("বিভাগ আপডেট হয়েছে"); },
        onError: () => { toast.error("বিভাগ আপডেট করতে সমস্যা হয়েছে"); },
    });
};
export const useDeleteTestCategory = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("test_categories").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => { qc.invalidateQueries({ queryKey: ["test_categories"] }); qc.invalidateQueries({ queryKey: ["tests"] }); toast.success("বিভাগ মুছে ফেলা হয়েছে"); },
        onError: () => { toast.error("বিভাগ মুছে ফেলতে সমস্যা হয়েছে"); },
    });
};
export const useCreateTest = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (data: Omit<Test, "id" | "created_at">) => {
            const { data: res, error } = await supabase.from("tests").insert(data).select().single();
            if (error) throw error;
            return res;
        },
        onSuccess: () => { qc.invalidateQueries({ queryKey: ["tests"] }); toast.success("পরীক্ষা যোগ করা হয়েছে"); },
        onError: () => { toast.error("পরীক্ষা যোগ করতে সমস্যা হয়েছে"); },
    });
};
export const useUpdateTest = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...data }: Partial<Test> & { id: string }) => {
            const { data: res, error } = await supabase.from("tests").update(data).eq("id", id).select().single();
            if (error) throw error;
            return res;
        },
        onSuccess: () => { qc.invalidateQueries({ queryKey: ["tests"] }); toast.success("পরীক্ষা আপডেট হয়েছে"); },
        onError: () => { toast.error("পরীক্ষা আপডেট করতে সমস্যা হয়েছে"); },
    });
};
export const useDeleteTest = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("tests").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => { qc.invalidateQueries({ queryKey: ["tests"] }); toast.success("পরীক্ষা মুছে ফেলা হয়েছে"); },
        onError: () => { toast.error("পরীক্ষা মুছে ফেলতে সমস্যা হয়েছে"); },
    });
};