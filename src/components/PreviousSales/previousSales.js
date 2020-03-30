import React, { Component } from "react"

class PreviousSales extends Component {
    render() {
        if(!this.props.sales) {
            <div>No Sales yet</div>
        } else {
            {this.createSalesTables}
        }
    }
}