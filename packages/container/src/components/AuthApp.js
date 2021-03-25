import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({onSignIn}) => {
    const ref = useRef(null);
    const history = useHistory();
    
    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
        //the listen function which called the onNavigate function returns an object argument which has the path name, path key etc as properties
            onNavigate: ({ pathname: nextPathname }) =>{
                //console.log('The container noticed navigation in marketing (means memoryHistory of AuthApp is updated), so update BrowserHistory of container');
                const { pathname } = history.location;//Address of the current location

                if(pathname !== nextPathname){
                history.push(nextPathname);
                }
            },
            //The auth application receives this callback and whenever a user clicks the submit button in the form, it is called
            //onSignIn: () =>{
            //    console.log('SignIn button clicked');
            //}, 
            onSignIn
        });
        //Anytime when there is a change in browserhistory , call onParentNavigate function
        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />;
}