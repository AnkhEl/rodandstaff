import React, { Component, PropTypes } from 'react'

export default class Confirm extends Component {
  render() {
    const {title,body} = this.props;
    return (
      <div className="container">
        <div className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <button type="button" className="close" data-dismiss="modal" area-hidden="true">&times;</button>
                    <h1 className="modal-title">{title}</h1>
                </div>
                <div className="modal-body">
                  <p className="text-warning">{body}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-dismiss="modal">Quit</button>
                  <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>true}>Proceed</button>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

