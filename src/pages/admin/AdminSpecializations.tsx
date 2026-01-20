import { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Tag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
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
  useSpecializations,
  useCreateSpecialization,
  useUpdateSpecialization,
  useDeleteSpecialization,
  Specialization,
} from "@/hooks/useSpecializations";

const AdminSpecializations = () => {
  const { data: specializations, isLoading } = useSpecializations();
  const createSpecialization = useCreateSpecialization();
  const updateSpecialization = useUpdateSpecialization();
  const deleteSpecialization = useDeleteSpecialization();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState<Specialization | null>(null);
  const [formData, setFormData] = useState({ name: "", name_bn: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSpecializations = specializations?.filter(
    (spec) =>
      spec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (spec.name_bn && spec.name_bn.includes(searchQuery))
  );

  const handleOpenAdd = () => {
    setSelectedSpec(null);
    setFormData({ name: "", name_bn: "" });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (spec: Specialization) => {
    setSelectedSpec(spec);
    setFormData({ name: spec.name, name_bn: spec.name_bn || "" });
    setIsDialogOpen(true);
  };

  const handleOpenDelete = (spec: Specialization) => {
    setSelectedSpec(spec);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    const dataToSubmit = {
      name: formData.name.trim(),
      name_bn: formData.name_bn.trim() || undefined,
    };

    if (selectedSpec) {
      await updateSpecialization.mutateAsync({
        id: selectedSpec.id,
        ...dataToSubmit,
      });
    } else {
      await createSpecialization.mutateAsync(dataToSubmit);
    }

    setIsDialogOpen(false);
    setFormData({ name: "", name_bn: "" });
  };

  const handleDelete = async () => {
    if (selectedSpec) {
      await deleteSpecialization.mutateAsync(selectedSpec.id);
      setIsDeleteOpen(false);
      setSelectedSpec(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            বিশেষত্ব ম্যানেজমেন্ট
          </h2>
          <p className="text-muted-foreground">
            ডাক্তারদের বিশেষত্ব যোগ, সম্পাদনা এবং মুছে ফেলুন
          </p>
        </div>
        <Button onClick={handleOpenAdd} variant="teal" className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          নতুন বিশেষত্ব যোগ করুন
        </Button>
      </div>

      {/* Search & Stats */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="বিশেষত্ব খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              মোট {specializations?.length || 0} বিশেষত্ব
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specializations List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      ) : filteredSpecializations?.length === 0 ? (
        <Card className="border border-border/50 shadow-sm">
          <CardContent className="py-12 text-center">
            <Tag className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-1">
              কোনো বিশেষত্ব পাওয়া যায়নি
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {searchQuery
                ? "আপনার অনুসন্ধান পরিবর্তন করুন"
                : "শুরু করতে প্রথম বিশেষত্ব যোগ করুন"}
            </p>
            {!searchQuery && (
              <Button onClick={handleOpenAdd} variant="teal">
                <Plus className="h-4 w-4 mr-2" />
                নতুন বিশেষত্ব যোগ করুন
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSpecializations?.map((spec) => (
            <Card
              key={spec.id}
              className="border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Tag className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">{spec.name}</p>
                      {spec.name_bn && (
                        <p className="text-sm text-muted-foreground">
                          {spec.name_bn}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-secondary hover:text-secondary hover:bg-secondary/10"
                      onClick={() => handleOpenEdit(spec)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleOpenDelete(spec)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-secondary">
              {selectedSpec ? "বিশেষত্ব সম্পাদনা" : "নতুন বিশেষত্ব যোগ করুন"}
            </DialogTitle>
            <DialogDescription>
              বিশেষত্বের নাম লিখুন। এটি ডাক্তার তৈরি করার সময় দেখাবে।
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">বিশেষত্বের নাম *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="যেমন: কার্ডিওলজিস্ট"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name_bn">বাংলা নাম (ঐচ্ছিক)</Label>
              <Input
                id="name_bn"
                value={formData.name_bn}
                onChange={(e) =>
                  setFormData({ ...formData, name_bn: e.target.value })
                }
                placeholder="যেমন: হৃদরোগ বিশেষজ্ঞ"
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                বাতিল করুন
              </Button>
              <Button
                type="submit"
                variant="teal"
                disabled={
                  createSpecialization.isPending ||
                  updateSpecialization.isPending ||
                  !formData.name.trim()
                }
              >
                {(createSpecialization.isPending ||
                  updateSpecialization.isPending) && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                {selectedSpec ? "সংরক্ষণ করুন" : "যোগ করুন"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>বিশেষত্ব মুছে ফেলবেন?</AlertDialogTitle>
            <AlertDialogDescription>
              এটি "{selectedSpec?.name}" স্থায়ীভাবে মুছে ফেলবে। যে ডাক্তাররা এই
              বিশেষত্ব ব্যবহার করছেন তাদের প্রভাবিত করতে পারে।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>বাতিল করুন</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteSpecialization.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              মুছে ফেলুন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminSpecializations;
