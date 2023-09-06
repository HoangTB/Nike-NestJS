import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import "./Review.css";
import { ToastContainer, toast } from "react-toastify";
import { IReview, ReviewAPI } from "../../models/Review";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../store/slice/UpdateProSlice";
const Review: React.FC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  let userData = localStorage.getItem("user");
  const userLocal = userData ? JSON.parse(userData) : undefined;
  const navigate = useNavigate();
  const update = useSelector((state: any) => state.update);
  const [valueReview, setValueReview] = useState("");
  const [getReview, setGetReview] = useState<IReview[]>();
  const [rating, setRating] = useState(0);
  useEffect(() => {
    ReviewAPI.getReviewIdProMegUser(Number(params.id))
      .then((res) => {
        console.log(res);
        setGetReview(res);
      })
      .catch((err) => console.log(err));
  }, [update]);
  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);
  // console.log("raiting", rating);
  // console.log("value", valueReview);
  const handleSubmitComment = async () => {
    if (userLocal) {
      if (rating && valueReview) {
        const dataReview = {
          content: valueReview,
          star: Number(rating),
          product_id: Number(params.id),
          user_id: userLocal.id,
        };
        ReviewAPI.createReview(dataReview)
          .then((res) => {
            console.log(res);
            setValueReview("");
            setRating(0);
            dispatch(updateState());
          })
          .catch((err) => console.log(err));
      } else {
        toast.warn("Please complete all Information !", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
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
    }
  };

  return (
    <div className="container-review mt-5">
      <div>
        <ToastContainer />
        <Rating
          initialValue={rating}
          onClick={handleRating}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onPointerMove={onPointerMove}
          className="mb-2"
          size={32}
        />
        <div>
          <textarea
            placeholder="Please rate this product..."
            className="textarea-form"
            value={valueReview}
            onChange={(e) => setValueReview(e.target.value)}
          />
          <br />
          <button className="btn-review" onClick={handleSubmitComment}>
            Submit
          </button>
        </div>
      </div>
      <div className="form-comment">
        {getReview &&
          getReview!.map((e: any, index) => {
            const timestamp = new Date(e.createdAt);

            const datePart = timestamp.toISOString().slice(0, 10);
            const timePart = timestamp.toISOString().slice(11, 19);

            return (
              <div className="form-comment-child" key={index}>
                <div>
                  <div className="content-name-raiting">
                    <h6>{e.User!.firstName + " " + e.User!.lastName}</h6>
                    <p>
                      <Rating size={16} initialValue={e.star} readonly={true} />
                    </p>
                  </div>
                </div>
                <div className="content-comment">
                  <span style={{ color: "black" }}>
                    <b>
                      {timePart} {datePart}:{" "}
                    </b>
                  </span>
                  {e.content}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Review;
