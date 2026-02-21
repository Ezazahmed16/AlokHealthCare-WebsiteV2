import { useState } from "react";
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    useTestCategories,
    useAllTests,
    useCreateTestCategory,
    useUpdateTestCategory,
    useDeleteTestCategory,
    useCreateTest,
    useUpdateTest,
    useDeleteTest,
    type TestCategory,
    type Test,
} from "@/hooks/useTestCategories";
import { AVAILABLE_ICONS, ICON_COLORS, getIconComponent } from "@/lib/iconMap";
const AdminTests = () => {
    const { data: categories, isLoading: catLoading } = useTestCategories();
    const { data: allTests } = useAllTests();
    const createCategory = useCreateTestCategory();
    const updateCategory = useUpdateTestCategory();
    const deleteCategory = useDeleteTestCategory();
    const createTest = useCreateTest();
    const updateTest = useUpdateTest();
    const deleteTest = useDeleteTest();
    // Category dialog state
    const [catDialog, setCatDialog] = useState(false);
    const [editCat, setEditCat] = useState<TestCategory | null>(null);
    const [catForm, setCatForm] = useState({ name: "", icon_name: "Droplet", bg_color: "bg-red-100", icon_color: "text-red-500", sort_order: 0 });
    // Test dialog state
    const [testDialog, setTestDialog] = useState(false);
    const [editTest, setEditTest] = useState<Test | null>(null);
    const [testCategoryId, setTestCategoryId] = useState("");
    const [testForm, setTestForm] = useState({ name: "", price: "", preparation: "", report_time: "", sort_order: 0 });
    // Delete confirmation
    const [deleteCatId, setDeleteCatId] = useState<string | null>(null);
    const [deleteTestId, setDeleteTestId] = useState<string | null>(null);
    // Expanded categories
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const openCatDialog = (cat?: TestCategory) => {
        if (cat) {
            setEditCat(cat);
            setCatForm({ name: cat.name, icon_name: cat.icon_name, bg_color: cat.bg_color, icon_color: cat.icon_color, sort_order: cat.sort_order });
        } else {
            setEditCat(null);
            setCatForm({ name: "", icon_name: "Droplet", bg_color: "bg-red-100", icon_color: "text-red-500", sort_order: (categories?.length || 0) + 1 });
        }
        setCatDialog(true);
    };
    const saveCat = () => {
        if (!catForm.name.trim()) return;
        if (editCat) {
            updateCategory.mutate({ id: editCat.id, ...catForm }, { onSuccess: () => setCatDialog(false) });
        } else {
            createCategory.mutate(catForm, { onSuccess: () => setCatDialog(false) });
        }
    };
    const openTestDialog = (categoryId: string, test?: Test) => {
        setTestCategoryId(categoryId);
        if (test) {
            setEditTest(test);
            setTestForm({ name: test.name, price: test.price, preparation: test.preparation, report_time: test.report_time, sort_order: test.sort_order });
        } else {
            setEditTest(null);
            const catTests = allTests?.filter(t => t.category_id === categoryId) || [];
            setTestForm({ name: "", price: "", preparation: "", report_time: "", sort_order: catTests.length + 1 });
        }
        setTestDialog(true);
    };
    const saveTest = () => {
        if (!testForm.name.trim() || !testForm.price.trim()) return;
        if (editTest) {
            updateTest.mutate({ id: editTest.id, ...testForm }, { onSuccess: () => setTestDialog(false) });
        } else {
            createTest.mutate({ category_id: testCategoryId, ...testForm }, { onSuccess: () => setTestDialog(false) });
        }
    };
    const toggleExpand = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    if (catLoading) return <div className="text-center py-8 text-muted-foreground">লোড হচ্ছে...</div>;
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">পরীক্ষা-নিরীক্ষা ব্যবস্থাপনা</h2>
                    <p className="text-muted-foreground text-sm">বিভাগ ও পরীক্ষা যোগ, সম্পাদনা ও মুছে ফেলুন</p>
                </div>
                <Button onClick={() => openCatDialog()} className="bg-secondary hover:bg-secondary/90">
                    <Plus className="h-4 w-4 mr-2" /> নতুন বিভাগ
                </Button>
            </div>
            {categories?.map((cat) => {
                const Icon = getIconComponent(cat.icon_name);
                const catTests = allTests?.filter(t => t.category_id === cat.id) || [];
                const isExpanded = expanded[cat.id];
                return (
                    <Card key={cat.id}>
                        <CardHeader className="cursor-pointer" onClick={() => toggleExpand(cat.id)}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-lg ${cat.bg_color} flex items-center justify-center`}>
                                        <Icon className={`h-5 w-5 ${cat.icon_color}`} />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{cat.name}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{catTests.length} টি পরীক্ষা</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); openCatDialog(cat); }}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setDeleteCatId(cat.id); }}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                    {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                                </div>
                            </div>
                        </CardHeader>
                        {isExpanded && (
                            <CardContent>
                                <div className="flex justify-end mb-3">
                                    <Button size="sm" variant="outline" onClick={() => openTestDialog(cat.id)}>
                                        <Plus className="h-4 w-4 mr-1" /> পরীক্ষা যোগ করুন
                                    </Button>
                                </div>
                                {catTests.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-4">কোনো পরীক্ষা নেই</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>পরীক্ষার নাম</TableHead>
                                                    <TableHead>মূল্য</TableHead>
                                                    <TableHead>প্রস্তুতি</TableHead>
                                                    <TableHead>রিপোর্ট সময়</TableHead>
                                                    <TableHead className="w-[100px]">অ্যাকশন</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {catTests.map((test) => (
                                                    <TableRow key={test.id}>
                                                        <TableCell className="font-medium">{test.name}</TableCell>
                                                        <TableCell>{test.price}</TableCell>
                                                        <TableCell>{test.preparation}</TableCell>
                                                        <TableCell>{test.report_time}</TableCell>
                                                        <TableCell>
                                                            <div className="flex gap-1">
                                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openTestDialog(cat.id, test)}>
                                                                    <Pencil className="h-3.5 w-3.5" />
                                                                </Button>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDeleteTestId(test.id)}>
                                                                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        )}
                    </Card>
                );
            })}
            {/* Category Dialog */}
            <Dialog open={catDialog} onOpenChange={setCatDialog}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{editCat ? "বিভাগ সম্পাদনা" : "নতুন বিভাগ যোগ করুন"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>বিভাগের নাম</Label>
                            <Input value={catForm.name} onChange={(e) => setCatForm(p => ({ ...p, name: e.target.value }))} placeholder="যেমন: রক্ত পরীক্ষা" />
                        </div>
                        <div>
                            <Label>আইকন নির্বাচন করুন</Label>
                            <div className="grid grid-cols-5 gap-2 mt-2">
                                {AVAILABLE_ICONS.map((item) => {
                                    const isSelected = catForm.icon_name === item.name;
                                    return (
                                        <button
                                            key={item.name}
                                            type="button"
                                            onClick={() => setCatForm(p => ({ ...p, icon_name: item.name }))}
                                            className={`p-3 rounded-lg border-2 flex items-center justify-center transition-all ${isSelected ? "border-secondary bg-secondary/10" : "border-border hover:border-muted-foreground/30"}`}
                                        >
                                            <item.icon className={`h-5 w-5 ${isSelected ? "text-secondary" : "text-muted-foreground"}`} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <Label>রঙ নির্বাচন করুন</Label>
                            <div className="grid grid-cols-4 gap-2 mt-2">
                                {ICON_COLORS.map((color) => {
                                    const isSelected = catForm.bg_color === color.bg;
                                    const SelectedIcon = getIconComponent(catForm.icon_name);
                                    return (
                                        <button
                                            key={color.bg}
                                            type="button"
                                            onClick={() => setCatForm(p => ({ ...p, bg_color: color.bg, icon_color: color.icon }))}
                                            className={`p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${isSelected ? "border-secondary" : "border-border hover:border-muted-foreground/30"}`}
                                        >
                                            <div className={`h-8 w-8 rounded-md ${color.bg} flex items-center justify-center`}>
                                                <SelectedIcon className={`h-4 w-4 ${color.icon}`} />
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <Label>ক্রম (Sort Order)</Label>
                            <Input type="number" value={catForm.sort_order} onChange={(e) => setCatForm(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setCatDialog(false)}>বাতিল</Button>
                        <Button onClick={saveCat} disabled={createCategory.isPending || updateCategory.isPending} className="bg-secondary hover:bg-secondary/90">
                            {editCat ? "আপডেট করুন" : "যোগ করুন"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* Test Dialog */}
            <Dialog open={testDialog} onOpenChange={setTestDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editTest ? "পরীক্ষা সম্পাদনা" : "নতুন পরীক্ষা যোগ করুন"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>পরীক্ষার নাম</Label>
                            <Input value={testForm.name} onChange={(e) => setTestForm(p => ({ ...p, name: e.target.value }))} placeholder="যেমন: CBC" />
                        </div>
                        <div>
                            <Label>মূল্য</Label>
                            <Input value={testForm.price} onChange={(e) => setTestForm(p => ({ ...p, price: e.target.value }))} placeholder="যেমন: ৫০০ টাকা" />
                        </div>
                        <div>
                            <Label>প্রস্তুতি</Label>
                            <Input value={testForm.preparation} onChange={(e) => setTestForm(p => ({ ...p, preparation: e.target.value }))} placeholder="যেমন: খালি পেটে প্রয়োজন নেই" />
                        </div>
                        <div>
                            <Label>রিপোর্ট সময়</Label>
                            <Input value={testForm.report_time} onChange={(e) => setTestForm(p => ({ ...p, report_time: e.target.value }))} placeholder="যেমন: ২৪ ঘণ্টা" />
                        </div>
                        <div>
                            <Label>ক্রম (Sort Order)</Label>
                            <Input type="number" value={testForm.sort_order} onChange={(e) => setTestForm(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setTestDialog(false)}>বাতিল</Button>
                        <Button onClick={saveTest} disabled={createTest.isPending || updateTest.isPending} className="bg-secondary hover:bg-secondary/90">
                            {editTest ? "আপডেট করুন" : "যোগ করুন"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* Delete Category Confirmation */}
            <AlertDialog open={!!deleteCatId} onOpenChange={() => setDeleteCatId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>বিভাগ মুছে ফেলবেন?</AlertDialogTitle>
                        <AlertDialogDescription>এই বিভাগ এবং এর সকল পরীক্ষা মুছে যাবে। এটি পূর্বাবস্থায় ফেরানো যাবে না।</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>বাতিল</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => { if (deleteCatId) deleteCategory.mutate(deleteCatId); setDeleteCatId(null); }}>
                            মুছে ফেলুন
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {/* Delete Test Confirmation */}
            <AlertDialog open={!!deleteTestId} onOpenChange={() => setDeleteTestId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>পরীক্ষা মুছে ফেলবেন?</AlertDialogTitle>
                        <AlertDialogDescription>এটি পূর্বাবস্থায় ফেরানো যাবে না।</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>বাতিল</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => { if (deleteTestId) deleteTest.mutate(deleteTestId); setDeleteTestId(null); }}>
                            মুছে ফেলুন
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
export default AdminTests;