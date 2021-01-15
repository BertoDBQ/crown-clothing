import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

// using memoize
export const selectCollection = memoize((collectionUrlParam) => 
    createSelector(
        [selectCollections],
        (collections) => collections[collectionUrlParam]
    )
);

// not using memoize
// export const selectCollection = (collectionUrlParam) => 
//     createSelector(
//         [selectCollections],
//         collections => collections[collectionUrlParam]
//     )