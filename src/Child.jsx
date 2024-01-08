const Child = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <h2>{props.age}</h2>
      <h2>{props.gender}</h2>
    </div>
  );
};

export default Child;
