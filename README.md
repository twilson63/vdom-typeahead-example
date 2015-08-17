# typeahead component example

This is an example of a typeahead component, but just plain virtual dom updates driving the interaction.

It is made up of two parts, one is the engine that provides the core functionality of a simple typeahead:

- filter
- move up or down
- select

then the typeahead component, this component manipulates the virtual dom using an input and an ul element, the ul element does not appear until the inputs event fires. There is a reset button that will reset the selection too.

As with any component the typeahead component has an initial function, actions and a render function. The initialize function creates the state for the component and binds the actions to the state. The actions function creates an object of event handlers for the component and the render function manages the presentation of the component.

## To Run the Demo

``` sh
npm install wzrd wtch garnish -g
npm install
npm start
```

Open your browser on 9966

** if you want live-reload to work install the live-reload chrome extension.

