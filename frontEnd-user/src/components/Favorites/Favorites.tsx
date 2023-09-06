import React, { useEffect, useState } from "react";
import "./Favorites.css";
import { ToastContainer, toast } from "react-toastify";
import { FavoriteAPI, IFavorite } from "../../models/Favotites";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../store/slice/UpdateProSlice";
const Favorites: React.FC = () => {
  const [dataFavorite, setDataFavorite] = useState<Array<IFavorite>>([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const update = useSelector((state: any) => state.update);
  const userValue = localStorage.getItem("user");
  const user = userValue ? JSON.parse(userValue) : undefined;
  useEffect(() => {
    if (user && user.id) {
      FavoriteAPI.getFavoriteID(user.id).then((item: any) => {
        setDataFavorite(item);
      });
    }
  }, [location.pathname, update]);

  const handleDeleteFavorite = async (id: number) => {
    await FavoriteAPI.deleteFavoriteID(id)
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
      .catch((err) => console.log(err));

    dispatch(updateState());
  };

  return (
    <div className="m-4 text-center" style={{ minHeight: "425px" }}>
      <ToastContainer />
      <h1 className="pb-4">Favorites</h1>

      {dataFavorite.length > 0 ? (
        dataFavorite.map((item: IFavorite, index) => {
          return (
            <div className="pb-5 container" key={index}>
              <div className="d-flex justify-content-center gap-5">
                <div className="col-md-2">
                  <img
                    className="img-fluid mx-auto d-block image"
                    src={item.Product!.image}
                  />
                </div>
                <div className="col-md-8 d-flex align-items-center">
                  <div className="row justify-content-between w-100">
                    <div className="col-md-5 product-name">
                      <div className="product-name align-items-start">
                        <Link to={`/detail/${item.product_id}`}>
                          {item.Product!.name}
                        </Link>
                        <div className="product-info">
                          <div>
                            <span className="value">{item.Product!.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <i
                    className="fa-solid fa-trash fs-5 delete-circle"
                    onClick={() => handleDeleteFavorite(item.product_id!)}
                  />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="favorite-items">
          The favorited items will be saved here..
        </div>
      )}
    </div>
  );
};

export default Favorites;
