import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Main from "../pages/Main";
import { MINUTES, PLAN } from "../constants/values.ts";

const pointsAndPrice = [
   ["011", "016", 1.9],
   ["011", "017", 1.7],
   ["011", "018", 0.9],
   ["016", "011", 2.9],
   ["017", "011", 2.7],
   ["018", "011", 1.9],
];

let main;
let originInput;
let destinyInput;
let totalSumComponent;

beforeEach(() => {
   main = render(<Main />);
});

function setInputsAndSum() {
   originInput = main.queryByTestId("origin-input");
   destinyInput = main.queryByTestId("destiny-input");
   totalSumComponent = main.queryByTestId("total-sum");
}

describe('__Check starting values__', () => {

   test(`origin input value`, () => {
      expect(main.queryByTestId('origin-input').props.value).toBe("");
   });

   test(`origin destiny value`, () => {
      expect(main.queryByTestId('destiny-input').props.value).toBe("");
   });

   test(`if checked minutes value is 20 minutes`, () => {
      expect(main.queryByTestId("radio-minutes-20").props.accessibilityState.checked).toBeTruthy();
   });

   test(`checkbox fale mais should not checked`, () => {
      expect(main.queryByTestId("checkbox-fale-mais").props.accessibilityState.checked).toBeFalsy();
   });

   test(`chosing plan sector is not showed`, () => {
      expect(main.queryByTestId("chosing-plan-sector")).toBeNull()
   });

   test(`total sum`, () => {
      expect(main.queryByTestId("total-sum").props.children).toBe("-");
   });
});

describe('__Check changes__', () => {

   test('radio buttons of plans become visible with checked plan 30 after pressing checkbox fale mais', () => {
      fireEvent.press(main.queryByTestId("checkbox-fale-mais"))
      expect(main.queryByTestId("radio-plan-30").props.accessibilityState.checked).toBeTruthy();
   })
});


describe('__Check total sum without Fale Mais__', () => {

   beforeEach(() => {
      setInputsAndSum()
   });

   //O-irigin, D-destiny, P-price, M-minutes
   for (let i = 0; i < pointsAndPrice.length; i++) {
      for (let k = 0; k < MINUTES.length; k++) {
         test(`O:${pointsAndPrice[i][0]} D:${pointsAndPrice[i][1]} P:${pointsAndPrice[i][2]} M:${MINUTES[k]}`, () => {
            fireEvent.changeText(originInput, pointsAndPrice[i][0])
            fireEvent.changeText(destinyInput, pointsAndPrice[i][1])
            fireEvent.press(main.queryByTestId(`radio-minutes-${MINUTES[k]}`))
            expect(totalSumComponent.props.children).toBe((pointsAndPrice[i][2] * MINUTES[k]).toFixed(2));
         })
      }
   }
});


describe('__Check total sum with Fale Mais__', () => {

   let checkboxFaleMais;
   beforeEach(() => {
      setInputsAndSum()
      checkboxFaleMais = main.queryByTestId("checkbox-fale-mais");
   });

   //O-irigin, D-destiny, P-price, M-minutes PL - plan
   for (let i = 0; i < pointsAndPrice.length; i++) {
      for (let k = 0; k < MINUTES.length; k++) {
         for (let j = 0; j < PLAN.length; j++) {
            test(`O:${pointsAndPrice[i][0]} D:${pointsAndPrice[i][1]} P:${pointsAndPrice[i][2]} M:${MINUTES[k]} PL:${PLAN[j]}`, () => {
               fireEvent.changeText(originInput, pointsAndPrice[i][0])
               fireEvent.changeText(destinyInput, pointsAndPrice[i][1])
               fireEvent.press(main.queryByTestId(`radio-minutes-${MINUTES[k]}`))
               fireEvent.press(checkboxFaleMais)
               fireEvent.press(main.queryByTestId(`radio-plan-${PLAN[j]}`))
               let s = pointsAndPrice[i][2] * (Math.max(0, MINUTES[k] - PLAN[j]));
               s += s * 0.1;
               expect(totalSumComponent.props.children).toBe(s.toFixed(2));
            })
         }
      }
   }
});

