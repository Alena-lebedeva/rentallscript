import React, { Component } from 'react';
import PropTypes from 'prop-types';
class FileList extends React.Component {

    render(){

        const { data } = this.props;
        let pdf = "PDF";
        let img = "Image";
        let path = "/images/document/";

        return(
            <div>
               {
                    data.map((item, index) =>{
                        let icon = item.fileType == 'application/pdf' ? pdf : (img);                                           
                        return (
                            <div key={index}>
                                <a href={path + item.fileName} target="_blank">{icon} </a>                                
                            </div>
                        )                               
                   })
               }                           
           </div>
           
        )
    }
}

export default FileList;

