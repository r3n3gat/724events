import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
  // Trier les événements du plus ancien au plus récent
  const byDateAsc = data?.focus.sort((evtA, evtB) => 
    new Date(evtA.date) - new Date(evtB.date)
  );

  // passer à la prochaine carte
  const nextCard = () => {
    const timer = setTimeout(() => {
      if (byDateAsc && byDateAsc.length > 0) {
        setIndex(index < byDateAsc.length - 1 ? index + 1 : 0);
      } else {
        setIndex(0);
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    nextCard();
  }, [index, byDateAsc]);

  return (
    <div className="SlideCardList">
      {byDateAsc?.map((event, idx) => (
        <div key={event.id}>
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateAsc.map((focusEvent) => (
                <input
                  key={focusEvent.id}
                  type="radio"
                  name="radio-button"
                  checked={index === byDateAsc.indexOf(focusEvent)}
                  onChange={() => setIndex(byDateAsc.indexOf(focusEvent))}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
