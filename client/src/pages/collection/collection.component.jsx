import React from 'react';
import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selectors';
//import { firestore } from '../../firebase/firebase.utils';

import CollectionItem from '../../components/collection-item/collection-item.component';
import './collection.styles.scss';

const CollectionPage = ({ collection }) => {

    // this useEffect is just an example of how it would be 
    // done instead of a componentDidUnmount
    // used to cleanup when component is closed
    // useEffect(() => {
    //     console.log('i am subscribing');

    //     const unsubscribeFromCollections = firestore
    //         .collection('collections')
    //         .onSnapshot(snapshot => console.log(snapshot));

    //     return () => {
    //         console.log('I am unsubscribing');
    //         unsubscribeFromCollections();
    //     };
    // }, []);

    console.log(collection);
    const { title, items } = collection;

    return (
        <div className='collection-page'>
            <h2 className='title'>{ title }</h2>
            <div className='items'>
                {
                    items.map(item => (
                        <CollectionItem key={item.id} item={item} />
                    ))
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);
