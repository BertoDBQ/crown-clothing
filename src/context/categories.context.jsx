import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

//import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    // when calling an async funcion in use effect:
    // need to make a new async function within use effect
    // then call in the use effect
    const getCategoriesMap = async () => {
      console.log('abc');
      const categoryMap = await getCategoriesAndDocuments();
      console.log('abc-2');
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };

    console.log('xxx');
    getCategoriesMap();
  }, []);

  // ------------------------------------------------------
  // RJA: Used to populate the database with the categories
  // ------------------------------------------------------
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // });

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
