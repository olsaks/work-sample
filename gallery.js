import { _classes } from "../utils/helpers";
import { useState } from "react";
import styles from "../assets/styles/templates/gallery.module.scss";
import Slick from "react-slick";
import Image from "../widgets/Image";
import Filter from "../components/Filter";
import Reveal from "../widgets/Reveal";

const cl = _classes(styles);

Gallery.propTypes = {
  page: PropTypes.object,
};

Gallery.defaultProps = {
  page: {},
};

export default function Gallery({ page }) {
  const slides = page.acf.categorized_slides;
  const settings = {
    dots: false,
    centerMode: true,
    centerPadding: "200px",
    infinite: true,
    arrows: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          centerMode: false,
          centerPadding: "0px",
          arrows: false,
        },
      },
    ],
  };

  const generateFilters = () => {
    let usedFilters = ["All"];

    slides.map((item) => usedFilters.push(item.category));

    if (usedFilters.length > 0) {
      return [...new Set(usedFilters)];
    }
  };

  const renderCarousel = () => {
    if (filteredItems && filteredItems.length > 1) {
      return (
        <Reveal
          className={`${cl("carousel")} gallery-carousel`}
          delay={250}
          preset={"fade"}
        >
          <Slick {...settings}>
            {filteredItems.map((item) => {
              return (
                <Image
                  key={item.image.id}
                  src={item.image && item.image.sizes.large}
                  alt={item.image.alt || item.image.title}
                />
              );
            })}
          </Slick>
        </Reveal>
      );
    } else if (filteredItems && filteredItems.length === 1) {
      return (
        <Reveal className={cl("carousel")} delay={250} preset={"fadeUp"}>
          <Image
            key={filteredItems[0].image.id}
            src={filteredItems[0].image && filteredItems[0].image.sizes.large}
            alt={filteredItems[0].image.alt || filteredItems[0].image.title}
            className={cl("gallery__carouselImage")}
          />
        </Reveal>
      );
    }
  };

  const [filteredItems, setFilteredItems] = useState(slides);
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = generateFilters();

  const filterItems = (filter) => {
    if (filter === "All") {
      setFilteredItems(slides);
      setActiveFilter("All");
    } else {
      const items = slides.filter((item) => item.category === filter);
      setFilteredItems(items);
      setActiveFilter(filter);
    }
  };

  if (!page) {
    return null;
  }
  return (
    <div className={cl("_")}>
      <Filter
        filters={filters}
        activeFilter={activeFilter}
        filterItems={filterItems}
        className={cl("filters")}
      />
      {renderCarousel()}
    </div>
  );
}
