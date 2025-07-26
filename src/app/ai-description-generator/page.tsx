'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateHotelDescription } from '@/ai/flows/hotel-description-generator';
import { useAppContext } from '@/hooks/use-app-context';
import { Wand2, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  keywords: z.string().min(2, { message: 'Keywords must be at least 2 characters.' }),
  features: z.string().min(5, { message: 'Please list some features.' }),
});

export default function AiDescriptionGeneratorPage() {
  const { t } = useAppContext();
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: '',
      features: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setDescription('');
    try {
      const result = await generateHotelDescription(values);
      setDescription(result.description);
    } catch (error) {
      console.error('Error generating description:', error);
      setDescription(t('ai_generator.error') || 'An error occurred while generating the description.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Wand2 className="text-accent"/>
            {t('ai_generator.title')}
          </CardTitle>
          <CardDescription>{t('ai_generator.subtitle') || 'Enter keywords and features to generate a compelling hotel description.'}</CardDescription>
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
              <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                {isLoading ? (
                  <Loader2 className="ltr:mr-2 rtl:ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
                )}
                {t('ai_generator.button')}
              </Button>
            </form>
          </Form>

          {(isLoading || description) && (
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-xl font-semibold mb-4 font-headline">{t('ai_generator.result')}</h3>
              <Card className="bg-muted/50 min-h-[12rem]">
                <CardContent className="p-4">
                  {isLoading ? (
                     <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                  ) : (
                    <Textarea
                      readOnly
                      value={description}
                      className="min-h-[12rem] bg-transparent border-0 text-foreground whitespace-pre-wrap"
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
