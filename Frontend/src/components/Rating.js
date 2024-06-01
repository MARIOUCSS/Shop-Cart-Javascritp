export const Rating = {
  //props={
  // value,
  // text
  // }
  generateRatingStars: (rating) => {
    let starsHTML = '<div class="rating">';
    for (let i = 1; i <= 5; i++) {
      const starClass =
        rating >= i
          ? "fa fa-star"
          : rating >= i - 0.5
          ? "fa fa-star-half-o"
          : "fa fa-star-o";
      starsHTML += `<span><i class="${starClass}"></i></span>`;
    }
    starsHTML += "</div>";
    return starsHTML;
  },
  render: (props) => {
    if (!props.value) {
      0;
      return "<div></div>";
    }
    const starsHTML = Rating.generateRatingStars(props.value);
    return `
    ${starsHTML}
 <span>${props.text || ""}</span>
  
    `;
  },
};
