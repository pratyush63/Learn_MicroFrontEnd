import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

//Mount function to start up the app
const mount= (el, { onNavigate, deafultHistory }) => {
    
    //IF browserHistory is created then use it else create a memory history 
    const history = defaultHistory || createMemoryHistory();
    //Whenever some navigation occurs this history object is going to call any function that we have provided
    if(onNavigate){
    history.listen(onNavigate);
    }

    ReactDOM.render(
        <App history={ history } />,
        el
    );

    return {
        onParentNavigate({ pathname: nextPathname}){
            //console.log('Container just navigated');
            const { pathname } = history.location;
            if(pathname !== nextPathname){
                history.push(nextPathname);
            }
        },
    };
};

//If we are in development or in isolation call mount immediately 
if(process.env.NODE_ENV === 'development'){
    const devRoot = document.querySelector('#_marketing-dev-root');
    
    //Create Browser history if app runs in isolation in development
    if(devRoot){
        mount(devRoot, { deafultHistory: createBrowserHistory() });
    }
}

//We are running through the container and we should export the mount function
export { mount };