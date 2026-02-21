import { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Search, Users, Phone, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useDoctors,
  useCreateDoctor,
  useUpdateDoctor,
  useDeleteDoctor,
  Doctor,
} from "@/hooks/useDoctors";
import { useSpecializations, useCreateSpecialization } from "@/hooks/useSpecializations";
import { toast } from "sonner";

type DoctorFormData = Omit<Doctor, "id" | "created_at" | "updated_at">;

const emptyFormData: DoctorFormData = {
  name: "",
  specialization: "",
  qualification: "",
  image_url: "",
  branch_name: "",
  bio: "",
  whatsapp_number: "",
};

const AdminDoctors = () => {
  const { data: doctors, isLoading } = useDoctors();
  const { data: specializations } = useSpecializations();
  const createDoctor = useCreateDoctor();
  const updateDoctor = useUpdateDoctor();
  const deleteDoctor = useDeleteDoctor();
  const createSpecialization = useCreateSpecialization();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddSpecOpen, setIsAddSpecOpen] = useState(false);
  const [newSpecName, setNewSpecName] = useState("");
  const [newSpecNameBn, setNewSpecNameBn] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState<DoctorFormData>(emptyFormData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddSpecialization = async () => {
    if (!newSpecName.trim()) {
      toast.error("বিশেষত্বের নাম দিন");
      return;
    }
    
    try {
      const newSpec = await createSpecialization.mutateAsync({
        name: newSpecName.trim(),
        name_bn: newSpecNameBn.trim() || undefined,
      });
      setFormData({ ...formData, specialization: newSpec.name });
      setIsAddSpecOpen(false);
      setNewSpecName("");
      setNewSpecNameBn("");
    } catch (error) {
      // Error handled in hook
    }
  };

  // Filter doctors based on search
  const filteredDoctors = doctors?.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.branch_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setSelectedDoctor(null);
    setFormData(emptyFormData);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      image_url: doctor.image_url || "",
      branch_name: doctor.branch_name,
      bio: doctor.bio || "",
      whatsapp_number: doctor.whatsapp_number || "",
    });
    setIsDialogOpen(true);
  };

  const handleOpenDelete = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.specialization || !formData.qualification || !formData.branch_name) {
      toast.error("অনুগ্রহ করে সমস্ত প্রয়োজনীয় ক্ষেত্র পূরণ করুন");
      return;
    }

    const dataToSubmit = {
      ...formData,
      image_url: formData.image_url || null,
      bio: formData.bio || null,
      whatsapp_number: formData.whatsapp_number || null,
    };

    if (selectedDoctor) {
      await updateDoctor.mutateAsync({ id: selectedDoctor.id, ...dataToSubmit });
    } else {
      await createDoctor.mutateAsync(dataToSubmit);
    }

    setIsDialogOpen(false);
    setFormData(emptyFormData);
  };

  const handleDelete = async () => {
    if (selectedDoctor) {
      await deleteDoctor.mutateAsync(selectedDoctor.id);
      setIsDeleteOpen(false);
      setSelectedDoctor(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">ডাক্তার ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">ডাক্তার প্রোফাইল এবং তথ্য পরিচালনা করুন</p>
        </div>
        <Button onClick={handleOpenAdd} variant="teal" className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          নতুন ডাক্তার যোগ করুন
        </Button>
      </div>

      {/* Search & Stats */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ডাক্তার খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>{doctors?.length || 0} ডাক্তার</span>
              <span>•</span>
              <span>{doctors?.filter(d => d.whatsapp_number).length || 0} হোয়াটস্যাপ সক্রিয়</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doctors Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      ) : filteredDoctors?.length === 0 ? (
        <Card className="border border-border/50 shadow-sm">
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-1">কোনো ডাক্তার পাওয়া যায়নি</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {searchQuery ? "আপনার অনুসন্ধান পরিবর্তন করুন" : "শুরু করতে প্রথম ডাক্তার যোগ করুন"}
            </p>
            {!searchQuery && (
              <Button onClick={handleOpenAdd} variant="teal">
                <Plus className="h-4 w-4 mr-2" />
                নতুন ডাক্তার যোগ করুন
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors?.map((doctor) => (
            <Card key={doctor.id} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 overflow-hidden">
                    {doctor.image_url ? (
                      <img
                        src={doctor.image_url}
                        alt={doctor.name}
                        className="h-14 w-14 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <Users className={`h-7 w-7 text-secondary ${doctor.image_url ? 'hidden' : ''} fallback-icon`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">{doctor.name}</CardTitle>
                    <CardDescription className="truncate">{doctor.qualification}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs bg-secondary/10 text-secondary border-0">
                    {doctor.specialization}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {doctor.branch_name}
                  </Badge>
                </div>
                
                {doctor.whatsapp_number && (
                  <div className="flex items-center gap-2 text-sm text-whatsapp">
                    <Phone className="h-3.5 w-3.5" />
                    <span className="truncate">{doctor.whatsapp_number}</span>
                  </div>
                )}

                <div className="flex gap-2 pt-2 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-secondary hover:text-secondary hover:bg-secondary/10"
                    onClick={() => handleOpenEdit(doctor)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    সম্পাদনা
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleOpenDelete(doctor)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl text-secondary">
              {selectedDoctor ? "ডাক্তার সম্পাদনা করুন" : "নতুন ডাক্তার যোগ করুন"}
            </DialogTitle>
            <DialogDescription>
              ডাক্তারের তথ্য পূরণ করুন। বুকিংয়ের জন্য হোয়াটস্যাপ নম্বর গুরুত্বপূর্ণ।
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">পুরো নাম *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ডা. নাম"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">বিশেষত্ব *</Label>
                <Select
                  value={formData.specialization}
                  onValueChange={(value) => {
                    if (value === "__add_new__") {
                      setIsAddSpecOpen(true);
                    } else {
                      setFormData({ ...formData, specialization: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="বিশেষত্ব নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations?.map((spec) => (
                      <SelectItem key={spec.id} value={spec.name}>
                        {spec.name}
                        {spec.name_bn && ` (${spec.name_bn})`}
                      </SelectItem>
                    ))}
                    <SelectItem value="__add_new__" className="text-secondary font-medium">
                      <span className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4" />
                        নতুন বিশেষত্ব যোগ করুন
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">যোগ্যতা *</Label>
                <Input
                  id="qualification"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="MBBS, MD"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">শাখা *</Label>
                <Input
                  id="branch"
                  value={formData.branch_name}
                  onChange={(e) => setFormData({ ...formData, branch_name: e.target.value })}
                  placeholder="প্রধান হাসপাতাল"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="whatsapp" className="text-whatsapp font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  হোয়াটস্যাপ নম্বর (গুরুত্বপূর্ণ!)
                </Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp_number}
                  onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                  placeholder="+919876543210"
                  className="border-whatsapp/30 focus-visible:ring-whatsapp"
                />
                <p className="text-xs text-muted-foreground">
                  দেশের কোড সহ দিন। এটি সরাসরি বুকিং বাটনে সংযুক্ত হবে।
                </p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="image">ছবির URL</Label>
                <Input
                  id="image"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/doctor-photo.jpg"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">জীবনী</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="ডাক্তার সম্পর্কে সংক্ষিপ্ত বিবরণ..."
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                বাতিল করুন
              </Button>
              <Button
                type="submit"
                variant="teal"
                disabled={createDoctor.isPending || updateDoctor.isPending}
              >
                {(createDoctor.isPending || updateDoctor.isPending) && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                {selectedDoctor ? "পরিবর্তন সংরক্ষণ করুন" : "ডাক্তার যোগ করুন"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ডাক্তার মুছে ফেলবেন?</AlertDialogTitle>
            <AlertDialogDescription>
              এটি {selectedDoctor?.name} এর প্রোফাইল এবং তাদের সমস্ত সময়সূচী স্থায়ীভাবে মুছে ফেলবে।
              এই ক্রিয়াটি পূর্বাবস্থায় ফেরানো যাবে না।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>বাতিল করুন</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteDoctor.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              মুছে ফেলুন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Specialization Dialog */}
      <Dialog open={isAddSpecOpen} onOpenChange={setIsAddSpecOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-secondary">নতুন বিশেষত্ব যোগ করুন</DialogTitle>
            <DialogDescription>
              নতুন বিশেষত্ব যোগ করুন যা ডাক্তার তৈরি করার সময় ব্যবহার করা যাবে।
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="spec-name">নাম (ইংরেজি) *</Label>
              <Input
                id="spec-name"
                value={newSpecName}
                onChange={(e) => setNewSpecName(e.target.value)}
                placeholder="Cardiology"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spec-name-bn">নাম (বাংলা)</Label>
              <Input
                id="spec-name-bn"
                value={newSpecNameBn}
                onChange={(e) => setNewSpecNameBn(e.target.value)}
                placeholder="হৃদরোগ বিশেষজ্ঞ"
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsAddSpecOpen(false)}>
              বাতিল
            </Button>
            <Button
              variant="teal"
              onClick={handleAddSpecialization}
              disabled={createSpecialization.isPending}
            >
              {createSpecialization.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              যোগ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDoctors;
