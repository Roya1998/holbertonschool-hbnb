document.addEventListener("DOMContentLoaded", () => {
  const reviewForm = document.getElementById("review-form");
  const token = checkAuthentication();
  const placeId = getPlaceIdFromURL();

  if (reviewForm) {
    reviewForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const reviewText = document.getElementById("review-text").value.trim();

      if (!reviewText) {
        alert("Please write a review before submitting.");
        return;
      }

      await submitReview(token, placeId, reviewText);
    });
  }
});

/* ================================
   Check Authentication
================================ */
function checkAuthentication() {
  const token = getCookie("token");

  if (!token) {
    window.location.href = "index.html";
  }

  return token;
}

/* ================================
   Get Cookie by Name
================================ */
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
}

/* ================================
   Get Place ID from URL
================================ */
function getPlaceIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

/* ================================
   Submit Review
================================ */
async function submitReview(token, placeId, reviewText) {
  try {
    const response = await fetch("https://your-api-url/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        place_id: placeId,
        review: reviewText,
      }),
    });

    handleResponse(response);
  } catch (error) {
    console.error(error);
    alert("An error occurred while submitting the review.");
  }
}

/* ================================
   Handle API Response
================================ */
function handleResponse(response) {
  if (response.ok) {
    alert("Review submitted successfully!");
    document.getElementById("review-form").reset();
  } else {
    alert("Failed to submit review.");
  }
}
