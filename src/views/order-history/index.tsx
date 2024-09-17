import {
  getOrderHistoryQueryOptions,
  getPlanOrderQueryOptions,
} from "@/api-clients/user-api-client/queries";
import MealCard from "@/common/components/meal-card";
import SettingsPageLayout from "@/common/components/settings-page-layout";
import { Card, CardContent } from "@/common/components/ui/card";
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
  getProductPrice,
  getProductTaxAmount,
  sortMealsByMealType,
} from "@/lib/utils";
import { PlanOrder } from "@/types/api-responses/product-attribute";
import { Fragment, ReactNode, useMemo, useState } from "react";
import DataTablePagination from "../data-table-pagination";
import SelectedDays from "../weekly-menu/components/selected-days";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/common/components/ui/carousel";
import { useUserSession } from "@/hooks/useUserSession";
import { CouponTypeEnum } from "@/types/api-responses/coupon-code";
import Image from "next/image";

const currency_type = process.env.NEXT_PUBLIC_CURRENCY_TYPE || "eur";

const OrderHistory = () => {
  const MealDataTableHeaders = ["Datum", "Week", "Toestand"];
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

  return (
    <SettingsPageLayout title="Bestelgeschiedenis">
      {/* {orderHistory.isLoading ? (
        <div className="flex items-center justify-center h-[300px]">
          <div className="h-6 w-6">
            <Spinner />
          </div>
          Loading...
        </div>
      ) : ( */}
      <>
        {!(user?.access == "product") && (
          <>
            <h2 className="text-3xl font-semibold mb-4">Maaltijdboxen</h2>
            <div className="rounded-3xl border-2 border-app-dark-grey px-8 py-8 bg-app-grey">
              <table className="w-full border-collapse">
                {" "}
                <thead>
                  <tr>
                    {MealDataTableHeaders.map((header) => (
                      <th
                        key={header}
                        className="px-4 py-2 text-left text-[28px] font-semibold"
                      >
                        {" "}
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {planOrder.data?.data?.map((row, index) => (
                    <MealOrderModal key={"dgs" + index} data={row}>
                      <td className="px-4 py-2 text-left text-[18px]">
                        {new Date(row.createdAt).toDateString()}
                      </td>
                      <td className="px-4 py-2 text-left text-[18px]">
                        {row.week}
                      </td>
                      <td className="px-4 py-2 text-left text-[18px]">
                        {row.status}
                      </td>
                    </MealOrderModal>
                  ))}
                </tbody>
              </table>
              <DataTablePagination query={planOrder} />
            </div>
          </>
        )}

        <h2 className="text-3xl font-semibold mb-4 mt-12">Producten</h2>
        <div className="rounded-3xl border-2 border-app-dark-grey px-8 py-8 bg-app-grey">
          <table className="w-full border-collapse">
            {" "}
            <thead>
              <tr>
                {productTableHeaders.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-2 text-left text-[28px] font-semibold"
                  >
                    {" "}
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orderHistory.data?.data?.map((row, index) => (
                <ProductOrderHistoryModal key={"poh" + index} data={row}>
                  <td className="px-4 py-2 text-left text-[18px]">
                    <div className="max-w-[100px] truncate">#{row.id}</div>
                  </td>
                  <td className="px-4 py-2 text-left text-[18px]">
                    {new Date(row.createdAt).toDateString()}
                  </td>
                  <td className="px-4 py-2 text-left text-[18px]">
                    {row.status}
                  </td>
                  <td className="px-4 py-2 text-left text-[18px]">
                    {currency_type == "eur" ? "€" : "$"}
                    {row.amount}
                  </td>
                </ProductOrderHistoryModal>
              ))}
            </tbody>
          </table>
          <DataTablePagination query={orderHistory} />
        </div>
      </>
      {/* )} */}
    </SettingsPageLayout>
  );
};

type MealOrderProps = {
  children: ReactNode;
  data: PlanOrder;
};

function MealOrderModal({ children, data }: MealOrderProps) {
  let totalDays = data.mealsForTheWeek.length;

  const [selectedDay, setSelectedDay] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);

  const currentDayMeals = useMemo(() => {
    return data.mealsForTheWeek.find((v) => v.day == selectedDay)?.meals;
  }, [data, selectedDay]);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <tr
        onClick={() => setModalOpen(true)}
        className="border-b border-gray-200 hover:bg-slate-200 cursor-pointer"
      >
        {children}
      </tr>

      <DialogContent className="max-xl:max-w-[95vw] xl:max-w-[1300px] overflow-hidden max-h-[95dvh] overflow-y-auto">
        <section className="my-[20px]">
          <div className="container">
            <SelectedDays
              activeDay={selectedDay}
              onDayClick={(d) => setSelectedDay(d)}
              totalDays={totalDays}
            />
            <div className="grid grid-cols-2 gap-6 mt-20">
              {currentDayMeals && currentDayMeals.length > 0 ? (
                sortMealsByMealType(currentDayMeals).map((v, i) => (
                  <MealCard key={"hello" + i} meal={v} />
                ))
              ) : (
                <div>Er is geen maaltijd voor de dag</div>
              )}
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}

type ProductHistoryModaProps = {
  children: ReactNode;
  data: any;
};
function ProductOrderHistoryModal({ children, data }: ProductHistoryModaProps) {
  const [OrderHistoryModalOpen, setOrderHistoryModalOpen] = useState(false);
  const order = data;
  const currencyType = process.env.NEXT_PUBLIC_CURRENCY_TYPE;

  const { orderTotalBeforeDiscount, totalTax21Percent, totalTax9Percent } =
    useMemo(
      () =>
        order?.products.reduce(
          (accumulator: any, currentValue: any) => {
            const price = getProductPrice(
              currentValue.product,
              currentValue.variationId,
            );

            const taxAmount = getProductTaxAmount({
              productPrice: price ?? 0,
              taxPercent: currentValue.product.taxPercent,
            });

            return {
              orderTotalBeforeDiscount:
                (price ?? 0) * currentValue.count +
                accumulator.orderTotalBeforeDiscount,
              totalTax9Percent:
                (currentValue.product.taxPercent === "TAX9" ? taxAmount : 0) +
                accumulator.totalTax9Percent,
              totalTax21Percent:
                (currentValue.product.taxPercent === "TAX21" ? taxAmount : 0) +
                accumulator.totalTax21Percent,
            };
          },
          {
            orderTotalBeforeDiscount: 0,
            totalTax21Percent: 0,
            totalTax9Percent: 0,
          },
        ),
      [order?.products],
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

  return (
    <Dialog
      open={OrderHistoryModalOpen}
      onOpenChange={setOrderHistoryModalOpen}
    >
      <tr
        onClick={() => setOrderHistoryModalOpen(true)}
        className="border-b border-gray-200 hover:bg-slate-200 cursor-pointer"
      >
        {children}
      </tr>

      <DialogContent className="max-xl:max-w-[95vw] xl:max-w-[1300px] overflow-hidden max-h-[95dvh] overflow-y-auto">
        <section className="my-[20px]">
          <div className="container">
            <Card className="overflow-hidden">
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
                      {order?.products.map((product: any) => {
                        const price = getProductPrice(
                          product.product,
                          product.variationId,
                        );
                        return (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Carousel className="w-9">
                                  <CarouselContent>
                                    {product.product.images.map(
                                      (image: string, index: number) => (
                                        <CarouselItem key={index}>
                                          <Image
                                            src={image}
                                            alt={product.product.name}
                                            width={100}
                                            height={100}
                                            className="size-9 rounded-sm bg-muted object-cover"
                                          />
                                        </CarouselItem>
                                      ),
                                    )}
                                  </CarouselContent>
                                </Carousel>
                                <div>
                                  <p className="text-muted-foreground">
                                    {product.product.name}
                                  </p>
                                  {product.variation && (
                                    <div className="mt-px flex flex-wrap divide-x divide-muted-foreground/60 text-xs text-muted-foreground [&>p:first-child]:ml-0 [&>p:first-child]:pl-0 [&>p>span]:text-black [&>p]:ml-2 [&>p]:pl-2">
                                      {product.variation.termIds.map(
                                        (termId: string) => {
                                          const attributeTerm =
                                            product.product.attributeTerms.find(
                                              (attributeTerm: any) =>
                                                attributeTerm.id === termId,
                                            );

                                          const attribute = (
                                            product.product.attributes || []
                                          ).find(
                                            (attribute: any) =>
                                              attribute.id ===
                                              attributeTerm?.productAttributeId,
                                          );
                                          return (
                                            <Fragment key={termId}>
                                              <p>
                                                <span>{attribute?.name}:</span>{" "}
                                                {attributeTerm?.name}{" "}
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
                              {currencyType === "eur" ? "€" : "$"}
                              {price}
                            </TableCell>
                            <TableCell>
                              <span className="mr-2 opacity-40">×</span>
                              {product.count}
                            </TableCell>
                            <TableCell className="text-right">
                              {currencyType === "eur" ? "€" : "$"}
                              {price! * product.count}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  <hr />

                  {/* <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotaal</span>
                      <span>
                        {currencyType === "eur" ? "€" : "$"}
                        {orderTotalBeforeDiscount?.toFixed(2)}
                      </span>
                    </li>
                    {order?.coupon && (
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Coupon(s) -{" "}
                          <span className="font-medium text-foreground">
                            {order.coupon.code}
                          </span>
                        </span>
                        <span>
                          - {currencyType === "eur" ? "€" : "$"}
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
                        {currencyType === "eur" ? "€" : "$"}
                        {getShippingAmount(Number(order?.amount)).toFixed(2)}
                      </span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Totaal</span>
                      <span>
                        {currencyType === "eur" ? "€" : "$"}
                        {Number(order?.amount).toFixed(2)}
                      </span>
                    </li>
                  </ul> */}

                  <ul className="grid gap-0.5 [&>li:nth-child(odd)]:bg-muted-foreground/10 [&>li]:px-2 [&>li]:py-1.5">
                    <li className="flex items-center justify-between">
                      <span>Subtotaal (excl. BTW)</span>
                      <span>
                        {currencyType === "eur" ? "€" : "$"}
                        {(orderTotalBeforeDiscount - totalTaxAmount)?.toFixed(
                          2,
                        )}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>BTW (9%)</span>
                      <span>
                        {currencyType === "eur" ? "€" : "$"}
                        {totalTax9Percent?.toFixed(2)}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>BTW (21%)</span>
                      <span>
                        {currencyType === "eur" ? "€" : "$"}
                        {totalTax21Percent?.toFixed(2)}
                      </span>
                    </li>
                    {order?.coupon && (
                      <li className="flex items-center justify-between">
                        <span>
                          Coupon(s) -{" "}
                          <span className="font-medium text-foreground">
                            {order.coupon.code}
                          </span>
                        </span>
                        <span>
                          - {currencyType === "eur" ? "€" : "$"}
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
                      <span>Verzendkosten (21% BTW inbegrepen)</span>
                      <span>
                        {Number(orderShippingAmount) > 0 && (
                          <span className="mr-2 opacity-50">
                            (BTW {currencyType === "eur" ? "€" : "$"}
                            {shippingTaxAmount.toFixed(2)})
                          </span>
                        )}
                        {currencyType === "eur" ? "€" : "$"}
                        {orderShippingAmount.toFixed(2)}
                      </span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span>Totaal</span>
                      <span>
                        {currencyType === "eur" ? "€" : "$"}
                        {Number(order?.amount).toFixed(2)}
                      </span>
                    </li>
                  </ul>
                </div>
                <hr className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <div className="font-semibold">Verzend informatie</div>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                      <span>Huisnummer: {order?.user.nr}</span>
                      <span>Adres: {order?.user.address}</span>
                      <span>Stad: {order?.user.city}</span>
                      <span>Postcode: {order?.user.zipCode?.zipCode}</span>
                    </address>
                  </div>
                  <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">facturatie gegevens</div>
                    <div className="text-muted-foreground">
                      Hetzelfde als verzendadres
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">klant informatie</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Klant</dt>
                      <dd>
                        {order?.user.name} {order?.user.surname}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Email</dt>
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
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd>
                        <a
                          className="hover:underline"
                          href={`tel:${order?.user.mobile}`}
                        >
                          {order?.user.mobile || "-"}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default OrderHistory;
