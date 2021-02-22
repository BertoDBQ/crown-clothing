import React from 'react';

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
        <Directory />
    </HomePageContainer>
);

export default HomePage;