import { _classes } from "../utils/helpers";
import { useState } from "react";
import styles from "../assets/styles/components/filter.module.scss";
import { AnimatePresence, motion } from "../utils/FramerMotion";
import Reveal from "../widgets/Reveal";

const cl = _classes(styles);

Filter.propTypes = {
  filters: PropTypes.array,
  activeFilter: PropTypes.string,
  filterItems: PropTypes.func,
  dark: PropTypes.bool,
  className: PropTypes.string,
};

Filter.defaultProps = {
  filters: [],
  activeFilter: "",
  filterItems: null,
  dark: false,
  className: "",
};

export default function Filter({
  filters,
  activeFilter,
  filterItems,
  dark,
  className,
}) {
  const renderActiveClass = (filter) => {
    if (filter === activeFilter) {
      return cl("filters__filter_active");
    }
  };

  const renderDesktopFilters = () => {
    return (
      <ul className={cl("filters_desktop")} aria-label="Filter" role="region">
        {filters
          .sort((a, b) => a.localeCompare(b))
          .map((filter) => {
            return (
              <button
                className={`${cl("filters__filter")} ${renderActiveClass(
                  filter
                )}`}
                onClick={() => filterItems(filter)}
                key={filter}
                aria-current={filter === activeFilter ? "true" : "false"}
              >
                {filter}
              </button>
            );
          })}
      </ul>
    );
  };

  const renderMobileFilters = () => {
    return (
      <div className={cl("filters_mobile")}>
        <span
          className={cl("filters__activeFilter")}
          onClick={() => toggleMobileFilter(!open)}
        >
          {activeFilter}
        </span>
        <AnimatePresence exitBeforeEnter>
          {open && (
            <motion.div
              initial={{
                height: "0px",
                opacity: 0,
                transition: { duration: 0.4 },
              }}
              exit={{
                height: "0px",
                opacity: 0,
                transition: { duration: 0.4 },
              }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { duration: 0.4 },
              }}
            >
              <ul className={cl("filters__filters_mobile__list")}>
                {filters.map((filter) => {
                  return (
                    <li
                      className={`${cl(
                        "filters__filter_mobile"
                      )} ${renderActiveClass(filter)}`}
                      onClick={() => {
                        filterItems(filter);
                        toggleMobileFilter(!open);
                      }}
                      key={filter}
                    >
                      {filter}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const [open, toggleMobileFilter] = useState(false);

  return (
    <Reveal
      className={`${dark ? cl("dark") : ""} ${className}`}
      delay={250}
      preset={"fadeUp"}
    >
      {renderDesktopFilters()}
      {renderMobileFilters()}
    </Reveal>
  );
}
