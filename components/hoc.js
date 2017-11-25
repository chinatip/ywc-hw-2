import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { compose } from 'recompose';
import sortBy from 'lodash/sortBy';
import forEach from 'lodash/forEach';
import filter from 'lodash/filter';

import { MAJORS, dataURL } from './const';

require('es6-promise').polyfill();
require('isomorphic-fetch');

function WithLoadData(Component) {
  return createReactClass({
    getInitialState() {
      return { 
        data: [],
        loading: true,
        error: false
      };
    },

    componentDidMount () {
      this.loadData();
    },

    async loadData() {
      await fetch(dataURL)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            data,
            loading: false
          });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            loading: false,
            error: true
          });
        });
    },

    render() {
      const { data, loading, error } = this.state;
      
      return <Component data={data} loading={loading} error={error} {...this.props} />;
    }
  });
}

function WithDataByType(Component) {
  return createReactClass({
    getInitialState() {
      return {
        dataByMajor: [],
      };
    },

    componentWillUpdate(nextProps, nextState) {
      if(!nextProps.loading && !nextProps.error) {
        nextState.dataByMajor = this.initData(nextProps);
      }
    },

    initData({ data }) {
      const dataByMajor = {};

      MAJORS.forEach((t) => {
        const fData = sortBy(filter(data, (d) => (d.major === t)), ['interviewRef']);
        dataByMajor[t] = fData;
      });

      dataByMajor['all'] = data;

      return dataByMajor;
    },

    render() {
      const { dataByMajor } = this.state;
      
      return <Component dataByMajor={dataByMajor} {...this.props} />;
    }
  });
}

function WithSearchData(Component) {
  return createReactClass({
    getInitialState() {
      return {
        searchText: '',
        searchData: this.props.dataByMajor
      };
    },

    componentWillUpdate(nextProps, nextState) {
      if (nextState.searchText !== this.state.searchText || nextProps.dataByMajor !== this.props.dataByMajor) {
        const searchData = this.searchData(nextProps.dataByMajor, nextState.searchText);
        nextState.searchData = searchData;
      }
    },

    searchData(data, value) {
      const searchData = {}; 
      searchData['all'] = [];
      
      MAJORS.forEach((major) => {
        searchData[major] = [];
        forEach(data[major], (d) => {
          const profile = Object.assign({}, d);
          const { firstName, lastName } = profile;
          if(firstName.search(value) >-1 || lastName.search(value) >-1) {
            profile.search = true;
            searchData[major].push(profile);
            searchData['all'].push(profile);
          }
        });


        sortBy(searchData[major], ['interviewRef']);
      });

      return searchData;
    },

    handleSearch(value){
      this.setState({
        searchText: value
      });
    },

    render() {
      const { searchData } = this.state;
      
      return <Component searchData={searchData} onSearch={this.handleSearch} {...this.props} />
    }
  });
}

export const withAnnouncementData = compose(
  WithLoadData,
  WithDataByType,
  WithSearchData
);
