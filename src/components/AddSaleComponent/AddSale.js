import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form' 
import api from '../../axios/create';
import {fetchSales} from '../../actions/fetchSales';
import {connect} from 'react-redux';

class AddSale extends Component {
    state = {sales: [], rewards: 0, rewardsForLastThreeMonths: null}
    renderInput = ({input, type, label}) => {
       return (
        <div className="formGroup">
            <label>{label}</label>
            <input className="form-control" type={type} {...input}/>
        </div> 
       );
    }


    componentDidUpdate() {
        this.props.fetchSales();
    }


    onSubmit = async (formValues) => {
        const response = await api.post('/sales', 
            {
                sale: formValues.sale,
                dateTime: formValues.saledate,
                customerId: '1234556780'
            }           
        );
        const totalRewardsForLastThreeMonths = await api.get('/sales/getRewardsForLastThreeMonths', {params : {customerId: '1234556780'}});
        this.setState({rewardsForLastThreeMonths: totalRewardsForLastThreeMonths.data})
        this.setState({rewards: response.data})
        setTimeout(() => {
            this.setState({rewards: 0});
        }, 5000);
    }


    renderSales()  {
        if (this.props.sales !== null) {
            return this.props.sales.map((sale,i) => {
                return (
                    <tr key={i++}>
                        <td>{sale.customerId}</td>
                        <td>{sale.sale}</td>
                        <td>{sale.dateTime}</td>
                    </tr>
                );
            });
         }
    } 

    render() {
        return (
            <div>
                <div className="row">
                <form className="col-md-6" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="sale" component={this.renderInput} type="number" label="Sale Amount:"/>
                    <br/>
                    <Field name="saledate" component={this.renderInput} type="date" label="Sale Date:"/>
                    <br/>
                     <button type="submit" className="btn btn-primary">Submit Sale</button>
                </form>
                <div className="col-md-4">


                </div>
                </div>
                <br/>
                <div>
                    <p>You are awarded rewards {this.state.rewards}</p>
                    <p>Your last three months rewards {this.state.rewardsForLastThreeMonths}</p>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>CustomerId</th>
                            <th>Sale</th>
                            <th>Sale Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderSales()}
                    </tbody>
                    </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sales: state.lastthreeMonthsSales !== null ? state.lastthreeMonthsSales.data.sales : [] 
    }
}

AddSale = connect(mapStateToProps, {fetchSales})(AddSale);

export default reduxForm({
    form: 'sale'
})(AddSale);