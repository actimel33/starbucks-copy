import clsx from 'clsx';

import Link from 'next/link';

import { TButtonVariants } from '@components/atoms/button/button';
import Banner from '@components/molecules/banner';
import { fetchBanners } from '@lib/fetchBanners';

import classes from './styles.module.css';

export const revalidate = 0;

export default async function Home() {
  const { textCenter, textSm, textRegular, bottomSection, bottomSectionTextContainer } = classes;
  const data = await fetchBanners();

  return (
    <>
      {/* {data?.banners?.map(banner => { */}
      {data?.map(banner => {
        return <Banner {...banner} key={banner.id} buttonVariant={banner.buttonVariant as TButtonVariants} />;
      })}

      <section className={clsx(bottomSection)}>
        <div className={bottomSectionTextContainer}>
          <p className={clsx(textCenter, textSm, textRegular)}>
            *From 7/13- 7/19, enjoy $10 off your Starbucks order of $20 or more through the DoorDash app, excluding
            taxes and fees. Valid 12pm to 3pm for DashPass members only. Offer valid for one (1) redemption per
            customer. Restrictions and other taxes/fees/gratuity still apply. See DoorDash app for details and location
            availability. Fees subject to change. Menu limited. Restricted delivery area. Available at participating
            locations only. All deliveries subject to availability. Must have or create a valid DoorDash account with
            valid form of accepted payment on file. No cash value. Non-transferable. Prices for Starbucks® items
            purchased through DoorDash may be higher than as marked or posted in stores. May not be combined with other
            offers, discounts, or promotions. See DoorDash terms and conditions at{' '}
            <Link href="/">https://help.doordash.com/consumers/s/article/offer-terms-conditions</Link>.
          </p>
        </div>
      </section>
      <section className={clsx(bottomSection)}>
        <div className={bottomSectionTextContainer}>
          <p className={clsx(textCenter, textSm, textRegular)}>
            **Starbucks Rewards is available at participating stores. Some restrictions apply. See <br />
            <Link href="/">https://starbucks.com/rewards</Link>
          </p>
        </div>
      </section>
      <section className={clsx(bottomSection)}>
        <div className={bottomSectionTextContainer}>
          <p className={clsx(textCenter, textSm, textRegular)}>
            ***After your two-month free trial, exclusive to Starbucks® Rewards members, the subscription renews
            automatically at $69.99 USD for an annual subscription to Headspace. You can cancel at any time. This offer
            is for new and returning Headspace users only.
          </p>
        </div>
      </section>
    </>
  );
}
