import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  image_url: string | null;
  branch_name: string;
  bio: string | null;
  whatsapp_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface Schedule {
  id: string;
  doctor_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_off_day: boolean;
}

export interface DoctorWithSchedule extends Doctor {
  schedules: Schedule[];
}

export function useDoctors(searchQuery?: string) {
  return useQuery({
    queryKey: ["doctors", searchQuery],
    queryFn: async () => {
      let query = supabase.from("doctors").select("*").order("name");

      if (searchQuery) {
        query = query.or(
          `name.ilike.%${searchQuery}%,specialization.ilike.%${searchQuery}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Doctor[];
    },
  });
}

export function useDoctorWithSchedule(doctorId: string) {
  return useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: async () => {
      const { data: doctor, error: doctorError } = await supabase
        .from("doctors")
        .select("*")
        .eq("id", doctorId)
        .maybeSingle();

      if (doctorError) throw doctorError;
      if (!doctor) return null;

      const { data: schedules, error: scheduleError } = await supabase
        .from("schedules")
        .select("*")
        .eq("doctor_id", doctorId)
        .order("day_of_week");

      if (scheduleError) throw scheduleError;

      return {
        ...doctor,
        schedules: schedules || [],
      } as DoctorWithSchedule;
    },
    enabled: !!doctorId,
  });
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      doctor: Omit<Doctor, "id" | "created_at" | "updated_at">
    ) => {
      const { data, error } = await supabase
        .from("doctors")
        .insert(doctor)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success("Doctor added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add doctor: " + error.message);
    },
  });
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<Doctor> & { id: string }) => {
      const { data, error } = await supabase
        .from("doctors")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor", id] });
      toast.success("Doctor updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update doctor: " + error.message);
    },
  });
}

export function useDeleteDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (doctorId: string) => {
      const { error } = await supabase
        .from("doctors")
        .delete()
        .eq("id", doctorId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success("Doctor deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete doctor: " + error.message);
    },
  });
}

export function useUpsertSchedules() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      doctorId,
      schedules,
    }: {
      doctorId: string;
      schedules: Omit<Schedule, "id">[];
    }) => {
      // First delete existing schedules
      await supabase.from("schedules").delete().eq("doctor_id", doctorId);

      // Then insert new ones
      if (schedules.length > 0) {
        const { error } = await supabase.from("schedules").insert(schedules);
        if (error) throw error;
      }
    },
    onSuccess: (_, { doctorId }) => {
      queryClient.invalidateQueries({ queryKey: ["doctor", doctorId] });
      toast.success("Schedule updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update schedule: " + error.message);
    },
  });
}

export interface DoctorWithTodaySchedule {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  image_url: string | null;
  branch_name: string;
  whatsapp_number: string | null;
  start_time: string;
  end_time: string;
}

export function useTodaysDoctors(dayOfWeek?: number) {
  const today = dayOfWeek ?? new Date().getDay();
  
  return useQuery({
    queryKey: ["doctors-today", today],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("schedules")
        .select(`
          start_time,
          end_time,
          doctors (
            id,
            name,
            specialization,
            qualification,
            image_url,
            branch_name,
            whatsapp_number
          )
        `)
        .eq("day_of_week", today)
        .eq("is_off_day", false)
        .order("start_time");

      if (error) throw error;
      
      return (data || []).map((item: any) => ({
        ...item.doctors,
        start_time: item.start_time,
        end_time: item.end_time,
      })) as DoctorWithTodaySchedule[];
    },
  });
}

export function useDoctorsAvailabilityToday() {
  const today = new Date().getDay();
  
  return useQuery({
    queryKey: ["doctors-availability-today", today],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("schedules")
        .select("doctor_id")
        .eq("day_of_week", today)
        .eq("is_off_day", false);

      if (error) throw error;
      
      const availableDoctorIds = new Set((data || []).map((s) => s.doctor_id));
      return availableDoctorIds;
    },
  });
}

export function useDoctorsByDay(day: number | null) {
  return useQuery({
    queryKey: ["doctors-by-day", day],
    enabled: day !== null,
    queryFn: async () => {
      if (day === null) return new Set<string>();
      
      const { data, error } = await supabase
        .from("schedules")
        .select("doctor_id")
        .eq("day_of_week", day)
        .eq("is_off_day", false);

      if (error) throw error;
      
      return new Set((data || []).map((s) => s.doctor_id));
    },
  });
}
