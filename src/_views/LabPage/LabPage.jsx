import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { bindActionCreators } from 'redux';
import './Lab.css';
import { Spinner, Table } from 'react-bootstrap';
import Pagination from '../../_components/Pagination';
import LabModal from './LabModal';


class LabPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            labs: [], lab: [],formData: [], currentPage: null, totalPages: null,
            submitted: false
        };
    }

    componentWillMount=()=> {
        const {getAllLab} = this.props;
        getAllLab();
    }

    shouldComponentRender=() =>{
        const {loading} = this.props;
       
        if(loading === false) return true
        else if (typeof loading === undefined) return true;
        else if(loading === true) return false;
    }

    handleChange=(e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onPageChanged = data => {
        const { items } = this.props;
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const labs = items.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, labs, totalPages });
      }
 
    handleSubmit=(e) => {
          this.setState({formData:this.state.formData.push(e)})
           this.props.editLab(this.state.formData);
           this.componentWillMount()
    }
    addLab=(e) => {
      const { addLab } = this.props;
      addLab(e)

      }
      
    handleDelete=(id) => {
       console.log(id)
       this.props.deleteLab(id);
        }

 


    render() {
        const {  currentPage, totalPages, labs } = this.state;
        let totalLabs =0;
      
        if(!this.shouldComponentRender()) return (<Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>);
        const { items } = this.props;
        totalLabs = items?items.length:0;
        if (totalLabs === 0) return null;
    
        const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
    
        return (
          <div className="container mb-5">
            <div className="row d-flex flex-row py-5">
    
              <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                <div className="d-flex flex-row align-items-center">
    
                  <h2 className={headerClass}>
                    <strong className="text-secondary">{totalLabs}</strong> Labs
                    <LabModal handleSubmit={this.addLab} />
                  </h2>
    
                  { currentPage && (
                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                      Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                    </span>
                  ) }
    
                </div>
    
                <div className="d-flex flex-row py-4 align-items-center">
                  <Pagination totalRecords={totalLabs} pageLimit={20} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                </div>
              </div>
              <Table striped bordered hover>
              <thead>
                    <tr>
                      <th>#</th>
                      <th>College Id</th>
                      <th>College Name</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                    </tr>
                  </thead>
                  <tbody>
              { labs.map(lab =>{return (                
                    <tr>
                      <td>{lab.id}</td>
                      <td>{lab.collegeId}</td>
                      <td>{lab.college}</td>
                      <td>{lab.latitude}</td>
                      <td>{lab.longitude}</td>
                    </tr>
            
              )} ) }
               </tbody>
            </Table>
            </div>
          </div>
        );
      }
    }    

function mapStateToProps(state) {
    const {  authentication, labs } = state;
    const { user } = authentication;
    const { loading } = labs;
     const {items} =labs;
     
    return {
        user,
        items,
        loading
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllLab: userActions.getAllLab,
    addLab: userActions.addLab, 
    editLab: userActions.editLab,
    deleteLab: userActions.deleteLab
}, dispatch)

const connectedLabPage = connect(mapStateToProps, mapDispatchToProps)(LabPage);
export { connectedLabPage as LabPage };