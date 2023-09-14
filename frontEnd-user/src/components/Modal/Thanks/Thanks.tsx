import React, { useMemo } from "react";
import "./Thanks.css";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { IOrderDetail, OrderDetail } from "../../../models/OrderDetail";
import { useNavigate } from "react-router-dom";
import { HistoryAPI, IHistory } from "../../../models/History";
import { IOrder, Order } from "../../../models/Order";
import { Products } from "../../../models/Product";
import { useDispatch } from "react-redux";
import { updateState } from "../../../store/slice/UpdateProSlice";
const Thanks: React.FC<any> = ({
  dataArr,
  handleCloseForm,
  fullName,
  email,
  address,
  phone,
}) => {
  const navigate = useNavigate();
  const userValue = localStorage.getItem("user");
  const user = userValue ? JSON.parse(userValue) : undefined;
  const dispatch = useDispatch();
  const resultValue = useMemo(() => {
    const cartItems = dataArr.map((item: any) => {
      return {
        quantity: item.quantity,
        unit_amount: {
          value: item.Product.price,
        },
      };
    });
    const total = cartItems?.reduce(
      (pre: any, urr: any) =>
        pre + Number(urr.unit_amount?.value * urr.quantity),
      0
    );
    return total;
  }, [dataArr]);

  const handlePaymentSuccess = () => {
    Order.getOrderById(user.id).then((order: IOrder) => {
      OrderDetail.getOrderDetailById(order.id!).then(
        (dataDetail: IOrderDetail[]) => {
          dataDetail?.map((e: any) => {
            let values: IHistory = {
              quantity: Number(e.quantity),
              size_product: e.size_product,
              fullName: fullName,
              email: email,
              address: address,
              phone: phone,
              status: 2,
              order_date: order.order_date,
              order_id: Number(e.order_id),
              product_id: Number(e.product_id),
            };
            Products.getProductById(Number(e.product_id)).then(
              (product: any) => {
                console.log(product);

                let updateInventory = product.quantity_inventory - e.quantity;
                console.log(updateInventory);

                Products.updateProduct(e.product_id, {
                  quantity_inventory: updateInventory,
                } as any);
              }
            );
            HistoryAPI.createHistory(values);
            dispatch(updateState());
          });
        }
      );
      return OrderDetail.deleteOrderDetailByHistory(order!.id!);
    });

    navigate("/");
  };
  return (
    <div className="modal">
      <div className="modal-null" style={{ position: "relative" }}>
        <i
          className="fa-solid fa-xmark"
          style={{ right: 5, top: 5, position: "absolute", cursor: "pointer" }}
          onClick={() => handleCloseForm()}
        ></i>
        <p>Click here to pay !</p>

        <div className="">
          <PayPalButtons
            style={{
              layout: "horizontal",
              height: 48,
            }}
            createOrder={(data, actions) => {
              {
                console.log(data);
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: resultValue, // Sử dụng giá trị totalAmount ở đây
                      },
                      description: `Purchase at ${new Date().toLocaleString()}`,
                    },
                  ],
                });
              }
            }}
            onApprove={(_, actions): any => {
              return actions.order
                ?.capture()
                .then(() => handlePaymentSuccess());
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Thanks;
