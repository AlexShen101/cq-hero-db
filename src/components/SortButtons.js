const SortButtons = ({ activeFilter, setActiveFilter }) => {
  let category = activeFilter.split("-")[0];
  let symbol = activeFilter.split("-")[1] === 'Up' ? " ˄" : " ˅";

  return (
    <div>
      <p>Sort By:</p>
      <div>
        <button
          onClick={() =>
            activeFilter === "Name-Up"
              ? setActiveFilter("Name-Down")
              : setActiveFilter("Name-Up")
          }
        >
          Name 
          {category === "Name" ? symbol : ''}
        </button>
        <button
          onClick={() =>
            activeFilter === "Role-Up"
              ? setActiveFilter("Role-Down")
              : setActiveFilter("Role-Up")
          }
        >
          Role 
          {category === "Role" ? symbol : ''}
        </button>
        <button
          onClick={() =>
            activeFilter === "Colo-Up"
              ? setActiveFilter("Colo-Down")
              : setActiveFilter("Colo-Up")
          }
        >
          Colo 
          {category === "Colo" ? symbol : ''}
        </button>
        <button
          onClick={() =>
            activeFilter === "Arena-Up"
              ? setActiveFilter("Arena-Down")
              : setActiveFilter("Arena-Up")
          }
        >
          Arena 
          {category === "Arena" ? symbol : ''}
        </button>
        <button
          onClick={() =>
            activeFilter === "CH4-Up"
              ? setActiveFilter("CH4-Down")
              : setActiveFilter("CH4-Up")
          }
        >
          CH4 
          {category === "CH4" ? symbol : ''}
        </button>
        <button
          onClick={() =>
            activeFilter === "CH5-Up"
              ? setActiveFilter("CH5-Down")
              : setActiveFilter("CH5-Up")
          }
        >
          CH5 
          {category === "CH5" ? symbol : ''}
        </button>
        <button
          onClick={() =>
            activeFilter === "Umrat-Up"
              ? setActiveFilter("Umrat-Down")
              : setActiveFilter("Umrat-Up")
          }
        >
          Umrat 
          {category === "Umrat" ? symbol : ''}
        </button>
        <button
          onClick={() =>
            activeFilter === "Sera-Up"
              ? setActiveFilter("Sera-Down")
              : setActiveFilter("Sera-Up")
          }
        >
          Sera 
          {category === "Sera" ? symbol : ''}
        </button>
      </div>
    </div>
  );
};

export default SortButtons;
