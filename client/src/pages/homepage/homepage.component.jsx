import React, { Profiler } from 'react';

import Directory from '../../components/directory/directory.component';
//import './homepage.styles.scss';
import { HomePageContainer } from './homepage.styles';

// const HomePage = () => (
//     <div className='homepage'>
//         <Directory />
//     </div>
// );

// const HomePage = () => {
//     throw Error;
//     <HomePageContainer>
//         <Directory />
//     </HomePageContainer>
// };

const HomePage = () => (
    <HomePageContainer>
        <Profiler 
            id="Directory" 
            onRender={(id, phase, actualDuration) => {
                console.log({
                    id, 
                    phase,
                    actualDuration
                });
            }}>
            <Directory />
        </Profiler>
    </HomePageContainer>
);

export default HomePage;