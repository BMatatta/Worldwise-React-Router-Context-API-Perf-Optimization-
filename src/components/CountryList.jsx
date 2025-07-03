import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import {useCities} from "../contexts/CitiesContext";

function CountryList() {
  const {cities, isLoading} = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Add countries" />;

  const countries = cities.reduce((acc, cur) => {
    if (!acc.map(el => el.country).includes(cur.country))
      return [...acc, {country: cur.country, emoji: cur.emoji}];
    else return acc;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
