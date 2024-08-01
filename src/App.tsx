import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [dogs, setDogs] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const todosPerros = () => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((respuest) => respuest.json())
      .then((data) => {
        setDogs(Object.keys(data.message));
      })
      .catch((error) => {
        console.log(error, "este error es de nosotros");
      });
  };

  const getImages = () => {
    fetch(`https://dog.ceo/api/breed/${selected}/images`)
      .then((respuest) => respuest.json())
      .then((data) => {
        setImages(data.message);
      })
      .catch((error) => {
        console.log(error, "este error es de nosotros");
      });
  };

  useEffect(() => {
    if (selected) {
      getImages();
    }
  }, [selected]);

  useEffect(() => {
    todosPerros();
  }, []);

  return (
    <div className="home">
      <div className="home__title">
        <h1>Dogs App</h1>
        <h2>{selected}</h2>
      </div>
      <select onChange={(event) => setSelected(event.target.value)}>
        {dogs.map((dog) => {
          return (
            <option key={dog} value={dog}>
              {dog}
            </option>
          );
        })}
      </select>

      <div className="cards">
        {images.map((img) => {
          return (
            <div key={img} className="home__card">
              <img src={img} alt="" />
              {/* <h2>Akita</h2>
            <h3>English</h3> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
