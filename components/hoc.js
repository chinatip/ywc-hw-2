import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { compose } from 'recompose';
import sortBy from 'lodash/sortBy';
import $ from 'jquery';

import { TYPES } from './const';

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
      const url = 'https://ywc15.ywc.in.th/api/interview';

      await fetch(url)
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
      
      return <Component data={data} loading={loading} error={error} {...this.props} />
    }
  });
}

function WithDataByType(Component) {
  return createReactClass({
    getInitialState() {
      return {
        dataByType: [],
      };
    },

    componentWillUpdate(nextProps, nextState) {
      if(!nextProps.loading && !nextProps.error) {
        nextState.dataByType = this.initData(nextProps);
      }
    },

    initData({ data }) {
      const dataByType = {};

      TYPES.forEach((t) => {
        const fData = sortBy(data.filter((d) => (d.major === t)), ['interviewRef']);
        
        dataByType[t] = fData;
      });

      return dataByType;
    },

    render() {
      const { dataByType } = this.state;
      
      return <Component dataByType={dataByType} {...this.props} />
    }
  });
}

function WithSearchProfile(Component) {
  return createReactClass({
    getInitialState() {
      return {
        searchText: '',
        searchData: null
      };
    },

    componentWillUpdate(nextProps, nextState) {
      if (nextState.searchText !== this.state.searchText) {
        const searchData = this.searchProfile(nextProps.dataByType, nextState.searchText);
        nextState.searchData = searchData;
      }

      if(!nextProps.loading && !nextProps.error && !this.state.searchData) {
        nextState.searchData = nextProps.data;
      }
    },

    searchProfile(data, value) {
      const searchData = {}; 

      TYPES.forEach((type) => {
        searchData[type] = [];
        data[type].forEach((d) => {
          const profile = Object.assign({}, d);
          const { firstName, lastName } = profile;
          if(value.length > 0 && (firstName.search(value) >-1 || lastName.search(value) >-1)) {
            profile.search = true;
            searchData[type].push(profile);
          }
        });

        sortBy(searchData[type], ['interviewRef']);
      })
      console.log(searchData['programming'])
      return searchData;
    },

    handleSearch(value){
      this.setState({
        searchText: value
      });
    },

    render() {
      const { searchData, searchText } = this.state;
      
      return <Component searchData={searchData} searchText={searchText} onSearch={this.handleSearch} {...this.props} />
    }
  });
}

export const withAnnouncementData = compose(
  WithLoadData,
  WithDataByType,
  WithSearchProfile
);
