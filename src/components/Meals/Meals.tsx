import { createElement, FC, Fragment } from 'react';
import { MealsSummary } from './MealsSummary';
import { AvailableMeals } from './AvailableMeals';

export const Meals: FC = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  )
}