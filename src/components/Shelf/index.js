import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchProducts } from '../../services/shelf/actions';

import ProductList from './ProductList';

import './style.scss';

class Shelf extends Component {
  static propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
  };

  componentDidMount() {
      this.props.fetchProducts();
  }

  render() {
    const { products } = this.props;
    return (
      <React.Fragment>
        <div className="shelf-container">
          <ProductList products={products} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.shelf.products,
});

export default connect(
  mapStateToProps,
  { fetchProducts }
)(Shelf);
