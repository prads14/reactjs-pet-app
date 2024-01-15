import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event) => {
    this.setState({
      // + helps to convert the string into numbers.
      active: parseInt(event.target.dataset.index),
      //active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="grid gap-6 grid-cols-2 w-11/12">
        <img src={images[active]} alt="animal" style={{ height: "400px" }} />
        <div className="inline-block">
          {images.map((image, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={image}
              src={image}
              className={
                index === active ? "carousel-item active" : "carousel-item"
              }
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
