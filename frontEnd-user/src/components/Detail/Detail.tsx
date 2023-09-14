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
import { Rating } from "react-simple-star-rating";
import { IReview, ReviewAPI } from "../../models/Review";
const Detail: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState<IProfile>();
  const params = useParams();
  const [products, setProducts] = useState<IProducts>();
  const [selectSizes, setSelectedSizes] = useState<string[]>([]);
  const [review, setReview] = useState<IReview[]>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date();
  const dataToday = format(today, "yyyy-MM-dd HH:mm:ss");
  const date = new Date(dataToday);
  const update = useSelector((state: any) => state.update);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userValue = localStorage.getItem("user");
    setUser(userValue ? JSON.parse(userValue) : undefined);
    Products.getProductById(params.id as any).then((data: IProducts) =>
      setProducts(data)
    );
    ReviewAPI.getReviewId(params.id as any).then((data) => {
      setReview(data);
    });
  }, [location.pathname, update]);

  const totalStars =
    review && review.reduce((a, review: any) => a + review.star, 0);
  let averageStars;
  if (totalStars) {
    averageStars = totalStars / review!.length;
  }
  console.log(averageStars);

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
        autoClose: 500,
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
        order_date: date,
        user_id: user.id,
      };

      Order.postOrder(orderValue);

      const orderResponse: any = await Order.getOrderById(user.id);

      if (!selectSizes[0]) {
        setIsLoading(false);
        toast.warn("Please choose size !", {
          autoClose: 500,
        });
      } else {
        setIsLoading(false);
        const data: any = await OrderDetail.getOrderDetailById(
          Number(orderResponse.id)
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
                autoClose: 500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setIsLoading(false);
          const orderDetailValue: IOrderDetail = {
            product_id: Number(params.id),
            order_id: orderResponse.id,
            size_product: selectSizes[0],
          };
          OrderDetail.postOrderDetail(orderDetailValue).then(() => {
            toast.success("Added to the Cart!", {
              autoClose: 500,
            });

            dispatch(updateState());
          });
        }
      }
    }
  };

  const handleAddFavorite = async () => {
    await FavoriteAPI.getFavoriteID(Number(user?.id));

    const favoriteValue: IFavorite = {
      user_id: Number(user?.id),
      product_id: Number(params.id),
    };

    FavoriteAPI.createFavorite(favoriteValue)
      .then((res: any) =>
        toast.success(res.message, {
          autoClose: 500,
        })
      )
      .catch((error: any) =>
        toast.error(error.response.data.message, {
          autoClose: 500,
        })
      );
  };
  return (
    <div className="container1 forms">
      <ToastContainer />
      {isLoading && <Loading />}
      <div className="container form-container">
        {products?.Image !== undefined && (
          <div className="row list-image gap-6 form-row-detail">
            <div className="col-8">
              <div className="row row-cols-1 row-cols-md-2 g-1 listimage-detail">
                <div className="col">
                  <div className="card">
                    <img
                      src={products!.Image.image_1}
                      className="card-img-top image-zoom"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="card">
                    <img
                      src={products.Image.image_2}
                      className="card-img-top image-zoom"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="card">
                    <img
                      src={products.Image.image_3}
                      className="card-img-top image-zoom"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="card">
                    <img
                      src={products.Image.image_4}
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
                <h5 className="mb-2">{products?.price} $</h5>
                <div className="form-rating-review">
                  <Rating
                    size={30}
                    initialValue={averageStars ? averageStars : 0}
                    readonly={true}
                  />{" "}
                  <span>{review?.length} (review)</span>
                </div>
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
