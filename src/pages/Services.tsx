import { Layout } from "@/components/layout/Layout";
import { Clock, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTestCategories, useAllTests } from "@/hooks/useTestCategories";
import { getIconComponent } from "@/lib/iconMap";
import { Skeleton } from "@/components/ui/skeleton";

const Services = () => {
  const { data: categories, isLoading: catLoading } = useTestCategories();
  const { data: allTests, isLoading: testsLoading } = useAllTests();
  const isLoading = catLoading || testsLoading;

  return (
    <Layout>
      {/* Category Icons */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {isLoading ? (
              [1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))
            ) : (
              categories?.map((cat) => {
                const Icon = getIconComponent(cat.icon_name);
                return (
                  <a
                    key={cat.id}
                    href={`#cat-${cat.id}`}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:shadow-md transition-all"
                  >
                    <div
                      className={`h-14 w-14 rounded-xl ${cat.bg_color} flex items-center justify-center`}
                    >
                      <Icon className={`h-7 w-7 ${cat.icon_color}`} />
                    </div>
                    <span className="text-sm font-medium text-foreground text-center">
                      {cat.name}
                    </span>
                  </a>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* All Test Tables */}
      <section className="py-12 md:py-16">
        <div className="container max-w-5xl">
          {isLoading ? (
            <div className="space-y-8">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-64 rounded-xl" />
              ))}
            </div>
          ) : (
            categories?.map((cat) => {
              const tests =
                allTests?.filter((t) => t.category_id === cat.id) || [];
              if (tests.length === 0) return null;
              return (
                <div key={cat.id} id={`cat-${cat.id}`} className="mb-12">
                  <h2 className="text-xl md:text-2xl font-bold text-secondary text-center mb-6">
                    {cat.name}
                  </h2>
                  <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead className="font-bold text-foreground min-w-[180px]">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                পরীক্ষার নাম
                              </div>
                            </TableHead>
                            <TableHead className="font-bold text-foreground">
                              মূল্য (টাকা)
                            </TableHead>
                            <TableHead className="font-bold text-foreground min-w-[200px]">
                              প্রস্তুতি
                            </TableHead>
                            <TableHead className="font-bold text-foreground">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                রিপোর্ট সময়
                              </div>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tests.map((test) => (
                            <TableRow
                              key={test.id}
                              className="hover:bg-muted/30 transition-colors"
                            >
                              <TableCell className="font-medium text-foreground">
                                {test.name}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {test.price}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {test.preparation}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {test.report_time}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Services;
