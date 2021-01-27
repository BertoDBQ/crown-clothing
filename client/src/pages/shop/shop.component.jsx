import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

const ShopPage = ({ fetchCollectionsStart, match }) => {

    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart])

    // componentDidMount fires after initial render: 
    // this is where you want your api calls
    // commented out once useEffect hook was added
    // componentDidMount() {
    //     const { fetchCollectionsStart} = this.props;
    //     fetchCollectionsStart();
    // }

    return (
        <div className='shop-page'>
            <Route 
                exact 
                path={`${match.path}`}
                component={CollectionsOverviewContainer} 
            />
            <Route 
                path={`${match.path}/:collectionId`} 
                component={CollectionPageContainer}
            />
        </div>
    )
};


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);