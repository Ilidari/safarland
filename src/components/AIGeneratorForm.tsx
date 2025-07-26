"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generateHotelDescription } from "@/ai/flows/generate-hotel-description";
import { useAppContext } from "@/hooks/use-app-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  keywords: z.string().min(3, "Please enter at least one keyword."),
  features: z.string().min(3, "Please enter at least one feature."),
});

type FormValues = z.infer<typeof formSchema>;

export function AIGeneratorForm() {
  const { t } = useAppContext();
  const { toast } = useToast();
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: "",
      features: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setDescription("");
    try {
      const result = await generateHotelDescription(data);
      setDescription(result.description);
    } catch (error) {
      console.error("Error generating description:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate description. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('ai_generator.title')}</CardTitle>
          <CardDescription>
            Enter keywords and features to generate a compelling hotel description.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('ai_generator.keywords')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('ai_generator.keywords.placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('ai_generator.features')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('ai_generator.features.placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    {t('ai_generator.button')}
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {description && (
        <Card>
          <CardHeader>
            <CardTitle>{t('ai_generator.result')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              readOnly
              value={description}
              className="min-h-[200px] bg-muted"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
