import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
//import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// using HOC WithSpinner
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    // componentDidMount fires after the initial render
    // this is where you want your api calls
    componentDidMount() {
        const{ fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
    }

    // commented this all out when using redux thunk in the shop reducer/action
    // state = {
    //     loading: true
    // }

    // unsubscribeFromSnapshot = null;

    // componentDidMount() {
    //     const { updateCollections } = this.props;
    //     const collectionRef = firestore.collection('collections');

    //     // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //     //     // console.log(snapshot);
    //     //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     //     console.log(collectionsMap);
    //     //     updateCollections(collectionsMap);
    //     //     this.setState( {loading: false });
    //     // });

    //     // // using promises against firebase
    //     // collectionRef.get()
    //     // .then(snapshot => {
    //     //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     //     updateCollections(collectionsMap);
    //     //     this.setState( {loading: false });
    //     // });
        
    //     // // using firebase native fetch api
    //     // fetch('https://firestore.googleapis.com/v1/projects/crown-clothing-42605/databases/(default)/documents/collections')
    //     // .then(response => response.json())
    //     // .then(collections => console.log(collections));
    // }

    render() {
        const { match, isCollectionsFetching, isCollectionLoaded  } = this.props;
        // const { loading } = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} 
                    render={props => <CollectionsOverviewWithSpinner isLoading={isCollectionsFetching} {...props} />} />
                <Route path={`${match.path}/:collectionId`} 
                    render={props => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />} />
            </div>
        )
    };
};

const mapStateToProps = createStructuredSelector({
    isCollectionsFetching: selectIsCollectionsFetching,
    isCollectionLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

// const mapDispatchToProps = dispatch => ({
//     updateCollections: collectionsMap => 
//         dispatch(updateCollections(collectionsMap))
// });

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);