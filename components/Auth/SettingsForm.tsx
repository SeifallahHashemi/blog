'use client';

import { FieldInfo } from '@/components/Auth/FieldInfo';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import { FileUpload } from '@/components/Custom/UI/file-upload';
import { Button } from '@/components/ui/button';
import { FieldLabel, Field as ShadField } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { getClientQuery } from '@/lib/get-client-query';
import { settingsSchema } from '@/utils/schema/zod-schema';
import { userProfileUpdateOptions } from '@/utils/supabase/user';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BiSolidError } from 'react-icons/bi';
import { toast } from 'sonner';
import type * as z from 'zod';

type formData = z.infer<typeof settingsSchema>;

const defaultValues: formData = {
  fullName: '',
  userName: '',
  phoneNumber: '',
  fileUpload: undefined,
};

const SettingsForm = ({ userId }: { userId: string }) => {
  // React State Management
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  // TanStack Query
  const queryClient = getClientQuery();
  const updateMutation = useMutation(
    userProfileUpdateOptions(queryClient, ['profile', userId])
  );

  // TanStack Form
  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues,
    validators: {
      onChange: settingsSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsLoading(true);
        updateMutation.mutate({
          fullName: value.fullName,
          userName: value.userName,
          mobile: value.phoneNumber,
        });
        router.push('/dashboard');
      } catch (error) {
        setIsLoading(false);
        if (error instanceof Error) {
          toast('خطا', {
            className: 'flex flex-row-reverse text-right gap-x-4 space-x-4',
            description: 'خطای ارتباط با سرور',
            duration: 5000,
            icon: <BiSolidError className="text-red-500 ml-2" size={24} />,
          });
        } else {
          toast('خطا در برقراری ارتباط با سرور', {
            className: '',
            description: 'ورود به سیستم با خطا مواجه شد. لطفا مجددا تلاش کنید',
            duration: 5000,
            icon: <BiSolidError className="text-red-500" size={16} />,
          });
        }
      }
    },
    onSubmitInvalid({ formApi }) {
      const errorMap = formApi.state.errorMap.onChange;
      if (errorMap) {
        const firstErrorField = Object.keys(errorMap)[0];
        const el = document.querySelector<HTMLInputElement>(
          `[name="${firstErrorField}"]`
        );
        el?.focus();
      }
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await handleSubmit();
      }}
      className={'w-full md:max-w-9/12 mx-auto font-iranYWR my-4'}
    >
      <div className="flex items-center justify-between flex-wrap sm:flex-nowrap w-full gap-2">
        <Field name={'fullName'}>
          {(field) => (
            <section className={'flex-1'}>
              <ShadField>
                <FieldLabel htmlFor={field.name}>نام و نام خانوادگی</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={'مثال: سپهر هاشمی'}
                />
              </ShadField>
              <FieldInfo field={field} />
            </section>
          )}
        </Field>

        <Field name={'userName'}>
          {(field) => (
            <section className={'flex-1'}>
              <ShadField>
                <FieldLabel htmlFor={field.name}>نام کاربری</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={'مثال: sepehrhashemi2025'}
                />
              </ShadField>
              <FieldInfo field={field} />
            </section>
          )}
        </Field>
      </div>

      <div
        className={
          'flex items-center justify-between flex-wrap sm:flex-nowrap w-full gap-2'
        }
      >
        <Field name={'phoneNumber'}>
          {(field) => (
            <section className={'flex-1'}>
              <ShadField>
                <FieldLabel htmlFor={field.name}>شماره همراه</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type={'text'}
                  placeholder={'مثال: 09123456789'}
                />
              </ShadField>
              <FieldInfo field={field} />
            </section>
          )}
        </Field>
        <section className={'flex-1'} />
      </div>

      <div className={'w-full'}>
        <Field name={'fileUpload'}>
          {(field) => (
            <section>
              <ShadField>
                <FieldLabel htmlFor={field.name}>آپلود تصویر</FieldLabel>
                <FileUpload
                  maxFiles={1}
                  maxSize={5000000}
                  setValue={async (value) => {
                    await new Promise(() => {
                      setTimeout(() => {
                        field.handleChange(value);
                      }, 100);
                    });
                  }}
                  placeholder={'png, svg, jpg, webp, avif'}
                  accept={
                    'image/png, image/svg+xml, image/jpeg, image/webp, image/avif'
                  }
                />
              </ShadField>
              <FieldInfo field={field} />
            </section>
          )}
        </Field>
      </div>

      <div className={'w-full flex justify-center items-center'}>
        <Subscribe
          selector={(state) => [
            state.isSubmitting,
            state.isTouched,
            state.isDirty,
          ]}
        >
          {([isSubmitting, isTouched, isDirty]) => (
            <Button
              variant={'default'}
              type="submit"
              disabled={!isTouched && !isDirty}
              className="cursor-pointer px-12"
            >
              {isSubmitting ? 'در حال ثبت نام ...' : 'ثبت نام'}
            </Button>
          )}
        </Subscribe>
      </div>
      {isLoading && <LoadingSpinner />}
    </form>
  );
};

export default SettingsForm;
