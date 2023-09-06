import React, { useEffect, useState } from "react";
import "./OrderManager.css";
import Loading from "../Loading/Loading";
import { HistoryAPIServer, IHistory } from "../../models/History";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateState } from "../../store/slice/UpdateProSlice";
import { IStatusValue } from "../../types/Type";
const OrderManager: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<Array<IHistory>>([]);
  const dispatch = useDispatch();
  const update = useSelector((status: any) => status.update);
  const location = useLocation();
  useEffect(() => {
    HistoryAPIServer.getAllHistoryIdOrder().then((h: any) => {
      setHistory(h);
    });
    setIsLoading(false);
  }, [update, location.pathname, isLoading]);

  const handleChangeStatus = async (
    c: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    const statusValue: IStatusValue = {
      status: Number(c.target.value),
    };
    await HistoryAPIServer.updateHistoryStatus(id, statusValue);
    dispatch(updateState());
    setIsLoading(true);
  };
  return (
    <div className="content-user">
      {isLoading && <Loading />}
      <div className="table-content">
        <div className="wrapper-title">
          <i className="fa-solid fa-arrow-right"></i>
          <h1 className="title-page">ORDER-MANAGER</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER_ID_ORDER</th>
              <th className="information">INFORMATION</th>
              <th className="information">PRODUCT</th>
              <th className="information">TOTAL_PRICE</th>
              <th className="information">DATE_ORDER</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {history &&
              history.map((e: IHistory) => {
                console.log(e);

                if (e.status !== 4) {
                  return (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.Order?.user_id}</td>
                      <td className="information">
                        <div>Email: {e.email}</div>
                        <div>Name: {e.fullName}</div>
                        <div>Phone: {e.phone}</div>
                        <div>Address: {e.address}</div>
                      </td>
                      <td className="information">
                        <div>NameProduct: {e.Product?.name}</div>
                        <div>Type: {e.Product?.type}</div>
                        <div>Size: {e.size_product}</div>
                        <div>Quantity: {e.quantity}</div>
                      </td>
                      <td>
                        $ {(e.Product!.price * e.quantity!).toLocaleString()}
                      </td>
                      <td className="information">
                        <div>{String(e.order_date!).slice(0, 10)}</div>
                        <div>{String(e.order_date!).slice(11, 19)}</div>
                      </td>
                      <td>
                        <select
                          className="border-0 align-middle form-control"
                          value={e.status}
                          onChange={(c) => handleChangeStatus(c, e.id!)}
                        >
                          <option value="1">Pending</option>
                          <option value="2">Processing</option>
                          <option value="3">Out for Delivery</option>
                          <option value="4">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManager;
