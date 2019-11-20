import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { bindActionCreators } from 'redux';
import './Talk.css';
import { Spinner, ResponsiveEmbed } from 'react-bootstrap';
import Pagination from '../../_components/Pagination';
import TalkModal from './TalkModal';


class TalkPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            talks: [], talk: [],formData: [], currentPage: null, totalPages: null,
            submitted: false
        };
    }

    componentWillMount=()=> {
        const {getAllTalk} = this.props;
        getAllTalk();
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
        const talks = items.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, talks, totalPages });
      }
 
    handleSubmit=(e) => {
          this.setState({formData:this.state.formData.push(e)})
           this.props.editTalk(this.state.formData);
           this.componentWillMount()
    }
    addTalk=(e) => {
      const { addTalk } = this.props;
      addTalk(e)

      }
      
    handleDelete=(id) => {
       console.log(id)
       this.props.deleteTalk(id);
        }

 


    render() {
        const {  currentPage, totalPages, talks } = this.state;
        let totalTalks =0;
      
        if(!this.shouldComponentRender()) return (<Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>);
        const { items } = this.props;
        totalTalks = items?items.length:0;
        
    
        const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
    
        return (
          <div className="container mb-5">
            <div className="row d-flex flex-row py-5">
    
              <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                <div className="d-flex flex-row align-items-center">
    
                  <h2 className={headerClass}>
                    <strong className="text-secondary">{totalTalks}</strong> Talk Event
                    <TalkModal handleSubmit={this.addTalk} />
                  </h2>
    
                  { currentPage && (
                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                      Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                    </span>
                  ) }
    
                </div>
    
                <div className="d-flex flex-row py-4 align-items-center">
                  <Pagination totalRecords={totalTalks} pageLimit={8} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                </div>
              </div>
              
              { talks.map(talk =>{
                  const url = talk.link.replace("watch?v=", "v/");
                  return (  <div style={{ width: 660, height: 'auto' }}>
                            <ResponsiveEmbed aspectRatio="16by9">
                            <embed type="video" src={url} />
                            </ResponsiveEmbed>
                                </div>              
                  
              )} ) }
      
            </div>
          </div>
        );
      }
    }    

function mapStateToProps(state) {
    const {  authentication, talks } = state;
    const { user } = authentication;
    const { loading,items } = talks;
    
     
    return {
        user,
        items,
        loading
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllTalk: userActions.getAllTalk,
    addTalk: userActions.addTalk, 
    editTalk: userActions.editTalk,
    deleteTalk: userActions.deleteTalk
}, dispatch)

const connectedTalkPage = connect(mapStateToProps, mapDispatchToProps)(TalkPage);
export { connectedTalkPage as TalkPage };