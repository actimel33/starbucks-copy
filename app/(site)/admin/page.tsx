'use client';
import clsx from 'clsx';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';

import Button from '@components/atoms/button';
import { TButtonVariants } from '@components/atoms/button/button';
import { IBannerProps } from '@components/molecules/banner/banner';
import PageLayout from '@components/organisms/page-layout';

import { addBannerAction } from './actions';
import classes from './styles.module.css';

const buttonVariants = ['white', 'light', 'dark', 'green'];

export interface IAdminFormDefaultValues {
  backgroundCollor: string;
  bannerTextCollor: string;
  buttonVariant: TButtonVariants;
  imageUrl: string;
  imageHeight: number;
  isReverted: boolean;
  isSpecialBanner: boolean;
  buttonText: string;
  bannerHeadingText: string;
  bannerText: string;
  position?: number;
}

const defaultValues: IAdminFormDefaultValues = {
  backgroundCollor: '',
  imageUrl: '',
  imageHeight: 0,
  isReverted: false,
  bannerTextCollor: '',
  buttonVariant: 'white',
  isSpecialBanner: false,
  buttonText: '',
  bannerHeadingText: '',
  bannerText: '',
};

export default function Admin() {
  const { formContainer, formPadding, form, btnContainer, pSm } = classes;
  const { control, handleSubmit } = useForm<IAdminFormDefaultValues>({
    defaultValues,
  });

  const onSubmitAction = useCallback(async (formValues: FieldValues) => {
    addBannerAction(formValues as IBannerProps);
  }, []);

  return (
    <PageLayout>
      <div className={formContainer}>
        <div className={formPadding}>
          <form className={form} onSubmit={handleSubmit(onSubmitAction)}>
            <Controller
              control={control}
              name="imageUrl"
              render={({ field: { ...rest } }) => (
                <div>
                  <textarea className={clsx()} id="imageUrl" {...rest} required />
                  <label className={clsx(pSm)} htmlFor="imageUrl">
                    <span>Please add a image url</span>
                  </label>
                </div>
              )}
            />
            <Controller
              control={control}
              name="backgroundCollor"
              render={({ field: { ...rest } }) => (
                <div>
                  <textarea className={clsx()} id="backgroundCollor" required {...rest} />
                  <label className={clsx(pSm)} htmlFor="backgroundCollor">
                    <span>Add banner background collor.</span>
                  </label>
                </div>
              )}
            />
            <Controller
              control={control}
              name="bannerHeadingText"
              render={({ field: { ...rest } }) => (
                <div>
                  <textarea className={clsx()} id="bannerHeadingText" required {...rest} />
                  <label className={clsx(pSm)} htmlFor="bannerHeadingText">
                    <span>Add Head Text.</span>
                  </label>
                </div>
              )}
            />
            <Controller
              control={control}
              name="bannerText"
              render={({ field: { ...rest } }) => (
                <div>
                  <textarea className={clsx()} id="bannerText" required {...rest} />
                  <label className={clsx(pSm)} htmlFor="bannerText">
                    <span>Add banner text.</span>
                  </label>
                </div>
              )}
            />
            <Controller
              control={control}
              name="buttonText"
              render={({ field: { ...rest } }) => (
                <div>
                  <input className={clsx()} id="buttonText" type="text" required {...rest} />
                  <label className={clsx(pSm)} htmlFor="buttonText">
                    <span>Add button text.</span>
                  </label>
                </div>
              )}
            />
            <Controller
              control={control}
              name="bannerTextCollor"
              render={({ field: { ...rest } }) => (
                <div>
                  <input className={clsx()} id="bannerTextCollor" type="text" required {...rest} />
                  <label className={clsx(pSm)} htmlFor="bannerTextCollor">
                    <span>Add banner text collor.</span>
                  </label>
                </div>
              )}
            />

            <Controller
              control={control}
              name="imageHeight"
              render={({ field: { ...rest }, fieldState }) => (
                <div>
                  <input className={clsx()} id="imageHeight" type="number" {...rest} max={3000} min={0} required />
                  <label className={clsx(pSm)} htmlFor="imageHeight">
                    <span>Please add image height</span>
                  </label>
                </div>
              )}
            />
            <Controller
              control={control}
              name="isReverted"
              render={({ field: { onChange, value, ref } }) => (
                <div>
                  <input
                    ref={ref}
                    checked={value}
                    className={clsx()}
                    id="isReverted"
                    onChange={onChange} // send value to hook form
                    type="checkbox"
                  />
                  <label className={clsx(pSm)} htmlFor="isReverted">
                    <span>should image be on the left side?</span>
                  </label>
                </div>
              )}
            />

            <Controller
              control={control}
              name="isSpecialBanner"
              render={({ field: { onChange, value, ref }, fieldState }) => (
                <div>
                  <input
                    ref={ref}
                    checked={value}
                    className={clsx()}
                    id="isSpecialBanner"
                    onChange={onChange} // send value to hook form
                    type="checkbox"
                  />
                  <label className={clsx(pSm)} htmlFor="isSpecialBanner">
                    <span>Should banner be special?</span>
                  </label>
                </div>
              )}
            />
            <Controller
              control={control}
              name="buttonVariant"
              render={({ field: { ...rest }, fieldState }) => (
                <div>
                  <select {...rest}>
                    {buttonVariants.map(value => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <label className={clsx(pSm)} htmlFor="buttonVariant">
                    <span>Specify the button please</span>
                  </label>
                </div>
              )}
            />
            <div className={btnContainer}>
              <Button variant="dark">Add Bunner</Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
