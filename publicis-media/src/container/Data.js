import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getData} from '../action/data.action';

class Data extends Component{

  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      ascending: true,
      sortColumn: '',
      sum: []
    };
    this.sort = this.sort.bind(this);
  }
  
  componentDidMount() {
    this.props.getData();
  }

  static getDerivedStateFromProps({data}) {
    const keys = data.length ? Object.keys(data[0]) : [];
    const sum = new Array(keys.length).fill(0);
    data.forEach((d) => {
      keys.forEach((key, index) => {
        if (typeof d[key] === 'number') {
          sum[index] += d[key];
        }
      });
    });
    return {
      keys,
      sum
    };
  }

  sort(key) {
    this.setState({
      ascending: !this.state.ascending,
      sortColumn: key
    });
  }

  render() {
    return (
      <main className="container">
        <h2>Data</h2>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              {
                this.state.keys.map(key => {
                  return (
                    <th key={key}>
                      {key}
                      <span className="float-right btn-link sort-link" onClick={this.sort.bind(this, key)}>
                        {this.state.ascending ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
                      </span>
                    </th>
                  );
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              this.props.data
                .sort((d1, d2) => {
                  if(d1[this.state.sortColumn] > d2[this.state.sortColumn]) {
                    return this.state.ascending ? 1 : -1;
                  }
                  if(d2[this.state.sortColumn] > d1[this.state.sortColumn]) {
                    return this.state.ascending ? -1 : 1;
                  }
                  return 0;
                })
                .map((d, index) => {
                return (
                  <tr key={index}>
                    {
                      this.state.keys.map(key => {
                        return (
                          <td key={key}>
                            {d[key]}
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
            <tr className="text-danger">
              {
                this.state.sum.map((s,index) => <td key={index}>{s}</td>)
              }
            </tr>
          </tbody>
        </table>
      </main>
    );
  }

}

function mapStateToProps({data}) {
  return {
    data
  };
}

export default connect(mapStateToProps, {getData})(Data);