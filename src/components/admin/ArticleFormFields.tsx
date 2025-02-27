
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

// Define validation schema
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  summary: z.string().optional(),
  imageUrl: z.string().optional(),
  category: z.string().min(1, { message: "Category is required" }),
  author: z.string().optional(),
  isMultilingual: z.boolean().default(false),
});

export type ArticleFormValues = z.infer<typeof formSchema>;

interface ArticleFormFieldsProps {
  defaultValues?: Partial<ArticleFormValues>;
  onValuesChange: (values: ArticleFormValues) => void;
  categories: Array<{ value: string; label: string }>;
}

const ArticleFormFields: React.FC<ArticleFormFieldsProps> = ({
  defaultValues,
  onValuesChange,
  categories,
}) => {
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      content: defaultValues?.content || '',
      summary: defaultValues?.summary || '',
      imageUrl: defaultValues?.imageUrl || '',
      category: defaultValues?.category || 'general',
      author: defaultValues?.author || 'La Monarca Internacional',
      isMultilingual: defaultValues?.isMultilingual || false,
    },
  });

  // Watch for all form values changes and notify parent component
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onValuesChange(value as ArticleFormValues);
    });
    return () => subscription.unsubscribe();
  }, [form, onValuesChange]);

  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input placeholder="Enter article title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief summary of the article" rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Content *</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter article content" rows={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Category *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Enter author name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isMultilingual"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-normal cursor-pointer">
                  Publish in multiple languages
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default ArticleFormFields;
