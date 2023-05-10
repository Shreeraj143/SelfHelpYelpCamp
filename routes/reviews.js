const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const reviews = require("../controllers/reviews");

const {
  validateReviews,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware");

// ROUTES FOR REVIEWS
router.post("/", isLoggedIn, validateReviews, wrapAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviews.deleteReview)
);

module.exports = router;
