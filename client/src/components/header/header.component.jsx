import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as Logo } from '../../../src/assets/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDrowndown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

// import './header.styles.scss';
import { 
    HeaderContainer, 
    LogoContainer, 
    OptionsContainer, 
    OptionLink 
} from './header.styles';

const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'  />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            <OptionLink to='/shop'>CONTACT</OptionLink>
            {
                currentUser  
                ? <OptionLink as='div' onClick={signOutStart}>SIGN OUT</OptionLink> 
                : <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {hidden ? null : <CartDrowndown />}
    </HeaderContainer>
);

// const Header = ({ currentUser, hidden }) => (
//     <div className='header'>
//         <Link className='logo-container' to='/'>
//             <Logo className='logo'  />
//         </Link>
//         <div className='options'>
//             <Link className='option' to='/shop'>SHOP</Link>
//             <Link className='option' to='/shop'>CONTACT</Link>
//             {
//                 currentUser  
//                 ? <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> 
//                 : <Link className='option' to='/signin'>SIGN IN</Link>
//             }
//             <CartIcon />
//         </div>
//         {hidden ? null : <CartDrowndown />}
//     </div>
// );

// Allows access to state
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);