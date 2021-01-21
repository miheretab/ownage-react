import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap';

import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/App.scss';

import { connect } from 'react-redux';

import { fetchCategories, fetchPranks } from "./actions";

const categories = ['view-all-pranks', 'new-prank-calls', 'food-restaurant-prank-calls'];

class PrankList extends React.Component {
    state = {
        category: null,
        showModal: false,
        search: ""
    }

    toggle(id) {
        this.setState({ search: ""});
        this.setState({showModal: !this.state.showModal});
        this.props.history.push('/');
    }

    search(category) {
        if (this.state.search.length > 0) {
            this.props.fetchPranks(category, this.state.search);
        }
    }

    reset() {
        this.setState({ search: ""});
        this.props.fetchPranks(this.state.category.slug);
    }

    handleChange = (event) => {
        this.setState({ search: event.target.value });
    }

    showPranks = (category) => {
        this.props.fetchPranks(category.slug);
        this.setState({category: category, showModal: true});
    }

    componentDidMount() {
        this.props.fetchCategories(categories);
    }

    render() {
      const {search, showModal, category} = this.state;
      return (
        <div>
        {this.props.categories.map((category) =>
        <Link key={category.slug} to={category.slug}>
          <Card className="category" key={category.slug}>
            <CardBody onClick={() => { this.showPranks(category) }}>
              <CardTitle tag="h2">{category.name}</CardTitle>
            </CardBody>
          </Card>
        </Link>
        )}

        {showModal && category &&
        <Modal isOpen={showModal} toggle={() => { this.toggle(category.slug) }} >
          <ModalHeader toggle={() => { this.toggle(category.slug) }}>{category.name}</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input placeholder="Search" type="text" value={search} onChange={(e) => { this.handleChange(e) }} />
              <InputGroupAddon addonType="append" className="search" onClick={() => { this.search(category.slug) }}>Search</InputGroupAddon>
            </InputGroup>

            {this.props.pranks.map((prank) =>
              <Card className="prank" key={prank.id}>
                <CardBody>
                  <CardTitle tag="h6">{prank.title}</CardTitle>
                </CardBody>
              </Card>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { this.reset() }}>Reset</Button>{' '}
            <Button color="secondary" onClick={() => { this.toggle(category.slug) }}>Cancel</Button>
          </ModalFooter>
        </Modal>
        }
        </div>
      );
    }
}

const mapStateToProps = state => {
    return {
        pranks: state.pranks.pranks,
        categories: state.categories.categories
    };
};

export default connect(mapStateToProps, {fetchPranks, fetchCategories})(PrankList);