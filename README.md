# template-react

A template for a react app in Typescript with all the necessary stuff that's required for an enterprise app.
It connects to a backend providing REST services and using JWT for access security. Refer to 
https://github.com/neuweiler/template-bff for the matching backend implementation. 

The application is intended to allow users of a system owner or a company
to enter production values for their systems on a monthly basis. E.g. the kiloWattHours of a solar system or the
output of a system in number of units (e.g. breads).

![Class Diagram](https://github.com/neuweiler/template-bff/raw/main/docs/Class%20Diagram.png)

The template includes:
* REST calls with JWT tokens using axios - including automatic redirect to login page
* i18n
* material-ui for a slick UI

ToDo:
* graphQL integration
* replace hardcoded URLs with stage dependant variables
