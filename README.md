# FactoryApp
## How to run the project
 - npm i
 - npm start

## Solution
  - I created each functionality as a module to keep the concerns of each feature on a module.
  - I created interfaces for the models and the services. This way we can have different implementations for a service, we provide the interface and in different modules we can use different implementations, or even on different components.
  - I tried to use promises and observables to show the different ways we can work with them. 
  - I just did the calls to the endpoints as a promise resolve, since the data would be hardcoded there was no need to do a POST or GET. This later can be done with a library.

## Improvements
 - I would use ngRx to manaeg the state app if the applicaiton was bigger, since the state is quite simple having it on a service is enough. Also if there where more attributes on the state.
 - I would create more shared components. For example the cards, button, header. This would make it easier for styling, so when we want to re-brand all the elements with our branding we just need to change them in one place.
 - Add tests for the services and components

