import { FC, createElement, useState, useEffect, Fragment } from 'react';
import { useHttp } from '../../hooks/use-http';
import { Card } from '../UI';
import { MealItem } from './MealItem/MealItem';

import './styles/available-meals.css';


export const AvailableMeals: FC = () => {
  const { isError, isLoading, sendRequest: fetchMeals } = useHttp();
  const [meals, setMeals] = useState([] as any);

  let content = <p>Found no meals</p>;

  if (isError) {
    content = (
      <section className="meals-error">
        <p>{isError}</p>
      </section>
    )
  }

  if (isLoading) {
    content = (
      <section className="meals-loading">
        <p>Loading...</p>
      </section>
    )
  }

   // calling the api on the very first render
   useEffect(() => {
    const tranformData = (mealsObj: any) => {
      let initialMeals = [];
      for (const key in mealsObj) {
        initialMeals.push({
          id: key,
          name: mealsObj[key].name,
          description: mealsObj[key].description,
          price: mealsObj[key].price
        })
      }
      setMeals(initialMeals);
    };

    // get movies
    fetchMeals(
      {
        url: 'https://react-http-practice-c7fbb-default-rtdb.firebaseio.com/meals.json',
      },
      tranformData
    );
    
   }, [fetchMeals]);
  
   if (meals.length) {
     content = (
      <section className="meals">
        <Card>
          <ul>
            {meals.map((meal: any) => (
              <MealItem
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
                id={meal.id}
              />
            ))}
          </ul>
          </Card>
        </section>
    );
  }

  return (
    <Fragment>
      {content}
    </Fragment>
  );
}