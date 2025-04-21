import {
  getOrderHistoryByIdQueryOptions,
  getOrderHistoryQueryOptions,
  getPlanOrderByIdQueryOptions,
  getPlanOrderQueryOptions,
} from "@/api-clients/user-api-client/queries";
import MealCard from "@/common/components/meal-card";
import SettingsPageLayout from "@/common/components/settings-page-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { Dialog, DialogContent } from "@/common/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import {
  appDefaultDateFormatter,
  getProductTaxAmount,
  sortMealsByMealType,
} from "@/lib/utils";
import {
  PlanOrder,
  ProductOrder,
} from "@/types/api-responses/product-attribute";
import { Fragment, useMemo, useState } from "react";
import DataTablePagination from "../data-table-pagination";
import SelectedDays from "../weekly-menu/components/selected-days";

import { getCreateUnpaidOrderSessionMutationOptions } from "@/api-clients/user-api-client/mutations";
import Button from "@/common/components/ui/button";
import useActiveCurrency from "@/hooks/useActiveCurrency";
import { useUserSession } from "@/hooks/useUserSession";
import { CouponTypeEnum } from "@/types/api-responses/coupon-code";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { parseAsString, useQueryState } from "nuqs";

const OrderHistory = () => {
  const [activeOrderId, setActiveOrderId] = useQueryState(
    "orderId",
    parseAsString.withDefault(""),
  );

  const [activeMealOrderId, setActiveMealOrderId] = useQueryState(
    "mealOrderId",
    parseAsString.withDefault(""),
  );

  const { currency_symbol } = useActiveCurrency();

  const MealDataTableHeaders = ["Datum", "Week", "Toestand", "Prijs"];
  const productTableHeaders = [
    "Order Id",
    "Datum van aankoop",
    "Toestand",
    "Prijs",
  ];

  const orderHistory = usePaginatedQuery(({ page }) =>
    getOrderHistoryQueryOptions({
      axiosReqConfig: {
        params: {
          page,
        },
      },
    }),
  );

  const planOrder = usePaginatedQuery(({ page }) =>
    getPlanOrderQueryOptions({
      axiosReqConfig: {
        params: {
          page,
        },
      },
    }),
  );

  const { user } = useUserSession();

  const orderHistoryData = orderHistory.query.data?.data;

  const activeOrder = useMemo(() => {
    const order = orderHistoryData?.find((v) => v.id === activeOrderId);
    return order;
  }, [activeOrderId, orderHistoryData]);

  const planOrderData = planOrder.query.data?.data;

  const activeMealOrder = useMemo(() => {
    const order = planOrderData?.find((v) => v.id === activeMealOrderId);
    return order;
  }, [activeMealOrderId, planOrderData]);

  return (
    <SettingsPageLayout title="Bestelgeschiedenis">
      <>
        {!(user?.access == "product") && (
          <>
            <h2 className="mb-4 text-lg font-semibold lg:text-3xl">
              Maaltijdboxen
            </h2>
            <div className="rounded-xl border-2 border-app-dark-grey bg-app-grey p-3 lg:rounded-3xl lg:p-8">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse">
                  {" "}
                  <thead>
                    <tr>
                      {MealDataTableHeaders.map((header) => (
                        <th
                          key={header}
                          className="px-2 py-1 text-left text-sm font-medium lg:px-4 lg:py-2 lg:text-base lg:font-semibold"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {planOrderData?.map((row) => (
                      <tr
                        onClick={() => setActiveMealOrderId(row.id)}
                        className="cursor-pointer border-b border-gray-200 hover:bg-slate-200"
                        key={row.id}
                      >
                        <td className="px-2 py-2.5 text-left text-sm lg:px-4 lg:py-2 lg:text-base">
                          {new Date(row.createdAt).toDateString()}
                        </td>
                        <td className="px-2 py-2.5 text-left text-sm lg:px-4 lg:py-2 lg:text-base">
                          {row.week}
                        </td>
                        <td className="px-2 py-2.5 text-left text-sm capitalize lg:px-4 lg:py-2 lg:text-base">
                          {row.status}
                        </td>
                        <td className="px-2 py-2.5 text-left text-sm capitalize lg:px-4 lg:py-2 lg:text-base">
                          {currency_symbol} {row.totalAmount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <DataTablePagination
                query={{
                  ...planOrder.query,
                  activePage: planOrder.activePage,
                  fetchPage: planOrder.fetchPage,
                  totalPage: planOrder.totalPage,
                }}
              />
            </div>
          </>
        )}

        <h2 className="mb-4 mt-8 text-lg font-semibold lg:mt-12 lg:text-3xl">
          Producten
        </h2>
        <div className="rounded-xl border-2 border-app-dark-grey bg-app-grey p-3 lg:rounded-3xl lg:p-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse">
              {" "}
              <thead>
                <tr>
                  {productTableHeaders.map((header) => (
                    <th
                      key={header}
                      className="px-2 py-1 text-left text-sm font-medium lg:px-4 lg:py-2 lg:text-base lg:font-semibold"
                    >
                      {" "}
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orderHistoryData?.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setActiveOrderId(order.id)}
                    className="cursor-pointer border-b border-gray-200 hover:bg-slate-200"
                  >
                    <td className="px-2 py-2.5 text-left text-sm lg:px-4 lg:py-2 lg:text-base">
                      <div className="max-w-[100px] truncate">
                        {order.orderId}
                      </div>
                    </td>
                    <td className="px-2 py-2.5 text-left text-sm lg:px-4 lg:py-2 lg:text-base">
                      {new Date(order.createdAt).toDateString()}
                    </td>
                    <td className="px-2 py-2.5 text-left text-sm capitalize lg:px-4 lg:py-2 lg:text-base">
                      {order.status}

                      {order.status === "unpaid" && (
                        <PayButton orderId={order.id} />
                      )}
                    </td>
                    <td className="px-2 py-2.5 text-left text-sm lg:px-4 lg:py-2 lg:text-base">
                      {currency_symbol} {order.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DataTablePagination
            query={{
              ...orderHistory.query,
              activePage: orderHistory.activePage,
              fetchPage: orderHistory.fetchPage,
              totalPage: orderHistory.totalPage,
            }}
          />
        </div>
        <ProductOrderHistoryModal
          open={!!activeOrderId}
          onOpenChange={() => setActiveOrderId(null)}
          activeOrderId={activeOrder ? undefined : activeOrderId}
          data={activeOrder}
        />
        <MealOrderModal
          open={!!activeMealOrderId}
          onOpenChange={() => setActiveMealOrderId(null)}
          activeMealOrderId={activeMealOrder ? undefined : activeMealOrderId}
          data={activeMealOrder}
        />
      </>
    </SettingsPageLayout>
  );
};

const PayButton = ({ orderId }: { orderId: string }) => {
  const getCreateUnpaidOrderSessionMutation = useMutation({
    ...getCreateUnpaidOrderSessionMutationOptions(),
    onSuccess(data) {
      window.location.href = data.data.data.session.url;
    },
  });

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        getCreateUnpaidOrderSessionMutation.mutate({
          orderId,
        });
      }}
      loading={getCreateUnpaidOrderSessionMutation.isPending}
      size={"xs"}
      className="mt-1.5"
    >
      Betaal nu
    </Button>
  );
};

type MealOrderProps = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void;
  activeMealOrderId?: string;
  data?: PlanOrder;
};

function MealOrderModal({
  data: d,
  onOpenChange,
  open,
  activeMealOrderId,
}: MealOrderProps) {
  const [selectedDay, setSelectedDay] = useState(1);

  const planOrderByIdQuery = useQuery({
    ...getPlanOrderByIdQueryOptions({ id: activeMealOrderId! }),
  });

  const data = d || planOrderByIdQuery.data?.data;

  const totalDays = data?.mealsForTheWeek.length || 0;
  const currentDayMeals = useMemo(() => {
    return data?.mealsForTheWeek.find((v) => v.day == selectedDay)?.meals;
  }, [data, selectedDay]);

  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[95dvh] overflow-hidden overflow-y-auto max-xl:max-w-[95vw] xl:max-w-[1300px]">
        <div>
          <SelectedDays
            wrapperClassName="max-sm:gap-0"
            activeDay={selectedDay}
            onDayClick={(d) => setSelectedDay(d)}
            totalDays={totalDays}
          />
          <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-20 lg:grid-cols-2">
            {currentDayMeals && currentDayMeals.length > 0 ? (
              sortMealsByMealType(currentDayMeals).map((v, i) => (
                <MealCard key={v.id + i} meal={v} />
              ))
            ) : (
              <div>Er is geen maaltijd voor de dag</div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type ProductHistoryModaProps = {
  data?: ProductOrder;
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void;
  activeOrderId?: string;
};
function ProductOrderHistoryModal({
  data,
  onOpenChange,
  open,
  activeOrderId,
}: ProductHistoryModaProps) {
  const { currency_symbol } = useActiveCurrency();

  const orderHistoryByIdQuery = useQuery({
    ...getOrderHistoryByIdQueryOptions({ id: activeOrderId! }),
  });

  const order = data || orderHistoryByIdQuery.data?.data;

  const orderedProducts = useMemo(
    () => order?.orderItems || [],
    [order?.orderItems],
  );

  const getCreateUnpaidOrderSessionMutation = useMutation({
    ...getCreateUnpaidOrderSessionMutationOptions(),
    onSuccess(data) {
      window.location.href = data.data.data.session.url;
    },
  });

  const { orderTotalBeforeDiscount, totalTax21Percent, totalTax9Percent } =
    useMemo(
      () =>
        orderedProducts.reduce(
          (accumulator, currentValue) => {
            const price = currentValue.price;

            const taxAmount = getProductTaxAmount({
              productPrice: price ?? 0,
              taxPercent: currentValue.taxPercent,
            });

            return {
              orderTotalBeforeDiscount:
                (price ?? 0) * currentValue.quantity +
                accumulator.orderTotalBeforeDiscount,
              totalTax9Percent:
                (currentValue.taxPercent === "TAX9" ? taxAmount : 0) +
                accumulator.totalTax9Percent,
              totalTax21Percent:
                (currentValue.taxPercent === "TAX21" ? taxAmount : 0) +
                accumulator.totalTax21Percent,
            };
          },
          {
            orderTotalBeforeDiscount: 0,
            totalTax21Percent: 0,
            totalTax9Percent: 0,
          },
        ),
      [orderedProducts],
    );

  const totalTaxAmount = totalTax9Percent + totalTax21Percent;

  const shippingTaxAmount = useMemo(
    () =>
      getProductTaxAmount({
        productPrice: Number(process.env.NEXT_PUBLIC_SHIPPING_CHARGE),
        taxPercent: "TAX21",
      }),
    [],
  );

  const orderShippingAmount = Number(order?.shippingAmount) ?? 0;

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[95dvh] overflow-hidden overflow-y-auto max-xl:max-w-[95vw] max-lg:p-0 xl:max-w-[1300px]">
        <div>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-gray-50">
              <div className="flex gap-4">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 overflow-hidden text-lg">
                    <span className="inline-block truncate">
                      Order - {order?.orderId}
                    </span>
                    {/* <Button
                        size="icon"
                        variant="outline"
                        className="size-6 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() => copy(order?.id)}
                      >
                        {copied ? (
                          <Check className="size-3 text-success" />
                        ) : (
                          <Copy className="size-3" />
                        )}
                        <span className="sr-only">Copy Order ID</span>
                      </Button> */}
                  </CardTitle>
                  <CardDescription>
                    Date:{" "}
                    <span className="capitalize">
                      {appDefaultDateFormatter(new Date(order?.createdAt))}
                    </span>
                  </CardDescription>
                  <CardDescription className="mt-1 flex items-center capitalize">
                    Toestand: {order.status}{" "}
                    {order.status === "unpaid" && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          getCreateUnpaidOrderSessionMutation.mutate({
                            orderId: order.id,
                          });
                        }}
                        loading={getCreateUnpaidOrderSessionMutation.isPending}
                        size={"xs"}
                        className="ml-1.5 inline-flex"
                      >
                        Betaal nu
                      </Button>
                    )}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold">Bestel Details</h1>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Kosten</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead className="text-right">Totaal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order?.orderItems.map((product) => {
                      const price = product.price;
                      return (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {product.image && (
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={100}
                                  height={100}
                                  className="size-9 rounded-sm bg-gray-100 object-cover"
                                />
                              )}
                              <div>
                                <p className="">{product.name}</p>
                                {product.attributes.productVariations && (
                                  <div className="mt-px flex flex-wrap divide-x text-xs [&>p:first-child]:ml-0 [&>p:first-child]:pl-0 [&>p>span]:text-black [&>p]:ml-2 [&>p]:pl-2">
                                    {product.attributes.productVariations.map(
                                      (productVariation, i) => {
                                        return (
                                          <Fragment
                                            key={`${productVariation?.attribute?.id}_${productVariation?.attributeTerm?.id}_${i}`}
                                          >
                                            <p>
                                              {productVariation.attribute?.name}
                                              :{" "}
                                              <span>
                                                {
                                                  productVariation.attributeTerm
                                                    ?.name
                                                }
                                              </span>
                                            </p>
                                          </Fragment>
                                        );
                                      },
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {currency_symbol}
                            {price}
                          </TableCell>
                          <TableCell>
                            <span className="mr-2 opacity-40">×</span>
                            {product.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            {currency_symbol}
                            {price! * product.quantity}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <hr />

                {/* <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="">Subtotaal</span>
                      <span>
                        {currency_symbol}
                        {orderTotalBeforeDiscount?.toFixed(2)}
                      </span>
                    </li>
                    {order?.coupon && (
                      <li className="flex items-center justify-between">
                        <span className="">
                          Coupon(s) -{" "}
                          <span className="font-medium ">
                            {order.coupon.code}
                          </span>
                        </span>
                        <span>
                          - {currency_symbol}
                          {orderTotalBeforeDiscount && (
                            <>
                              {order?.coupon.type === CouponTypeEnum.amount
                                ? (
                                    orderTotalBeforeDiscount -
                                    order.coupon.value
                                  ).toFixed(2)
                                : order?.coupon.type === CouponTypeEnum.percent
                                ? (
                                    (orderTotalBeforeDiscount / 100) *
                                    order.coupon.value
                                  ).toFixed(2)
                                : "-"}
                            </>
                          )}
                        </span>
                      </li>
                    )}
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Verzenden</span>
                      <span>
                        {currency_symbol}
                        {getShippingAmount(Number(order?.amount)).toFixed(2)}
                      </span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Totaal</span>
                      <span>
                        {currency_symbol}
                        {Number(order?.amount).toFixed(2)}
                      </span>
                    </li>
                  </ul> */}

                <ul className="grid gap-0.5 [&>li]:px-2 [&>li]:py-1.5">
                  <li className="flex items-center justify-between">
                    <span>Subtotaal (excl. BTW)</span>
                    <span>
                      {currency_symbol}
                      {(orderTotalBeforeDiscount - totalTaxAmount)?.toFixed(2)}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>BTW (9%)</span>
                    <span>
                      {currency_symbol}
                      {totalTax9Percent?.toFixed(2)}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>BTW (21%)</span>
                    <span>
                      {currency_symbol}
                      {totalTax21Percent?.toFixed(2)}
                    </span>
                  </li>
                  {order?.coupon && (
                    <li className="flex items-center justify-between">
                      <span>
                        Coupon(s) -{" "}
                        <span className="font-medium">{order.coupon.code}</span>
                      </span>
                      <span>
                        - {currency_symbol}
                        {orderTotalBeforeDiscount && (
                          <>
                            {order?.coupon.type === CouponTypeEnum.amount
                              ? (
                                  orderTotalBeforeDiscount - order.coupon.value
                                ).toFixed(2)
                              : order?.coupon.type === CouponTypeEnum.percent
                              ? (
                                  (orderTotalBeforeDiscount / 100) *
                                  order.coupon.value
                                ).toFixed(2)
                              : "-"}
                          </>
                        )}
                      </span>
                    </li>
                  )}
                  <li className="flex items-center justify-between">
                    <span>Verzendkosten (21% BTW inbegrepen)</span>
                    <span>
                      {Number(orderShippingAmount) > 0 && (
                        <span className="mr-2 opacity-50">
                          (BTW {currency_symbol}
                          {shippingTaxAmount.toFixed(2)})
                        </span>
                      )}
                      {currency_symbol}
                      {orderShippingAmount.toFixed(2)}
                    </span>
                  </li>
                  <li className="flex items-center justify-between font-semibold">
                    <span>Totaal</span>
                    <span>
                      {currency_symbol}
                      {Number(order?.amount).toFixed(2)}
                    </span>
                  </li>
                </ul>
              </div>
              <hr className="my-4" />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <div className="font-semibold">Verzend informatie</div>
                  <address className="grid gap-0.5 not-italic">
                    <span>Huisnummer: {order?.shippingAddress.nr}</span>
                    <span>Adres: {order?.shippingAddress.address}</span>
                    <span>Stad: {order?.shippingAddress.city}</span>
                    <span>Postcode: {order?.shippingAddress.zipCode}</span>
                    <span>
                      Toevoeging: {order?.shippingAddress.addition || "- - -"}
                    </span>
                  </address>
                </div>
                <div className="grid auto-rows-max gap-3">
                  <div className="font-semibold">Facturatie gegevens</div>
                  <div>Hetzelfde als verzendadres</div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Klant informatie</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt>Klant</dt>
                    <dd>
                      {order?.shippingAddress.name}{" "}
                      {order?.shippingAddress.surname}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Email</dt>
                    <dd>
                      <a
                        className="hover:underline"
                        href={`mailto:${order?.user.email}`}
                      >
                        {order?.user.email}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Phone</dt>
                    <dd>
                      <a
                        className="hover:underline"
                        href={`tel:${order?.shippingAddress.mobile}`}
                      >
                        {order?.shippingAddress.mobile || "-"}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OrderHistory;
