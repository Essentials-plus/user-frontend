/* eslint-disable no-unused-vars */
export enum CouponTypeEnum {
  percent = 'percent',
  amount = 'amount',
}

export enum CouponPolicyEnum {
  onetime = 'onetime',
  multiple = 'multiple',
}

export type CouponType = keyof typeof CouponTypeEnum;
export type CouponPolicy = keyof typeof CouponPolicyEnum;

export type CouponCode = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  type: CouponTypeEnum;
  code: string;
  value: number;
  policy: CouponPolicyEnum;
};
