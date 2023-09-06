import React, { useState, useEffect } from "react";
import "./Detail.css";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { IProducts, Products } from "../../models/Product";
import { IOrder, Order } from "../../models/Order";
import {
  IOrderDetail,
  IUpdateQuantity,
  OrderDetail,
} from "../../models/OrderDetail";
import { IProfile } from "../../types/Types";
import { updateState } from "../../store/slice/UpdateProSlice";
import { FavoriteAPI, IFavorite } from "../../models/Favotites";
import Review from "../Review/Review";
const Detail: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState<IProfile>();
  const params = useParams();
  const [products, setProducts] = useState<IProducts>();
  const [selectSizes, setSelectedSizes] = useState<string[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date();
  const dataToday = format(today, "yyyy-MM-dd HH:mm:ss");
  const update = useSelector((state: any) => state.update);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const userValue = localStorage.getItem("user");
    setUser(userValue ? JSON.parse(userValue) : undefined);
  }, [location.pathname, update]);

  useEffect(() => {
    Products.getProductById(params.id as any).then((data: any) =>
      setProducts(data)
    );
  }, [location.pathname, update]);
  const handleSizeClick = (e: any) => {
    setSelectedSizes([]);
    const size = e.target.innerHTML;
    setSelectedSizes((prevSizes) => {
      if (prevSizes.includes(size)) {
        return prevSizes.filter((prevSize) => prevSize !== size);
      } else {
        return [...prevSizes, size];
      }
    });
  };
  const handleAddToCart = async () => {
    setIsLoading(true);
    if (!user) {
      toast.error("Please Login !", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      const userValue = localStorage.getItem("user");
      const user = userValue ? JSON.parse(userValue) : undefined;
      const orderValue: IOrder = {
        order_date: dataToday,
        user_id: user.id,
      };

      Order.postOrder(orderValue);

      const orderResponse: any = await Order.getOrderById(user.id);
      console.log(orderResponse);

      if (!selectSizes[0]) {
        setIsLoading(false);
        toast.warn("Please choose size !", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setIsLoading(false);
        const data: any = await OrderDetail.getOrderDetailById(
          Number(orderResponse[0].id)
        )
          .then()
          .catch();
        const checkProduct = data.findIndex(
          (item: any) => Number(item.product_id) === Number(params.id)
        );

        if (checkProduct !== -1) {
          setIsLoading(false);
          const quantityValue: IUpdateQuantity = {
            quantity: data[checkProduct].quantity
              ? data[checkProduct].quantity! + 1
              : 1,
            size_product: selectSizes[0],
          };
          OrderDetail.updateQuantity(Number(params.id), quantityValue)
            .then((res) => {
              console.log(res);
              toast.success("Added to the Cart!", {
                position: "top-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setIsLoading(false);
          const orderDetailValue: IOrderDetail = {
            product_id: Number(params.id),
            order_id: orderResponse[0].id,
            size_product: selectSizes[0],
          };
          OrderDetail.postOrderDetail(orderDetailValue).then(() => {
            toast.success("Added to the Cart!", {
              position: "top-right",
              autoClose: 500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            dispatch(updateState());
          });
        }
      }
    }
  };

  const handleAddFavorite = async () => {
    const favoriteID = await FavoriteAPI.getFavoriteID(Number(user?.id));

    const favoriteValue: IFavorite = {
      user_id: Number(user?.id),
      product_id: Number(params.id),
    };

    FavoriteAPI.createFavorite(favoriteValue)
      .then((res: any) =>
        toast.success(res.message, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      )
      .catch((error: any) =>
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  };
  return (
    <div className="container1 forms">
      <ToastContainer />
      {isLoading && <Loading />}
      <div className="container">
        {products && (
          <div className="row list-image gap-6">
            <div className="col-8">
              <div className="row row-cols-1 row-cols-md-2 g-1 listimage-detail">
                <div className="col">
                  <div className="card">
                    <img
                      src={products.Images![0].image_1}
                      className="card-img-top image-zoom"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="card">
                    <img
                      src={products.Images![0].image_2}
                      className="card-img-top image-zoom"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="card">
                    <img
                      src={products.Images![0].image_3}
                      className="card-img-top image-zoom"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="card">
                    <img
                      src={products.Images![0].image_4}
                      className="card-img-top image-zoom"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4 content-right-detail">
              <div className="content-detail">
                <h3 className="text-danger">{products?.name}</h3>
                <h5 className="fst-italic pb-2">{products?.type}</h5>
                <h5>{products?.price} $</h5>
              </div>
              <table className="table-size">
                <thead>
                  <tr>
                    <th colSpan={3} className="pb-2 th">
                      Select Size
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      onClick={handleSizeClick}
                      className={
                        selectSizes.includes("EU 35.5") ? "selected" : "td"
                      }
                    >
                      EU 35.5
                    </td>
                    <td
                      onClick={handleSizeClick}
                      className={
                        selectSizes.includes("EU 36") ? "selected" : "td"
                      }
                    >
                      EU 36
                    </td>
                    <td
                      onClick={handleSizeClick}
                      className={
                        selectSizes.includes("EU 36.5") ? "selected" : "td"
                      }
                    >
                      EU 36.5
                    </td>
                  </tr>
                  <tr>
                    <td
                      onClick={handleSizeClick}
                      className={
                        selectSizes.includes("EU 37") ? "selected" : "td"
                      }
                    >
                      EU 37
                    </td>
                    <td
                      onClick={handleSizeClick}
                      className={
                        selectSizes.includes("EU 37.5") ? "selected" : "td"
                      }
                    >
                      EU 37.5
                    </td>
                    <td
                      onClick={handleSizeClick}
                      className={
                        selectSizes.includes("EU 38") ? "selected" : "td"
                      }
                    >
                      EU 38
                    </td>
                  </tr>
                  <tr>
                    <td
                      onClick={handleSizeClick}
                      className={
                        selectSizes.includes("EU 39") ? "selected" : "td"
                      }
                    >
                      EU 39
                    </td>
                    <td
                      onClick={handleSizeClick}
                      className={
                        selectSizes.includes("EU 39.5") ? "selected" : "td"
                      }
                    >
                      EU 39.5
                    </td>
                    <td
                      onClick={handleSizeClick}
                      className={
                        selectSizes.includes("EU 40") ? "selected" : "td"
                      }
                    >
                      EU 40
                    </td>
                  </tr>
                  <tr>
                    <td
                      onClick={handleSizeClick}
                      className={
                        selectSizes.includes("EU 40.5") ? "selected" : "td"
                      }
                    >
                      EU 40.5
                    </td>
                    <td
                      onClick={handleSizeClick}
                      className={
                        selectSizes.includes("EU 41") ? "selected" : "td"
                      }
                    >
                      EU 41
                    </td>
                    <td
                      onClick={handleSizeClick}
                      className={
                        selectSizes.includes("EU 41.5") ? "selected" : "td"
                      }
                    >
                      EU 41.5
                    </td>
                  </tr>
                  <tr className="btn-list">
                    {products.quantity_inventory! < 0 ? (
                      <th colSpan={3}>
                        <p
                          className=""
                          style={{ textAlign: "center", color: "red" }}
                        >
                          The product is currently sold out.
                        </p>
                      </th>
                    ) : (
                      <th colSpan={3} id="add-cart" className="btn-add-cart ">
                        <button onClick={handleAddToCart}>Add to Cart</button>{" "}
                        <button onClick={handleAddFavorite}>Favorite</button>
                      </th>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            <Review />
          </div>
        )}
      </div>
    </div>
  );
};
1;
export default Detail;
